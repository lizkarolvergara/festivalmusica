import { src, dest, watch, parallel } from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';



// CSS
function css(done) {
  src('src/scss/**/*.scss') // identificar el archivo sass
    .pipe(plumber())
    .pipe(sass()) // compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css')); // almacenarla en el disco duro

  done(); // callback que avisa a gulp cuando llegamos al final
}

// Imágenes
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3
  };
  src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'));

  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50
  };

  src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));

  done();
}

function javascript() {
  src('src/js/**/*.js')
  .pipe(dest('build/js'))

  done();
}

function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js')
  done();
}


export { css, imagenes, versionWebp, javascript };
export default parallel(imagenes, versionWebp, dev);
