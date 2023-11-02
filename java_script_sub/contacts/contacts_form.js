let emailAddresses = [];

/**
 * This function check the form validation for contact name
 * 
 * @returns true or false
 */
function checkName() {
    let nameInput = elementByID("contact_name");
    let namenParts = nameInput.value.split(" ");

    if (namenParts.length !== 2) {
        let msg = 'Please enter exactly two names with a space in between.';
        showErrorMessage(msg, nameInput);
        return false;
    }

    for (var i = 0; i < namenParts.length; i++) {
        if (namenParts[i][0] !== namenParts[i][0].toUpperCase()) {
            let msg = 'The names should start with a capital letter.';
            showErrorMessage(msg, nameInput);
            return false;
        }
    }

    return true;
}

/**
 * This function check the form validation for contact mail
 * 
 * @returns true or false
 */
function checkMail(ID) {
    searchMailsInJSON();
    let mailInput = elementByID("contact_mail");
    let currentMail = getIndexOfJson(ID)['contact_mail'];

    if (mailInput.value !== currentMail) {
        if (emailAddresses.includes(mailInput.value)) {
            let msg = 'This Email already exists!';
            showErrorMessage(msg, mailInput);
            return false;
        }
    }
    return true;
}

/**
 * This function check the form validation for new contact mail
 * 
 * @returns true or false
 */
function checkNewMail() {
    searchMailsInJSON();
    let mailInput = elementByID("contact_mail");
    if (emailAddresses.includes(mailInput.value)) {
        let msg = 'This Email already exists!';
        showErrorMessage(msg, mailInput);
        return false;
    }
    return true;
}

/**
 * 
 * 
 */
function searchMailsInJSON() {
    contacts.forEach(entry => {
        let registerEntry = entry.register_entry[0];

        emailAddresses.push(registerEntry.contact_mail);
    });
}

/**
 * 
 * 
 * @param {*} msg 
 * @param {*} errorField 
 */
function showErrorMessage(msg, errorField) {
    let errorMsg = elementByID("errorMsg");
    errorMsg.innerHTML = msg;
    errorField.focus();
}