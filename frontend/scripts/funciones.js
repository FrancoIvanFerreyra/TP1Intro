// Categorias---------------------------------------
function handle_error(error){
    console.log(error)
}
//tengo que agarra el la clase de la categoria cuando se aprieta el limk, y a esa clase la tego que mandar en la url y hacer que se listen todos los productos (otro fetch)


function data_category(data){   

    const category = document.getElementById("category");
    for(let index = 0; index<data.length;index++){
        const categoty_product =  document.createElement("a")   //deberia agregar un setAttribute para los href??
        categoty_product.append(data[index].name)
        category.append(categoty_product)
    }
}

fetch("http://localhost:5000/categories")
.then(response => response.json())
.then(data_category)  //add function data_category 
.catch(handle_error)
//--------------------------------------------------

function data_products_category(data_products) {
    const products = document.getElementById("product1")
    for(let index = 0; index < data_products.length; index++){
        const product1 = document.createElement("div")
        product1.setAttribute("class", "") // columnas  o card (box en bulma)
        product1.setAttribute("id",data_products[index].id)
        product1.setAttribute("href",`/character?id=${data_products[index].id}`)
        product1.append(data_products[index].name)
        const product1_img = document.createElement("img")
        product1_img.setAttribute("class","") //columna o card 
        product1_img.setAttribute("src", data_products[index].image)

        products.append()

    }
}

//productos---------------------------------------

fetch("http://localhost:5000/products")
.then(response => response.json())
.then(data_products_category)
.catch(handle_error)

