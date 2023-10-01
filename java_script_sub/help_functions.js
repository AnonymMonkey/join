function elementByID(id) {
    return document.getElementById(id);
}

function randomColor() {
    let color;

    do {
        color = Math.floor(Math.random() * 16777215).toString(16);
    } while (generatedColors.has(color));

    generatedColors.add(color);
    color = '#' + color;
    return color;
}

function randomID() {
    let id;

    do {
        id = Math.floor(Math.random() * 10000);
    } while (generatedIDs.has(id));

    generatedIDs.add(id);

    return id;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function hexToRgb(hex) {
    // Entferne das #-Zeichen, falls es vorhanden ist
    hex = hex.replace(/^#/, '');

    // Überprüfe, ob die Hexadezimalfarbe 3 oder 6 Zeichen hat
    if (hex.length === 3) {
        // Konvertiere 3-Zeichen-Hex in 6-Zeichen-Hex
        hex = hex.split('').map(function (char) {
            return char + char;
        }).join('');
    }

    // Zerlege den 6-Zeichen-Hex in RGB-Komponenten
    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);

    // Gib das RGB-Farbobjekt zurück
    return {
        r: r,
        g: g,
        b: b
    };
}

// Event-Handler für Kontakt-Klicks
document.querySelectorAll('.contact-info').forEach(contact => {
    contact.addEventListener('click', function () {
        // Entferne die "selected" Klasse von allen Kontakten
        document.querySelectorAll('.contact-info').forEach(otherContact => {
            otherContact.classList.remove('selected');
        });

        // Füge die "selected" Klasse zum ausgewählten Kontakt hinzu
        this.classList.add('selected');
    });
});