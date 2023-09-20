function generateTasksHTML(element) {
  progressHTML = '';
  badgeHTML = '';
  taskProgress(element);
  assignetTo(element);  
  return /*html*/ `
  <div id="${element['id']}" draggable="true" onmousedown="startTransform(${element['id']})" onmouseup="stopTransform(${element['id']})" ondragstart="startDragging(${element['id']})"  class="card pointer">
    <div class="frame119">
      <div class="board_card" style="background: ${taskCategory[element['category']]['bgColor']}">
      <span class="board_card_label">${taskCategory[element['category']]['title']}</span>
    </div>
    <div class="frame114">
      <span class="frame114_title">${element['title']}</span>
      <span class="frame114_content">${element['description']}</span>
    </div>  
    ${progressHTML}
    <div class="frame139">
      ${badgeHTML}      
      </div>
    </div>
    <div class="priority_symbol">
      <img src="../assets/img/add-task/${element['prio']}.svg" alt="">
    </div>
  </div>
  `;
}

function generateProgressHTML(resultProgress,doneSubtaskCount,allSubtaskCount,) {
  return (progressHTML = `
      <div class="frame114_progress">
        <div style="padding-right: ${resultProgress}px;" class="frame114_progressbar">
          <div class="frame114_progressfilter"></div>
        </div>
        <div class="frame114_progresstext">${doneSubtaskCount}/${allSubtaskCount} Subtasks</div>
      </div>`);
}

function generateProfileBadges(initials, badgeColor, pixelLeft) {
  return (badgeHTML += /*html*/ `
    <div class="frame217">
    <div style="left: -${pixelLeft}px" class="profile_badge">
        <div class="group9">
          <div class="group9_ellipse">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15.5" fill="${badgeColor}" stroke="white"/>          
            </svg>        
          <div class="group9_text">${initials}</div>
        </div>
      </div>
    </div>
  `);
}
