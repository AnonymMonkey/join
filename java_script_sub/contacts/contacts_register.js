let contacts = [];
let activeUserID;
let activeUserLoginMail;
let activeUserLoginData;

const generatedIDs = new Set();
const generatedColors = new Set();

/**
 * Create a new contact
 * @returns abort if condition is true
 */
async function createContact() {
  let nameIsValid = checkName();
  let mailIsValid = checkNewMail();
  if (!nameIsValid || !mailIsValid) {
    return;
  }
  create_btn.disabled = true;
  await getValues();
  await saveContacts();
  resetContactsForm();
  await loadContacts();
  createRegisterEntry();

  closeContactOverlay();
  smallAnimatedLabel("Contact succesfully created");
  await contactsInit();
  showContact(getLastJsonObjectID());
}

/**
 * Create a new contact from board
 * @returns abort if condition is true
 */
async function createContactLight() {
  let nameIsValid = checkName();
  let mailIsValid = checkNewMail();
  if (!nameIsValid || !mailIsValid) {
    return;
  }
  create_btn.disabled = true;
  await getValues();
  await saveContacts();
  resetContactsForm();
  await loadContacts();

  closeContactOverlay();
  smallAnimatedLabel("Contact succesfully created");
}

/**
 * Getting values
 */
async function getValues() {
  getCategoryLetter();
  await addNewContact();
}

/**
 * This function get all names of JSON contacts and iterate it for the first letters and create a new array
 *
 */
function getCategoryLetter() {
  categories = [];
  for (let i = 0; i < contacts.length; i++) {
    let contactName = contacts[i].contact_name;
    let firstLetter = contactName[0].toUpperCase();
    if (!categories.includes(firstLetter)) {
      categories.push(firstLetter);
    }
  }
}

/**
 * Add a new contact to the contacts array.
 */
async function addNewContact() {
  const newContact = {
    contact_ID: randomID(),
    contact_color: randomColor(),
    contact_initials: getContactFirstLetters(),
    contact_mail: contact_mail.value,
    contact_name: contact_name.value,
    contact_phone: contact_phone.value,
  };

  contacts.push(newContact);
  await saveContacts();
}

/**
 * Save categories and contacts to Firebase Realtime Database.
 */
async function saveData() {
  await saveToStorage("categories", categories);
  await saveContacts();
}

/**
 * Save contacts to Firebase Realtime Database.
 */
async function saveContacts() {
  try {
    await setItem("contacts", contacts);
  } catch (e) {
    console.error("Error saving contacts:", e);
  }
}

/**
 * This function set the data for the remote storage or gives a error
 *
 * @param {string} key - This is the key for the remote storage
 * @param {string} data - This is the value for the remote storage
 */
async function saveToStorage(key, data) {
  try {
    await setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Saving error:", e);
  }
}

/**
 * Load categories and contacts from Firebase Realtime Database.
 */
async function loadData() {
  categories = await loadFromStorage("categories");
  contacts = await loadContacts();
}

/**
 * Load contacts from Firebase Realtime Database.
 * @returns {Array} - Returns the contacts or an empty array in case of error
 */
async function loadContacts() {
  try {
    const storedContacts = await getItem("contacts");
    return Array.isArray(storedContacts) ? storedContacts : [];
  } catch (e) {
    console.error("Error loading contacts:", e);
    return [];
  }
}

/**
 * This function gets the data from the remote storage or returns an error
 *
 * @param {string} key - This is the key for the remote storage
 * @returns {Array|Object} - Returns the fetched data or an empty array in case of error
 */
async function loadFromStorage(key) {
  try {
    const storedData = await getItem(key);

    if (typeof storedData === "string") {
      return JSON.parse(storedData);
    } else if (typeof storedData === "object" && storedData !== null) {
      return storedData;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Loading error:", e);
    return [];
  }
}

/**
 * This function created the contact register
 *
 */
async function createRegister() {
  let register = elementByID("register");
  register.innerHTML = createRegisterEntry();
}

/**
 * This function get the information for creating contact register
 *
 */
function createRegisterEntry() {
  createRegisterInfo();
}

/**
 * This function craft the construct for the contact register
 *
 */
function createRegisterInfo() {
  let register = elementByID("register");
  let infoHTML = "";

  for (let category of categories.sort()) {
    let categoryContacts = contacts.filter((contact) => {
      let firstLetter = contact.contact_name[0].toUpperCase();
      return firstLetter === category;
    });
    infoHTML += createContactCategory_html(category);
    infoHTML += sortContactToCategory(categoryContacts);
  }
  register.innerHTML = infoHTML;
}

/**
 * This function sorts the contacts into the appropriate category
 *
 * @param {JSON} categoryContacts - a JSON structure of a contact
 * @returns the html structure of sorted contacts
 */
function sortContactToCategory(categoryContacts) {
  let infoHTML = "";

  for (let contact of categoryContacts) {
    let name = contact.contact_name;
    let mail = contact.contact_mail;
    let initials = contact.contact_initials;
    let ID = contact.contact_ID;
    let color = contact.contact_color;
    let contactHTML = createContactEntry_html(ID, color, initials, name, mail);
    infoHTML += contactHTML;
  }

  return infoHTML;
}

/**
 * Get initials from logged-in User
 * @param {string} nameFromLogin - name from logged-in user
 * @returns - initials of logged-in user
 */
function getContactFirstLetters(nameFromLogin) {
  let loginName = nameFromLogin;
  if (loginName) {
    let words = loginName.split(" ");

    let firstInitial = words[0].charAt(0).toUpperCase();
    let secondInitial = words[1].charAt(0).toUpperCase();

    let initials = firstInitial + secondInitial;

    return initials;
  } else {
    let name = contact_name.value;
    let words = name.split(" ");

    let firstInitial = words[0].charAt(0).toUpperCase();
    let secondInitial = words[1].charAt(0).toUpperCase();

    let initials = firstInitial + secondInitial;

    return initials;
  }
}

/**
 * Reset html-form (set inputs empty)
 */
function resetContactsForm() {
  contact_name.value = "";
  contact_mail.value = "";
  contact_phone.value = "";
  create_btn.disabled = false;
}

/**
 * Add active User to contacts if not exist on first login
 */
async function addActiveUserToContacts() {
  getLoginData();
  let isFound = false;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].contact_mail == activeUserLoginMail) {
      isFound = true;
    }
  }
  pushContact(isFound);
}

/**
 * Pushes user to contactslist if the user is not already in it
 * @param {Boolean} isFound returns true if user is already in the contactslist
 */
async function pushContact(isFound) {
  if (!isFound) {
    contacts.push({
      contact_name: activeUserLoginData[0].name,
      contact_mail: activeUserLoginData[0].email,
      contact_phone: "please add phonenumber",
      contact_color: randomColor(),
      contact_initials: getContactFirstLetters(activeUserLoginData[0].name),
      contact_ID: randomID(),
    });
    await saveData();
  }
}

/**
 * This function selected the active Loginuser and check with contacts if is your contact and write a YOU behind it
 *
 */
function loginIsYourContact() {
  getLoginData();
  for (let i = 0; i < contacts.length; i++) {
    let contactMail = contacts[i].contact_mail;
    let checkedMail = contactMail.includes(activeUserLoginMail);

    if (checkedMail) {
      let contactEntry = getIndexOfJson("contact_mail", contactMail);
      let entryMail = contactEntry.contact_mail;
      let entryName = contactEntry.contact_name;
      let entryID = contactEntry.contact_ID;
      let contactRegisterName = elementByID(`contact_name_${entryID}`);

      if (entryMail == activeUserLoginMail) {
        contactRegisterName.innerHTML += ` <b>(You)</b>`;
      } else {
        contactRegisterName.innerHTML = entryName;
      }
    }
  }
}

/**
 * Get all Data from localstorage for the active User
 */
function getLoginData() {
  let activeUserContactAsText = localStorage.getItem("loginData");
  if (activeUserContactAsText) {
    activeUserLoginData = JSON.parse(activeUserContactAsText);
    activeUserLoginMail = activeUserLoginData[0].email;
  }
}
