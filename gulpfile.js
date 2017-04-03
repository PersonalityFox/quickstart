// npm install tsify gulp-uglify gulp-sourcemaps vinyl-ftp vinyl-source-stream vinyl-buffer gulp-css-nbd gulp-concat gulp-less less-plugin-autoprefix gulp-watch colors

var gulp = require( 'gulp' ),
    runSequence = require('run-sequence').use(gulp);

var duration = require('gulp-duration');
var browserify = require( 'browserify' );
//var tsify = require( 'tsify' );
//var uglify = require( 'gulp-uglify' );
//var sourcemaps = require( 'gulp-sourcemaps' );
//var livereload = require( 'gulp-livereload' );
//var gulpUtil = require( 'gulp-util' );
//var ftp = require('gulp-ftp');
//var ftp = require('vinyl-ftp');

//var source = require( 'vinyl-source-stream' );
//var buffer = require( 'vinyl-buffer' );
var cssNdb = require( 'gulp-css-nbd' );
var clean = require( 'gulp-clean' );

var concat = require( 'gulp-concat' );
var less = require( 'gulp-less' );
var csso = require('gulp-csso');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
//var watch = require('gulp-watch');
//var colors = require('colors');
var image = require('gulp-image');
var htmlminify = require("gulp-html-minify");

// Файлы для копирования по ftp // './resale/scripts/admin-common.js'
var mainSiteCss = [ './styles/common.css' ];
var mainAdminSiteCss = [ './styles/common-admin.css' ];
var mainSiteJs = [ './scripts/common.js' ];
var mainAdminSiteJs = [ './scripts/admin-common.js' ];

var lessFiles = [ './styles/src/**/*.less' ];
var jsFiles = [ './scripts/src/**/*.ts' ];

/*var file = './styles/common.css';

gulp.src( './styles/common.src/!**!/!*.less' )
    .pipe( cssNdb() )
    .pipe( concat( 'common.less' ) )
    .pipe( less() ).on('error', log)
    .pipe(csso())
    .pipe(duration('Create less'))
    .pipe( gulp.dest( './styles/' ) );*/

/*

function log(error)
{
	console.log([
		'',
		"----------ERROR MESSAGE START----------".bold.red.underline,
		("[" + error.name + " in " + error.plugin + "]").red.bold,
		error.message,
		"----------ERROR MESSAGE END----------".bold.red.underline,
		''
	].join('\n'));
	this.end();
}
gulp.task(
	'default',
	function ()
	{
		var entryFiles;
		var outputFile;
		var destinationDir;
		
		entryFiles = './scripts/main.ts';
		outputFile = 'common.js';
		destinationDir = './scripts/';
		
		return browserify(
				entryFiles,
				{
					debug: true
				}
			)
			.plugin(
				'tsify',
				{
					target: 'ES6',
					noImplicitAny: true
				}
			)
			.on('error', log)
			.bundle()
			.on('error', log)
			.pipe( source( outputFile ) )

			.pipe( buffer() )

			.pipe( sourcemaps.init( {loadMaps: true} ) )
			//.on('error', log)
			//.pipe( uglify() )
			//.on( 'error', gulpUtil.log )
			.pipe( sourcemaps.write( './' ) )
			.pipe(duration('Create common.js'))
			.pipe( gulp.dest( destinationDir ) )
	}
);
gulp.task(
	'backend',
	function ()
	{
		var entryFiles;
		var outputFile;
		var destinationDir;

		entryFiles = './scripts/admin-main.ts';
		outputFile = 'admin-common.js';
		destinationDir = './scripts/';

		return browserify(
			entryFiles,
			{
				debug: true
			}
		)
			.on('error', log)
			.plugin(
				'tsify',
				{
					target: 'ES5',
					noImplicitAny: true
				}
			)
			.on('error', log)
			.bundle()
			.on('error', log)
			.pipe( source( outputFile ) )

			.pipe( buffer() )

			.pipe( sourcemaps.init( {loadMaps: true} ) )
			.on('error', log)
			.pipe( uglify() )
			//.on( 'error', gulpUtil.log )
			.on('error', log)
			.pipe( sourcemaps.write( './' ) )
			.on('error', log)
			.pipe(duration('Create admin-common.js'))
			.pipe( gulp.dest( destinationDir ) )
	}
);

/!*
gulp.task( 'deploy-js', ['backend-resale'], function ()
{
	var conn = getConn();

	gulp.src( globsJs )
			.pipe(conn.dest('/httpdocs/resale/scripts/'))
			.pipe(duration('deploy admin-common.js'))
			.pipe(gulpUtil.noop());
});

gulp.task( 'mainSite-deploy-css', ['less2'], function ()
{
	var conn = getConn();
	
	gulp.src(mainSiteCss)
		.pipe(conn.dest('/httpdocs/styles/'))
		.pipe(duration('deploy less'))
		.pipe(gulpUtil.noop());
});
gulp.task( 'mainSiteAdmin-deploy-css', ['less-admin'], function ()
{
	var conn = getConn();
	gulp.src(mainAdminSiteCss)
			.pipe(conn.dest('/httpdocs/styles/'))
			.pipe(duration('deploy less-admin'))
			.pipe(gulpUtil.noop());
});
gulp.task( 'mainSite-deploy-js', ['default'], function ()
{
	var conn = getConn();
	gulp.src( mainSiteJs )
			.pipe(conn.dest('/httpdocs/scripts/'))
			.pipe(duration('deploy js-deploy'))
			.pipe(gulpUtil.noop());

});
gulp.task( 'mainAdminSite-deploy-js', ['backend'], function ()
{
	var conn = getConn();
	gulp.src( mainAdminSiteJs )
			.pipe(conn.dest('/httpdocs/scripts/'))
			.pipe(duration('deploy admin-js-deploy'))
			.pipe(gulpUtil.noop());

});*!/

gulp.task(
	'less',
	function ()
	{
		var file = './styles/common.css';

		gulp.src( './styles/common.src/!**!/!*.less' )
			.pipe( cssNdb() )
			.pipe( concat( 'common.less' ) )
			.pipe( less() ).on('error', log)
			.pipe(csso())
			.pipe(duration('Create less'))
			.pipe( gulp.dest( './styles/' ) );
	}
);
gulp.task(
	'less-admin',
	function ()
	{
		var file = './styles/common-admin.css';

		gulp.src( './styles/common-admin.src/!**!/!*.less' )
			.pipe( cssNdb() )
			.pipe( concat( 'common-admin.less' ) )
			.pipe( less() ).on('error', log)
			.pipe(csso())
			.pipe(duration('Create less-admin'))
			.pipe( gulp.dest( './styles/' ) );
	}
);
gulp.task(
    'less2',
    function ()
    {
		gulp.src( './styles/common.src/!**!/!*.less' )
            .pipe( cssNdb() )
            .pipe( concat( 'common.less' ) )
            .pipe( less( {
            	plugins: [autoprefix]
            } ) ).on('error', log)
			.pipe(csso())
			.pipe(duration('Create less'))
            .pipe( gulp.dest( './styles/' ) );
    }
);
// Watch Task
  gulp.task('watch', function()
  {
		/!*gulp.watch('./styles/common.src/!**!/!*.less', ['mainSite-deploy-css']);
	    gulp.watch('./styles/common-admin.src/!**!/!*.less', ['mainSiteAdmin-deploy-css']);
		gulp.watch('./scripts/common-admin.src/!**!/!*.ts', ['mainAdminSite-deploy-js']);
	    gulp.watch('./resale/styles/common.src/!**!/!*.less', ['deploy-css']);
	    gulp.watch('./resale/scripts/common-admin.src/!**!/!*.ts', ['deploy-js']);
		gulp.watch('./scripts/common.src/!**!/!*.ts', ['mainSite-deploy-js']);*!/
	  /!*gulp.watch('./scripts/common.src/!**!/!*.ts', ['deploy-default']);
	  gulp.watch('./scripts/common-admin.src/!**!/!*.ts', ['deploy-backend']);
	  gulp.watch('./styles/common.src/!**!/!*.less', ['deploy-less']);
	  gulp.watch('./styles/common-admin.src/!**!/!*.less', ['deploy-less-admin']);*!/
	   gulp.watch('./scripts/common.src/!**!/!*.ts', ['default']);
	   gulp.watch('./scripts/common-admin.src/!**!/!*.ts', ['backend']);
	   gulp.watch('./styles/common.src/!**!/!*.less', ['less2']);
	   gulp.watch('./styles/common-admin.src/!**!/!*.less', ['deploadmin']);
  });
*/

gulp.task('build' , ['clean-build', 'copy-images', 'copy-html', 'css' ] );

gulp.task('default' , ['copy-images', 'copy-html']);

gulp.task('copy-images' , function () {
	return gulp.src( 'images/**{png,jpg,svg,jpeg}')
		.pipe( image() )
		.pipe( gulp.dest( 'client_build/images/') );
});
gulp.task('copy-html' , function () {
    return gulp.src( '*.html')
        .pipe(htmlminify())
        .pipe( gulp.dest( 'client_build/') );
});
gulp.task('css' , function () {
    return gulp.src( lessFiles )
        .pipe( cssNdb() )
        .pipe( concat( 'common.less' ) )
        .pipe( less() )
        .pipe( csso())
        .pipe( gulp.dest( 'client_build/styles/' ) )
        .pipe( duration('Create css') );
});


/*
gulp.task('js' , function () {

    var entryFiles = './scripts/main.ts';
    var outputFile = 'common.js';

    return browserify(
        entryFiles, {debug: true})
        .plugin(
            'tsify', {
                target: 'ES5',
                noImplicitAny: true})
        .bundle()
        .pipe( source( outputFile ) )
        .pipe( buffer() )
        .pipe( sourcemaps.init( {loadMaps: true} ) )
        .pipe( uglify() )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( 'client_build/scripts/' ) )
        .pipe(duration('Create common.js'))
        .pipe(livereload());
});
gulp.task('clean-build' , function (cb) {
    return gulp.src( 'client_build/!*', { read: false } )
        .pipe( clean( { force: true } ));
});
gulp.task('reload-page' , function () {
    return gulp.src( 'client_build/!*', { read: false } )
        .pipe( livereload() );
});



gulp.task('watch' , function () {
	 //livereload.listen({ basePath: 'client_build' });
     gulp.watch( '**!/!*.@(svg|img|png)', function() { runSequence( /!*'clean-build', *!/'copy-images' ) } );
     gulp.watch( '*.html)', function() { runSequence( 'copy-html' ) } );
     gulp.watch( '**!/!*.@(less)', function() { runSequence( 'css' ) } );
     gulp.watch( '**!/!*.@(ts)', function() { runSequence( 'default' ) } );
});*/
