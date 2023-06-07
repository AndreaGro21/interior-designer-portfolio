//call 1 time the function 


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
                    const imgFigureModCall = document.querySelector("figure")
                    imgFigureModCall.setAttribute("data-id", 1)
                    let token = sessionStorage.getItem('reponseLogin')
                    token = JSON.parse(token)
                    console.log(token.userId)
                    async function remuoveEleFromDom(elementId) {
                        const url = `http://localhost:5678/api/works/1`;
                        try {
                            const response = await fetch(url, {
                                method: 'DELETE',
                                headers: {
                                    Accept: "*/*",
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ id: elementId })
                            });
                        } catch (error) {
                            console.error('Error:', error);
                        }
                        imgFigureModCall.remove()
                    }
                    remuoveEleFromDom()
                    console.log(jsonDataCatModal)

                })
            })
            /*   
             {
              
                  let reponseForCancell = await fetch('http://localhost:5678/api/works/${Id}', {
                      method: 'delete',
                      headers: {
                          Authorization: `accept: ${token}`,
                          'Content-Type': "application/json"
                      },
                      body: JSON.parse(token.userId)
                  })
                let workEle = target.closest('.figure-modal')
                  if (token.userId === 1 && reponseForCancell.status === 400) {
                  workEle.remove()
                      
                      
                  }
              } */


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
            !event.target.closest('.modal')
        ) {
            closeModal()
        }
    },
    false
)

function closeModal() {
    document.querySelector("#my-modal").style.display = "none"
}


//IDEE:
//per aggiungere una foto dovro fare un push 
//sull array dato dall api
//per togilere un elemento dovro contrare a quale img sono e sopprimere quella
