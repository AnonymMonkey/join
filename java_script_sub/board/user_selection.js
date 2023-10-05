let contactSelection = [];

async function userSelection() {
    await loadContacts();

    let select = document.getElementById("user_selection");
    let selectOnClick = document.getElementById("frame74");

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i]['register_entry'][0];
        let name = contact['contact_name'];
        let initials = contact['contact_initials'];
        let color = contact['contact_color'];
        let ID = contact['contact_ID'];


        select.innerHTML += /* html */`
        <div id="user_${ID}" onclick="checkContact(${ID})" class="flex user">
            <div class="user-left">
                <div class="user-initials circle" style="background-color: ${color};">
                    <div class="inner-circle">
                        ${initials}
                    </div>
                </div>
                <div class="user-name">${name}</div>
            </div>
            <div>
                <img class="user-checkbox" id="img_unchecked_${ID}" src="../assets/img/login/checkbox_unchecked.png">
                <img class="user-checkbox" id="img_checked_${ID}" class="d-none" src="../assets/img/add-task/checkbox_checked_white.svg">
            </div>
        </div>
        `;
    }
    selectOnClick.onclick = "";
    select.classList.remove('d-none');
}

function checkContact(ID) {
    /* debugger*/
    let selectedUser = elementByID('selected_user');
    let userIndex = contactSelection.indexOf(ID);
    let imgUnChecked = elementByID(`img_unchecked_${ID}`);
    let imgChecked = elementByID(`img_checked_${ID}`);



    if (userIndex == -1) {
        contactSelection.push(ID);
        imgUnChecked.classList.add('d-none');
        imgChecked.classList.remove('d-none');
    } else {
        contactSelection.splice(userIndex, 1);
        imgUnChecked.classList.remove('d-none');
        imgChecked.classList.add('d-none');
    }

    selectedUser.innerHTML = "";
    for (let i = 0; i < contactSelection.length; i++) {
        const selection = contactSelection[i];

        let initials = getIndexOfJson(selection)['contact_initials'];
        let color = getIndexOfJson(selection)['contact_color'];


        selectedUser.innerHTML += /* html */`
        <div class="circle" id="user_inital_${selection}">
            <div class="inner-circle">
                ${initials}
            </div>
        </div>
        `;

        let userInitial = elementByID(`user_inital_${selection}`);
        userInitial.style.cssText = `background-color: ${color}; z-index: ${i + 10}; margin-left: -10px;`;
    }


}