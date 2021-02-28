let gulp = require('gulp');

let cssMin = require('gulp-cssmin');

let babel = require('gulp-babel');

let uglify = require('gulp-uglify');

let htmlMin = require('gulp-htmlmin');
let clean = require('gulp-clean')

//创建一个压缩css的代码
function css() {
    return gulp.src('./src/css/**')
        .pipe(cssMin())
        .pipe(gulp.dest('./dist/css'))
}

//创建一个压缩js的代码
function js() {
    return gulp.src('./src/js/**')
    //下面的代码用于把ES6以上的东西转换成浏览器能看懂的ES5
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}

// 创建一个压缩html的代码
function html(){
    return gulp.src('./src/html/**')
    .pipe(htmlMin(
        {
            collapseWhitespace:true, //表示去除空格
            removeEmptyAttributes:true, //移除空的属性
            minifyCSS:true, //压缩style标签
            minifyJS:true //压缩script标签
        }
    ))
    .pipe(gulp.dest('./dist/html'))
}

// 创建一个复制图片的任务
function img(){
    return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'));
}

// 创建一个清除缓存的任务（把dist里的文件全部删除）
function clear(){
    return gulp.src(['./dist/**'])
    .pipe(clean());
}



exports.css = css;
exports.js = js;
exports.html = html;
exports.img = img;
exports.clean=clear;