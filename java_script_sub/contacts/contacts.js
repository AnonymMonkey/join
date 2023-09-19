
async function contactsInit() {
    includeHTML();

    await loadContacts();
    deleteTest();
    await setItem('contacts', JSON.stringify(contacts));
    createRegister();
}

