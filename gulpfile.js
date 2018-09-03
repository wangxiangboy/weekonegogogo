var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var uglify = require('gulp-uglify');
var path = require('path');
var url = require('url');
var fs = require('fs');
var css = require('gulp-clean-css');
var data = require('./mock/data.json')
console.log(data);
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(css())
        .pipe(gulp.dest('./src/css/'))
});
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (req.url === '/favicon.ico') {
                    res.end('');
                    return;
                }
                if (pathname === '/api/data') {
                    var key = url.parse(req.url, true).query.key;
                    var arr = [];
                    data.forEach(function(item) {
                        if (item.title.match(key)) {
                            arr.push(item);
                        }
                    });

                    res.end(JSON.stringify({ code: 0, data: arr }));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

// gulp.task('uglifyjs', function() {
//     return gulp.src(['./src/js/**/*.js', '!./src/js/libs?*.js'])
//         .pipe(uglify())
//         .pipe(gulp.dest('build'))
// })

gulp.task('dev', gulp.series('sass', 'server', 'watch'));