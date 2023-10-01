function openContactOverlay() {
    let overlayBg = elementByID("overlay-bg");
    let overlayContent = elementByID("overlay-content");

    overlayContent.classList.remove("slideOut");

    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");

    overlayContent.classList.add("slide-in");

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-none");
    }
}

function closeContactOverlay() {
    let overlayBg = elementByID("overlay-bg");
    let overlayContent = elementByID("overlay-content");

    overlayContent.classList.add("slideOut");

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-flex");
        overlayBg.classList.add("d-none");
        overlayContent.classList.remove("slideOut");
    }
}
