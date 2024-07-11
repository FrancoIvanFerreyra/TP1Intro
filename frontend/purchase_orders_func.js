
function send_order_data()
{
    const data = document.getElementById("order_id");
    console.log(data.value.toString());

}

const invalid_characters = ["e", "+", "-"];
document.querySelector(".validate").addEventListener("keypress", function(event)
{
    if(invalid_characters.includes(event.key))
    {
        event.preventDefault();
    }
});




