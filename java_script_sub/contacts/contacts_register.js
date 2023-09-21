let contacts = [];
let categories = [];

const generatedIDs = new Set();
const generatedColors = new Set();

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// CREATE CONTACT ||||||||||||||||||||||||||||||||||||||||||| //

async function createContact() {
    /* debugger */
    create_btn.disable = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();
    createRegister();
    closeAddContactOverlay();
    contactsInit();
}


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// GET VALUES ||||||||||||||||||||||||||||||||||||||||||||||| //

function getValues() {
    getCategoryLetter();
    getJSON_Entry();
}

function getCategoryLetter() {
    let name = contact_name.value;
    let firstLetter = name[0].toUpperCase();

    if (!categories.includes(firstLetter)) {
        categories.push(firstLetter);
    }
}

function getJSON_Entry() {
    contacts.push({
        'register_entry': [
            {
                'contact_name': contact_name.value,
                'contact_mail': contact_mail.value,
                'contact_phone': contact_phone.value,
                'contact_color': randomColor(),
                'contact_initials': getContactFirstLetters(),
                'contact_ID': randomID(),
            }
        ]
    });
}

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// STORAGE |||||||||||||||||||||||||||||||||||||||||||||||||| //

async function saveData() {
    await saveToStorage('categories', categories);
    await saveToStorage('contacts', contacts);
}

async function saveToStorage(key, data) {
    try {
        await setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Saving error:', e);
    }
}

async function loadData() {
    await loadFromStorage('contacts', contacts);
    await loadFromStorage('categories', categories);
}

async function loadFromStorage(key, data) {
    try {
        const storedData = await getItem(key);
        if (storedData) {
            Object.assign(data, JSON.parse(storedData));
        }
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
    let categoryHTML = ""; // Erstellen Sie ein temporäres HTML-Template

    for (let i = 0; i < categories.length; i++) {
        let contactCategory = categories[i];
        categoryHTML += /* html */`
            <div id="category_${contactCategory}">
                <div class="contact-letter">${contactCategory}</div>
            </div>
            <img src="../assets/img/contacts/cutline2.svg">
        `;
    }

    register.innerHTML = categoryHTML;
}

function createRegisterInfo() {
    let register = elementByID('register');
    let infoHTML = "";

    for (let category of categories) {
        let categoryContacts = contacts.filter(contact => {
            let firstLetter = contact['register_entry'][0]['contact_name'][0].toUpperCase();
            return firstLetter === category;
        });

        for (let contact of categoryContacts) {
            let registerEntry = contact['register_entry'][0];
            let name = registerEntry['contact_name'];
            let mail = registerEntry['contact_mail'];
            let ID = registerEntry['contact_ID'];
            let color = registerEntry['contact_color'];

            let contactHTML = `
                <div id="contactID_${ID}" class="contact-info pointer">
                    <div id="contactLettersID_${ID}" class="first-letters"></div>
                    <div>
                        <div class="contact-info-name">${name}</div>
                        <div class="contact-info-mail">${mail}</div>
                    </div>
                </div>
            `;

            infoHTML += contactHTML;
            contactFirstLettersBG(ID, color);
        }
    }

    register.innerHTML = infoHTML;
}



function getContactFirstLetters() {
    let name = contact_name.value
    let words = name.split(' ');

    let firstInitial = words[0].charAt(0).toUpperCase();
    let secondInitial = words[1].charAt(0).toUpperCase();

    let initials = firstInitial + secondInitial;

    return initials;
}

function contactFirstLettersBG(ID, color, registerEntry) {
    let element = elementByID(`contactLettersID_${ID}`);

    if (element) {
        element.style.backgroundColor = color;
    } else {
        console.error(`Element with ID contactLettersID_${ID} not found.`);
    }
}

function contactInitials(ID, color, registerEntry) {
    contactFirstLettersBG(ID, color, registerEntry);
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
    for (let i = 0; i < categories.length; i++) {
        categories.splice(1, 3)
        saveData();
    }
}