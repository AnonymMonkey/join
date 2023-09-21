let isChecked = false;

const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

if(msg) {
    msgbox.innerHTML = msg;
}else{
    //display none auf message id
}


let users = [];

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function registerUser(){

    let name = document.getElementById('signupName').value;
    let surname = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let confirmation = document.getElementById('signupConfirmation').value;

    if(password == confirmation){
        await loadUsers()
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password,
        });
        await setItem('users', JSON.stringify(users));
        window.location.href = 'http://127.0.0.1:5500/index.html?userregistered';
    }
    else{
        alert("password does not match confirmation")
    }
}


function changeCheckbox(){
    if(isChecked){
        document.getElementById('signupCheckboxUnchecked').classList.remove('dNone');
        document.getElementById('signupCheckboxChecked').classList.add('dNone');

        document.getElementById('signupFakeSubmit').classList.remove('dNone');
        document.getElementById('signupSubmit').classList.add('dNone');

        isChecked = false;
    }
    else{
        document.getElementById('signupCheckboxUnchecked').classList.add('dNone');
        document.getElementById('signupCheckboxChecked').classList.remove('dNone');
        
        document.getElementById('signupFakeSubmit').classList.add('dNone');
        document.getElementById('signupSubmit').classList.remove('dNone');

        isChecked = true;
    }
}

function openLogin(){
    window.location.href = 'http://127.0.0.1:5500/index.html';
}