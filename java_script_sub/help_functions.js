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
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(function (char) {
            return char + char;
        }).join('');
    }

    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);

    return {
        r: r,
        g: g,
        b: b
    };
}