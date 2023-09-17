function openAddContactOverlay() {
    let overlayBg = document.getElementById("overlay-bg");
    let overlayContent = document.getElementById("overlay-content");

    overlayContent.classList.remove("slideOut");

    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");

    overlayContent.classList.add("slide-in");
    overlayContent.style.right = "0";

    // Warten Sie auf das Ende der Animation, bevor Sie "d-none" entfernen.
    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        // Entfernen Sie "d-none" erst, wenn die Animation abgeschlossen ist.
        overlayBg.classList.remove("d-none");
    }
}

function closeAddContactOverlay() {
    let overlayBg = document.getElementById("overlay-bg");
    let overlayContent = document.getElementById("overlay-content");

    overlayContent.classList.add("slideOut");

    overlayContent.addEventListener("animationend", onAnimationEnd);

    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-flex");
        overlayBg.classList.add("d-none");
        overlayContent.classList.remove("slideOut");
    }
}

/*
ChatGPT

Es tut mir leid für die vorherigen Vorschläge. Das Problem könnte durch das Hinzufügen des "d-none" -Zustands beim zweiten Aufruf von closeAddContactOverlay() verursacht werden, und die animationend-Events werden möglicherweise nicht wie erwartet ausgelöst. Um sicherzustellen, dass das Element "overlay-content" beim zweiten Aufruf von openAddContactOverlay() korrekt angezeigt wird, können Sie requestAnimationFrame verwenden, um sicherzustellen, dass die Klassenzuweisungen und Animationen vor dem Zurücksetzen der Klasse "d-none" abgeschlossen sind. Hier ist eine mögliche Lösung:
In dieser Lösung wird das Event "animationend" verwendet, um sicherzustellen, dass das Element "overlay-content" seine Animation abgeschlossen hat, bevor die Klasse "d-none" entfernt wird. Dadurch wird verhindert, dass das Element beim zweiten Aufruf von openAddContactOverlay() unsichtbar bleibt.
*/