let contacts = [];
let activeUserID;
let activeUserLoginMail;
let activeUserLoginData;

const generatedIDs = new Set();
const generatedColors = new Set();

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||| //
// CREATE CONTACT ||||||||||||||||||||||||||||||||||||||||||| //

async function createContact() {
    let nameIsValid = checkName();
    let mailIsValid = checkNewMail();
    if (!nameIsValid || !mailIsValid) {
        return;
    }
    create_btn.disable = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();
    createRegisterEntry();

    closeContactOverlay();
    smallAnimatedLabel('Contact succesfully created');
    contactsInit();
    showContact(getLastJsonObjectID());
}

async function createContactLight() {
    let nameIsValid = checkName();
    let mailIsValid = checkMail();
    if (!nameIsValid && !mailIsValid) {
        return;
    }
    create_btn.disable = true;
    await getValues();
    await saveData();
    resetContactsForm();
    await loadData();

    closeContactOverlay();
    smallAnimatedLabel('Contact succesfully created');
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
        register_entry: [
            {
                contact_name: contact_name.value,
                contact_mail: contact_mail.value,
                contact_phone: `${contact_phone.value}`,
                contact_color: randomColor(),
                contact_initials: getContactFirstLetters(),
                contact_ID: randomID(),
            },
        ],
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
    let infoHTML = '';

    for (let category of categories.sort()) {
        let categoryContacts = contacts.filter((contact) => {
            let firstLetter =
                contact['register_entry'][0]['contact_name'][0].toUpperCase();
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
                        <div id="contact_name_${ID}" class="contact-info-name">${name}</div>
                        <div class="contact-info-mail">${mail}</div>
                    </div>
                </div>
            `;

            infoHTML += contactHTML;
        }
    }

    register.innerHTML = infoHTML;

}

// TODO: param wird nur mitgegeben, wenn Name vom Login kommt ansonsten wird else gecalled - SIMON
function getContactFirstLetters(nameFromLogin) {
    let loginName = nameFromLogin;
    if (loginName) {
        let words = loginName.split(' ');

        let firstInitial = words[0].charAt(0).toUpperCase();
        let secondInitial = words[1].charAt(0).toUpperCase();

        let initials = firstInitial + secondInitial;

        return initials;
    } else {
        let name = contact_name.value;
        let words = name.split(' ');

        let firstInitial = words[0].charAt(0).toUpperCase();
        let secondInitial = words[1].charAt(0).toUpperCase();

        let initials = firstInitial + secondInitial;

        return initials;
    }
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
        categories.splice(1, 3);
        saveData();
    }
}


async function addActiveUserToContacts() {
    getLoginData();

    let x = 0;

    for (let i = 0; i < contacts.length; i++) {


        if (contacts[i]['register_entry'][0]['contact_mail'] == activeUserLoginMail) {
            activeUserID = contacts[i]['register_entry'][0].contact_ID;
        } else {
            x++;
        }
    }

    if (x > 0) {
        contacts.push({
            register_entry: [
                {
                    contact_name: activeUserLoginData[0].name,
                    contact_mail: activeUserLoginData[0].email,
                    contact_phone: `please add phonenumber`,
                    contact_color: randomColor(),
                    contact_initials: getContactFirstLetters(activeUserLoginData[0].name),
                    contact_ID: randomID(),
                },
            ],
        });
        await saveData();
    }
}

function loginIsYourContact() {
    /* debugger */

    getLoginData();
    for (let i = 0; i < contacts.length; i++) {
        let contactMail = contacts[i]['register_entry'][0]['contact_mail'];
        let checkedMail = contactMail.includes(activeUserLoginMail);
        if (checkedMail) {
            let contactEntry = getIndexOfJson('mail', contactMail);
            let entryMail = contactEntry['contact_mail'];
            let entryName = contactEntry['contact_name'];
            let entryID = contactEntry['contact_ID'];
            let contactRegisterName = elementByID(`contact_name_${entryID}`);
            if (entryMail == activeUserLoginMail) {
                contactRegisterName.innerHTML += ` <b>(You)`;
            } else {
                contactRegisterName.innerHTML = entryName;
            }
        }
    }
}

function getLoginData() {
    let activeUserContactAsText = localStorage.getItem('loginData');
    if (activeUserContactAsText) {
        activeUserLoginData = JSON.parse(activeUserContactAsText);
        activeUserLoginMail = activeUserLoginData[0].email;
    }
}