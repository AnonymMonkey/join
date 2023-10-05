let contacts = [];

async function userSelection() {
    debugger
    await loadContacts();

    let selectElement = document.getElementById("frame74_select");
    let option = document.createElement("option");

    selectElement.innerHTML = '';

    /*     for (let i = 0; i < contacts.length; i++) {
            let contact = contacts[i]['register_entry'][0];
            let name = contact['contact_name'];
            let initials = contact['contact_initials'];
            let ID = contact['contact_ID'];
    
            option.value = name;
            option.textContent = name;
            selectElement.appendChild(option);
    
            // Initialen hinzufügen
            let initialsSpan = document.createElement("span");
            initialsSpan.textContent = initials + " ";
            selectElement.options[selectElement.options.length - 1].appendChild(initialsSpan);
    
            // Checkbox hinzufügen
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "assigned_users";
            checkbox.value = name;
            selectElement.options[selectElement.options.length - 1].appendChild(checkbox);
        } */
}