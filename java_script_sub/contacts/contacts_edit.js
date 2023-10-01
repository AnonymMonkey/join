function editContact(name, mail, phone, initials, color, ID) {
    openContactOverlay();

    let pos = contacts[getIndexOf(ID)]['register_entry'][0];

    let overlayTitle = elementByID("overlay_title");
    let overlayTitleSub = elementByID("overlay_title_sub");
    let overlayInitials = elementByID("overlay_initials");
    let createButton = elementByID("create_btn");
    let onsubmit = elementByID("onsubmit");
    let overlayName = elementByID("contact_name");
    let overlayMail = elementByID("contact_mail");
    let overlayPhone = elementByID("contact_phone");

    overlayTitle.innerHTML = "Edit contact";

    /*  */
    createButton.innerHTML = "Save <img src='../assets/img/contacts/check.svg'>";
    overlayTitleSub.innerHTML = "";
    overlayInitials.classList.remove('person-bg');
    overlayInitials.classList.add('contact-headline-initials');
    overlayInitials.classList.add('contact-headline-initials-font');
    overlayInitials.innerHTML = initials;
    overlayInitials.style = `background-color: ${color}`;
    overlayName.value = name;
    overlayMail.value = mail;
    overlayPhone.value = phone;

    onsubmit.onsubmit = null;

    createButton.onclick = function () {
        changeContactData(pos);
    };

}

function getIndexOf(ID) {
    let position = contacts.findIndex(entry => entry.register_entry[0].contact_ID === ID);
    return position;
}

async function changeContactData(pos) {
    let nameIsValid = checkName();
    if (!nameIsValid) {
        return;
    }
    debugger
    pos['contact_name'] = contact_name.value;
    pos['contact_mail'] = contact_mail.value;
    pos['contact_phone'] = contact_phone.value;
    pos['contact_color'] = randomColor();
    pos['contact_initials'] = getContactFirstLetters();

    await saveData();
    await loadData();

    closeContactOverlay();
}