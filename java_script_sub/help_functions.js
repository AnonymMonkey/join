function elementByID(id) {
    return document.getElementById(id);
}

/*  */
function randomColor() {
    let color;

    do {
        color = Math.floor(Math.random() * 16777215).toString(16);
        color = '#' + '0'.repeat(6 - color.length) + color; // Stellt sicher, dass color immer 6 Zeichen hat
    } while (generatedColors.has(color));

    generatedColors.add(color);
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
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(function (char) {
            return char + char;
        }).join('');
    }

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    return {
        r: r,
        g: g,
        b: b
    };
}

function contactFirstLettersBG(color) {
    let rgb = hexToRgb(color);

    let backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    return `style="background-color: ${backgroundColor};"`;
}


/* contacts help */
function getIndexOf(ID) {
    let position = contacts.findIndex(entry => entry.register_entry[0].contact_ID === ID);
    return position;
}

function getIndexOfJson(ID) {
    let pos = contacts[getIndexOf(ID)]['register_entry'][0];
    return pos;
}