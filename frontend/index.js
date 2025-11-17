async function getCategories() {
    let tableCategories = document.getElementsByClassName("table__categories")[0]
    
    await fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then((res) => {
            
            for(let i = 0; i < res.length; i++) {
                
                const element = res[i];
                // console.log(element);
                if (element.name != null){
                    let tableRow = document.createElement("tr")
                    let tableDataCategory = document.createElement("td")
                    tableDataCategory.innerText = element.name
                    tableRow.appendChild(tableDataCategory)
                    tableRow.onclick = () => getSites(element.id) 
                    tableCategories.appendChild(tableRow)
                    // console.log(element);
                }
            }
})}

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
    await fetch("http://localhost:3000/sites")
        .then(res => res.json())
        .then((res) => {
            
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
})}

async function postCategories(){
    const objetoBody = { name: 'test_category_ejemplo' }
   const res = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
    },
        body: JSON.stringify(objetoBody)
    })
    const data = await res.json()
    console.log(data);
    
    // .then(res => res.json())
    // .then(data => console.log(data))
    
     
    // console.log(content)



    // await getCategories()
        
}

// postCategories()
getCategories()
getSites(1)


/*
    let drawData = (data) => {
      data.forEach(category => {
        let parent = document.getElementsByTagName('ul')[0]
        let child = document.createElement('li')
        // child.innerText = JSON.stringify(category)
        child.innerText = category.name
        parent.appendChild(child)
      })
    }

    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => drawData(data))
      */