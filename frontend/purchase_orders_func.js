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
        if(response.ok)
        {
            return response.json();
        }
        else
        {
            throw undefined;
        }

    })
    .then(data => parse_order_data(data))
    .catch(e => handle_error(e));
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
    for(let index = 0; index < order_head_keys.length; index++)
    {
        if(order_head_keys[index] != "products" && order_head_keys[index] != "total_price")
        {
            console.log(index);
            const item = document.createElement("li");
            item.setAttribute("class", "order-head-item");

            const item_key = document.createElement("p");
            item_key.setAttribute("class", "order-head-item-key");
            item_key.innerText = text_labels_head[order_head_keys[index]];
            item.append(item_key);
            
            const item_value = document.createElement("p");
            item_value.setAttribute("class", "order-head-item-value");
            item_value.innerText = data[order_head_keys[index]];
            item.append(item_value);
            
            order_head.append(item);
        }
    }
    order_container.append(order_head);

    const display_border = document.createElement("p");
    display_border.setAttribute("class", "display-border");
    order_container.append(display_border);

    const order_products = document.createElement("section");
    order_products.setAttribute("class", "order-products");

    text_labels_products = {
        "name" : "Nombre",
        "qty" : "Cantidad",
        "unit_price" : "Precio unitario",
        "subtotal" : "Subtotal"
    }

    const order_products_keys = Object.keys(text_labels_products);
    console.log(order_products_keys);



    
    for(let index = 0; index < order_products_keys.length; index++)
    {
        const item = document.createElement("li");
        item.setAttribute("class", "order-head-item");

        const item_key = document.createElement("p");
        item_key.setAttribute("class", "order-head-item-key");
        item_key.innerText = text_labels_products[order_products_keys[index]];

        item.append(item_key);

        order_products.append(item);
        order_products.style.gridTemplateRows = "repeat(1, 3rem)";
    }
    data["products"].forEach(product => {
        for(let index = 0; index < order_products_keys.length; index++)
            {
                console.log(index);
        
                const item = document.createElement("li");
                item.setAttribute("class", "order-head-item");
        
                const item_value = document.createElement("p");
                item_value.setAttribute("class", "order-head-item-value");
                item_value.innerText = product[order_products_keys[index]];
        
                item.append(item_value);
                
                order_products.append(item);
                order_products.style.gridTemplateRows = "repeat(" + (index + 1) + ", 3rem)";
            }
    });

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




