let contactSelection = [];

async function userSelection() {
    await loadContacts();

    let select = document.getElementById("user_selection");
    let selectOnClick = document.getElementById("frame74");

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i]['register_entry'][0];
        let name = contact['contact_name'];
        let initials = contact['contact_initials'];
        let ID = contact['contact_ID'];


        select.innerHTML += /* html */`
        <div id="user_${ID}" onclick="checkContact(${ID})" class="flex">
            <div>${initials}</div>
            <div>${name}</div>
            <div>
                <img id="img_unchecked_${ID}" src="../assets/img/login/checkbox_unchecked.png">
                <img id="img_checked_${ID}" class="d-none" src="../assets/img/add-task/checkbox_checked_white.svg">
            </div>
        </div>
        `;
    }
    selectOnClick.onclick = "";
    select.classList.remove('d-none');
}

function checkContact(ID) {
   /* debugger*/
    let user = `user_${ID}`;
    
    let userIndex = contactSelection.indexOf(user);

    let imgUnChecked = elementByID(`img_unchecked_${ID}`);
    let imgChecked = elementByID(`img_checked_${ID}`);

    if (userIndex == -1) {
        contactSelection.push(user);
        imgUnChecked.classList.add('d-none');
        imgChecked.classList.remove('d-none');
    } else {
        contactSelection.splice(userIndex, 1);
        imgUnChecked.classList.remove('d-none');
        imgChecked.classList.add('d-none');  
    }


}