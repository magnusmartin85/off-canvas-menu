// Gulp
import gulp from 'gulp';

// Plugins
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import dartSass from 'sass'
import del from 'del';
import dependents from 'gulp-dependents';
import gulpSass from 'gulp-sass'
import minifyCss from 'gulp-clean-css';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import webpack from 'webpack-stream';
import {dependencies} from './package.json';

const sass = gulpSass(dartSass);
const node_dependencies = Object.keys(dependencies);

// Directories
const dist_folder = './dist/';
const dist_node_modules_folder = dist_folder + 'node_modules/';
const node_modules_folder = './node_modules/';
const src_folder = './src/';

gulp.task('clear', () => del([dist_folder]));

gulp.task('html', () => {
  return gulp.src([src_folder + '**/*.html'], {
    base: src_folder,
    since: gulp.lastRun('html')
  })
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src([
    src_folder + 'scss/off-canvas-menu.scss'
  ])
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(dependents())
    .pipe(sass({
      includePaths: ['./node_modules/normalize.css']
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist_folder + 'css'))
    .pipe(minifyCss())
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src([src_folder + 'js/index.js'])
    .pipe(plumber())
    .pipe(webpack({
      mode: 'production'
    }))
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('off-canvas-menu.js'))
    .pipe(gulp.dest(dist_folder + 'js'))
    .pipe(uglify({
      output: {
        comments: /^!/
      }
    }))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(dist_folder + 'js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_folder + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('vendor', () => {
  if (node_dependencies.length === 0) {
    return new Promise((resolve) => {
      console.log('No dependencies specified');
      resolve();
    });
  }

  return gulp.src(node_dependencies.map(dependency => node_modules_folder + dependency + '/**/*.*'), {
    base: node_modules_folder,
    since: gulp.lastRun('vendor')
  })
    .pipe(gulp.dest(dist_node_modules_folder))
    .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('clear', 'html', 'sass', 'js', 'vendor'));

gulp.task('dev', gulp.series('html', 'sass', 'js'));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: ['dist']
    },
    port: 3000,
    open: false
  });
});

gulp.task('watch', () => {
  const watchVendor = [];

  node_dependencies.forEach(dependency => {
    watchVendor.push(node_modules_folder + dependency + '/**/*.*');
  });

  const watch = [
    src_folder + '**/*.html',
    src_folder + 'scss/**/*.scss',
    src_folder + 'js/**/*.js'
  ];

  gulp.watch(watch, gulp.series('dev')).on('change', browserSync.reload);
  gulp.watch(watchVendor, gulp.series('vendor')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));
