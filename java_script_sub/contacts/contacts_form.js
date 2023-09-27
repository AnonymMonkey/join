function checkName() {
    var nameInput = document.getElementById("contact_name").value;
    var namenParts = nameInput.split(" ");

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