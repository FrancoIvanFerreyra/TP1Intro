const data = document.getElementById("order_id");
function send_order_data()
{
    
    console.log(data.value);

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




