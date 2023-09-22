
/*
2 x Login Account:
mail: test@test.de    pw: test
mail: test@test2.de   pw: test2
*/

let isChecked = false;

const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

if(msg) {
    msgbox.innerHTML = msg;
}else{
    //display none auf message id
}

let users = [];


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
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    loadUsers();
    let user = users.find(u => u.email == email && u.password == password);
    
    if(user){
        window.location.href = `http://127.0.0.1:5500/html-sub/summary.html;`

    }
    else{
        //messagebox anzeigen lassen
        document.getElementById('decoLoginPassword').classList.remove('changeBorderBlack')
        document.getElementById('decoLoginPassword').classList.add('changeBorderRed')
        
        document.getElementById('LoginMsgBox').classList.remove('dNone');
        document.getElementById('LoginMsgBox').innerHTML = /*html*/`
            <span>Wrong passsword Ups! Try again.</span>  
        `;
    };
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


function guestLogin(){
    window.location.href = 'http://127.0.0.1:5500/html-sub/summary.html';
}


function changeBorderOnFocus(id){
    let identifiers = ['loginEmail', 'loginPassword'];
    let decorations = ['decoLoginName', 'decoLoginPassword'];
    document.getElementById('LoginMsgBox').classList.add('dNone');
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            document.getElementById(`${decorations[index]}`).classList.add('changeBorderBlue');
            document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
            showLock();
        }
        else{
            document.getElementById(`${decorations[index]}`).classList.remove('changeBorderBlue');
            document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
            showLock();
        } 
    }
}

function showLock(){
    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';

    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';
}



//change visibility of lock-symbol in signup-form
function passwordVisibilityLock(id){
    let identifiers = ['passwordLock', 'passwordVisibilityOff', 'passwordVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            if(index == 0){
                //only  works the first time "passwordLock" is hit TODO reveal lock with another function...
                document.getElementById('passwordLock').classList.add('dNone');
                document.getElementById('passwordVisibilityOff').classList.remove('dNone');
                document.getElementById('passwordVisibility').classList.add('dNone');
            }
            else if(index == 1){
                //Password is covered
                document.getElementById('passwordLock').classList.add('dNone');
                document.getElementById('passwordVisibilityOff').classList.add('dNone');
                document.getElementById('passwordVisibility').classList.remove('dNone');
                
                document.getElementById('loginPassword').type = 'text';
                
            }else{
                //Password is visible
                document.getElementById('passwordLock').classList.add('dNone');
                document.getElementById('passwordVisibilityOff').classList.remove('dNone');
                document.getElementById('passwordVisibility').classList.add('dNone');
                
                document.getElementById('loginPassword').type = 'password';
            }
        }
    }
}