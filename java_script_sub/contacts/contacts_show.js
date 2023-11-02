let selectedContact = null;

/**
 * This function shows the contact informations when click on a contact in the register
 * 
 * @param {*} ID - This is the ID from the specific contact
 */
function showContact(ID) {
    if (window.innerWidth <= 1200) {
        elementByID('contact_register').classList.add('d-none');
    }

    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];


    let contactElements = document.querySelectorAll('.contact-info');
    contactElements.forEach(contactElement => {
        contactElement.classList.remove('active');
    });

    let selectedContactElement = document.querySelector(`[data-contact-id="contactID_${ID}"]`);
    selectedContactElement.classList.add('active');

    selectedContact = {
        name,
        mail,
        phone,
        initials,
        color,
        ID
    };

    let show = elementByID('show_contact')

    show.style.right = '-65vw';

    setTimeout(function (name, mail, phone, initials, color, ID) {
        show.style.right = '0';

        show.innerHTML = "";
        show.innerHTML += showContact_html(name, mail, phone, initials, color, ID);

    }, 200, name, mail, phone, initials, color, ID);

}

// TODO STEFAN: check mal bitte ob das noch von bedeutung ist... glaube das kam von dir bzw. uns :D
/* function getLastJsonObject() {
    let keysArray = Object.keys(contacts);
    let lastKey = keysArray[keysArray.length - 1];
    let lastValue = contacts[lastKey];

    return lastValue;

}

function getLastJsonObjectID() {
    let lastObject = getLastJsonObject();
    let lastObjectID = lastObject['register_entry'][0]['contact_ID'];
    return lastObjectID;
} */


/**
 * This function remove the contact informations
 * 
 */
function returnToRegister() {
    let show = elementByID('show_contact')

    show.style.right = '-100vw';
    setTimeout(() => {
        elementByID('contact_register').classList.remove('d-none');
    }, 200);


}