window.addEventListener('load', function () {
  let formulario = document.querySelector('.form-acceso')

  formulario.addEventListener('blur', function (e) {
      let errores = [];

      let nombreUsuario= document.getElementById("#user").value
      let nombreCompleto=document.getElementById("#name").value
      let correo = document.getElementById("#email").value
      let pais= document.querySelector("").value
      let domicilio= document.querySelector("").value
      let contra = document.getElementById("#contra").value

      if(nombreUsuario.value.length =""){
       errores.push("Ingrese un nombre de usuario") 
      }
      if(nombreUsuario.value.length>5){
        errores.push("Su nombre de usuario debe tener al menos 5 caracteres") 
       }
      if(nombreCompleto.value ==""){
        errores.push("Ingrese su nombre y apellido por favor")
      }
      if(correo.value == ''){
          errores.push("El campo email es obligatorio")
      }
      if (correo.includes('@') == false) {
          errores.push('El campo de email es invalido')
      }
      if (pais.value= ""){
        errores.push("Selecciona un país")
      }
      if (domicilio.value=""){
        errores.push("Debes poner alguna dirección")
      }
      if(contra.value == ''){
          errores.push('El campo contraseña es obligatorio')
      }
      if(contra.value = 8){
        errores.push("Tu contraseña debe tener más de un 8 caracteres")
      }
    })
});