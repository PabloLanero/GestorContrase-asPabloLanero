class API {
  /**
   * Este es el constructor de la clase, la cual solo se encarga de hacer las peticiones
   * Los headers seran siempre los mismo
   */
  constructor(URL, method) {
    this.URL = URL;
    this.method = method;
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
  /**
   * Este es el metodo para hacer el post, es el unico metodo que necesita de un parametro
   *
   */
  doPost(body) {
    fetch(this.URL, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
  /**
   * Este es el metodo para hacer un get
   * No hay problemas con los headers en esta ocasion, ya que
   * en los doGet no suele haber problemas
   *
   */
  async doGet() {
    return fetch(this.URL)
      .then((res) => res.json())
      .then((res) => res);
  }
  /**
   * Este es el metodo para hacer un delete, suele borrar en
   * funcion del parametro que se le pase en la url
   */
  doDelete() {
    fetch(this.URL, {
      method: this.method,
      headers: this.headers,
    });
  }
}
/**
 * Este metodo mostrara en la tabla todas las categorias que recoja,
 * si el nombre es nulo, no agregara la inea
 */
async function getCategories() {
  //Recogemos la tabla
  let tableCategories = document.getElementsByClassName("table__categories")[0];
  tableCategories.innerHTML = `
                <tr>
                    <th>Categories</th>
                </tr>`;
  //Llamamos los datos llamando a la API
  let api = new API("http://localhost:3000/categories", "GET");
  let resultados = await api.doGet();
  
  //Los recorremos para poder coger cada uno
  for (let i = 0; i < resultados.length; i++) {
    //Lo guardamos como una variable
    const element = resultados[i];
    //Comprobamos que esta bien
    if (element.name != null) {
      //Creamos la linea
      let tableRow = document.createElement("tr");
      //Creamos la casilla para poner el nombre
      let tableDataCategory = document.createElement("td");
      tableDataCategory.innerText = element.name;
      tableDataCategory.onclick = () => getSites(element.id);
      tableRow.appendChild(tableDataCategory);
      //Añadimos el icono de la base de datos
      let tableDataIcon = document.createElement("td");
      tableDataIcon.innerText = String.fromCodePoint(element.icon);
      tableRow.appendChild(tableDataIcon);
      //Creamos la casilla para poder borrar la categoria
      let tableDataAction = document.createElement("td");
      tableDataAction.innerText = "❌";
      tableDataAction.onclick = () => deleteCategory(element.id);
      tableRow.appendChild(tableDataAction);
      //Añadimos la tabla
      tableCategories.appendChild(tableRow);
      // console.log(element);
    }
  }
}
/**
 * Estructura similar al metodo getcategories       
 */
async function getSites(id) {
  let tableSites = document.getElementsByClassName("table__sites")[0];
  tableSites.innerHTML = `
                <tr>
                    <th>Sitio</th>
                    <th>User</th>
                    <th>Created at</th>
                    <th>Actions</th>
                </tr>`;

  // console.log(tableSites);
  let api = new API("http://localhost:3000/sites", "GET");
  let res = await api.doGet();

  for (let i = 0; i < res.length; i++) {
    const element = res[i];
    //En este caso filtramos por el id que pasamos por parametro 
    if (element.categoryId == id) {
    // console.log(element)
      let tableRow = document.createElement("tr");
      let tableDataName = document.createElement("td");
      tableDataName.innerText = element.name;
      tableRow.appendChild(tableDataName);
      let tableDataUser = document.createElement("td");
      tableDataUser.innerText = element.user;
      tableRow.appendChild(tableDataUser);
      let tableDataCreated = document.createElement("td");
      tableDataCreated.innerText = element.createdAt;
      tableRow.appendChild(tableDataCreated);
      let tableDataActions = document.createElement("td");
      tableDataActions.innerText = "📂 ❌ 🖋️";
      tableRow.appendChild(tableDataActions);
      tableSites.appendChild(tableRow);
    }
  }

  let direccion = document.getElementById("addSite");
  direccion.href = `./addSite.html?category=${id}`;
}
/**
 * Añade la categoria
 * IMPORTANTE DECLARAR LA VARIABLE ANTES DE METERLO EN EL BODY
 */
async function postCategories() {
  let categoria = document.getElementById("new__category");

  const objetoBody = { name: categoria.value };
  let api = new API("http://localhost:3000/categories", "POST");
  await api.doPost(objetoBody);

  console.log(data);

  await getCategories();
}
//Es el metodo para borrarlo, es posible que no se vea bien, es por la sincronia
//Que se adelanta el get antes de que se borre la categoria
async function deleteCategory(id) {
  let api = new API("http://localhost:3000/categories/" + id, "DELETE");
  await api.doDelete();
  
  await getCategories(1);
}

function filtrar() {
  //primero filtramos por categorias
  let tablaCategoryData = document.querySelectorAll(".table__categories tr");
  //para quitarnos el primero
  let cabecera = false;
  tablaCategoryData.forEach((element) => {
    //Que no sea una X ni el primero
    if (element.value !== "❌" && cabecera) {
      if (!element.innerHTML.includes(filtro.value)) {
        element.style.display = "none";
      } else {
        element.style.display = null;
      }
    } else {
      cabecera = true;
    }
  });
  //Ahora filtramos por paginas
  let tablaSitesData = document.querySelectorAll(".table__sites tr");
  //Vamos a quitarnos el primer
  let primero = false;
  tablaSitesData.forEach((element) => {
    if (element.value !== "❌" && primero) {
      if (!element.innerHTML.includes(filtro.value)) {
        element.style.display = "none";
      } else {
        element.style.display = null;
      }
    } else {
      primero = true;
    }
  });
}

getCategories();
getSites(1);
