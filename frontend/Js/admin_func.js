import { button_selection } from "./functions.js";

button_selection();
const add_button = document.getElementById("add");
add_button.addEventListener("click", add_product);

function add_product()
{
    create_product_form();
}

const container = document.getElementById("data-container");

function create_product_form()
{
    const form_container = document.createElement("form");
    form_container.setAttribute("class", "form-container");

    //Image field
    //const form_img_container = document.createElement("section");
    //form_img_container.setAttribute("class", "form-img-container");

    const img_uploaded = document.createElement("img");
    img_uploaded.setAttribute("class", "img-uploaded");
    img_uploaded.setAttribute("src", "http://localhost:5000/images/default/default.jpg");
    form_container.append(img_uploaded);

    const img_label = document.createElement("label");
    img_label.setAttribute("for", "fileInput");
    img_label.setAttribute("class", "custom-file-upload img-upload-submit");
    img_label.innerText = "Seleccionar imagen";

    form_container.append(img_label);

    const img_upload = document.createElement("input");
    img_upload.setAttribute("id", "fileInput");
    img_upload.setAttribute("type", "file");
    img_upload.setAttribute("accept", ".png, .jpg");

    img_upload.addEventListener("change", function(event)
    {
        var file = event.target.files[0];
        //console.log(file);

        const reader = new FileReader();

        reader.onload = function(e) {
            img_uploaded.setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(file);

    })
    form_container.append(img_upload);

    //form_container.append(form_img_container);

    const form_data_container = document.createElement("section");
    form_data_container.setAttribute("class", "form-data-container");

    //Name field
    const form_data_name_container = document.createElement("div");
    form_data_name_container.setAttribute("class", "form-data");

    const form_data_name_label = document.createElement("label");
    form_data_name_label.setAttribute("for", "_name");
    form_data_name_label.innerText = "Nombre del producto: ";
    
    const form_data_name_input = document.createElement("input");
    form_data_name_input.setAttribute("id", "_name");
    form_data_name_input.setAttribute("name", "name");
    form_data_name_input.setAttribute("class", "form-input-field-normal input-pad");

    
    form_data_name_container.append(form_data_name_label);
    form_data_name_container.append(form_data_name_input);
    form_data_container.append(form_data_name_container);

    //Description field
    const form_data_description_container = document.createElement("div");
    form_data_description_container.setAttribute("class", "form-data");

    const form_data_description_label = document.createElement("label");
    form_data_description_label.setAttribute("for", "_description");
    form_data_description_label.innerText = "Descripcion: ";
    
    const form_data_description_input = document.createElement("textarea");
    form_data_description_input.setAttribute("id", "_description");
    form_data_description_input.setAttribute("name", "description");
    form_data_description_input.setAttribute("type", "text");
    form_data_description_input.setAttribute("class", "form-input-field-big input-pad");

    
    form_data_description_container.append(form_data_description_label);
    form_data_description_container.append(form_data_description_input);
    form_data_container.append(form_data_description_container);

    //Price field
    const form_data_price_container = document.createElement("div");
    form_data_price_container.setAttribute("class", "form-data");

    const form_data_price_label = document.createElement("label");
    form_data_price_label.setAttribute("for", "_price");
    form_data_price_label.innerText = "Precio: ";
    
    const form_data_price_input = document.createElement("input");
    form_data_price_input.setAttribute("id", "_price");
    form_data_price_input.setAttribute("name", "price");
    form_data_price_input.setAttribute("type", "number");
    form_data_price_input.setAttribute("class", "form-input-field-normal form-input-field-price input-pad");

    
    form_data_price_container.append(form_data_price_label);
    form_data_price_container.append(form_data_price_input);
    form_data_container.append(form_data_price_container);

    form_container.append(form_data_container);

    //Actions(confirm editing, adding)
    const form_actions_container = document.createElement("section");
    form_actions_container.setAttribute("class", "form-actions-container");

    const submit_button = document.createElement("button");
    submit_button.setAttribute("class", "custom-file-upload img-upload-submit form-submit");
    submit_button.innerText = "ENVIAR";

    submit_button.addEventListener("click", function(event)
    {
        event.preventDefault()
        console.log("Recibido");
    })
    form_actions_container.append(submit_button);
    form_container.append(form_actions_container);


    container.append(form_container);
}