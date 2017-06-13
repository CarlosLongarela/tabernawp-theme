var gulp = require( 'gulp' ),
    uglify       = require( 'gulp-uglify' ),
		less         = require( 'gulp-less' ),
		cssmin       = require( 'gulp-cssmin' ),
		plumber      = require( 'gulp-plumber' ),
    concat       = require( 'gulp-concat' ),
		rename       = require( 'gulp-rename' ),
    notify       = require( 'gulp-notify' );

var scriptsJS = [
            './js/navigation.js',
            './js/skip-link-focus-fix.js'
            ];

var styles = './less/*.less';

gulp.task( 'scripts', function() {
  return gulp.src( scriptsJS )
    .pipe( concat( 'tabernawp.min.js' ) )
    .pipe( uglify() )
    .pipe( gulp.dest( 'js' ) )
    .pipe( notify( { message: 'Scripts concatenados y minificados' } ) );
});

gulp.task( 'styles', function() {
    return gulp.src( './less/tabernawp.less' )
        .pipe( plumber() )
        .pipe( less() )
        .pipe( gulp.dest( './' ) )
        .pipe( cssmin() )
        .pipe( rename( {
            suffix: '.min'
        } ) )
        .pipe( gulp.dest( './' ) )
				.pipe( notify( { message: 'Estilos creados, minificados y concatenados' } ) );
});

gulp.task( 'watch', function() {

  // Inspeccionamos cambios en los siguientes archivos .less
  gulp.watch( styles, ['styles'] );

  // Inspeccionamos cambios en los siguientes archivos .js
  gulp.watch( scriptsJS, ['scripts'] );

});

//gulp.task( 'default', [ 'scripts', 'styles', 'watch' ] );
gulp.task( 'default', [ 'styles'] );
