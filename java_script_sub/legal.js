/**
 * rendering page "legal  notice"
 */
async function legalInit(){
    await includeHTML();
    adjustQuicklinkBG();
}

/**
 * opens last visited page
 */
function openLastSite(){
    window.history.back();
}