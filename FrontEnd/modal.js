//TODO: 
//be sure only one modal in the code source
//call function 1 time each time modal is open
//click outside of the modal for close
//made trash button active
//save and add to the dom the modification

//QUESTION:

// must use assistent tecnology?



document.getElementById("area-admin").addEventListener('click', function () {
    var openModalBtn = document.getElementById('my-modal')
    openModalBtn.style.display = 'block';

    if (openModalBtn.style.display === 'block') {
        async function recallWorks() { //what i can do for call it just one time?
            const responseModal = await fetch('http://localhost:5678/api/works/')
            const jsonDataCatModal = await responseModal.json();
            //if statement for say that modal its alrady been open?
            jsonDataCatModal.forEach(arrayJsonMod => {
                const showAllPhoto = document.getElementById('gallery-edit')
                const imgFigureMod = document.createElement('figure')
                imgFigureMod.classList.add("figure-modal")
                const trashBtn = document.createElement('div')
                trashBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
                trashBtn.classList.add("trash-btn")
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


            //addeventl per il bottone creato dinamicamente (trash)
            //do un id per cancellarlo e reinvio la richiesta ,
            //o sopprimo il dom dell'id o richiamo recallWarks con le info aggiornate

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