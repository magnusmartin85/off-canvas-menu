const babel = require('gulp-babel');
const concat = require('gulp-concat');
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglifyjs');

gulp.task('styles', () => {
    return gulp.src('./src/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
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
        .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', done => {
    gulp.src('dist/js/index.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('dist/js'));
    done();
});

gulp.task('copyHtml', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.parallel(
    'scripts',
    'styles',
    'copyHtml'
    )
);

