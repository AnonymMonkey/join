let contacts = [];
const generatedIDs = new Set();
const generatedColors = new Set();

/**
 * This function create a contact.
 * 
 * @param {*} name - This is the Name of the contact.
 * @param {*} mail - This is the E-Mail of the contact.
 * @param {*} phone - This is the Phone-Number of the contact.
 */
function createContact() {
    debugger;

    saveContact();
}

async function saveContact() {
    debugger;
    create_btn.disabled = true;
    contacts.push({
        contact_name: contact_name.value,
        contact_email: contact_mail.value,
        contact_phone: contact_phone.value,
        contact_color: randomColor(),
        contact_ID: randomID(),
    });
    await setItem('contacts', JSON.stringify(contacts));
    resetContactsForm()
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function resetContactsForm() {
    contact_name.value = '';
    contact_mail.value = '';
    contact_phone.value = '';
    create_btn.disabled = false;
}

function randomColor() {
    let color;

    do {
        color = Math.floor(Math.random() * 16777215).toString(16);
    } while (generatedColors.has(color));

    generatedColors.add(color);
    color = '#' + color;
    return color;
}

function randomID() {
    let id;

    do {
        id = Math.floor(Math.random() * 10000);
    } while (generatedIDs.has(id));

    generatedIDs.add(id);

    return id;
}


function createRegister() {
    let register = elementByID('register');
    register.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let nameFirstLetter = contacts[i]['contact_name'].charAt(0);
        let name = contacts[i]['contact_name'];
        let mail = contacts[i]['contact_mail'];

        register.innerHTML += /* html */` 
        <div>
            <div class="contact-letter">${nameFirstLetter}</div>
            </div>
                <img src="../assets/img/contacts/cutline2.svg">
            <div class="contact-info column pointer">
            <div class="contact-info-name">${name}</div>
            <div class="contact-info-mail">${mail}</div>
        </div>`;
    }
}