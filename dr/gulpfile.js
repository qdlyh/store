var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('item', function () {
    connect.server({
        root: 'src',
        livereload: true
    })
    gulp.watch('src/**/*.*', ['reload'])
});
gulp.task('reload', function () {
    gulp.src('src/**/*.*')
        .pipe(connect.reload());
})