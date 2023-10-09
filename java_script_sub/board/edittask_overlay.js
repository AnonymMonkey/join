function openEditTaskOverlay() {
    let overlayBg = elementByID("overlay-bg-editTask");
    let overlayContent = elementByID("overlay-content-editTask");
    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");
    closeTaskOverlay();
    overlayContent.style.right = "0";    
    overlayBg.classList.remove("d-none");
}

function closeEditTaskOverlay() {    
    let overlayBg = elementByID("overlay-bg-editTask");
    let overlayContent = elementByID("overlay-content-editTask");

    overlayContent.classList.add("slideOut");

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-flex");
        overlayBg.classList.add("d-none");
        overlayContent.classList.remove("slideOut");
    }
}
