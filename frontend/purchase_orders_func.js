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

    const text_labels = {
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
    const dict_keys = Object.keys(text_labels);
    console.log(dict_keys);
    for(let index = 0; index < dict_keys.length; index++)
    {
        if(dict_keys[index] != "products" && dict_keys[index] != "total_price")
        {
            console.log(index);
            const item = document.createElement("li");
            item.setAttribute("class", "order-head-item");

            const item_key = document.createElement("p");
            item_key.setAttribute("class", "order-head-item-key");
            item_key.innerText = text_labels[dict_keys[index]];
            item.append(item_key);
            
            const item_value = document.createElement("p");
            item_value.setAttribute("class", "order-head-item-value");
            item_value.innerText = data[dict_keys[index]];
            item.append(item_value);
            
            order_head.append(item);
        }
    }
    order_container.append(order_head);
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




