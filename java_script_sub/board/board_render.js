function generateTasksHTML(element) {
  progressHTML = '';
  badgeHTML = '';
  taskProgress(element);
  assignedTo(element); 
  let status = element['status'];
  return /*html*/ `
  <div id="${element['id']}" draggable="true" onclick="generateOverlayContent(${element['id']}),openTaskOverlay()" onmousedown="startTransform(${element['id']}, '${status}')" onmouseup="stopTransform(${element['id']}, '${status}')" ondragstart="startDragging(${element['id']})"  class="card pointer">
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

function generatePlaceholer(name) { 
  document.getElementById(name).innerHTML += `<div class="placeholderCard"></div>`;
}

function generateOverlayContent(element) {  
  content = document.getElementById('overlayTaskContent');
  content.innerHTML = '';
  console.log(tasks[element]);

  content.innerHTML = /*html*/`
  <div class="frame203">                   
          <img src="../assets/img/contacts/close.svg" class="close-button pointer" onclick="closeTaskOverlay()">
        </div>
  <div class="frame119">
      <div class="board_card" style="background: ${taskCategory[tasks[element]['category']]['bgColor']}">
      <span class="board_card_label">${taskCategory[tasks[element]['category']]['title']}</span>
    </div>  
    <div class="frame114">
      <span class="frame114_title">${tasks[element]['title']}</span>
      <span class="frame114_content">${tasks[element]['description']}</span>
    </div>  
    
    Due date: ${tasks[element]['duedate']}

    </div>
    Priority: ${tasks[element]['prio']}
    <div class="priority_symbol">
      <img src="../assets/img/add-task/${tasks[element]['prio']}.svg" alt="">
    </div>
    Assigned To:
    <br>
    <br>
    Subtasks
    <br>
    <br>
    Buttons
  `  
}