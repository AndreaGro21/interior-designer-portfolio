import { requestWorks, requestCategories, deleteWork, importNewWork } from './api.js';
import { savedWorks } from './works.js';

const imgContainer = document.querySelector('#gallery')
const formEle = document.getElementById("modal2")
const formEleModal2 = document.getElementById("my-modal-upload")
const openModalBtn = document.getElementById('my-modal')
const galleryModal = document.getElementById('gallery-edit')
const activeBtnSub = document.getElementById("btn-submit")
const prevImg = document.getElementById("prev-img")
const image = document.getElementById("image")
const remuveIcone = document.getElementById("preview")
const shadowModal = document.getElementById("overlay")
const shadowModal2 = document.getElementById("overlay2")
const editImg = document.getElementById("edit-img")
const editTitle = document.getElementById("edit-title")
const editTitleGallery = document.getElementById("edit-title-gallery")

//create the gallery
function showGallery(callAllWorks) {
    callAllWorks.forEach(arrayJson => {
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

//api request for category
async function addBtnsCategorys() {
    try {
        const responseJsonCategory = await requestCategories()
        let createButtonCategory = responseJsonCategory.map(indexCategory => {
            return `<button class=filterbtn data-id=${indexCategory.id}>${indexCategory.name}</button>`;
        });
        let sectionOptionCat = responseJsonCategory.map(indexCategory => {
            if (indexCategory.id === 0) {
                return `<option value=''></option>`
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
    await requestWorks()
    await addBtnsCategorys()
    showGallery(savedWorks.getWorks())
    //add filters to btnCategorys
    document.querySelectorAll('.filterbtn').forEach(categoryButton => {
        categoryButton.addEventListener('click', function () {
            const categoryId = Number(categoryButton.getAttribute('data-id'));
            if (categoryId === 0) {
                imgContainer.innerHTML = '';
                showGallery(savedWorks.getWorks())
            } else {
                const filterImg = savedWorks.getWorks().filter(savedwork => savedwork.category.id === categoryId);
                imgContainer.innerHTML = '';
                showGallery(filterImg);
            }
        });
    });
}
await init()
//function for nav admin
function adminOpenerByToken() {
    const token = sessionStorage.getItem("accessToken")
    if (token !== null) {
        document.getElementById("admin-barr").classList.remove("admin-barr_controller");
        document.getElementById("login-logout").textContent = "logout";
        editImg.style.display = "block";
        editTitle.style.display = "block";
        editTitleGallery.style.display = "inline";
    }
    else {
        document.getElementById("admin-barr").classList.add("admin-barr_controller");
    }
}
adminOpenerByToken()

let elementsShow = false;
//OPEN MODAL1 
document.getElementById("area-admin").addEventListener('click', openModal)
async function openModal() {
    openModalBtn.style.display = 'block';
    shadowModal.style.display = 'flex';
    shadowModal2.style.display = 'none';
    if (!elementsShow) {
        const jsonDataCatModal = await requestWorks();
        jsonDataCatModal.forEach(arrayJsonMod => {
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
            galleryModal.appendChild(imgFigureMod)
            imgFigureMod.appendChild(imgElementMod)
            imgFigureMod.appendChild(titleEdit)
            imgFigureMod.appendChild(trashBtn)
            imgFigureMod.appendChild(arrowBtn)
            elementsShow = true;
        })
        //DELETE for TRASH BTN
        document.querySelectorAll(".trash-btn").forEach(trash => {
            trash.addEventListener("click", async function () {
                const imgFigureModCall = trash.closest("figure")
                let idNum = imgFigureModCall.id
                await deleteWork(idNum).catch((error) => {
                    alert(error.message)
                })
                imgFigureModCall.remove()
                imgContainer.innerHTML = '';
                showGallery(savedWorks.getWorks())
            })
        })
    }
}
//OPEN MODAL 2
document.getElementById("js-add-photo").addEventListener("click", function () {
    formEleModal2.style.display = 'block';
    openModalBtn.style.display = 'none';
    shadowModal.style.display = 'none';
    shadowModal2.style.display = 'flex';
    //CLOSE MODAL2 || RETURN TO MODAL1
    if (formEleModal2.style.display = 'block'){
        document.querySelector('.close-btn-modal2').addEventListener("click", async function () {
            formEleModal2.style.display = 'none';
            shadowModal2.style.display = 'none';
            shadowModal.style.display = 'none';
            elementsShow = false;
            galleryModal.innerHTML = '';
            await openModal()
        })
        document.getElementById("arrow-modal").addEventListener("click", async function () {
            formEleModal2.style.display = 'none';
            shadowModal2.style.display = 'none';
            shadowModal.style.display = 'none';
            prevImg.style.display = "none";
            remuveIcone.style.display = "none";
            elementsShow = false;
            galleryModal.innerHTML = '';
            await openModal()
        })
    }
})
shadowModal.addEventListener("click", closeModals)
function closeModals(event) {
    if (
        event.target.matches('.close-btn') ||
        event.target.matches('#overlay')
    ) {
        openModalBtn.style.display = 'none';
        shadowModal.style.display = 'none';
        imgContainer.innerHTML = '';
        showGallery(savedWorks.getWorks());
    }
}
//send new dataImg
formEle.addEventListener("submit",async a => {
    a.preventDefault();
    const dataForm = new FormData();
    let image = document.getElementById("image").files[0]
    let title = document.getElementById("title").value
    let category = document.querySelector("#category").value
    dataForm.append("image", image)
    dataForm.append("title", title)
    dataForm.append("category", category)
    await importNewWork(dataForm)
    
    showGallery(savedWorks.getWorks());
   
})
//PREVIEW IMG IN MODAL2
image.onchange = () => {
    const [file] = image.files
    if (file) {
        prevImg.style.display = "block";
        remuveIcone.style.display = "none";
        prevImg.src = URL.createObjectURL(file)
        activeBtnSub.style.background = "#1D6154"
    }
}