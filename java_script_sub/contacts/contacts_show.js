let selectedContact = null;

/**
 * This function shows the contact informations when click on a contact in the register
 *
 * @param {number} ID - This is the ID from the specific contact
 */
/**
 * Show the details of a contact based on its ID
 *
 * @param {number} ID - The ID of the contact to display
 */
function showContact(ID) {
  if (window.innerWidth <= 1200) {
    elementByID("contact_register").classList.add("d-none");
  }

  // Find the contact by ID
  let contact = contacts.find((contact) => contact.contact_ID === ID);

  if (!contact) {
    console.error("Contact not found");
    return;
  }

  let { contact_name: name, contact_mail: mail, contact_phone: phone, contact_initials: initials, contact_color: color } = contact;

  let contactElements = document.querySelectorAll(".contact-info");
  contactElements.forEach((contactElement) => {
    contactElement.classList.remove("active");
  });

  let selectedContactElement = document.querySelector(`[data-contact-id="contactID_${ID}"]`);
  if (selectedContactElement) {
    selectedContactElement.classList.add("active");
  } else {
    console.error("Selected contact element not found");
  }

  selectedContact = {
    name,
    mail,
    phone,
    initials,
    color,
    ID,
  };

  let show = elementByID("show_contact");

  show.style.right = "-65vw";

  setTimeout(() => {
    show.style.right = "0";
    show.innerHTML = showContact_html(name, mail, phone, initials, color, ID);
  }, 200);
}

function getLastJsonObjectID() {
  let lastEntry = contacts[contacts.length - 1];
  let lastEntryID = lastEntry.contact_ID;
  return lastEntryID;
}

/**
 * Return to register - Responsive
 */
function returnToRegister() {
  let show = elementByID("show_contact");

  show.style.right = "-100vw";
  setTimeout(() => {
    elementByID("contact_register").classList.remove("d-none");
  }, 200);
}
