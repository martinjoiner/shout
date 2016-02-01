var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('scripts', function(){
	gulp.src([
			'src/assets/js/vendor/jquery-2.1.0.min.js', 
			'src/assets/js/shout.js', 
			'src/assets/js/data/*.js',
			'src/assets/js/startingGun.js'
	])
	.pipe( concat('all.min.js') )
	.pipe( uglify() )
	.pipe( gulp.dest('public_html/js') );
});

gulp.task('watch', function(){
	gulp.watch('src/*.js', ['scripts']);
});
