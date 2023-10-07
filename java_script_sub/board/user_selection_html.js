function user_select_html(name, initials, color, ID) {
    return `
    <div id="user_${ID}" onclick="createBadge(${ID})" class="flex user">
        <div class="user-left">
            <div class="user-initials circle" style="background-color: ${color};">
                <div class="inner-circle">
                    ${initials}
                </div>
            </div>
            <div class="user-name">${name}</div>
        </div>
        <div>
            <img class="user-checkbox" id="img_unchecked_${ID}" src="../assets/img/login/checkbox_unchecked.png">
            <img class="user-checkbox d-none" id="img_checked_${ID}" src="../assets/img/add-task/checkbox_checked_white.svg">
        </div>
    </div>
    `
}

function user_selectedUser_html(selection, initials) {
    return `
        <div class="circle" id="user_inital_${selection}">
            <div class="inner-circle">
                ${initials}
            </div>
        </div>
        `
}