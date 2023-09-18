function generateTasksHTML(element) {
  return /*html*/ `
  <div id="${element['id']}" draggable="true" ondragstart="startDragging(${
    element['id']
  })" class="card pointer">
  <div class="frame119">
    <div class="board_card" style="background: ${
      category[element['category']]['bgColor']
    }">
    <span class="board_card_label">${
      category[element['category']]['title']
    }</span>
  </div>
  <div class="frame114">
    <span class="frame114_title">${element['title']}</span>
    <span class="frame114_content">${element['description']}</span>
  </div>  
  <div class="frame114_progress">
    <div class="frame114_progressbar">
    <div class="frame114_progressfilter"></div>
  </div>
  <div class="frame114_progresstext">1/2 Subtasks</div>   
  </div>
  <div class="frame139">
    <div class="frame217">
      userliste
    </div>
    <img class="priority_symbol" src="../assets/img/add-task/green_low.svg" alt="">
  </div>
  </div>
  </div>
  `;
}