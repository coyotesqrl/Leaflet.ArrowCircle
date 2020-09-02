const gulp = require("gulp");
const minify = require("gulp-minify");

gulp.task("dist", function () {
  return gulp
    .src("src/L.ArrowCircle.js")
    .pipe(minify({ noSource: true }))
    .pipe(gulp.dest("dist"));
});
