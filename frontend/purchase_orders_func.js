const data = document.getElementById("order_id");

function handle_data()
{
    let order_id = slice_data();
    if (order_id != 0)
    {
        request_order_data(order_id);
    }
}
function slice_data()
{
    let str = data.value.toString();
    let index = 0;
    console.log("Before: " + str);
    let isSliced = false;
    while(index < str.length && !isSliced)
    {
        if(str[index] == "0")
        {
            str = str.slice(1);
        }
        else
        {
            isSliced = true;
        }
    }
    if (str == "")
    {
        alert("Error, numero de orden inválido!");
        return 0;
    }
    
    console.log("After: " + str);
    return parseInt(str);

}

function request_order_data(order_id)
{
    fetch("http://localhost:5000/purchase_orders/" + order_id)
    .then(function(response) {
        
        const previous_order = document.querySelector(".order-container, .error-container");
        if (previous_order != null)
        {
            previous_order.remove();
        }

        if(response.ok)
        {
            return response.json();
        }
        else
        {
            show_error_message();
        }

    })
    .then(data => parse_order_data(data))
    .catch(e => handle_error(e));
}

function show_error_message()
{
    const order_container = document.createElement("article");
    const main_container = document.getElementById("main");
    order_container.setAttribute("class", "error-container");

    const error_text = document.createElement("p");
    error_text.setAttribute("class", "error-text");
    error_text.innerHTML = "La orden de compra ingresada no existe"

    const error_img = document.createElement("img");
    error_img.setAttribute("class", "product-img error-img");
    error_img.setAttribute("src", "http://localhost:5000/images/icons/error-icon-25243.png")

    
    
    order_container.append(error_text);
    order_container.append(error_img);
    main_container.append(order_container);
}

function parse_order_data(data)
{
    

    const main_container = document.getElementById("main");
    
    const order_container = document.createElement("article");
    order_container.setAttribute("class", "order-container");
    
    const order_head = document.createElement("section");
    order_head.setAttribute("class", "order-head");

    const text_labels_head = {
        "order_id" : "N° de orden",
        "date" : "Fecha",
        "client_name" : "Nombre",
        "client_surname" : "Apellido",
        "client_email" : "Email",
        "client_phone_number" : "Telefono",
        "payment_method" : "Metodo de pago",
        "products" : "Productos",
        "total_price" : "Total"
    }
    const order_head_keys = Object.keys(text_labels_head);
    console.log(order_head_keys);

    const order_head_title = document.createElement("li");
    order_head_title.setAttribute("class", "order-head-item");
    const order_head_data = document.createElement("li");
    order_head_data.setAttribute("class", "order-head-item");

    payment_methods_texts = {
        "CASH" : "Efectivo",
        "BANK_TRANSFER" : "Transferencia",
        "EWALLET_TRANSFER" : "Mercado Pago",
        "CREDIT_CARD" : "Crédito",
        "DEBIT_CARD" : "Débito",
    }

    for(let index = 0; index < order_head_keys.length; index++)
    {
        if(order_head_keys[index] != "products" && order_head_keys[index] != "total_price")
        {
            const item_title = document.createElement("p");
            item_title.innerText = text_labels_head[order_head_keys[index]];
            order_head_title.append(item_title);

            const item_data = document.createElement("p");

            if(order_head_keys[index] == "payment_method")
            {
                item_data.innerText = payment_methods_texts[data[order_head_keys[index]]];
            }
            else
            {
                item_data.innerText = data[order_head_keys[index]];
            }
            order_head_data.append(item_data);       
        }
    }
    order_head.append(order_head_title);
    order_head.append(order_head_data);
    

    
    order_container.append(order_head);

    const display_border = document.createElement("p");
    display_border.setAttribute("class", "display-border");
    order_container.append(display_border);

    const order_products = document.createElement("section");
    order_products.setAttribute("class", "order-products");

    text_labels_products = {
        "image": "Imagen",
        "name" : "Nombre",
        "qty" : "Cantidad",
        "unit_price" : "Precio unitario",
        "subtotal" : "Subtotal"
    }

    const order_products_keys = Object.keys(text_labels_products);
    console.log(order_products_keys);


    const tags_container = document.createElement("li");
    tags_container.setAttribute("class", "product-container");
    
    for(let index = 0; index < order_products_keys.length; index++)
    {
        const item = document.createElement("p");
        item.innerText = text_labels_products[order_products_keys[index]];
        tags_container.append(item);
    }
    order_products.append(tags_container);
    order_products.style.gridTemplateRows = "repeat(1, 3rem)";

    var product_counter = 0;
    data["products"].forEach(product => {
        const product_container = document.createElement("li");
        product_container.setAttribute("class", "product-container");

        for(let index = 0; index < order_products_keys.length; index++)
        {
            console.log(index);
            var item = "";
            if(order_products_keys[index] != "image")
            {
                item = document.createElement("p");
            }
            else
            {
                item = document.createElement("img");
                item.setAttribute("src", "http://localhost:5000/images/" + product["image"]);
                item.setAttribute("class", "product-img");
            }
            if(order_products_keys[index] == "subtotal" || order_products_keys[index] == "unit_price")
            {
                item.innerText = "$ " + product[order_products_keys[index]];
            }
            else
            {
                item.innerText = product[order_products_keys[index]];
            }
            product_container.append(item);
        }
        order_products.append(product_container);
        product_counter++;
        order_products.style.gridTemplateRows = "3rem repeat(" + product_counter + ", 8rem)";

    });

    const total_price_container = document.createElement("li");
    total_price_container.setAttribute("class", "product-container");
    
    price_title = document.createElement("p");
    price_title.setAttribute("class", "total-price-title");
    price_title.innerHTML = "VALOR TOTAL DE ORDEN DE COMPRA:";
    total_price_container.append(price_title);

    price_data = document.createElement("p");
    price_data.setAttribute("class", "total-price-data");
    price_data.innerHTML = "$ " + data["total_price"];
    total_price_container.append(price_data);

    order_products.append(total_price_container);
    product_counter++;
    order_products.style.gridTemplateRows = "3rem repeat(" + product_counter + ", 8rem)";



    order_container.append(order_products);

    main_container.append(order_container);
}

function handle_error(e)
{
    console.log("Error: " + e);
}

const invalid_characters = ["e", "+", "-"];
const MAX_DIGITS = 6;
document.querySelector(".validate").addEventListener("keypress", function(event)
{
    if(invalid_characters.includes(event.key))
    {
        event.preventDefault();
    }
});

data.oninput = function(){
    if(this.value.length > MAX_DIGITS)
    {
        this.value = this.value.slice(0, MAX_DIGITS);
    }
}




