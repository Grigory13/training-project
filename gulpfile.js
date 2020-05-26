var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    pug         = require('gulp-pug'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'), 
	pngquant    = require('imagemin-pngquant'), 
	cache       = require('gulp-cache');

gulp.task('sass', function(){
    return gulp.src('app/sass/*.sass')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.reload({stream: true})) 
});

gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('pug', function() {
    return gulp.src('app/pug/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: { 
			baseDir: 'app' 
		},
		notify: false 
	});
});

gulp.task('clean', async function(){
    return del.sync('dist');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({ 
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('prebuild', async function(){

    var buildCss = gulp.src('app/styles/*.css')
    .pipe(gulp.dest('dist/styles'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('app/sass/*.sass', gulp.parallel('sass'));
    gulp.watch('app/pug/*/**.pug', gulp.parallel('pug'));
    gulp.watch('app/js/script.js', gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('pug','sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.series('pug', 'sass','clean', 'img','prebuild'));