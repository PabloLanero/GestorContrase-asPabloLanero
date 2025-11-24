

async function addSite(){

    let idCategoria = new URLSearchParams(window.location.search).get("category");
    
    let nombre = document.getElementById("nombre")
    let usuario = document.getElementById("usuario")
    let password = document.getElementById("password")
    let url = document.getElementById("url")
    let descripcion = document.getElementById("description")

    let site = {
        name: nombre.value,
        url: url.value,
        user: usuario.value,
        password: password.value,
        description: descripcion.value
    }

    
    fetch(`http://localhost:3000/categories/${idCategoria}`, {
        method:"POST",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
        body: JSON.stringify(site)
    })
    
    
}


function CreatePassword(){
    let passwordField = document.getElementById("password")
    passwordField.value = ""
    for (let i = 0; i < 9; i++) {
        let charValue = 0
        do {
            charValue = Math.random()*126
        } while (charValue <32);
        passwordField.value += String.fromCharCode(charValue)
    }
    IsOk(passwordField)
}

function IsOk(e){
    
    
    console.log(e);
    console.log(e.target);
    e.style.background = null
    if(e.value ===""){
        e.style.background = "red"
    }
    if(e.id ==="password" && e.value.length <8){
        e.placeholder = "La contraseña debe ser de mas de 8 caracteres"
    }
    if(e.id ==="url" && !(e.value.includes("http"))){
        e.placeholder = "Tiene que ser una url"
    }

}


/**
{
  "name": "test2",
  "url": "sample",
  "user": "test",
  "password": "test",
  "description": "test"
}
 */