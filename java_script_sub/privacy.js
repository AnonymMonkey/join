async function privacyInit(){
    await includeHTML();
    adjustQuicklinkBG();
    detectDarkmode();
}

function openLastSite(){
    window.history.back();
}