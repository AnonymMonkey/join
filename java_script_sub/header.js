let showMenu = false;

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