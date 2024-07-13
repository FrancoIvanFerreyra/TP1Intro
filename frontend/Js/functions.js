function send_form(event){
    event.preventDefault()
    
    const Data = new FormData(event.target)

    const name = Data.get("name")
    const surname = Data.get("surname")
    const email = Data.get("email")
    const phone_number = Data.get("phone_number")

    fetch("http://localhost:5000/clients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            email: email,
            phone_number: phone_number,
        })
    })
        .then((response) => response.json())
        .then((data) => handle_response(data, event))
        .catch(handle_error)
}

function handle_response(data, event){
    if(data[0] == "Client saved correctly"){
        alert("¡La compra se ha realizado con éxito!")
        window.location.href = '/'

        add_purchase_order(data[1], event)
    }else{
        alert("Error: la compra ha fallado.")
    }

}

function add_purchase_order(client_id, event){
    
    const Data = new FormData(event.target)
    const payment_method = Data.get("payment_method")

    fetch("http://localhost:5000/purchase_orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: client_id,
            payment_method: payment_method,
        })
    })
        .then((response) => response.json())
        .then(handle_response_purchase_order)
        .catch(handle_error)
}

function handle_response_purchase_order(data){
    console.log(data)
}

function buttons_categorie(category_list){
    
    const categorie = document.getElementById("category")  
  

    for(let index = 0; index < category_list.length; index++){
        const element_list = document.createElement("li");
            
        element_list.innerHTML = `
    
        <button class="menu-categorie category-button" id="${category_list[index].id}" onclick="products(this)">${category_list[index].name}</button>  
   
     `  
    
        categorie.append(element_list);
    
        const buttonscategorie = document.querySelectorAll(".category-button");
        buttonscategorie.forEach(boton => {
        boton.addEventListener("click", (e) => {
        
        buttonscategorie.forEach(boton => boton.classList.remove("active"))

        e.currentTarget.classList.add("active");
        } )

    })
    
    }
}


function load_products(id){   
  
    const title = document.getElementById("main-title");
    title.innerText = category_list[id-1].name;
   
    const products = document.getElementById("products-container");

    products.innerHTML = ""
    
    for(let index = 0; index<data_prod.length;index++){
      
        const nombre = data_prod[index].category_id
     
        if(id == nombre){
        console.log(nombre)
        const div = document.createElement("div");  //creo un div por producto

        div.setAttribute("class","product");
        div.innerHTML = `
            
            <div class="description">
                <img  class="image-product" src="${data_prod[index].image}">
                <h3 class="name-product">${data_prod[index].name}</h3>
                <p class="product-price">$${data_prod[index].price}</p>
                <button class="add-cart" id="${data_prod[index].id}">Agregar al carrito</button>
                <button class="see-more" id="${data_prod[index].id}" onclick="product_page(this)"><i class="bi bi-eye-fill"></i></button>
            </div>

         `  ;
           
         products.append(div);

        }
    }
}

//-----------------------Funcion para los errores ----------------------------------------------------------------

function handle_error(){
    return "ERROR";
}

//----------------------------------------------------------------------------------------------------------------


function product_page(coup){
    const id = coup.id
    window.location.href=`/product?id=${id}`
}


//-------------------------------Funciones para conectar el back---------------------------------------------------
      fetch("http://localhost:5000/categories")
        .then(response => response.json())
        .then(
            data => {
                category_list = data;
                buttons_categorie(category_list);
                
            }
        )
        .catch(handle_error)


        function products(coup){
            let id = coup.id
            fetch("http://localhost:5000/products")
            .then(content => content.json())
            .then(products_list => {
                    data_prod = products_list;
                    load_products(id)
                })
            .catch(handle_error)    
        }
    
  
//-------------------------------------------------------------------------------------


//----------------------------------Funciones para  redirigir -----------------------------------------------------------
function translate_cart(){
    window.location.href="cart.html"
}

function translate_shopping(){
    window.location.href="shopping.html"

}

function translate_home(){
    window.location.href="/"
}
//------------------------------------------------------------------------------------------------



