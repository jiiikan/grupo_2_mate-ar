function prductosEnElcarrito() {
    return localStorage.carrito ? JSON.parse(localStorage.carrito).length:0;
}

window.addEventListener("load", function () {

    

    TransformStream.options = {
        positionClass: "toast-bottom-right",
        fadeIn: 300,
        fadeOut: 1000,
        timeOut: 5000,
        extendedTimeOut: 1000
    }

    let botonesComprar = document.querySelectorAll(".button_carrito")
    let cartNumber = document.querySelector(".cart-number")
    cartNumber.innerText = prductosEnElcarrito()

    botonesComprar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(localStorage.carrito){
                let carrito = JSON.parse(localStorage.carrito)
                let index = carrito.findIndex((prod) => prod.id == e.target.dataset.id);
                if(index !== -1){
                    carrito[index].quantity++
                }else {
                    carrito.push({id:e.target.dataset.id,quantity: 1})
                }
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
                localStorage.setItem("carrito", JSON.stringify([{id:e.target.dataset.id,quantity: 1}]))
            }
            
            
            
        })
    })
})