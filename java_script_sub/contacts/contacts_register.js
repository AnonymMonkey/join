let contacts = [{
    'register_category': [],
    'register_entry': [{
        'contact_name': [],
        'contact_mail': [],
        'contact_phone': [],
        'contact_color': [],
        'contact_ID': []
    }]
}];

let categories = [];
const generatedIDs = new Set();
const generatedColors = new Set();

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// CREATE CONTACT ||||||||||||||||||||||||||||||||||||||||||| //

function createContact() {
    create_btn.disabled = true;
    getValues();
    saveContact();
    resetContactsForm();
    loadContacts();
    closeAddContactOverlay();
}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// GET VALUES ||||||||||||||||||||||||||||||||||||||||||||||| //

function getValues() {
    getCategoryLetter();
    getEntry();
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
        let category = contacts[i]['register_category'];
        category.push(categories)
    }
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

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// STORAGE |||||||||||||||||||||||||||||||||||||||||||||||||| //

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

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// CREATE REGISTER |||||||||||||||||||||||||||||||||||||||||| //

function createRegister() {
    let register = elementByID('register');
    register.innerHTML = createRegisterEntry();
}

function createRegisterEntry() {
    createRegisterCategory();
    createRegisterInfo();
}

function createRegisterCategory() {
    let register = elementByID('register');
    for (let i = 0; i < contacts.length; i++) {
        let contactCategory = contacts[i]['register_category'][i];
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
    for (let i = 0; i < contacts[i]['register_entry'].length; i++) {
        let registerEntry = contacts[i]['register_entry'][i];
        let name = registerEntry['contact_name'];
        let mail = registerEntry['contact_mail'];
        let ID = registerEntry['contact_ID'];
        let color = registerEntry['contact_color'];
        register.innerHTML += /* html */`
        <div id="contactID_${ID}" class="contact-info pointer">
            <div id="contactLettersID_${ID}" class="first-letters"></div>
            <div>
                <div class="contact-info-name">${name}</div>
                <div class="contact-info-mail">${mail}</div>
            </div>
        </div>`;
        contactInitials(`${name}`, `${ID}`, `${color}`)
    }
}

function contactFirstLettersBG(ID, color) {
    let element = elementByID(`contactLettersID_${ID}`);
    element.style.backgroundColor = color;
}

function contactFirstLetters(ID, name) {
    let element = elementByID(`contactLettersID_${ID}`);
    let words = name.split(' ');

    let firstInitial = words[0].charAt(0).toUpperCase();
    let secondInitial = words[1].charAt(0).toUpperCase();

    let initials = firstInitial + secondInitial;

    element.innerHTML = initials;
}

function contactInitials(name, ID, color) {
    contactFirstLetters(ID, name);
    contactFirstLettersBG(ID, color);
}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// RESET & DELETE ||||||||||||||||||||||||||||||||||||||||||| //

function resetContactsForm() {
    contact_name.value = '';
    contact_mail.value = '';
    contact_phone.value = '';
    create_btn.disabled = false;
}

function deleteTest() {
    for (let i = 0; i < contacts.length; i++) {
        contacts.splice(1, 3)
        saveContact();
    }
}