function contacts_overlay_html() {
    return /* html */`
            <img src="../assets/img/contacts/close.svg" class="close-button pointer"
            onclick="closeContactOverlay()">
            <section class="overlay-left">
                <img src="../assets/img/logo_light.png">
                <h1 id="overlay_title">Add contact</h1>
                <div id="overlay_title_sub">Tasks are better with a team!</div>
                <img src="../assets/img/contacts/overlay_cutline.svg">
            </section>
            <section class="overlay-right">
                <div id="overlay_initials" class="person-bg">
                    <img src="../assets/img/contacts/person.svg">
                </div>
                <form id="onsubmit" onsubmit="createContact(); return false;">
                    <div class="overlay-right-form">
                        <div class="place-img">
                            <input required type="text" name="" id="contact_name" placeholder="Name">
                            <img src="../assets/img/contacts/person_small.svg">
                        </div>
                        
                        <div class="place-img">
                            <input required type="email" name="" id="contact_mail" placeholder="E-Mail">
                            <img src="../assets/img/contacts/mail.svg">
                        </div>
                        
                        <div class="place-img">
                            <input required type="tel" name="" id="contact_phone" placeholder="+491234567"
                            pattern="\\+\\d{2}\\d{7,}">
                            <img src="../assets/img/contacts/call.svg">
                        </div>
                    </div>
                    <div id="errorMsg" class="requiredField"></div>
                    <div class="buttons">
                        <div class="buttons-cancel" onclick="closeContactOverlay()">Cancel<svg width="25"
                                height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.2495 12.0001L17.4925 17.2431M7.00653 17.2431L12.2495 12.0001L7.00653 17.2431ZM17.4925 6.75708L12.2485 12.0001L17.4925 6.75708ZM12.2485 12.0001L7.00653 6.75708L12.2485 12.0001Z"
                                    stroke="currentcolor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                        <button id="create_btn" onclick="doNotClose(event)">Create contact<img
                                src="../assets/img/contacts/check.svg"></button>
                    </div>
                </form>
            </section>
            `
}