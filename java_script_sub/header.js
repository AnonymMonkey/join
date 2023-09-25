let showMenu = false;

let guest; //Switch to identify Guest-Login

const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

const login = urlParams.get('login');


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


function adjustQuicklinkBG(){
    identifyGuest();
    if(msg) {
        switch (msg) {
            case 'summary':
                addBgToQuickSummary();
            break;
        
            case 'addtask':
                addBgToQuickAddTask();
            break;

            case 'board':
                addBgToQuickBoard();
            break;

            case 'contacts':
                addBgToQuickContacts();
            break;

            default:
                addBgToQuickSummary();
            break;
        }
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

//hier checken!!
function openGuestQuicklinks(id){
    if(id=='quickSummary'){
        window.open("http://127.0.0.1:5500/html-sub/summary.html?msg=summary", "_self");
    }
    if(id=='quickAddTask'){
        window.open("http://127.0.0.1:5500/html-sub/add_task.html?msg=addtask", "_self");
    }
    if(id=='quickBoard'){
        window.open("http://127.0.0.1:5500/html-sub/board.html?msg=board&", "_self");
    }
    if(id=='quickContacts'){
        window.open("http://127.0.0.1:5500/html-sub/contacts.html?msg=contacts&", "_self");
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


function openBoard(){
    window.open("http://127.0.0.1:5500/html-sub/board.html?msg=board", "_self");
}
