let showMenu = false;
let guest;
const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');
const login = urlParams.get('login');
let users = [];
let activeUserMail;
let activeUserInitials;
let activeUserName;
const FORM_FIELDS = {
    quickSummary: 'http://127.0.0.1:5500/html-sub/summary.html?msg=summary',
    quickAddTask: 'frame14_text',
    // so on
}

function test(id) {
    let formId = FORM_FIELDS[id];
    
    console.log(formId);
}


//Funktion kürzen!!
async function adjustQuicklinkBG(){
    
    loadFromLocalStorage();
    await loadUsers();
    setActiveUser();
    activeUserInitials = getActiveUserInitials();
    identifyGuest();
    if(msg) {
        switch (msg) {
            case 'summary':
                addBgToQuickSummary();
                addBgToQuickSummaryResp();
            break;
        
            case 'addtask':
                addBgToQuickAddTask();
                addBgToQuickAddTaskResp();
            break;

            case 'board':
                addBgToQuickBoard();
                addBgToQuickBoardResp();
            break;

            case 'contacts':
                addBgToQuickContacts();
                addBgToQuickContactsResp();
            break;

            default:
                addBgToQuickSummary();
                addBgToQuickSummaryResp();
            break;
        }
    }
}


function loadFromLocalStorage(){
    activeUserMail = localStorage.getItem('activeUser');
}


async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
    detectDarkmode();
}


async function setActiveUser(){
    let user = users.find(u => u.email == activeUserMail);
    if(user){
        activeUserName = user.name; 
    }
    return activeUserName
}


function getActiveUserInitials() {
    let name = activeUserName
    if(name != 'undefined' &&  name != undefined){
        let words = name.split(' ');

        let firstInitial = words[0].charAt(0).toUpperCase();
        let secondInitial = words[1].charAt(0).toUpperCase();
    
        let initials = firstInitial + secondInitial;
    
        return initials;
    }
}

//Funktion kürzen??
function identifyGuest(){
    if(msg == 'guest'){ //first time User enters through GuestLoginButton
        document.getElementById('headerInitials').textContent = 'G';
        document.getElementById('headerInitialsLogin').classList.add('dNone');
        activeUserInitials = "";
        guest = true;
    }else if(login == 'true'){ //login=true only if user logged in
        document.getElementById('headerInitialsLogin').textContent = activeUserInitials;
        document.getElementById('headerInitials').classList.add('dNone');
        guest = false;
    }
    //if user entered from different Site without Login or Guestlogin
    else if(!msg){
        window.open("http://127.0.0.1:5500/index.html", "_self");
    }
    //user moves from guestlogin to another site
    else{
        document.getElementById('headerInitials').textContent = 'G';
        document.getElementById('headerInitialsLogin').classList.add('dNone')
        guest = true;
    }
}


function showSubmenu(){
    if(showMenu){
        document.getElementById('subMenu').classList.add('dNone');
        showMenu = false;
    }
    else{
        document.getElementById('subMenu').classList.remove('dNone');
        showMenu = true;
    }
}


function logOut(){
    localStorage.removeItem('loginData');
    window.open("http://127.0.0.1:5500/index.html", "_self");
}


function openSelectedQuicklink(id){
    if(guest){
        openGuestQuicklinks(id);
    }
    else{
        openLoginQuicklinks(id);
    }
}


function showLegalExternal(){
    window.open('http://127.0.0.1:5500/html-sub/legal_notice_external?msg=legal.html', '_blank');
}

function showPrivacyExternal(){
    window.open('http://127.0.0.1:5500/html-sub/privacy_data_protection_external?msg=privacy.html', '_blank');
}

/**
 * opens the the next page of Join according to id as a guest
 * @param {*} id 
 */
//Funktion kürzen??
function openGuestQuicklinks(id){
    if(id=='quickSummary'){
        window.open("http://127.0.0.1:5500/html-sub/summary.html?msg=summary", "_self");
    }
    if(id=='quickAddTask'){
        window.open("http://127.0.0.1:5500/html-sub/add_task.html?msg=addtask", "_self");
    }
    if(id=='quickBoard'){
        window.open("http://127.0.0.1:5500/html-sub/board.html?msg=board", "_self");
    }
    if(id=='quickContacts'){
        window.open("http://127.0.0.1:5500/html-sub/contacts.html?msg=contacts", "_self");
    }
    if(id=='privacy'){
        window.open("http://127.0.0.1:5500/html-sub/privacy_data_protection.html?msg=privacy", "_self");
    }
    if(id=='legal'){
        window.open("http://127.0.0.1:5500/html-sub/legal_notice.html?msg=legal", "_self");
    }
    if(id=='help'){
        window.open("http://127.0.0.1:5500/html-sub/help.html?msg=help", "_self");
    }
}

//Funktion kürzen??
/**
 * opens the the next page of Join according to id as a logged in member 
 * @param {*} id string 
 *            
 */
function openLoginQuicklinks(id){
    if(id=='quickSummary'){
        window.open("http://127.0.0.1:5500/html-sub/summary.html?msg=summary&login=true", "_self");
    }
    if(id=='quickAddTask'){
        window.open("http://127.0.0.1:5500/html-sub/add_task.html?msg=addtask&login=true", "_self");
    }
    if(id=='quickBoard'){
        window.open("http://127.0.0.1:5500/html-sub/board.html?msg=board&login=true", "_self");
    }
    if(id=='quickContacts'){
        window.open("http://127.0.0.1:5500/html-sub/contacts.html?msg=contacts&login=true", "_self");
    }
    if(id=='privacy'){
        window.open("http://127.0.0.1:5500/html-sub/privacy_data_protection.html?msg=privacy&login=true", "_self");
    }
    if(id=='legal'){
        window.open("http://127.0.0.1:5500/html-sub/legal_notice.html?msg=legal&login=true", "_self");
    }
    if(id=='help'){
        window.open("http://127.0.0.1:5500/html-sub/help.html?msg=help&login=true", "_self");
    }
}

/**
 * adding dark blue background to quicklink "summary" in desktop view
 */
function addBgToQuickSummary(){
    document.getElementById('quickSummary').classList.add('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');

    document.getElementById('quickSummary').classList.remove('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
}

/**
 * adding dark blue background to quicklink "add task" in desktop view
 */
function addBgToQuickAddTask(){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.add('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');

    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.remove('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
}

/**
 * adding dark blue background to quicklink "board" in desktop view
 */
function addBgToQuickBoard(){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.add('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');

    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.remove('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
}

/**
 * adding dark blue background to quicklink "contacts" in desktop view
 */
function addBgToQuickContacts(){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.add('isActiveColor');

    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.remove('hoverBG');
}


/**
 * adding dark blue background to quicklink "summary" in mobile view
 */
function addBgToQuickSummaryResp(){
    document.getElementById('respQuickSummary').classList.add('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');

    document.getElementById('respQuickSummary').classList.remove('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
}

/**
 * adding dark blue background to quicklink "add task" in mobile view
 */
function addBgToQuickAddTaskResp(){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.add('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');

    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.remove('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
}

/**
 * adding dark blue background to quicklink "board" in mobile view
 */
function addBgToQuickBoardResp(){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.add('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');

    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.remove('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
}

/**
 * adding dark blue background to quicklink "contacts" in mobile view
 */
function addBgToQuickContactsResp(){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.add('isActiveColor');
    
    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.remove('hoverBG');
}

/**
 * opens board page
 */
function openBoard(){
    window.open("http://127.0.0.1:5500/html-sub/board.html?msg=board", "_self");
}
