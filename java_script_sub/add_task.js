async function init() {
  await includeHTML();
  adjustQuicklinkBG();
}

function selectedRadioButton(id) {
  let radio = document.getElementById(`${id}`);
  radio.checked = true;  
}