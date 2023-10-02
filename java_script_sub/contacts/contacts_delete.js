async function deleteContact(ID) {
    let showArea = elementByID('show_contact')

    // Bestätigungsnachricht anzeigen
    const confirmDelete = window.confirm('Sind Sie sicher, dass Sie diesen Kontakt löschen möchten?');

    if (!confirmDelete) {
        return; // Abbrechen, wenn der Benutzer die Löschung nicht bestätigt
    }

    const indexToDelete = contacts.findIndex(contact => contact['register_entry'][0]['contact_ID'] === ID);

    if (indexToDelete !== -1) {
        const contactCategory = contacts[indexToDelete]['register_entry'][0]['contact_name'][0].toUpperCase();

        contacts.splice(indexToDelete, 1);

        const categoryContactsExist = contacts.some(contact => {
            const firstLetter = contact['register_entry'][0]['contact_name'][0].toUpperCase();
            return firstLetter === contactCategory;
        });

        if (!categoryContactsExist) {
            const categoryIndex = categories.indexOf(contactCategory);
            if (categoryIndex !== -1) {
                categories.splice(categoryIndex, 1);
            }
        }

        await saveData();
        await loadData();

        showArea.style.right = '-65vw';

        setTimeout(function () {
            showArea.style.display = 'none';
        }, 200);

        createRegisterEntry();
    } else {
        console.error('Contact not found for deletion.');
    }

    smallAnimatedLabel("Contact successfully deleted");
}
