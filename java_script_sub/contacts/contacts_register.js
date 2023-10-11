let contacts = [];

const generatedIDs = new Set();
const generatedColors = new Set();

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// CREATE CONTACT ||||||||||||||||||||||||||||||||||||||||||| //

async function createContact() {
    let nameIsValid = checkName();
    if (!nameIsValid) {
        return;
    }
    create_btn.disable = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();
    createRegisterEntry();

    closeContactOverlay();
    smallAnimatedLabel("Contact succesfully created");
    contactsInit();
    showContact(getLastJsonObjectID());
}

async function createContactLight() {
    let nameIsValid = checkName();
    if (!nameIsValid) {
        return;
    }
    create_btn.disable = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();

    closeContactOverlay();
    smallAnimatedLabel("Contact succesfully created");
}


// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// GET VALUES ||||||||||||||||||||||||||||||||||||||||||||||| //

async function getValues() {
    getCategoryLetter();
    getJSON_Entry();
}

function getCategoryLetter() {
    categories = [];
    for (let i = 0; i < contacts.length; i++) {
        let contactName = contacts[i]['register_entry'][0]['contact_name'];
        let firstLetter = contactName[0].toUpperCase();
        if (!categories.includes(firstLetter)) {
            categories.push(firstLetter);
        }
    }
}

function getJSON_Entry() {
    contacts.push({
        'register_entry': [
            {
                'contact_name': contact_name.value,
                'contact_mail': contact_mail.value,
                'contact_phone': `${contact_phone.value}`,
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

async function createRegister() {
    let register = elementByID('register');
    register.innerHTML = createRegisterEntry();
}

function createRegisterEntry() {
    createRegisterInfo();
}


function createRegisterInfo() {
    let register = elementByID('register');
    let infoHTML = "";

    for (let category of categories.sort()) {
        let categoryContacts = contacts.filter(contact => {
            let firstLetter = contact['register_entry'][0]['contact_name'][0].toUpperCase();
            return firstLetter === category;
        });

        infoHTML += `
            <div id="category_${category}">
                <div class="contact-letter">${category}</div>
            </div>
            <img src="../assets/img/contacts/cutline2.svg">
        `;

        for (let contact of categoryContacts) {
            let registerEntry = contact['register_entry'][0];
            let name = registerEntry['contact_name'];
            let mail = registerEntry['contact_mail'];
            let initials = registerEntry['contact_initials'];
            let ID = registerEntry['contact_ID'];
            let color = registerEntry['contact_color'];

            let contactHTML = `
                <div onclick="showContact(${ID})" data-contact-id="contactID_${ID}" class="contact-info pointer">
                    <div id="contactLettersID_${ID}" class="first-letters" ${contactFirstLettersBG(color)}>${initials}</div>
                    <div>
                        <div class="contact-info-name">${name}</div>
                        <div class="contact-info-mail">${mail}</div>
                    </div>
                </div>
            `;

            infoHTML += contactHTML;
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