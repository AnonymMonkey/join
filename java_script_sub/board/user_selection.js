let contactSelection = []
let isOpen = true;

document.addEventListener('click', function (event) {
    let userSelectionFrame = document.getElementById('frame74');
    let select = document.getElementById('user_selection');
    let selectBG = elementByID("user_selection-background");
    let arrowDropdown = document.getElementById('arrow_dropdown_addTask');

    if (!userSelectionFrame.contains(event.target) && !select.contains(event.target)) {
        select.classList.add('d-none');
        selectBG.classList.add('d-none');
        arrowDropdown.classList.remove('open');
    }
});

async function userSelection() {
    await loadContacts();
    contacts.sort((a, b) => a.register_entry[0].contact_name.localeCompare(b.register_entry[0].contact_name));
    let select = elementByID("user_selection");
    let selectedUser = elementByID('selected_user');
    let selectBG = elementByID("user_selection-background");
    let search = elementByID('search_contact');

    let arrowDropdown = document.getElementById('arrow_dropdown_addTask');

    if (select.classList.contains('d-none')) {
        select.classList.remove('d-none');
        arrowDropdown.style.transform = 'rotate(360deg)';
    } else {
        select.classList.add('d-none');
        selectBG.classList.add('d-none');
        arrowDropdown.style.transform = 'rotate(180deg)';
    }

    if (isOpen) {
        select.classList.add('d-none');
        selectBG.classList.add('d-none');
        selectedUser.classList.remove('d-none');
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
            changeContactBG(ID);
            search.onkeyup = function () {
                searchContact();
            }

        }
        select.innerHTML += userSelection_addContact_button();
        select.classList.remove('d-none');
        selectBG.classList.remove('d-none');
        selectedUser.classList.add('d-none');
        isOpen = true;
    }

}


function searchContact() {
    let searchContact = elementByID('search_contact').value.toLowerCase();

    for (let i = 0; i < contacts.length; i++) {
        let contactName = contacts[i]['register_entry'][0]['contact_name'];
        let contactID = contacts[i]['register_entry'][0]['contact_ID'];
        let userElement = userElement(contactID);

        if (contactName.toLowerCase().includes(searchContact)) {
            userElement.classList.remove('d-none');
        } else {
            userElement.classList.add('d-none');
        }
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
    changeContactBG(ID);
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

function changeContactBG(ID) {
    /* debugger */
    if (userIndex(ID) == -1) {
        userElement(ID).classList.remove('user-active');
        userName(ID).classList.remove('user-name-active');
    } else {
        userElement(ID).classList.add('user-active');
        userName(ID).classList.add('user-name-active');
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

function userElement(contactID) {
    return elementByID(`user_element_${contactID}`)
}

function userName(contactID) {
    return elementByID(`user_name_${contactID}`)
}

function userIndex(ID) {
    return contactSelection.indexOf(ID);
}