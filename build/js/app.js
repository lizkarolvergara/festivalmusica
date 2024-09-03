document.addEventListener('DOMContentLoaded', function(){
    iniciarApp()
})

function iniciarApp() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.webp" type="imagen/webp">
            <img loading="lazy" width="200" height="300" src="src/img/thumb/${i}.jpg" alt="Imagen galeria"></img>
        `;

        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
    
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.webp" type="imagen/webp">
            <img loading="lazy" width="200" height="300" src="src/img/grande/${id}.jpg" alt="Imagen galeria"></img>
        `;

        //crea el overlay con la imagen
        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body')
            body.classList.remove('fijar-body')
            overlay.remove();
        }

        //boton para cerrar el modal
        const cerrarModal = document.createElement('P')
        cerrarModal.textContent = "X";
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function(){
            const body = document.querySelector('body')
            body.classList.remove('fijar-body')
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);

        //añadirlo al html
        const body = document.querySelector('body')
        body.appendChild(overlay);
        body.classList.add('fijar-body')
}