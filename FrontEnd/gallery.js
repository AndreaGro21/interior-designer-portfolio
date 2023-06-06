import { savedWorks } from './works.js';


async function requestWorks() {
    const response = await fetch('http://localhost:5678/api/works/');
    const jsonData = await response.json();
    savedWorks.setWorks(jsonData);
    createWorksHtml(jsonData);
}
async function btnCategoryRequest() {
    try {
        const response = await fetch('http://localhost:5678/api/categories/');
        const responseJsonCategory = await response.json();
        responseJsonCategory.unshift({ id: 0, name: 'Tous' });
        var createButtonCategory = responseJsonCategory.map(indexCategory => {
            return `<button class=filterbtn data-id=${indexCategory.id}>${indexCategory.name}</button>`;
        });
        document.querySelector("#filter").innerHTML = createButtonCategory.join('');
    }
    catch (error) {
        console.error(error);
    }
}
async function init() {
    await requestWorks()  //vorrei piu spiegazioni su questi 2 e del motivo per cui sono richiamati solo qui
    await btnCategoryRequest()
   
    document.querySelectorAll('.filterbtn').forEach(categoryButton => {
        categoryButton.addEventListener('click', function () {
            const categoryId = Number(categoryButton.getAttribute('data-id'));
            if (categoryId === 0) {
                const imgContainer = document.querySelector('#gallery');
                imgContainer.innerHTML = '';
                const allWorks = savedWorks.getWorks()
                createWorksHtml(allWorks)
            } else {
                const filterImg = savedWorks.getWorks().filter(savedwork => savedwork.category.id === categoryId);
                const imgContainer = document.querySelector('#gallery');
                imgContainer.innerHTML = '';
                createWorksHtml(filterImg);
            }
        });
    });
}
await init()







function createWorksHtml(jsonDataRequest) {
    jsonDataRequest.forEach(arrayJson => {
        const imgContainer = document.querySelector("#gallery");
        const imgFigure = document.createElement('figure');
        const imgElement = document.createElement('img');
        const titleImg = document.createElement("p")
        titleImg.textContent = arrayJson.title;
        imgElement.src = arrayJson.imageUrl;
        imgContainer.appendChild(imgFigure);
        imgFigure.appendChild(imgElement);
        imgFigure.appendChild(titleImg);
    });
}



//funzione recupera item e se presente apri barra admin
// il problema è che è sempre stoccao nel local storage
function  adminOpenerByToken (){
 let token = sessionStorage.getItem('reponseLogin')
token = JSON.parse(token)
 console.log(token)
if (token !== null ){
    document.getElementById("admin-barr").classList.remove("cazzo");

    }
else{
   
    document.getElementById("admin-barr").classList.add("cazzo");
    
}
}
 adminOpenerByToken ()