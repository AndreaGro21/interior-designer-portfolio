import { login } from "./api.js";

async function openAdminTools(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dataLogin = {
        email: email,
        password: password
    }
    const response = await login(dataLogin).catch((error) => {
        alert(error.message)
    })
    sessionStorage.setItem("accessToken", response.token)
  //  window.location.href = window.location.origin + '/index.html';
  window.location.href =  './index.html';
    //window.location = './index.html';
}


document.getElementById("log-in-form").addEventListener('submit', openAdminTools)








