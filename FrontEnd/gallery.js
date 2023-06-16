import { savedWorks } from './works.js';

const imgContainer = document.querySelector('#gallery')
const formEle = document.getElementById("modal2")
const formEleModal2 = document.getElementById("my-modal-upload")
const openModalBtn = document.getElementById('my-modal')
const galleryModal = document.getElementById('gallery-edit')
let preview = document.getElementById("preview")
//api request all works

async function requestWorks() {
    const response = await fetch('http://localhost:5678/api/works/');
    const worksJson = await response.json();
    savedWorks.setWorks(worksJson);
    createWorksHtml(worksJson);

}
//api request for category
async function btnCategoryRequest() {
    try {
        const response = await fetch('http://localhost:5678/api/categories/');
        const responseJsonCategory = await response.json();
        responseJsonCategory.unshift({ id: 0, name: 'Tous' });
        let createButtonCategory = responseJsonCategory.map(indexCategory => {
            return `<button class=filterbtn data-id=${indexCategory.id}>${indexCategory.name}</button>`;
        });
        let sectionOptionCat = responseJsonCategory.map(indexCategory => {
            if (indexCategory.id === 0) {
                return `<option value=${indexCategory.id}></option>`
            } else {
                return `<option value=${indexCategory.id}> ${indexCategory.name}</option>`;
            }
        });
        document.querySelector("#filter").innerHTML = createButtonCategory.join('');
        document.querySelector("select").innerHTML = JSON.stringify(sectionOptionCat.join(''));
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
                imgContainer.innerHTML = '';
                let callAllWorks = savedWorks.getWorks()
                createWorksHtml(callAllWorks)
            } else {
                const filterImg = savedWorks.getWorks().filter(savedwork => savedwork.category.id === categoryId);
                imgContainer.innerHTML = '';
                createWorksHtml(filterImg);
            }
        });
    });
}
await init()
//create the gallery
function createWorksHtml(allWorks) {
    allWorks.forEach(arrayJson => {
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
//function for nav admin
function adminOpenerByToken() {
    let token = sessionStorage.getItem("accessToken")
    if (token !== null) {
        document.getElementById("admin-barr").classList.remove("admin-barr_controller");
        document.getElementById("login-logout").textContent = "logout";
    }
    else {
        document.getElementById("admin-barr").classList.add("admin-barr_controller");

    }
    /* if(token && gigi.classList.contains("admin-barr_controller") ){
        alert("you're alredy logged")
    } */
}
adminOpenerByToken()




let elementsShow = false;
//OPEN MODAL1 
document.getElementById("area-admin").addEventListener('click', recallWorks)
async function recallWorks() {
    openModalBtn.style.display = 'block';
    if (!elementsShow) {
        const responseModal = await fetch('http://localhost:5678/api/works/')
        const jsonDataCatModal = await responseModal.json();
        jsonDataCatModal.forEach(arrayJsonMod => {
            const showAllPhoto = document.getElementById('gallery-edit')
            const imgFigureMod = document.createElement('figure')
            imgFigureMod.id = arrayJsonMod.id
            imgFigureMod.classList.add("figure-modal")
            const trashBtn = document.createElement('div')
            trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
            trashBtn.classList.add("trash-btn")
            trashBtn.setAttribute("id", "trash-btn_id")
            const arrowBtn = document.createElement('div')
            arrowBtn.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`
            arrowBtn.classList.add("arrow-btn")
            const imgElementMod = document.createElement('img')
            const titleEdit = document.createElement("p")
            titleEdit.textContent = "éditer"
            imgElementMod.src = arrayJsonMod.imageUrl
            showAllPhoto.appendChild(imgFigureMod)
            imgFigureMod.appendChild(imgElementMod)
            imgFigureMod.appendChild(titleEdit)
            imgFigureMod.appendChild(trashBtn)
            imgFigureMod.appendChild(arrowBtn)
            elementsShow = true;
        })
        //API DELETE ON TRASH BTN
        document.querySelectorAll(".trash-btn").forEach(trash => {
            trash.addEventListener("click", async function () {
                const imgFigureModCall = trash.closest("figure")
                let idNum = imgFigureModCall.id
                let token = sessionStorage.getItem("accessToken")
                try {
                    const response = await fetch(`http://localhost:5678/api/works/${idNum}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                    });
                    if (response.ok) {
                        imgFigureModCall.remove()
                        imgContainer.innerHTML = '';

                        await requestWorks() //QUI RISCRIVO NELLA GALLERY


                    } else {
                        const errorMessage = `${response.status} - ${response.statusText}`
                        throw new Error(errorMessage)
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            })
        })


    }
}




//close modal2
document.getElementById("js-add-photo").addEventListener("click", function () {
    formEleModal2.style.display = 'block';
    openModalBtn.style.display = 'none';
    if (formEleModal2.style.display = 'block') {
        document.querySelector('.close-btn-modal2').addEventListener("click", async function () {
            formEleModal2.style.display = 'none'
            elementsShow = false;
            galleryModal.innerHTML = '';
            await recallWorks()
        })
        document.getElementById("arrow-modal").addEventListener("click", async function () {
            formEleModal2.style.display = 'none';
            elementsShow = false;
            galleryModal.innerHTML = '';
            await recallWorks()


        })
    }

})


document.querySelector('.close-btn').addEventListener("click", function (event) {
    if (
        event.target.matches('.close-btn') ||
        !event.target.closest('.modal')
    ) {
        openModalBtn.style.display = 'none';
        imgContainer.innerHTML = '';

    }

    async function callToChange() {
        const responseModal = await fetch('http://localhost:5678/api/works/')
        const jsonDataCatModal = await responseModal.json();
        jsonDataCatModal.forEach(arrayJson => {
            const imgFigure = document.createElement('figure');
            const imgElement = document.createElement('img');
            const titleImg = document.createElement("p")
            titleImg.textContent = arrayJson.title;
            imgElement.src = arrayJson.imageUrl;
            imgContainer.appendChild(imgFigure);
            imgFigure.appendChild(imgElement);
            imgFigure.appendChild(titleImg);
        })
    }
    callToChange()
}
)

//send new dataImg
formEle.addEventListener("submit", a => {
    a.preventDefault();
    const dataForm = new FormData();
    let image = document.getElementById("image").files[0]
    let title = document.getElementById("title").value
    let category = document.querySelector("#category").value
    dataForm.append("image", image)
    dataForm.append("title", title)
    dataForm.append("category", category)
    let token = sessionStorage.getItem("accessToken")
    async function sendImg() {
        try {
            let reponse = await fetch("http://localhost:5678/api/works/", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: dataForm
            });
            if (reponse.ok) {

                imgContainer.innerHTML = '';
                galleryModal.innerHTML = '';
                await requestWorks()
                await recallWorks()
            
            } else {
                const errorMessage = alert("something went wrong")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    sendImg()
})

const prevImg = document.getElementById("prev-img")
const image = document.getElementById("image")
const remuveIcone = document.getElementById("preview")
image.onchange = Event => {
    const [file] = image.files
    if (file) {
        prevImg.style.display = "block";
        remuveIcone.style.display = "none";
      prevImg.src = URL.createObjectURL(file)
    }
  }