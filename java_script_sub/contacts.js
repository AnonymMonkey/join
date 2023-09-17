function openAddContactOverlay() {
    let overlayBg = document.getElementById("overlay-bg");
    let overlayContent = document.getElementById("overlay-content");

    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");

    overlayContent.classList.add("slide-in");
    overlayContent.addEventListener("animationend", function () {
        overlayContent.style.right = "0";
    });
}

function closeAddContactOverlay() {
    let overlayBg = document.getElementById("overlay-bg");
    let overlayContent = document.getElementById("overlay-content");

    overlayContent.classList.add("slideOut");

    overlayContent.addEventListener("animationend", function () {
        overlayBg.classList.add("d-none");
        overlayBg.classList.remove("d-flex");
        overlayContent.classList.remove("slideOut");
    });
}
