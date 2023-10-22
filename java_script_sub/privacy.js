/**
 * rendering page "privacy data protection"
 */
async function privacyInit(){
    await includeHTML();
    adjustQuicklinkBG();
}

/**
 * opens last visited page
 */
function openLastSite(){
    window.history.back();
}