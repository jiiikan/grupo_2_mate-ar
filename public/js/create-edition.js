window.addEventListener('load', function () {
    let formulario = document.querySelector('.form-acceso')

    formulario.addEventListener('submit', function (e) {
        let errores = [];

        let correo = document.querySelector('#correo').value
        let contra = document.querySelector('#contra').value

        if(correo == ''){
            errores.push("El campo email es obligatorio")
        }

        if (errores.length > 0) {
            e.preventDefault();
            let ulErrores = document.querySelector('.errores ul');
            errores.forEach(error => {
                ulErrores.innerHTML += '<li>' + [error] + '</li>'
            });
        }
    })
})