let contacts = [];
let categories = [];
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
    create_btn.disabled = true;
    getValues();
    saveContact();
    resetContactsForm();
}

function getValues() {
    getCategoryLetter();
    getEntry();
}

function getCategory() {
    contacts.push({
        'register_category': [categoryLetter()],
    });
}

function getEntry() {
    contacts.push({
        'register_entry': [
            {
                'contact_name': contact_name.value,
                'contact_mail': contact_mail.value,
                'contact_phone': contact_phone.value,
                'contact_color': randomColor(),
                'contact_ID': randomID(),
            }
        ]
    });
}

async function saveContact() {
    await setItem('contacts', JSON.stringify(contacts));
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

function createRegister() {
    debugger;
    let register = elementByID('register');
    register.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        register.innerHTML += createRegisterEntry();
    }
}

function getCategoryLetter() {
    debugger;
    for (let i = 0; i < contacts.length; i++) {
        let name = contact_name.value;
        let firstLetter = name.charAt(0);

        if (!categories[firstLetter]) {
            categories[firstLetter] = [];
        }
    }
}

function categoryLetter() {
    for (let i = 0; i < contacts.length; i++) {
        let category = contacts[i];

    }
}

function createRegisterEntry() {
    createRegisterCategory();
    createRegisterInfo();
}

function createRegisterCategory() {
    let register = elementByID('register');
    for (let i = 0; i < contacts.length; i++) {
        let contactCategory = contacts[i]['register_category'][0];
        register.innerHTML += /* html */`
        <div id="category_${contactCategory}">
            <div class="contact-letter">${contactCategory}</div>
        </div>
        <img src="../assets/img/contacts/cutline2.svg">
        `;
    }
}

function createRegisterInfo() {
    let register = elementByID('register');
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['register_entry'][0]['contact_name'];
        let mail = contacts[i]['register_entry'][0]['contact_mail'];
        register.innerHTML += /* html */`
        <div class="contact-info column pointer">
            <div class="contact-info-name">${name}</div>
            <div class="contact-info-mail">${mail}</div>
        </div>`;
    }
}

function deleteTest() {
    for (let i = 0; i < contacts.length; i++) {
        contacts.splice(1, 3)

    }
}