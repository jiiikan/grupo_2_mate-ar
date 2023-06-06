window.addEventListener('load', function() {
    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(evento) {
  
      evento.preventDefault();
  
      let nombre = document.querySelector('#nombre');
      let nombreObligatorio = document.querySelector("#nombre2");
      let descripcion = document.querySelector("#descripcion")
      let imagen = document.querySelector("#imagen")

  function validar(){
    if(nombre.value == ""){
      console.log("Hubo un error en el nombre y appelido");
    }
    if(nombreObligatorio.value.length < 5){
      console.log("Nombre y Apellido debe tener mas de 5 caracteres");
    }
    if(descripcion.value.length < 20){
        console.log("La descripcion de debe tener más de 20 caracteres");
      }
    if(imagen("@" == false)){
        console.log("El correo no es valido");
      } 
      // Crear arreglos con extensiones permitidas
let allowedImages = ['jpeg', 'jpg', 'gif', 'png'];
let allowedDocs = ['doc', 'docx', 'pdf'];

// Obtener elemento por ID y que solo admita imágenes
document.querySelector('#file-image').addEventListener('change', () => {
    fileValidation('#file-image', allowedImages);
});

// Obtener elemento por clase y que solo admita documentos
document.querySelector('.file-doc').addEventListener('change', () => {
    fileValidation('.file-doc', allowedDocs);
});

function fileValidation(selector, extensions){
    let filePath = document.querySelector(selector).value || '';
    // Seperar nombre de archivo por . y obtener último elemento (extensión)
    let extension = filePath.split('.').pop().toLowerCase();

    // Verificar que la extensión es permitida
    if(!extensions.includes(extension)) {
        alert('Porfavor suba archivos con una extensión vlálida: ' + extensions.join(', '));
        // No puedes manipular el valor del input, solo devolver falso
        return false;
    }
    return true;
}
      
      
}
    
    })
  });