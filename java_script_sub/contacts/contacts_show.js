function showContact(name, mail, phone, initials, color) {
    let show = elementByID('show_contact')
    show.innerHTML = "";
    show.innerHTML += /* html */`
    <div class="contact-headline">
        <div ${contactFirstLettersBG(color)}>${initials}</div>
        <div>
            <div class="contact-name">${name}</div>
            <div class="contact-buttons">
                <div>
                    <img src="../assets/img/contacts/edit.svg">
                    <div>Edit</div>
                </div>
                <div>
                    <img src="../assets/img/contacts/delete.svg">
                    <div>Delete</div>
                </div>
            </div>
        </div>
    </div>
    <div class="contact-show-info">Contact Information</div>
    <div class="contact-show-info-sub">
        <div class="text-black">E-Mail</div>
        <div class="text-blue">${mail}</div>
    </div>
    <div class="contact-show-info-sub">
        <div class="text-black">Phone</div>
        <div class="text-black">${phone}</div>
    </div>
    `;
}