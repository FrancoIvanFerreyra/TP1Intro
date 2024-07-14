let btn_add = document.querySelectorAll(".add-cart")


function buttons_category(category_list){
    
    const category = document.getElementById("category")  
  

    for(let index = 0; index < category_list.length; index++){
        const element_list = document.createElement("li");
            
        element_list.innerHTML = `
    
        <button class="menu-category category-button" id="${category_list[index].id}" onclick="products(this)">${category_list[index].name}</button>  
   
     `  
    
        category.append(element_list);
        button_selection();
    }
    
}

function button_selection()
{
    const buttonscategory = document.querySelectorAll(".category-button");
    buttonscategory.forEach(boton => {
        boton.addEventListener("click", (e) => {
            console.log("press");
            buttonscategory.forEach(boton => boton.classList.remove("active"))
            e.currentTarget.classList.add("active");
                } 
            )
        }
    )
}




function  load_products(id){   
  
    const title = document.getElementById("main-title");
    title.innerText = category_list[id-1].name;
   
    const products = document.getElementById("products-container");
    

    products.innerHTML = ""
    
    for(let index = 0; index<data_prod.length;index++){
      
        const nombre = data_prod[index].category_id
     
        if(id == nombre){
        console.log(nombre)
        const div = document.createElement("div");  //creo un div por producto
            //http://localhost:5000/images/${data_prod[index].image}
        div.setAttribute("class","product");
        div.innerHTML = `
            
                <img  class="image-product" src="http://localhost:5000/images/${data_prod[index].image}">
            <div class="description">
                <h3 class="name-product">${data_prod[index].name}</h3>
                <p class="product-price">$${data_prod[index].price}</p>
                <button class="add-cart" id="${data_prod[index].id}">Agregar al carrito</button>
                <button class="see-more" id="${data_prod[index].id}" onclick="product_page(this)"><i class="bi bi-eye-fill"></i></button>
            </div>

         `  ;
           
         products.append(div);

        }
    }

    refresh_btn();
}

//-----------------------Funcion para los errores ----------------------------------------------------------------

function handle_error(){
    return "error";
}

//----------------------------------------------------------------------------------------------------------------




function refresh_btn(){
    btn_add = document.querySelectorAll(".add-cart")

    btn_add.forEach(btn => {
        btn.addEventListener("click", add_cart)
    })
}






let productsCart;

const productInCartLC = JSON.parse(localStorage.getItem("product-cart")) //Con esto analizo si en el navegador hay productos almacenado



if(productInCartLC){  //SI llega  haber algo en el carrito  lo guardo en la variable de prodcutsCart que luego utilizo para seguir añadiendo productos
    productsCart = productInCartLC;
    count_number(); //voy actualizando el numero
}else{              //SI NO a la variable productsCart la inicio como una lista vacia y luego le meto los productod que seleccione
    productsCart = [];
}






function add_cart(e){
    const id = e.currentTarget.id
  
    let productAdd;

    for(let i=0;i<data_prod.length;i++){   //añado  a la variable productAdd el json del producto id x si coincide con la del id del boton apreatdo.
        if(data_prod[i].id == id){
            productAdd = data_prod[i];
        }
    }
    
    if(productsCart.some(product => product.id == id)){   //Busca una coincidencia y si la encuentra tira True;
        for(let index = 0; index<productsCart.length; index++){
            if(productsCart[index].id == id){
                productsCart[index].cantidad ++;
            }
        }
    }else{
        productAdd.cantidad = 1;
        productsCart.push(productAdd)
    }
     
        count_number();

        //guardo los elementos del array en el localstorage asi lo puedo usar en la pagina del carrito.

        localStorage.setItem("product-cart", JSON.stringify(productsCart))


    }



function count_number(){
    let number = 0 ;
    for(let i = 0;i<productsCart.length;i++){
        number = productsCart[i].cantidad + number;
    } 
    const articles = document.getElementById("number");
    articles.innerText = number
}



function product_page(coup){
    const id = coup.id
    window.location.href=`/product?id=${id}`
}


//-------------------------------Funciones para conectar el back---------------------------------------------------
console.log(window.location.href);    
if(window.location.href != "http://localhost:8000/admin.html")
        {
            fetch("http://localhost:5000/categories")
            .then(response => response.json())
            .then(
                data => {
                    category_list = data;
                    buttons_category(category_list);
                    console.log("categoriasssss");
                    
                }
            )
            .catch(handle_error)        
        }  


        
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



