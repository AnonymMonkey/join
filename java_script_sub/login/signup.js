let isChecked = false;

function changeCheckbox(){
    if(isChecked){
        document.getElementById('signupCheckboxUnchecked').classList.remove('dNone');
        document.getElementById('signupCheckboxChecked').classList.add('dNone');
        isChecked = false;
    }
    else{
        document.getElementById('signupCheckboxUnchecked').classList.add('dNone');
        document.getElementById('signupCheckboxChecked').classList.remove('dNone');
        isChecked = true;
    }
}