


function buttons_categorie(category_list){
    const categorie = document.getElementById("category")  
  

    for(let index = 0; index < category_list.length; index++){
        const element_list = document.createElement("li");
        elemento_lista.innerHTML = `
    
        <button class="menu-categorie button-categorie" id="${category_list[index].id}" onclick="products(this)"</button>  
   
     `  
        categorie.append(element_list);
    
        const botonescategoria = document.querySelectorAll(".button-categorie");
        botonescategoria.forEach(boton => {
        boton.addEventListener("click", (e) => {

        botonescategoria.forEach(boton => boton.classList.remove("active"))

        e.currentTarget.classList.add("active");
        } )

    })
    
    }
}


function  load_products(id){   

    const title = document.getElementById("main-title");
    title.innerText = category_list[id-1].name;


    const products = document.getElementById("container-products");
    products.innerHTML = ""

    for(let index = 0; index<data_prod.length;index++){
        const nombre = data_prod[index].category_id
        if(id == nombre){
        const div = document.createElement("div");  //creo un div por producto

        div.setAttribute("class","product");
        div.innerHTML = `
            
            <img  class="image-product" src="${data_prod[index].imagen}" alt="${data_prod[index].nombre}">
            <div class="description">
                <h3 class="name-product">${data_prod[index].name}</h3>
                <p class="product-price">$${data_prod[index].price}</p>
                <button class="add-cart" id="${data_prod[index].id}">Agregar al carrito</button>
            </div>

         `  ;
         products.append(div);

        }
    }
}

//-----------------------Funcion para los errores ----------------------------------------------------------------

function handle_error(){
    return "error";
}

//----------------------------------------------------------------------------------------------------------------


//-------------------------------Funciones para conectar el back---------------------------------------------------
      fetch(url_categorie)
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
            console.log(id)
            fetch(url_products)
            .then(content => content.json())
            .then(data_products => {
                    data_prod = data_products;
                    load_products(id)
                })
            .catch(handle_error)    
        }
    
    
//-------------------------------------------------------------------------------------


//----------------------------------Funciones para  redirigir -----------------------------------------------------------
function translate_carrito(){
    window.location.href="cart.html"
}

function translate_compras(){
    window.location.href="shopping.html"

}

function translate_home(){
    window.location.href="index.html"
}
//------------------------------------------------------------------------------------------------



