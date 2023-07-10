window.addEventListener('load', function () {
    let login = document.querySelector('.form-acceso')

    login.addEventListener('blur', function (e) {
        let errores=[];

        let email = document.querySelector("[name=email]").value
        let password = document.querySelector("[name=password]").value
        
        if(email == 0){
            errores.push("Completa este campo, es obligatorio")
        }
        if (email.includes('@') == false) {
            errores.push('Escribe un email')
        }

        if(password.length == 0){
            errores.push('El campo contraseña es obligatorio')
        }
        if(password.value.length >= 8){
            errores.push("Tu contraseña debe es mayor a 8")
        }
            if(errores.length > 0){
                e.preventDefault();
            }
        
    })
});