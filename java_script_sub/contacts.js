function openAddContactOverlay() {
    // Das Overlay und das Dialogfenster anzeigen
    let overlayBg = document.getElementById("overlay-bg");
    let overlayContent = document.getElementById("overlay-content");

    overlayBg.style.display = "flex";
    overlayContent.style.display = "flex";

    // Das Dialogfenster von rechts hereinschieben
    overlayContent.style.right = "0";
}

function closeAddContactOverlay() {
    // Das Overlay und das Dialogfenster ausblenden
    let overlayBg = document.getElementById("overlay-bg");
    let overlayContent = document.getElementById("overlay-content");

    overlayBg.style.display = "none";
    overlayContent.style.display = "none";

    // Das Dialogfenster wieder nach rechts außerhalb des Monitors schieben
    overlayContent.style.right = "-100%";
}

// Hier können Sie weitere JavaScript-Funktionen hinzufügen, um das Dialogfenster zu steuern.
