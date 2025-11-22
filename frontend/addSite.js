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


/**
{
  "name": "test2",
  "url": "sample",
  "user": "test",
  "password": "test",
  "description": "test"
}
 */