let contactSelection = []
let isOpen = true;

async function userSelection() {
    await loadContacts();

    let select = elementByID("user_selection");

    if (isOpen) {
        select.classList.add('d-none');
        isOpen = false;
    } else {
        select.innerHTML = "";
        for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i]['register_entry'][0];
            let name = contact['contact_name'];
            let initials = contact['contact_initials'];
            let color = contact['contact_color'];
            let ID = contact['contact_ID'];

            select.innerHTML += user_select_html(name, initials, color, ID);
            hiddenBadge(ID);
        }
        select.classList.remove('d-none');
        isOpen = true;
    }
}

function createBadge(ID) {
    let selectedUser = elementByID('selected_user');
    checkBadge(ID);
    selectedUser.innerHTML = "";
    for (let i = 0; i < contactSelection.length; i++) {
        let selection = contactSelection[i];
        let initials = getIndexOfJson(selection)['contact_initials'];
        let color = getIndexOfJson(selection)['contact_color'];

        selectedUser.innerHTML += user_selectedUser_html(selection, initials);

        let userInitial = elementByID(`user_inital_${selection}`);
        userInitial_style(userInitial, i, color);
    }
}

function checkBadge(ID) {
    getBadge(ID);
    hiddenBadge(ID);
}

function getBadge(ID) {
    if (userIndex(ID) == -1) {
        contactSelection.push(ID);
    } else {
        contactSelection.splice(userIndex(ID), 1);
    }
}

function hiddenBadge(ID) {
    if (userIndex(ID) == -1) {
        uncheckedIMG(ID).classList.remove('d-none');
        checkedIMG(ID).classList.add('d-none');
    } else {
        uncheckedIMG(ID).classList.add('d-none');
        checkedIMG(ID).classList.remove('d-none');
    }
}

function userInitial_style(userInitial, i, color) {
    return userInitial.style.cssText = `background-color: ${color}; z-index: ${i + 10}; margin-left: -10px;`
}

function checkedIMG(ID) {
    return elementByID(`img_checked_${ID}`)
}

function uncheckedIMG(ID) {
    return elementByID(`img_unchecked_${ID}`)
}

function userIndex(ID) {
    return contactSelection.indexOf(ID);
}