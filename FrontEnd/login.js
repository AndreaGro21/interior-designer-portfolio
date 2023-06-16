


async function openAdminTools(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dataLogin = {
        email: email,
        password: password
    }
    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'post',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(dataLogin)
    })
    if (!response.ok) {
        alert("Email or password incorrect");
        return
    }

    else {
        const reponseLogin = await response.json();

        sessionStorage.setItem("accessToken", reponseLogin.token)
        window.location.href = window.location.origin + '/index.html';

    }


}


document.getElementById("log-in-form").addEventListener('submit', openAdminTools)








