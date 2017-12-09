let gulp = require("gulp");
let sass = require('gulp-sass');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var replacer = require("gulp-html-replace");
var minify = require('gulp-minify');
let cleanCSS = require('gulp-clean-css');
let obs = require('gulp-javascript-obfuscator');


gulp.task('sass', function() {
    console.log("================================================");
    console.log("Building SASS CSS");
    console.log("================================================");
    return gulp.src('./dev/css/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(cleanCSS())
    .pipe(gulp.dest('./static/build/')) // Outputs it in the css folder
})

gulp.task('image_render', function () {
    console.log("================================================");
    console.log("Building Javascript payload");
    console.log("================================================");
    var bundler = browserify({
        entries: './dev/js/render_image.js',
        debug: false
    });
    bundler.transform(babelify);
    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('render_image.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify()) // Use any gulp plugins you want now
        //.pipe(obs())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/build'));
});

// Watchers
gulp.task('watch', function() {
  gulp.watch('./dev/css/**/*.scss', ['sass']);
  gulp.watch('./dev/js/**/*.js', ['image_render']);
})
