const productInCart = JSON.parse(localStorage.getItem("product-cart"))   //devuelve un null si no hay nada.

const cartEmpty = document.getElementById("empty-cart")


const cartProducts = document.getElementById("cart-products")

const cartActions = document.getElementById("actions-cart")

const cartPurchase = document.getElementById("cart-purchase")

let btnRemove = document.querySelectorAll(".cart-remove-product");

const btnEmpty = document.getElementById("cart-actions-empty");

const btnbuy = document.getElementById("cart-actions-buy");

const PriceTot = document.getElementById("total-price");




function loadCartProducts(){
    if(productInCart && productInCart.length > 0){

        cartEmpty.classList.add("disabled");
        cartPurchase.classList.add("disabled");
        cartProducts.classList.remove("disabled");
        cartActions.classList.remove("disabled");
    
        cartProducts.innerHTML = "";

        for(let index = 0; index<productInCart.length;index++){
            const div = document.createElement("div");
            div.setAttribute("class", "cart-product")


            div.innerHTML = `
                <div class="cart-name-product">
                                <small>Articulo:</small>
                                <h3>${productInCart[index].name}</h3>
                           </div>
    
                           <div class="cart-quanty-product">
                                <small>Cantidad:</small>
                                <p>${productInCart[index].cantidad}</p>
                           </div>
    
                           <div class="cart-product-price">
                                <small>Precio:</small>
                                <p>$${productInCart[index].price}</p>
                           </div>
    
                           <div class="cart-product-subtotal">
                                <small>Subtotal:</small>
                                <p>$${productInCart[index].price * productInCart[index].cantidad}</p>
                           </div>
                           <button class="cart-remove-product" id="${productInCart[index].id}"><i class="bi bi-trash-fill"></i></button>
                        </div>
            `
            cartProducts.append(div)
        }
    
      
    }else{
        cartEmpty.classList.remove("disabled");
        cartPurchase.classList.add("disabled");
        cartProducts.classList.add("disabled");
        cartActions.classList.add("disabled");
    }

    refresh_btn_remove();
    updateTotalPrice();

}

loadCartProducts();   //se llama cada vez que entro a la pagina.

function refresh_btn_remove(){
    btnRemove = document.querySelectorAll(".cart-remove-product")

    btnRemove.forEach(btn => {
        btn.addEventListener("click", removeIncart)
    })

}

function removeIncart(e){
    const idBtnProduct = e.currentTarget.id
    //const index = productInCart.findIndex(product => product.id === idBtnProduct)
    let index;
        
    for(let i = 0; i<productInCart.length;i++){
        if(productInCart[i].id == idBtnProduct){
            index = i;
        }
    }

    if(productInCart[index].cantidad == 1){
        productInCart.splice(index, 1)   //splice elimina las coincidencias, es decir eliminara desde el elemento [index] hasta la cant que le pones en este caso 1 
        loadCartProducts();  //actualizo la lista cargando de nuevo.

        localStorage.setItem("product-cart", JSON.stringify(productInCart))    //guardo el nuevo array con menos elementos en localstorage
    }else{
        productInCart[index].cantidad--;
        loadCartProducts(); 
        localStorage.setItem("product-cart", JSON.stringify(productInCart)) 
    }

}

btnEmpty.addEventListener("click", emptyCart );

function emptyCart(){
    productInCart.length = 0;
    localStorage.setItem("product-cart", JSON.stringify(productInCart));
    loadCartProducts();
}


function updateTotalPrice(){
    let totalPrice = 0;
    for(let index=0;index<productInCart.length;index++){
        totalPrice += productInCart[index].cantidad * productInCart[index].price
    }   

    PriceTot.innerText = `$ ${totalPrice}`

}





btnbuy.addEventListener("click", cartBuy);

function cartBuy(){
    productInCart.length = 0;
    localStorage.setItem("product-cart", JSON.stringify(productInCart));
    
    cartEmpty.classList.add("disabled");
    cartPurchase.classList.remove("disabled");
    cartProducts.classList.add("disabled");
    cartActions.classList.add("disabled");
}


