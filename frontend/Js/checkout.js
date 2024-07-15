
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
    console.log(data[0])
    if((data[0] == "Client saved correctly") || (data[0] == "Client already exists")){
        alert("¡La compra se ha realizado con éxito!")
       // window.location.href = '/'

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
    
    console.log(data[0])
    const productInCartLC = JSON.parse(localStorage.getItem("product-cart"))  
    
    let product_list = [];
   
    console.log(productInCartLC);

    

    for(let i = 0 ; i<productInCartLC.length;i++){
        console.log(i)
        let product_item = {
            product_id: parseInt(productInCartLC[i].id),
            product_qty: parseInt(productInCartLC[i].cantidad),
        };
        product_list.push(product_item);
    }


    purchase_order_id = data[1];

    fetch(`http://localhost:5000/purchase_orders/${purchase_order_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_list
        })
    })
        .then((response) => response.json())
        .then(handle_response_purchase_order_products)
        .catch(handle_error)
    
}

function handle_response_purchase_order_products(data){
   console.log(data[0])
}


function translate_cart(){
    window.location.href="cart.html"
}

function translate_shopping(){
    window.location.href="shopping.html"

}

function translate_home(){
    window.location.href="/"
}

function handle_error(){
    return "ERROR";
}