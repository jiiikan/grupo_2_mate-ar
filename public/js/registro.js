//const db = require('../database/models');

window.addEventListener('load', function () {
    
        let formulario = document.querySelector('.box-register')
        let user = document.querySelector('#user')
        let name = document.querySelector('#name')
        let email = document.querySelector('#email')
        let contra = document.querySelector('#contra')
        let imag = document.querySelector('#imag')
        let bton = document.querySelector('#boton-registrado')
        let erName = document.querySelector('.errorName')

        bton.addEventListener('click', function(e) {
            e.preventDefault();

            let errores = {};

        
        if (name.value == "") {
            errores.push = ("El nombre de usuario es obligatorio")
        }

        if (user.value.length == "") {
            errores.user  = "Debe ingresar su nombre completo"
        }
        if (user.length < 2) {
            errores.push('El campo de nombre de usuario debe tener como minimo 5 caracteres ')
        }

        /* ○ Email ■ (Opcional) → No puede repetirse con los e-mails ya registrados*/
        if (email == "") {
            errores.push('El campo de correo electronico es obligatorio')
        }
        

        /*// Confirmar que el email no se haya registrado
        let emailUsado = db.Usuario.findOne({
            where:{
                email: email
            }
        })
        if ( await emailUsado != email) {
            errores.push('El correo es invalido ya ah sido registrado con anterioridad ')
        }*/

        // Declarar extenciones permitidas y separar el string de extencion
        let extension = ['jpeg', 'jpg', 'gif', 'png'];
        

        

        if (contra == "") {
            errores.push('El campo contraseña es obligatorio')
        }
        if (contra.length > 8) {
            errores.push('El campo contraseña debe tener 8 caracteres como minimo')
        }

        if (Object.keys(errores).length >= 1) {
            erName.innerText = errores.name || " ";
            }else{
                erName.innerText = ""

                formulario.submit()
        }
    })
    })

        
