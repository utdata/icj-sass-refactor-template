var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var gutil       = require('gulp-util');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./docs"  
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("docs/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);