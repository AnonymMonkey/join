let isChecked = false;

let users = [
    {
        'name': 'simon',
        'email': 'simon.w2@gmx.net',
        'password': 'test123',
        'confirmation': 'test123',
    }
];

function addUser(){

    let name = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let confirmation = document.getElementById('signupConfirmation').value;

    

    if(password == confirmation){
        users.push({name: name, email: email, password: password, confirmation: confirmation})
        //window.location.href = 'http://127.0.0.1:5500/index.html';
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