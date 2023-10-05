let showMenu = false;
let guest;
const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');
const login = urlParams.get('login');
let users = [];



function adjustQuicklinkBG(){
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


function identifyGuest(){
    
    if(msg == 'guest'){
        document.getElementById('headerInitials').textContent = 'G';
        guest = true;
    }else if(login == 'true'){
        document.getElementById('headerInitials').textContent = 'SM';
        guest = false;
    }
    else{
        document.getElementById('headerInitials').textContent = 'G';
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
    window.open('http://127.0.0.1:5500/html-sub/legal_notice_external.html', '_blank');
}

function showPrivacyExternal(){
    window.open('http://127.0.0.1:5500/html-sub/privacy_data_protection_external.html', '_blank');
}



//hier checken!!
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
        window.open("http://127.0.0.1:5500/html-sub/privacy_data_protection.html", "_self");
    }
    if(id=='legal'){
        window.open("http://127.0.0.1:5500/html-sub/legal_notice.html", "_self");
    }
    if(id=='help'){
        window.open("http://127.0.0.1:5500/html-sub/help.html", "_self");
    }
}


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
        window.open("http://127.0.0.1:5500/html-sub/privacy_data_protection.html?login=true", "_self");
    }
    if(id=='legal'){
        window.open("http://127.0.0.1:5500/html-sub/legal_notice.html?login=true", "_self");
    }
    if(id=='help'){
        window.open("http://127.0.0.1:5500/html-sub/help.html?login=true", "_self");
    }
}


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

/*BG Responsive */
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


function openBoard(){
    window.open("http://127.0.0.1:5500/html-sub/board.html?msg=board", "_self");
}
