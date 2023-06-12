
document.getElementById("area-admin").addEventListener('click', function () {
    var openModalBtn = document.getElementById('my-modal')
    openModalBtn.style.display = 'block';
    if (openModalBtn.style.display === 'block') {
        async function recallWorks() {
            const responseModal = await fetch('http://localhost:5678/api/works/')
            const jsonDataCatModal = await responseModal.json();
            console.log(jsonDataCatModal)
            jsonDataCatModal.forEach(arrayJsonMod => {
                const showAllPhoto = document.getElementById('gallery-edit')
                const imgFigureMod = document.createElement('figure')
                imgFigureMod.id = arrayJsonMod.id
                console.log(imgFigureMod)
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

            })
            document.querySelectorAll(".trash-btn").forEach(trash => {
                trash.addEventListener("click", async function () {
                    const imgFigureModCall = trash.closest("figure")
                    let idNum = imgFigureModCall.id
                    console.log(idNum)
                    let token = sessionStorage.getItem('reponseLogin')
                    token = JSON.parse(token)
                    let getToken = token.token
                    try {
                        const response = await fetch(`http://localhost:5678/api/works/${idNum}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${getToken}`
                            },
                        });
                        if (response.ok) {
                            imgFigureModCall.remove()
                        } else {
                            const errorMessage = `${response.status} - ${response.statusText}`
                            throw new Error(errorMessage)
                        }

                    } catch (error) {
                        console.error('Error:', error);
                    }


                    console.log(jsonDataCatModal)
                })

            })
        }
        recallWorks()
    }
})




document.getElementById('close-btn').addEventListener('click', function () {
    console.log("cazzimma")
    var openModalBtn = document.getElementById('my-modal');
    openModalBtn.style.display = 'none';
})
document.getElementById('close-btn').addEventListener(
    "click",
    function (event) {
        // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
        if (
            event.target.matches('close-btn') ||
            !event.target.closest('modal')
        ) {
            closeModal()
        }
        const imgContainer = document.querySelector('#gallery');
        imgContainer.innerHTML = '';
        getworks()
    }
  
)

function closeModal() {
    document.querySelector("#my-modal").style.display = "none"
}



document.getElementById("js-add-photo").addEventListener("click", function () {


}

)



function addImg() {
    const formEle = document.querySelector("#modal2")
    formEle.addEventListener("submit", a => {
        a.preventDefault();
        const dataForm = new FormData(formEle);
        const data = Object.fromEntries(dataForm);

        const imgLoader = document.querySelector("#image")
        const imgFile = imgLoader.files[0];
        data.image = imgFile
        const postNewImg = {
            "id": '',
            "title": data.titre,
            "imageUrl": data.image,
            "categoryId": data.category,
            "userId": 0
        }
    })


}