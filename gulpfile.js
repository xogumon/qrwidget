import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import tsify from "tsify";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import babelify from "babelify";
import { deleteAsync } from "del";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import dartSass from "sass";
const { series, parallel, src, dest, watch } = gulp;
const sass = gulpSass(dartSass);
const DistDir = "dist";

function clean() {
  return deleteAsync([DistDir]);
}

function bundleJS() {
  return browserify()
    .add("src/widget.ts")
    .plugin(tsify)
    .transform(babelify, {
      presets: ["@babel/preset-env"],
      global: true,
      ignore: [],
    })
    .bundle()
    .pipe(source("widget.js"))
    .pipe(dest(DistDir))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(DistDir));
}

function bundleCss() {
  return src("src/scss/widget.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(DistDir))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(DistDir));
}

function watchFiles() {
  watch("src/**/*.ts", bundleJS);
  watch("src/scss/**/*.scss", bundleCss);
}

const build = series(clean, parallel(bundleJS, bundleCss));
const dev = series(build, watchFiles);

export { build, dev };
export default build;
