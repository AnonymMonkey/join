// Hier wird der HTML-Code für den Fortschrittscontainer erstellt
let progressHTML = '';
// Zähler für erledigte Subtasks
let doneSubtaskCount;

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
      <div class="profile_badge">
        <div class="group9">
          <div class="group9_ellipse">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15.5" fill="#FF7A00" stroke="white"/>          
            </svg>        
            <div class="group9_text">AM</div>
          </div>
        </div>      
      </div>

      <div style="left: -8px" class="profile_badge">
        <div class="group9">
          <div class="group9_ellipse">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15.5" fill="#1FD7C1" stroke="white"/>          
            </svg>        
            <div class="group9_text">EM</div>
          </div>
        </div>      
      </div>

      <div style="left: -16px" class="profile_badge">
        <div class="group9">
          <div class="group9_ellipse">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15.5" fill="#462F8A" stroke="white"/>          
            </svg>        
            <div class="group9_text">MB</div>
          </div>
        </div>      
      </div>
      
    </div>
    <div class="priority_symbol">
      <img src="../assets/img/add-task/${element['prio']}.svg" alt="">
    </div>

  </div>
  </div>
  </div>
  `;
}

function taskProgress(element) {
   // Counter for completed Subtasks
  doneSubtaskCount = 0;  
  let allSubtaskCount = element['subtasks'].length;
  if (element['subtasks'] && allSubtaskCount > 0) {
    // Check, if subtasks aren´t empty
    for (const subtask of element['subtasks']) {
      if (subtask['substatus'] === 'done') {
        doneSubtaskCount++;
      }
    }
    let resultProgress = calculateProgress(doneSubtaskCount, allSubtaskCount);    
    generateProgressHTML(resultProgress, doneSubtaskCount, allSubtaskCount);
  }
}

function generateProgressHTML(resultProgress, doneSubtaskCount, allSubtaskCount) {
  return progressHTML = `
      <div class="frame114_progress">
        <div style="padding-right: ${resultProgress}px;" class="frame114_progressbar">
          <div class="frame114_progressfilter"></div>
        </div>
        <div class="frame114_progresstext">${doneSubtaskCount}/${allSubtaskCount} Subtasks</div>
      </div>`;
}