window.addEventListener('load', function() {
    let formulario = document.querySelector('form');
    formulario.addEventListener('submit', function(evento) {
  
      evento.preventDefault();
  
      let nombre = document.querySelector('#nombre');
      let nombreObligatorio = document.querySelector("#nombre2");
      let email = document.querySelector("email")
      let validacionEmail = document.querySelector("#validacionemail")

  function validar(){
    if(nombre.value == ""){
      console.log("Hubo un error en el nombre y appelido");
    }
    if(nombreObligatorio.value.length < 5){
      console.log("Nombre y Apellido debe tener mas de 5 caracteres");
    }
    if(email.value == ""){
        console.log("Hubo un error en el email");
      }
    if(validacionEmail.value.includes("@" == false)){
        console.log("El correo no es valido");
      }
      
      
}
    
    })
  });