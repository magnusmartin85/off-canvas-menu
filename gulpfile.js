const gulp = require('gulp');
const imageResize = require('gulp-image-resize');
const paths = require('./config/paths');

gulp.task('optimizeImages', done => {
    gulp.src(paths.imageSrc)
        .pipe(imageResize({
            width: 1200,
            height: 1200,
            imageMagick: true
        }))
        .pipe(gulp.dest(paths.imageDest));
    done();
});

gulp.task('copyManifest', done => {
    gulp.src(paths.resources + '/manifest.json')
        .pipe(gulp.dest(paths.public));
    done();
});

gulp.task('copyFavicon', done => {
    gulp.src(paths.resources + '/favicon.ico')
        .pipe(gulp.dest(paths.public));
    done();
});

gulp.task('default', gulp.series(
    'optimizeImages',
    'copyManifest',
    'copyFavicon',
    )
);
