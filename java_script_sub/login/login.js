let isChecked = false;

const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

if(msg) {
    msgbox.innerHTML = msg;
}else{
    //display none auf message id
}

let users = [
    {
        'name': 'simon',
        'email': 'simon.w2@gmx.net',
        'password': 'test123',
        'confirmation': 'test123',
    }
];


function changeCheckbox(){
    if(isChecked){
        document.getElementById('loginCheckboxUnchecked').classList.remove('dNone');
        document.getElementById('loginCheckboxChecked').classList.add('dNone');
        isChecked = false;
    }
    else{
        document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
        document.getElementById('loginCheckboxChecked').classList.remove('dNone');
        isChecked = true;
    }
}

function openSignUp(){
    window.location.href = 'http://127.0.0.1:5500/html-sub/sign_up.html';
}


function login(){
    let email = document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value
    
    let user = users.find(u => u.email == email && u.password == password)
    
    if(user){
        window.location.href = 'http://127.0.0.1:5500/html-sub/summary.html';

    }
    else{
        //messagebox anzeigen lassen
        alert("Kein user gefunden")
    }
}

function guestLogin(){
    window.location.href = 'http://127.0.0.1:5500/html-sub/summary.html';
}