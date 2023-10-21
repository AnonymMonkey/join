async function legalInit(){
    await includeHTML();
    adjustQuicklinkBG();
    detectDarkmode();
}

function openLastSite(){
    window.history.back();
}