function openEditTaskOverlay() {
    let overlayBg = elementByID("overlay-bg-editTask");
    
    if (overlayBg.clientWidth <= 2000) {
        document.getElementById('defaultStyle').disabled = true;
        document.getElementById('smallScreenStyle').disabled = false;
    }

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
    overlayBg.classList.remove("d-flex");
    overlayBg.classList.add("d-none");    
    document.getElementById('defaultStyle').disabled = false;
    document.getElementById('smallScreenStyle').disabled = true;
}
