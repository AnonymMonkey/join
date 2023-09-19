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