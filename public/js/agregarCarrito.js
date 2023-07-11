function productosEnElcarrito() {
    return localStorage.carrito ? JSON.parse(localStorage.carrito).length:0;
}

window.addEventListener("load", function () {

    let botonesComprar = document.querySelectorAll(".button_carrito")
    let cartNumber = document.querySelector(".cart-number")

    botonesComprar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            e.preventDefault()
            console.log(e.target.dataset)
            //EL EVENTO (e) SE DUPLICA ERROR!!
            if(localStorage.carrito){
                let carrito = JSON.parse(localStorage.carrito);
                let index = carrito.findIndex((prod) => (prod.id == e.target.dataset.id));
                if(index !== -1){
                    carrito[index].quantity++;
                } else {
                    carrito.push({ id:e.target.dataset.id, quantity: 1 })
                }
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
              localStorage.setItem("carrito", JSON.stringify([{id:e.target.dataset.id, quantity: 1}]))
            }
            cartNumber.innerText = productosEnElcarrito()    
})
});
});