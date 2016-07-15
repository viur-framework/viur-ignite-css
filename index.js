var gulp = require('gulp');
var rename = require('gulp-rename');

var less = require('gulp-less');
var path = require('path');

var postcss = require('gulp-postcss');
var zindex = require('postcss-zindex');
var autoprefixer = require('gulp-autoprefixer');
var focus = require('postcss-focus');
var nocomments = require('postcss-discard-comments');
var nano = require('gulp-cssnano');

var stylelint = require('stylelint');
var stylelintConfig = require('stylelint-config-standard'); 
var gulpCopy = require('gulp-copy'); 

module.exports = {
	buildViurCSS: function(src, dest) {
		 if (typeof(src)==='undefined') src = '../../sources/less/style.less';
		 if (typeof(dest)==='undefined') dest = '../../appengine/css/';

		var processors = [
			nocomments, // discard comments
			focus, // add focus to hover-states
			zindex, // reduce z-index values
			require('stylelint')(stylelintConfig), // lint the css
			require('postcss-font-magician')({
				hosted: destpaths.webfonts,
				formats: 'local eot woff2'
			}) // import fonts   
		];
		return gulp.src(src)
			.pipe(less({
				paths: [ path.join(__dirname, 'less', 'includes') ]
			})) // compile less to css
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			})) // add vendor prefixes
			.pipe(postcss(processors)) // clean up css
			.pipe(gulp.dest(dest)) // save cleaned version
			.pipe(nano()) // minify css
			.pipe(rename('style.min.css')) // save minified version 
			.pipe(gulp.dest(dest));
	},

	init: function() {
		console.log(__dirname);
		return gulp.src('./copy/default_style.less')
			.pipe(gulp.dest('./'));
	}
};