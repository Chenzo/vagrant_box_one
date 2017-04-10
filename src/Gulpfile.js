var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var replace = require('gulp-replace');

gulp.task('styles', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./../public/css/'));
});


gulp.task('togglepro', function(){
    var timeInMs = Date.now();
    console.log("timeStamp: " + timeInMs);
  gulp.src(['./../public/includes/globals.php'])
    .pipe(replace('$buildToggle = FALSE;', '$buildToggle = TRUE;'))
    .pipe(replace(/\$cacheBusterNumber="\d+\";/g, '$cacheBusterNumber="' +  timeInMs + '";'))
    .pipe(gulp.dest('./../public/includes/'))
    //.pipe( notify({ message: "Now using minified scrips"}) );
});

gulp.task('toggledev', function(){
  gulp.src(['./../public/includes/globals.php'])
    .pipe(replace('$buildToggle = TRUE;', '$buildToggle = FALSE;'))
    .pipe(gulp.dest('./../public/includes/'))
    //.pipe( notify({ message: "Now using UN-minified scrips"}) );
});

gulp.task('compresscss', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./../public/css/'));
});

gulp.task('compress', function() {
  return gulp.src(['./../public/js/*.js', '!./../public/js/scripts.min.js'])
  	.pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./../public/js/'));
});





gulp.task('prepbuild', ['compress', 'compresscss', 'togglepro'], function() {
    console.log("----------------- > Ready For Production!! - Now using minified scrips!");
});

gulp.task('prepdev', ['styles', 'toggledev'], function() {
    console.log("----------------- > Ready For Dev - Now using UN-minified scrips!");
});

//Watch task
gulp.task('default', ['styles'] ,function() {
    gulp.watch('./scss/**/*.scss',['styles']);
});


