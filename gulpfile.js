const babel = require('gulp-babel');
const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglifyjs');

gulp.task('styles', () => {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
    gulp.watch('./src/scss/*', gulp.parallel('styles'));
    gulp.watch('./src/js/*', gulp.parallel('scripts'));
});

gulp.task('scripts', () => {
    return gulp.src([
        'src/js/index.js'
    ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', done => {
    gulp.src('dist/index.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('dist'));
    done();
});

gulp.task('copyHtml', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('copyFiles', () => {
    return gulp.src(['src/favicon.ico', 'src/manifest.json'])
        .pipe(gulp.dest('dist'))
});

gulp.task('copyImg', () => {
    return gulp.src('src/assets/img/**/*')
        .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('del', done => {
    del('dist');
    done();
});

gulp.task('default', gulp.parallel(
    'del',
    'scripts',
    'styles',
    'copyHtml',
    'copyFiles',
    'copyImg'
    )
);

