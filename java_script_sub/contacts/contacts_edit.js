/**
 * This function changes the overlay for edit contact and show the contact informations
 * 
 * @param {*} ID - This is the ID from the specific contact
 */
async function editContact(ID) {
    openContactOverlay();
    let pos = getIndexOfJson(ID);

    let name = getIndexOfJson(ID)['contact_name'];
    let mail = getIndexOfJson(ID)['contact_mail'];
    let phone = getIndexOfJson(ID)['contact_phone'];
    let initials = getIndexOfJson(ID)['contact_initials'];
    let color = getIndexOfJson(ID)['contact_color'];

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
 * This function will change und save the contact in JSON structure
 * 
 * @param {number} pos - This is the index of the contact
 * @param {*} ID - This is the ID from the specific contact
 * @returns - nothing
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
