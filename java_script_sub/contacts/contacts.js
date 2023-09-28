async function contactsInit() {
    includeHTML();
    await loadData();

    createRegisterEntry();
    adjustQuicklinkBG();
}

