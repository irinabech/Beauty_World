const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const del = require("del");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const webpackStream = require("webpack-stream");
const rename = require("gulp-rename");

function buildSass() {
    return src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({ includePaths: ["./node_modules"] }).on(
                "error",
                sass.logError
            )
        )
        .pipe(
            postcss([
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 2 versions"],
                }),
                cssnano(),
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(dest("src/css"))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

function buildHtml() {
    return src("src/**/*.html").pipe(dest("dist")).pipe(browserSync.stream());
}

function buildJs() {
    return src("src/js/index.js")
        .pipe(webpackStream(require("./webpack.config")))
        .pipe(rename("main.min.js"))
        .pipe(dest("src"))
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
}

function copy() {
    return src(["src/images/**/*.*"], { base: "src" })
        .pipe(dest("dist"))
        .pipe(browserSync.stream());
}

function cleanDist() {
    return del("dist");
}

function serve() {
    watch(["src/js/**/*.js", "!src/js/**/*.min.js"], buildJs);
    watch("src/scss/**/*.scss", buildSass);
    watch("src/**/*.html", buildHtml);
}

function createDevServer() {
    browserSync.init({
        server: "src",
        notify: false,
    });
}

exports.build = series(cleanDist, buildSass, buildJs, buildHtml, copy);
exports.default = series(
    [buildSass, buildJs],
    parallel(createDevServer, serve)
);
