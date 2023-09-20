let isChecked = false;

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