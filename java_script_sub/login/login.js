let isChecked = false;
let users = [];
let activeUser;
let activeUserName;
let deviceWidth;
let animationStarted = false;
let loginData = [];



async function renderIndex(){
    await includeHTML();
    await loadUsers();
    await loadStartScreen();
}



function changeCheckbox() {
    if (isChecked) {
        loginCheckboxOff();
    }
    else {
        loginCheckboxOn();
    }
}


function loginCheckboxOff() {
    document.getElementById('loginCheckboxUnchecked').classList.remove('dNone');
    document.getElementById('loginCheckboxChecked').classList.add('dNone');
    isChecked = false;
}


function loginCheckboxOn() {
    document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
    document.getElementById('loginCheckboxChecked').classList.remove('dNone');
    isChecked = true;
}


async function login() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    
    checkRememberMe(email, password);
    await loadUsers();
    let user = users.find(u => u.email == email && u.password == password);
    if (user) {
        activeUser = user.email;
        pushLoginData(email, password, user.name);
        saveUserToLocalStorage('activeUser', activeUser);
        /*Hier schon in contacts pushen?*/
        /*addActiveUserToContacts();*/
        window.location.href = `http://127.0.0.1:5500/html-sub/summary.html?msg=login&login=true`;
    }
    else {
        showMsgBoxInvalidPassword();
    };
}


function saveUserToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}


function saveToLocalStorage(key, value) {
    let valueAsText = JSON.stringify(value)
    localStorage.setItem(key, valueAsText);
}


function checkRememberMe(email, password) {
    if (isChecked) {
        pushLoginData(email, password)
    }
    else {
        /*localStorage.removeItem('loginData');*/
    }
}


function pushLoginData(email, password, name) {
    loginData = [];
    loginData.push({
        email: email,
        password: password,
        name: name
    })
    saveToLocalStorage('loginData', loginData);
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


function showMsgBoxInvalidPassword() {
    document.getElementById('decoLoginPassword').classList.remove('changeBorderBlack')
    document.getElementById('decoLoginPassword').classList.add('changeBorderRed')
    document.getElementById('LoginMsgBox').classList.remove('dNone');
    document.getElementById('LoginMsgBox').innerHTML = /*html*/`
        <span>Wrong passsword Ups! Try again.</span>  
    `;
}


function changeBorderOnFocus(id) {
    let identifiers = ['loginEmail', 'loginPassword'];
    let decorations = ['decoLoginName', 'decoLoginPassword'];
    document.getElementById('LoginMsgBox').classList.add('dNone');
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if (idName == id) {
            changeBorderToBlue(decorations, index);
        }
        else {
            changeBorderToStandard(decorations, index);
        }
    }
}


function changeBorderToBlue(decorations, index) {
    document.getElementById(`${decorations[index]}`).classList.add('changeBorderBlue');
    document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
    showLockSymbol();
}


function changeBorderToStandard(decorations, index) {
    document.getElementById(`${decorations[index]}`).classList.remove('changeBorderBlue');
    document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
    showLockSymbol();
}


function showLockSymbol() {
    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';

    document.getElementById('passwordLock').classList.remove('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';
}


//change visibility of lock-symbol in Login-form
function passwordVisibilityLock(id) {
    let identifiers = ['passwordLock', 'passwordVisibilityOff', 'passwordVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if (idName == id) {
            if (index == 0) {
                revealPassword();
            }
            else if (index == 1) {
                revealPassword();
            } else {
                coverPassword();
            }
        }
    }
}


function coverPassword() {
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.remove('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');
    document.getElementById('loginPassword').type = 'password';
}


function revealPassword() {
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.remove('dNone');
    document.getElementById('loginPassword').type = 'text';
}


function guestLogin() {
    localStorage.removeItem('activeUser');
    window.location.href = 'http://127.0.0.1:5500/html-sub/summary.html?msg=guest';
}


function openSignUp() {
    window.location.href = 'http://127.0.0.1:5500/html-sub/sign_up.html';
}


async function loadStartScreen() {
    await setDesktopScreen();
    await loadFromLocalStorage();
}

async function setDesktopScreen() {
    animateLogo();
    document.getElementById('indexContent').classList.remove('dNone');
    setTimeout(() => {
        document.getElementById('startScreen').classList.add('elementToFadeInAndOut');
    }, 1000);

}

function animateLogo() {
    if (!animationStarted) {
        animationStarted = true;
        let logo = document.getElementById("startLogo");
        logo.style.animationPlayState = "running";
    }
}

function openLegal() {
    window.open('http://127.0.0.1:5500/html-sub/legal_notice_external.html?msg=legal', '_blank');
}


function openPrivacy() {
    window.open('http://127.0.0.1:5500/html-sub/privacy_data_protection_external.html?msg=privacy', '_blank');
}



async function loadFromLocalStorage() {
    let loginDataAsText = localStorage.getItem('loginData');
    if (loginDataAsText) {
        loginData = JSON.parse(loginDataAsText);
        document.getElementById('loginEmail').value = loginData[0].email;
        document.getElementById('loginPassword').value = loginData[0].password;
        document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
        document.getElementById('loginCheckboxChecked').classList.remove('dNone');
        login();
    }
}
