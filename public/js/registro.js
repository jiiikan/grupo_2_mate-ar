//const db = require('../database/models');

window.addEventListener('load', function () {
    let formulario = document.querySelector('.box-register')

    formulario.addEventListener('submit', /*async*/ function (e) {
        let errores = [];

        let user = document.querySelector('#user').value
        let name = document.querySelector('#name').value
        let email = document.querySelector('#email').value
        let contra = document.querySelector('#contra').value
        let imag = document.querySelector('#imag').value

        if (name == "") {
            errores.push("El campo nombre es obligatorio")
        }
        if (name.length < 2) {
            errores.push('El campo de nombre debe tener como minimo 2 caracteres ')
        }

        if (user == "") {
            errores.push("El campo nombre de usuario esta vacio")
        }
        if (user.length < 2) {
            errores.push('El campo de nombre de usuario debe tener como minimo 5 caracteres ')
        }

        /* ○ Email ■ (Opcional) → No puede repetirse con los e-mails ya registrados*/
        if (email == "") {
            errores.push('El campo de correo electronico es obligatorio')
        }
        if (email.includes('@') == false) {
            errores.push('El campo de correo electronico es invalido')
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
        let ex = imag.split('.').pop().toLowerCase();

        // Verificar que la extensión es permitida
        if (!extension.includes(ex)) {
            errores.push('Las extenciones validas son: .jpg, .jpeg, .png, .gif')
        }

        if (contra == "") {
            errores.push('El campo contraseña es obligatorio')
        }
        if (contra.length > 8) {
            errores.push('El campo contraseña debe tener 8 caracteres como minimo')
        }
        if (contra.match(/[a-z]/) == null) {
            errores.push('El campo contraseña debe tener al menos una minuscula')
        }
        if (contra.match(/[A-Z]/) == null) {
            errores.push('El campo contraseña debe tener al menos una mayuscula')
        }
        if (contra.match(/\d/) == null) {
            errores.push('El campo contraseña debe tener al menos un numero')
        }
        if (contra.match(/[!,*,¡,?,¿,#,@]/g) == null) {
            errores.push('El campo contraseña debe tener al menos un carater especial')
        }

        if (errores.length > 0) {
            e.preventDefault();
            let ulErrores = document.querySelector('.errores ul');
            errores.forEach(error => {
                ulErrores.innerHTML += '<li>' + [error] + '</li>'
            });
        }
    })
});