class API {
    constructor(URL, method) {
        this.URL = URL
        this.method = method
        this.headers =  {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    doPost(body){
        fetch(this.URL,{
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
        .then(res =>{
            return res
        }) 
    }
    async doGet(){
        return fetch(this.URL)
        .then(res=>res.json())
        .then(res => res)

    }
    
    doDelete(){
        fetch(this.URL, {
        method: this.method,
        headers: this.headers})
    }
}


async function getCategories() {
    let tableCategories = document.getElementsByClassName("table__categories")[0]
    tableCategories.innerHTML = `
                <tr>
                    <th>Categories</th>
                </tr>`
    
            let api = new API("http://localhost:3000/categories","GET")
            let resultados = await api.doGet()
            console.log(resultados);
            
            for(let i = 0; i < resultados.length; i++) {
                
                const element = resultados[i];
                // console.log(element);
                if (element.name != null){
                    let tableRow = document.createElement("tr")
                    let tableDataCategory = document.createElement("td")
                    tableDataCategory.innerText = element.name
                    tableDataCategory.onclick = () => getSites(element.id) 
                    tableRow.appendChild(tableDataCategory)
                    let tableDataIcon = document.createElement("td")
                    tableDataIcon.innerText = String.fromCodePoint(element.icon)
                    
                    tableRow.appendChild(tableDataIcon)
                    let tableDataAction = document.createElement("td")
                    tableDataAction.innerText = "❌"
                    tableDataAction.onclick = () => deleteCategory(element.id)
                    tableRow.appendChild(tableDataAction)
                    tableCategories.appendChild(tableRow)
                    // console.log(element);
                }
            }
}

async function getSites(id) {
    let tableSites = document.getElementsByClassName("table__sites")[0]
    tableSites.innerHTML = `
                <tr>
                    <th>Sitio</th>
                    <th>User</th>
                    <th>Created at</th>
                    <th>Actions</th>
                </tr>`

    // console.log(tableSites);
    let api = new API("http://localhost:3000/sites",'GET')
    let res = await api.doGet()
    
            
            for(let i = 0; i < res.length; i++) {
                const element = res[i];
                if(element.categoryId ==id){
                    // console.log(element)
                    let tableRow = document.createElement("tr")
                    let tableDataName = document.createElement("td")
                    tableDataName.innerText = element.name
                    tableRow.appendChild(tableDataName)
                    let tableDataUser = document.createElement("td")
                    tableDataUser.innerText = element.user
                    tableRow.appendChild(tableDataUser)
                    let tableDataCreated = document.createElement("td")
                    tableDataCreated.innerText = element.createdAt
                    tableRow.appendChild(tableDataCreated)
                    let tableDataActions = document.createElement("td")
                    tableDataActions.innerText = "📂 ❌ 🖋️"
                    tableRow.appendChild(tableDataActions)
                    tableSites.appendChild(tableRow)
                }
            }

        
    let direccion = document.getElementById("addSite")
    direccion.href = `./addSite.html?category=${id}`
}

async function postCategories(){
    let categoria = document.getElementById("new__category")

    const objetoBody = { name: categoria.value }
    let api = new API('http://localhost:3000/categories','POST')
    await api.doPost(objetoBody)
    
    console.log(data);

    await getCategories()
}

async function deleteCategory(id) {
    let api = new API('http://localhost:3000/categories/'+id,'DELETE')
    await api.doDelete()
    
    await getCategories(1)
}

function filtrar(){
    //primero filtramos por categorias
    let tablaCategoryData = document.querySelectorAll(".table__categories tr")
    //para quitarnos el primero
    let cabecera = false
    tablaCategoryData.forEach(element => {
        //Que no sea una X ni el primero
        if(element.value !== "❌" && cabecera){
            if( !element.innerHTML.includes(filtro.value)){
                element.style.display = "none"
            }else{
                element.style.display = null
            }
        }else{
            cabecera = true
        }
    })
    //Ahora filtramos por paginas
    let tablaSitesData = document.querySelectorAll(".table__sites tr")
    //Vamos a quitarnos el primer
    let primero = false
    tablaSitesData.forEach(element => {
        if(element.value !== "❌" && primero){
            if( !element.innerHTML.includes(filtro.value)){
                element.style.display = "none"
            }else{
                element.style.display = null
            }
        }else{
            primero = true
        }
    })
    
}

getCategories()
getSites(1)


