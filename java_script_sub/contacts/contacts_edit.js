/**
 * Edit a contact
 * @param {number} ID - 4-digit contact-id like 1234
 */
async function editContact(ID) {
    openContactOverlay();
    let pos = getIndexOfJson('ID', ID);

    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];

    let overlayTitle = elementByID("overlay_title");
    let overlayTitleSub = elementByID("overlay_title_sub");
    let overlayInitials = elementByID("overlay_initials");
    let createButton = elementByID("create_btn");
    let onsubmit = elementByID("onsubmit");
    let overlayName = elementByID("contact_name");
    let overlayMail = elementByID("contact_mail");
    let overlayPhone = elementByID("contact_phone");

    overlayTitle.innerHTML = "Edit contact";

    createButton.innerHTML = "Save <img src='../assets/img/contacts/check.svg'>";
    overlayTitleSub.innerHTML = "";
    overlayInitials.classList.remove('person-bg');
    overlayInitials.classList.add('contact-headline-initials');
    overlayInitials.classList.add('contact-headline-initials-font');
    overlayInitials.classList.add('person-bg');
    overlayInitials.innerHTML = initials;
    overlayInitials.style = `background-color: ${color}`;

    overlayName.value = name;
    overlayMail.value = mail;
    overlayPhone.value = phone;

    onsubmit.onsubmit = null;

    createButton.onclick = async function (event) {
        event.preventDefault();
        changeContactData(pos, ID);

    };

}

/**
 * Change contact values
 * @param {*} pos
 * @param {number} ID - 4-digit contact-id like 1234
 * @returns 
 */
async function changeContactData(pos, ID) {
    let nameIsValid = checkName();
    let mailIsValid = checkMail(ID);
    if (!nameIsValid || !mailIsValid) {
        return;
    }
    pos['contact_name'] = contact_name.value;
    pos['contact_mail'] = contact_mail.value;
    pos['contact_phone'] = contact_phone.value;
    pos['contact_initials'] = getContactFirstLetters();

    await saveData();
    await loadData();
    createRegisterEntry();
    showContact(ID);
    emailAddresses = [];
    closeContactOverlay();
    smallAnimatedLabel("Contact succesfully edited");
}
