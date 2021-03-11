const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const bump = require('gulp-bump');
const livereload = require('gulp-livereload');
const exec = require('child_process').exec;


// Common

gulp.task('build:bank', () => {
	return gulp.src('./src/bank/**/*')
		.pipe(gulp.dest('./bin/bank'));
});

gulp.task('build:markup', () => {
	return gulp.src('./src/markup/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('./bin'))
		.pipe(livereload());
});

gulp.task('build:scheme', () => {
	return gulp.src('./src/scheme/**/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./bin'))
		.pipe(livereload());
});

gulp.task('build:electron', () => {
	return gulp.src('./src/electron/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./bin'))
		.pipe(livereload());
});

gulp.task('build:react', () => {
	return gulp.src('./src/react/**/*.jsx')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./bin'))
		.pipe(livereload());
});


// Increment a package version

gulp.task('bump:major', () => {
	gulp.src('./package.json')
		.pipe(bump({
			key: "version",
			type: "major"
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:minor', () => {
	return gulp.src('./package.json')
		.pipe(bump({
			key: "version",
			type: "minor"
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:patch', () => {
	return gulp.src('./package.json')
		.pipe(bump({
			key: "version",
			type: "patch"
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('bump:prerelease', () => {
	return gulp.src('./package.json')
		.pipe(bump({
			key: "version",
			type: "prerelease"
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('build', gulp.series('build:bank', 'build:markup', 'build:scheme', 'build:electron', 'build:react', 'bump:patch'));


// Watch

gulp.task('watch:all', () => {
	livereload.listen({
		port: 35813
	});

	gulp.watch('./src/bank/**/*', gulp.series('build:bank', 'bump:patch'));
	gulp.watch('./src/markup/**/*.pug', gulp.series('build:markup', 'bump:patch'));
	gulp.watch('./src/scheme/**/*.less', gulp.series('build:scheme', 'bump:patch'));
	gulp.watch('./src/electron/**/*.js', gulp.series('build:electron', 'bump:patch'));
	gulp.watch('./src/react/**/*.jsx', gulp.series('build:react', 'bump:patch'));
});

//

gulp.task('electron:start', gulp.series('build', () => {
    return exec('npx electron .').on('close', () => process.exit());
}));

gulp.task('start', gulp.parallel('electron:start', 'watch:all'));
