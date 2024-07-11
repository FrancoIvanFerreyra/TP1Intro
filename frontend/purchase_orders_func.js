const data = document.getElementById("order_id");
function send_order_data()
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
        return alert("Error, numero de orden inválido!");
    }
    
    console.log("After: " + str);

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




