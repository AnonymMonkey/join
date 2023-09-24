let showMenu = false;

const guest = false; //Switch to identify Guest-Login

const urlParams = new URLSearchParams(window.location.search)
const msg = urlParams.get('msg');

/*
if(msg && document.readyState == "complete") {
     //document.getElementById('headerInitials').textContent = 'G';
     document.getElementById('quickAddTask').classList.add('isActiveColor');

    
    //msgbox.innerHTML = msg;
}else{
    document.getElementById('headerInitials').innerHTML = /*html`
    <span class="headerInitials">SM</span>
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="26.5" stroke="#2A3647" stroke-width="3"/>
    </svg>
    `;
    //display none auf message id
}
*/

function adjustQuicklinkBG(){
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
        
        document.getElementById('headerInitials').textContent = 'G';

    }else{
        document.getElementById('headerInitials').textContent = 'SM';
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


function openSelectedQuicklink(id){
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
