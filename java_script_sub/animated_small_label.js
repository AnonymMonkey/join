function smallAnimatedLabel(message) {
    const timeout = 500; // Verzögerung in Millisekunden (0,5 Sekunden)

    setTimeout(() => {
        // Erstellen Sie ein Div-Element mit der Klasse "small-overlay"
        const overlay = document.createElement("div");
        overlay.classList.add("small-overlay");

        // Fügen Sie den Text für Ihre Meldung hinzu
        overlay.textContent = message;

        // Stil für das Overlay festlegen
        overlay.style.position = "fixed";
        overlay.style.right = "-50vw";
        overlay.style.transition = "all 0.3s ease-in-out";
        overlay.style.zIndex = "9999";

        // Das Overlay zum Body hinzufügen
        document.body.appendChild(overlay);

        // Timeout setzen, um die Animation zu starten (nach 0,5 Sekunden)
        setTimeout(() => {
            overlay.style.right = "20vw";
        }, 10);

        // Timeout setzen, um das Overlay nach 1 Sekunde zu entfernen
        setTimeout(() => {
            overlay.style.right = "-50vw";
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 2000);
        }, 2000);
    }, timeout);
}
