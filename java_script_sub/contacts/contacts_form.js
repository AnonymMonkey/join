function checkName() {
    let nameInput = elementByID("contact_name").value;
    let namenParts = nameInput.split(" ");

    if (namenParts.length !== 2) {
        alert("Bitte geben Sie genau zwei Namen mit Leerzeichen dazwischen ein.");
        return false;
    }

    for (var i = 0; i < namenParts.length; i++) {
        if (namenParts[i][0] !== namenParts[i][0].toUpperCase()) {
            alert("Die Namen sollten mit einem Großbuchstaben beginnen.");
            return false;
        }
    }

    return true;
}

let emailAddresses = [];

function checkMail(ID) {
    searchMailsInJSON();
    let mailInput = elementByID("contact_mail").value;
    let currentMail = getIndexOfJson(ID)['contact_mail'];
  
    if (mailInput !== currentMail) {
        if (emailAddresses.includes(mailInput)) {            
            let mailExists = elementByID("mailExists");
            mailExists.classList.remove('d-none');
            return false;
        }
    }
    return true;
}

function searchMailsInJSON() {
    contacts.forEach(entry => {
        let registerEntry = entry.register_entry[0];

        emailAddresses.push(registerEntry.contact_mail);
    });
}