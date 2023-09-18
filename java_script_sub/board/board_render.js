function generateTasksHTML(element) {
  progressHTML = '';
  taskProgress(element);
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
  ${progressHTML}
  <div class="frame139">
    <div class="frame217">
      <div class="profile_badge">AM</div>
      <div class="profile_badge">EM</div>
      <div class="profile_badge">MB</div>
    </div>
    <img class="priority_symbol" src="../assets/img/add-task/${element['prio']}.svg" alt="">
  </div>
  </div>
  </div>
  `;
}

function taskProgress(element) {
  doneSubtaskCount = 0; // Zähler für erledigte Subtasks
  let percent = 0;
  let basis = element['subtasks'].length;
  let resultProgress;
  if (element['subtasks'] && element['subtasks'].length > 0) {
    // Prüfen, ob subtasks Werte enthält
    for (const subtask of element['subtasks']) {
      if (subtask['substatus'] === 'done') {
        doneSubtaskCount++;
      }
    }

    // 128 = 0
    // 64 = 50%
    percent = (doneSubtaskCount * 100) / basis;
    calculateProgress(percent);

    // Prüfen, ob subtasks Werte enthält
    return progressHTML = `
      <div class="frame114_progress">
        <div style="padding-right: ${resultProgress}px;" class="frame114_progressbar">
          <div class="frame114_progressfilter"></div>
        </div>
        <div class="frame114_progresstext">${doneSubtaskCount}/${element['subtasks'].length} Subtasks</div>
      </div>`;
  }
}

function calculateProgress(percent) {
  const basis = 128;
  console.log(basis * percent / 100);
  let resultProgress = (basis * percent / 100);
  return parseInt(resultProgress);
}