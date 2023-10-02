function addContact() {
    openContactOverlay();

    let overlayTitle = elementByID("overlay_title");
    let overlayTitleSub = elementByID("overlay_title_sub");
    let overlayInitials = elementByID("overlay_initials");
    let createButton = elementByID("create_btn");
    let onsubmit = elementByID("onsubmit");
    let overlayName = elementByID("contact_name");
    let overlayMail = elementByID("contact_mail");
    let overlayPhone = elementByID("contact_phone");

    overlayTitle.innerHTML = "Add contact";
    createButton.innerHTML = "Create contact <img src='../assets/img/contacts/check.svg'>";
    overlayTitleSub.innerHTML = "Tasks are better with a team!";
    overlayInitials.classList.add('person-bg');
    overlayInitials.src = ('../assets/img/contacts/no_person.png');
    overlayInitials.classList.remove('contact-headline-initials');
    overlayInitials.classList.remove('contact-headline-initials-font');
    overlayName.value = "";
    overlayMail.value = "";
    overlayPhone.value = "";

    onsubmit.onsubmit = function () {
        createContact();
        return false;
    };
}