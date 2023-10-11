async function contactsInit() {
    includeHTML();
    await loadData();
    getCategoryLetter();
    createRegisterEntry();
    adjustQuicklinkBG();
}

