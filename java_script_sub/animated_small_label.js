function smallAnimatedLabel(message) {
    const timeout = 500;

    setTimeout(() => {
        const overlay = document.createElement("div");
        overlay.classList.add("small-overlay");

        overlay.textContent = message;

        overlay.style.position = "fixed";
        overlay.style.right = "-50vw";
        overlay.style.transition = "all 0.3s ease-in-out";
        overlay.style.zIndex = "9999";

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.right = "20vw";
        }, 10);

        setTimeout(() => {
            overlay.style.right = "-50vw";
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 2000);
        }, 2000);
    }, timeout);
}
