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
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(e => handle_error(e));
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




