let isChecked = false;
const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

if(msg) {
    msgbox.innerHTML = msg;
}

let users = [];
let emailAddresses = [];

function checkMail(email) {
    searchMailsInJSON();    
    if (emailAddresses.includes(email)) {            
        document.getElementById('signupMsgBox').classList.remove('dNone');
        document.getElementById('signupMsgBox').innerHTML = /*html*/`
            <span>This Email already exists!</span>  
        `;
        return false;
    } 
    return true;
}

function searchMailsInJSON() {
    for (let i = 0; i < users.length; i++) {
        const element = users[i];     
        emailAddresses.push(element['email']);
    }
}

async function registerUser(){
    let name = document.getElementById('signupName').value;
    let email = document.getElementById('signupEmail').value;    
    if(!checkMail(email)){
        return;
    }
    let password = document.getElementById('signupPassword').value;
    let confirmation = document.getElementById('signupConfirmation').value;
    if(await checkName()){
        if(password == confirmation){
            pushUser(name, email, password);
            await setItem('users', JSON.stringify(users));
            await openSignUpOverlay();
        }
        else{
            showMsgBoxInvalidConfirmation();
        }
    };
}


async function checkName() {
    let nameInput = elementByID("signupName").value;
    let namenParts = nameInput.split(" ");
    if (namenParts.length !== 2) {
        document.getElementById('signupMsgBox').classList.remove('dNone');
        document.getElementById('signupMsgBox').innerHTML = /*html*/`
                <span>Please enter exactly two names with a space in between.</span><br>
                <span>The names should start with a capital letter.</span>
                `;
        return false;
    }
    for (let i = 0; i <= namenParts.length - 1; i++) {
        if (namenParts[i][0] !== namenParts[i][0].toUpperCase()) {
            document.getElementById('signupMsgBox').classList.remove('dNone');
            document.getElementById('signupMsgBox').innerHTML = /*html*/`
                <span>Please enter exactly two names with a space in between.</span><br>
                <span>The names should start with a capital letter.</span>
            `;
            return false;
        }
    }
    return true;
}


function checkMail(email) {
    searchMailsInJSON();    
    if (emailAddresses.includes(email)) {            
        document.getElementById('signupMsgBox').classList.remove('dNone');
        document.getElementById('signupMsgBox').innerHTML = /*html*/`
            <span>This Email already exists!</span>  
        `;
        return false;
    } 
    return true;
}


//Funktion kürzen//
async function openSignUpOverlay() {
    //added following 2 lines
    let signup = elementByID("bodySignup");
    let legal = elementByID("signupLegalPrivacy");
    
    let overlayBg = elementByID("overlay-bg-addTask");
    let overlayContent = elementByID("overlay-content-addTask");
    
    //added following 2 lines
    legal.classList.add("dNone");
    signup.classList.add("dNone");
    

    overlayContent.classList.remove("slideOut");

    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("dNone");

    overlayContent.classList.add("slide-in");
    overlayContent.style.right = "0";

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("dNone");        
    }  
    setTimeout(openSuccessfullRegistered, 1500);
}


function openSuccessfullRegistered(){
    window.location.href = 'http://127.0.0.1:5500/index.html?msg=userregistered';
}


async function pushUser(name, email, password){
    users.push({
        name: name,
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
                singupRevealPassword();
            }
            else if(index == 1){
                singupRevealPassword();
            }else{
                signupCoverPassword();
            }
        }
    }
}


function singupRevealPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.remove('dNone');  
    document.getElementById('signupPassword').type = 'text';
}


function signupCoverPassword(){
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
                signupRevealConfirmation();
            }
            else if(index == 1){
                signupRevealConfirmation();
            }else{
                signupCoverConfirmation();
            }
        }
    }
}


function signupRevealConfirmation(){
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.add('dNone');
    document.getElementById('confirmationVisibility').classList.remove('dNone');
    document.getElementById('signupConfirmation').type = 'text';
}


function signupCoverConfirmation(){
    document.getElementById('confirmationLock').classList.add('dNone');
    document.getElementById('confirmationVisibilityOff').classList.remove('dNone');
    document.getElementById('confirmationVisibility').classList.add('dNone');
    document.getElementById('signupConfirmation').type = 'password';
}


function openLogin(){
    window.location.href = 'http://127.0.0.1:5500/index.html';
}


function openPrivacy(){
    window.open('http://127.0.0.1:5500/html-sub/privacy_data_protection_external.html', '_blank');
}


function openLegal(){
    window.open('http://127.0.0.1:5500/html-sub/legal_notice_external.html', '_blank');
}