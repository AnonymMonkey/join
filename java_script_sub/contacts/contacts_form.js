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

    console.log(mailInput);
    console.log(currentMail);

    if (mailInput !== currentMail) {
        if (emailAddresses.includes(mailInput)) {
            alert("Fehler: Die E-Mail-Adresse existiert bereits!");
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