


function buttons_categorie(category_list){
    const categorie = document.getElementById("category")  
  

    for(let index = 0; index < category_list.length; index++){
        const element_list = document.createElement("li");
        elemento_lista.innerHTML = `
    
        <button class="menu-categorie button-categorie" id="${category_list[index].id}"</button>  
   
     `  
        categorie.append(element_list);
    
        const botonescategoria = document.querySelectorAll(".button-categorie");
        botonescategoria.forEach(boton => {
        boton.addEventListener("click", (e) => {

        botonescategoria.forEach(boton => boton.classList.remove("active"))

        e.currentTarget.classList.add("active");
        } )

    })
    
    }
}


//-----------------------Funcion para los errores ----------------------------------------------------------------

function handle_error(){
    return "error";
}

//----------------------------------------------------------------------------------------------------------------


//-------------------------------Funciones para conectar el back---------------------------------------------------
      fetch(url_categorie)
        .then(response => response.json())
        .then(
            data => {
                category_list = data;
                buttons_categorie(category_list);
                
            }
        )
        .catch(handle_error)

//-------------------------------------------------------------------------------------




