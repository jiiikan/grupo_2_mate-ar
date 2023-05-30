window.addEventListener('load', function(){
    let form = this.document.querySelector('form.reservation');

    form.addEventListener(`submit`, function(event){
        let errores = []

        let user = document.querySelector('#user')
        let name = document.querySelector('#name')
        let email = document.querySelector('#email')
        let contra = document.querySelector('#contra')
        let imag = document.querySelector('#imag')

        if(name.value == ""){
            errores.push("* El campo nombre es obligatorio")
        }
        if(name.value.length < 2){
            errores.push('* El campo de nombre debe tener como minimo 2 caracteres ')
        }

        if(user.value == ""){
            errores.push("* El campo nombre de usuario esta vacio")
        }
        if(user.value.length < 2){
            errores.push('* El campo de nombre de usuario debe tener como minimo 5 caracteres ')
        }
        if(email.value == ""){
            errores.push('El campo de correo electronico es obligatorio')
        }
        if(email.value.includes('@') == false ){
            errores.push('El campo de correo electronico es invalido')
        }

        if(contra.value == ""){
            errores.push('El campo contraseña es obligatorio')
        }
        if(contra.value == ""){
            errores.push('El campo contraseña es obligatorio')
        }

        if(errores.length > 0){
            event.preventDefault();
        }
    })    
})
/* Nombre y apellido
■ Obligatorio.
■ Deberá tener al menos 2 caracteres.
○ Email
■ Obligatorio.
■ Deberá ser válido.
■ (Opcional) → No puede repetirse con los e-mails ya registrados.
○ Contraseña
■ Obligatoria.
■ Deberá tener al menos 8 caracteres.
■ (Opcional) → Deberá tener letras mayúsculas, minúsculas, un
número y un carácter especial.
○ Imagen
■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).*/ 