function generateTasksHTML(element) {
  return /*html*/ `
  <div draggable="true" ondragstart="startDragging(${element['id']})" class="card pointer">
  <div class="frame119">
    <div class="board_card" style="background: ${
      category[element['category']]['bgColor']
    }">
    <label class="board_card_label">${
      category[element['category']]['title']
    }</label>
  </div>
  <div class="frame114">
    <span class="frame114_title">${element['title']}</span>
    <span class="frame114_content">${element['description']}</span>
  </div>
  </div>
  </div>
  `;
}