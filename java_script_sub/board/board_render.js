function generateTasksHTML(element) {
  progressHTML = '';
  badgeHTML = '';
  taskProgress(element);
  assignedTo(element);
  let status = element['status'];
  return /*html*/ `
  <div id="${element['id']}" draggable="true" onclick="generateOverlayContent(${
    element['id']
  }),openTaskOverlay()" onmousedown="startTransform(${
    element['id']
  }, '${status}')" onmouseup="stopTransform(${
    element['id']
  }, '${status}')" ondragstart="startDragging(${
    element['id']
  })"  class="card pointer">
    <div class="frame119">
      <div class="board_card" style="background: ${
        taskCategory[element['category']]['bgColor']
      }">
      <span class="board_card_label">${
        taskCategory[element['category']]['title']
      }</span>
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

function generateProgressHTML(
  resultProgress,
  doneSubtaskCount,
  allSubtaskCount,
) {
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
  document.getElementById(
    name,
  ).innerHTML += `<div class="placeholderCard"></div>`;
}

function generateOverlayAddTask(status) {
  openAddTaskOverlay();
  content = document.getElementById('overlayAddTaskContent');
  content.innerHTML = '';
  content.innerHTML = /*html*/ `
    <div class="frame203">                   
      <img src="../assets/img/contacts/close.svg" class="close-button pointer" onclick="closeAddTaskOverlay()">
    </div>`;
}

function generateOverlayContent(element) {
  
  console.log(element);
  
  content = document.getElementById('overlayTaskContent');
  content.innerHTML = '';
  // console.log(tasks[element]);

  content.innerHTML = /*html*/ `
  <div class="frame203_task">                   
    <div class="board_card_task" style="background: ${
      taskCategory[tasks[element]['category']]['bgColor']
    }">
      <span class="board_card_label_task">${
        taskCategory[tasks[element]['category']]['title']
      }</span>
    </div>  
    <img src="../assets/img/contacts/close.svg" class="close-button pointer" onclick="closeTaskOverlay()">
    </div>
      <span class="frame119_title_task">${tasks[element]['title']}</span>
      <span class="frame119_content_task">${
        tasks[element]['description']
      }</span>
      
    <div class="frame179">      
      <div class="frame179_text">Due date:</div>
      <div class="frame179_date">${tasks[element]['duedate']}</div>
    </div>

    <div class="frame178">
      <div class="frame178_text">Priority:</div>
      <div class="frame178_content">${tasks[element]['prio']}</div>    
      <div class="frame178_icon">
        <img src="../assets/img/add-task/${tasks[element]['prio']}.svg" alt="">
      </div>
    </div>
   
    <div class="frame214">
      <div class="frame214_text">Assigned To:</div>  
      <div id="task-contactlist" class="task-contactlist">        
        
        <div class="task-contactlist-contact">
          <div class="frame191">
            <div class="profile-badge">EM</div>
            <div class="profile-name">Emmanuel Mauer</div>
          </div>
          <div class="check-button">x</div>
        </div>

        <div class="task-contactlist-contact">
          <div class="frame191">
            <div class="profile-badge">MB</div>
            <div class="profile-name">Marcel Bauer</div>
          </div>
          <div class="check-button">x</div>
        </div>

        <div class="task-contactlist-contact">
          <div class="frame191">
            <div class="profile-badge">AM</div>
            <div class="profile-name">Anton Mayer</div>
          </div>
          <div class="check-button">x</div>
        </div>

      </div>
    </div>

    <div class="frame215">
      <div class="frame215_text">Subtasks</div>
      <div id="frame204" class="frame204">
        
        <div class="subtasks-check">
          <div class="subtasks-checkbutton">x</div>        
          <div class="subtasks-title">y</div>
        </div>        

      </div>
    </div>

    <div class="frame20">      
      <div class="delete-task pointer" onclick="deleteTask(${tasks[element]['id']})">
      <img class="delete-icon" src="../assets/img/board/delete.svg">
        <div class="delete-text">Delete</div>     
      </div> 
      <div class="task-vector"></div>
      <div class="edit-task pointer">
        <img class="edit-icon" src="../assets/img/board/edit.svg">
        <div class="edit-text">Edit</div>
      </div>
    </div>
  `;
}
