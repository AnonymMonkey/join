let categories = [];

/**
 * Close Dialogs on Overlay-BG
 * @param {string} event - event-data
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Changing Favicon if Darkmode is true
 */
function detectDarkmode() {
  let isDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;

  let basePath = window.location.pathname.includes("/html-sub/") ? "../assets/img/" : "assets/img/";

  if (isDarkMode) {
    let link = document.getElementById("favicon");
    link.setAttribute("href", basePath + "logo_light.png");
  }
}

/**
 * Show infobox if Site is in Landscape-Mode
 */
function checkViewPort() {
  if (screen.availHeight < screen.availWidth) {
    if (screen.availHeight < 440) {
      body = document.body;
      body.innerHTML = "";

      let basePath = window.location.pathname.includes("/html-sub/") ? "../assets/img/" : "assets/img/";

      body.innerHTML = /*html*/ `
        <div id="landscape">
         <img id="landscapeImg" src="${basePath}favicon.png">
         <div id="landscapeText">Sorry! Join is built to be used in portrait mode.</div>
         </div>
       `;
    }
  } else {
    location.reload();
  }
}
window.onresize = checkViewPort;
