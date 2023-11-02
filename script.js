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
  let isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;  
  if(isDarkMode)
  {
    let link = document.getElementById('favicon');    
    link.setAttribute('href', '../assets/img/logo_light.png');
  }
}

/**
 * Show infobox if Site is in Landscape-Mode
 */
// function checkViewPort() {
//   if (screen.availHeight < screen.availWidth) {

//     if(screen.availHeight < 440){
//       document.body.innerHTML = " Leer ";
//     }

//   }else{
//     location.reload();
//   }
// }
// window.onresize = checkViewPort;