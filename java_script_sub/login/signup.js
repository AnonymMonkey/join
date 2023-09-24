let isChecked = false;

const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

if(msg) {
    msgbox.innerHTML = msg;
}else{
    //display none auf message id
}


let users = [];


async function registerUser(){
    let name = document.getElementById('signupName').value;
    let surname = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let confirmation = document.getElementById('signupConfirmation').value;

    if(password == confirmation){
        pushUser(name, surname, email);
        await setItem('users', JSON.stringify(users));
        window.location.href = 'http://127.0.0.1:5500/index.html?userregistered';
    }
    else{
        showMsgBoxInvalidConfirmation();
    }
}


async function pushUser(name, surname, email){
    await loadUsers();
    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password,
    });
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


function showMsgBoxInvalidConfirmation(){
    document.getElementById('decoSignupConfirmation').classList.remove('changeBorderBlack')
    document.getElementById('decoSignupConfirmation').classList.add('changeBorderRed')
    document.getElementById('signupMsgBox').classList.remove('dNone');
    document.getElementById('signupMsgBox').innerHTML = /*html*/`
        <span>Ups! your password don´t match.</span>  
    `;
}


function changeCheckbox(){
    if(isChecked){
        signupCheckboxOff()
    }
    else{
        signupCheckboxOn()
    }
}


function signupCheckboxOff(){
    document.getElementById('signupCheckboxUnchecked').classList.remove('dNone');
    document.getElementById('signupCheckboxChecked').classList.add('dNone');
    document.getElementById('signupFakeSubmit').classList.remove('dNone');
    document.getElementById('signupSubmit').classList.add('dNone');
    isChecked = false;
}


function signupCheckboxOn(){
    document.getElementById('signupCheckboxUnchecked').classList.add('dNone');
    document.getElementById('signupCheckboxChecked').classList.remove('dNone');
    document.getElementById('signupFakeSubmit').classList.add('dNone');
    document.getElementById('signupSubmit').classList.remove('dNone');
    isChecked = true;
}


function changeBorderOnFocus(id){
    let identifiers = ['signupName', 'signupEmail', 'signupPassword', 'signupConfirmation'];
    let decorations = ['decoSignupName', 'decoSignupEmail', 'decoSignupPassword', 'decoSignupConfirmation'];
    document.getElementById('signupMsgBox').classList.add('dNone');
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            signupChangeBorderToBlue(decorations, index)
        }
        else{
            sisgnupChangeBorderToStandard(decorations, index)
        } 
    }
}


function signupChangeBorderToBlue(decorations, index){
    document.getElementById(`${decorations[index]}`).classList.add('changeBorderBlue');
    document.getElementById('decoSignupConfirmation').classList.remove('changeBorderRed')
    showLock();
}


function sisgnupChangeBorderToStandard(decorations, index){
    document.getElementById(`${decorations[index]}`).classList.remove('changeBorderBlue');
    document.getElementById('decoSignupConfirmation').classList.remove('changeBorderRed')
    showLock();
}


function showLock(){
    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('signupPassword').type = 'password';

    document.getElementById('confirmationLock').classList.remove('dNone');
    document.getElementById('confirmationVisibilityOff').classList.add('dNone');
    document.getElementById('confirmationVisibility').classList.add('dNone');
    document.getElementById('signupConfirmation').type = 'password';
}


//change visibility of lock-symbol in signup-form
function passwordVisibilityLock(id){
    let identifiers = ['passwordLock', 'passwordVisibilityOff', 'passwordVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            if(index == 0){
                signupChangeLockSymbol() //check here to fix Symbol behavior-Problem
            }
            else if(index == 1){
                singupCoverPassword()
            }else{
                signupRevealPassword()
            }
        }
    }
}


function signupChangeLockSymbol(){
    //only  works the first time "passwordLock" is hit TODO reveal lock with another function...
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.remove('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
}


function singupCoverPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.remove('dNone');  
    document.getElementById('signupPassword').type = 'text';
}


function signupRevealPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.remove('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('signupPassword').type = 'password';
}


function confirmationVisibilityLock(id){
    let identifiers = ['confirmationLock', 'confirmationVisibilityOff', 'confirmationVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            if(index == 0){
                signupChangeLockSymbolConfirmation(); //check here to fix Symbol behavior-Problem
            }
            else if(index == 1){
                signupCoverConfirmation();
            }else{
                signupRevealConfirmation();
            }
        }
    }
}


function signupChangeLockSymbolConfirmation(){
    //only  works the first time "passwordLock" is hit TODO reveal lock with another function...
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.remove('dNone');
    document.getElementById('confirmationVisibility').classList.add('dNone');
}


function signupCoverConfirmation(){
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.add('dNone');
    document.getElementById('confirmationVisibility').classList.remove('dNone');
    document.getElementById('signupConfirmation').type = 'text';
}


function signupRevealConfirmation(){
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.remove('dNone');
    document.getElementById('confirmationVisibility').classList.add('dNone');
    document.getElementById('signupConfirmation').type = 'password';
}


function openLogin(){
    window.location.href = 'http://127.0.0.1:5500/index.html';
}