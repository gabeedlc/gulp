// gulpfile.js

// require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// styles task
/*
    Creamos la tarea para que modifique las hojas de estilo:
        1. Le decimos que vaya a buscar los archivos al directorio.
        2. Luego, cada pipe es como parte de una tuberia. Esta etapa es lineal, tienen que funcionar todos los pasos, si falla uno falla todo.
        3. sass busca los scss y los modifica, el siguiente le indica el destino.
        4. cssmin le quita todos los espacios, el siguiente le indica el destino.
*/
gulp.task('styles', function() {
    return gulp.src('./src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dest/css/'))
    .pipe(cssmin())
    .pipe(gulp.dest('./dest/css/'));
    });

// scripts task
/*
    Mismo proceso que en el caso anterior, pasando por distintas dependencias.
*/
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
    // concat junta los archivos .js en uno, y lo nombra segun lo que pongamos entre parentesis
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dest/js/'))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./dest/js/'));
    });
    
// watch task
// Nos permite dejar el proceso automatizado para actualizar los archivos.
gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./src/css/*.scss', gulp.series('styles'));
    });
    
// default task
// definimos la tarea que va a ejecutar cuando solo demos el comando gulp en la consola, en gral la tarea "watch"
gulp.task('default', gulp.parallel('scripts', 'styles', 'watch'));