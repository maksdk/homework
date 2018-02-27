'use strict';

var gulp = require('gulp'),

  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  less = require('gulp-less'),
  //sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  concatCss = require('gulp-concat-css'),
  concat = require('gulp-concat'),
  pngquant = require('imagemin-pngquant'),
  notify = require( 'gulp-notify'),

  rigger = require('gulp-rigger'),
  rimraf = require('rimraf'),
  babel = require('gulp-babel'), 

  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: { //куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: { //Пути откуда брать исходники
    html: 'src/templates/index.html',
    js: 'src/js/*.js',
    style: 'src/styles/main.less',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: { //за изменением каких файлов мы хотим наблюдать
    html: 'src/templates/*.html',
    js: 'src/js/*.js',
    style: 'src/styles/**/*.*',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};
var config = {
  server: {
    baseDir: "./build/"
  },
  tunnel: true,
  host: 'localhost',
  port: 7000,
  logPrefix: "boshConfigurator"
};

gulp.task('html:build', function () {
  gulp.src(path.src.html) 
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html)) 
    .pipe(reload({stream: true})); 
});
gulp.task('js:build', function () {
 gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(babel({
            presets: ['env']
        }))
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});
gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
     .pipe( less().on( 'error', notify.onError(
      {
        message: "<%= error.message %>",
        title  : "Less Error!"
      })))
    //.pipe(sass.sync().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(concatCss("styles.css"))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});
gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});
gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build'
]);
gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});
gulp.task('webserver', function () {
  browserSync(config);
});
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
  