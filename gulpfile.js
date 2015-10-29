/**
 * Created by Kolf on 2015-10-27.
 */

//npm install gulp gulp-usemin gulp-watch gulp-sass gulp-minify-css gulp-autoprefixer gulp-uglify gulp-concat gulp-rename gulp-minify-html browser-sync --save

var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

var paths = {
    scripts: 'src/js/**/*.*',
    styles: 'src/sass/**/*.*',
    images: 'src/images/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
};

gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build',['fonts','images','scripts','styles','templates'])

gulp.task('fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'))
});


gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('watch', function(){
    gulp.watch([paths.images], ['images',reload]);
    gulp.watch([paths.styles], ['styles',reload]);
    gulp.watch([paths.scripts], ['scripts',reload]);
    gulp.watch([paths.templates], ['templates',reload]);
    gulp.watch([paths.index], ['usemin',reload]);
})

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('default', ['server', 'build', 'watch']);