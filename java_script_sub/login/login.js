
let isChecked = false;
let users = [];
let activeUser;
let deviceWidth;
let loginData = [];

function changeCheckbox(){
    if(isChecked){
        loginCheckboxOff();
    }
    else{
        loginCheckboxOn();
    }
}


function loginCheckboxOff(){
    document.getElementById('loginCheckboxUnchecked').classList.remove('dNone');
    document.getElementById('loginCheckboxChecked').classList.add('dNone');
    isChecked = false;
}


function loginCheckboxOn(){
    document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
    document.getElementById('loginCheckboxChecked').classList.remove('dNone');
    isChecked = true;
}


function login(){
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    checkRememberMe(email, password);
    loadUsers();
    let user = users.find(u => u.email == email && u.password == password);
    if(user){
        activeUser = user.name;
        window.location.href = `http://gruppe-697.developerakademie.net/html-sub/summary.html?msg=login&login=true`;
    }
    else{
        showMsgBoxInvalidPassword();
    };
}


function checkRememberMe(email, password){
    if(isChecked){
        pushLoginData(email, password)
    }
    else{
        localStorage.removeItem('loginData');
    }
}


function pushLoginData(email, password){
    loginData = [];
    loginData.push({
        email: email,
        password: password,
    })
    saveToLocalStorage();
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


function showMsgBoxInvalidPassword(){
    document.getElementById('decoLoginPassword').classList.remove('changeBorderBlack')
    document.getElementById('decoLoginPassword').classList.add('changeBorderRed')
    document.getElementById('LoginMsgBox').classList.remove('dNone');
    document.getElementById('LoginMsgBox').innerHTML = /*html*/`
        <span>Wrong passsword Ups! Try again.</span>  
    `;
}


function changeBorderOnFocus(id){
    let identifiers = ['loginEmail', 'loginPassword'];
    let decorations = ['decoLoginName', 'decoLoginPassword'];
    document.getElementById('LoginMsgBox').classList.add('dNone');
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            changeBorderToBlue(decorations, index);
        }
        else{
            changeBorderToStandard(decorations, index);
        } 
    }
}


function changeBorderToBlue(decorations, index){
    document.getElementById(`${decorations[index]}`).classList.add('changeBorderBlue');
    document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
    showLockSymbol();
}


function changeBorderToStandard(decorations, index){
    document.getElementById(`${decorations[index]}`).classList.remove('changeBorderBlue');
    document.getElementById('decoLoginPassword').classList.remove('changeBorderRed')
    showLockSymbol();
}


function showLockSymbol(){
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
function passwordVisibilityLock(id){
    let identifiers = ['passwordLock', 'passwordVisibilityOff', 'passwordVisibility'];
    for (let index = 0; index < identifiers.length; index++) {
        const idName = identifiers[index];
        if(idName == id){
            if(index == 0){
                revealPassword();
            }
            else if(index == 1){
                revealPassword();
            }else{
                coverPassword();
            }
        }
    }
}


function coverPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.remove('dNone');
    document.getElementById('passwordVisibility').classList.add('dNone');     
    document.getElementById('loginPassword').type = 'password';
}


function revealPassword(){
    document.getElementById('passwordLock').classList.add('dNone');
    document.getElementById('passwordVisibilityOff').classList.add('dNone');
    document.getElementById('passwordVisibility').classList.remove('dNone');  
    document.getElementById('loginPassword').type = 'text';
}


function guestLogin(){
    window.location.href = 'http://gruppe-697.developerakademie.net/html-sub/summary.html?msg=guest';
}


function openSignUp(){
    window.location.href = 'http://gruppe-697.developerakademie.net/html-sub/sign_up.html';
}


function loadStartScreen(){
    getDeviceWidth();
    if(deviceWidth <= 800){
        setTimeout(setMobileScreen, 1000);
    }
    else{
        setTimeout(setDesktopScreen, 1000);
    }
    loadFromLocalStorage();
}


function setMobileScreen(){
    document.getElementById('startScreen').classList.remove('desktopScreen')
    document.getElementById('startScreen').classList.add('mobileScreen')
    
    document.getElementById('startScreen').classList.add('elementToFadeInAndOut')
    document.getElementById('logoScreen').classList.remove('logoScreen')
    
    document.getElementById('startLogo').classList.add('dNone');
    document.getElementById('indexContent').classList.remove('dNone')
    document.getElementById('logoScreen').classList.add('normalScreen')
}


function setDesktopScreen(){
    setTimeout(animateLogo, 4000);
    document.getElementById('startScreen').classList.add('elementToFadeInAndOut')
    document.getElementById('indexContent').classList.remove('dNone')
    document.getElementById('startLogo').classList.add('dNone');
}

function animateLogo(){
    document.getElementById('startLogo').classList.remove('startLogo2');
    document.getElementById('startLogo').classList.add('animation');
}


function getDeviceWidth(){
    deviceWidth = window.innerWidth;
}


function openLegal(){
    window.open('http://gruppe-697.developerakademie.net/html-sub/legal_notice_external.html', '_blank');
}


function openPrivacy(){
    window.open('http://gruppe-697.developerakademie.net/html-sub/privacy_data_protection_external.html', '_blank');
}


function saveToLocalStorage(){
    let loginDataAsText = JSON.stringify(loginData);
    localStorage.setItem('loginData', loginDataAsText);
}


function loadFromLocalStorage(){
    let loginDataAsText = localStorage.getItem('loginData');
    if(loginDataAsText){
        loginData = JSON.parse(loginDataAsText);
        document.getElementById('loginEmail').value = loginData[0].email;
        document.getElementById('loginPassword').value = loginData[0].password;
        document.getElementById('loginCheckboxUnchecked').classList.add('dNone');
        document.getElementById('loginCheckboxChecked').classList.remove('dNone');
    }
}