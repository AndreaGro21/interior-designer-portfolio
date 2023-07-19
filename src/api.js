import { savedWorks } from "./works.js";

const API_URL = 'http://localhost:5678/api'
const token = sessionStorage.getItem("accessToken")
const imgContainer = document.querySelector('#gallery')
const galleryModal = document.getElementById('gallery-edit')

export async function login(dataLogin) {
    return fetch(`${API_URL}/users/login`, {
        method: 'post',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(dataLogin)
    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error("Email or password incorrect"));
        }
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
        return Promise.reject(new Error(error));
    })
}

export async function requestWorks({ forceApi } = { forceApi: false }) {
    if (!forceApi && savedWorks.getWorks()) {
        return savedWorks.getWorks()
    }
    const response = await fetch(`${API_URL}/works`);
    const worksJson = await response.json();
    savedWorks.setWorks(worksJson);
    return worksJson;
}

export async function requestCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) {
            return Promise.reject(new Error('Impossible de récupérer la liste des catégories'))
        }

        const responseJsonCategory = await response.json();
        responseJsonCategory.unshift({ id: 0, name: 'Tous' });
        return responseJsonCategory;
    }
    catch (error) {
        console.error('Error:', error);
        return Promise.reject(new Error(error))
    }
}

export async function deleteWork(workId) {
    
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const errorMessage = `${response.status} - ${response.statusText}`
            throw new Error(errorMessage)
        }
        await requestWorks({ forceApi: true })
    } catch (error) {
        console.error('Error:', error);
        return Promise.reject(new Error(error))
    }
}

export async function importNewWork (dataForm){
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
            await requestWorks({ forceApi: true })
        } 
    }
        catch (error) {
            console.error('Error:', error);
            return Promise.reject(new Error(error))
        }

}
