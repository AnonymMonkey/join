function generateTasksHTML(element) {
  progressHTML = '';
  badgeHTML = '';
  badgeHTMLTask = '';
  taskProgress(element);
  assignedTo(element);
  let prioIcon = element['prio'].toLowerCase();
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
    <div class="frameX">
      <div class="frame139">
        ${badgeHTML}        
      </div>
      <div class="priority_symbol">
        <img src="../assets/img/add-task/${prioIcon}.svg">
      </div>
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
    </div>
  `);
}

function generateProfileBadgesTask(initials, badgeColor, name) {
  return (badgeHTMLTask += /*html*/ `
  <div class="task-contactlist-contact">
    <div class="frame191">
      <div style="background-color: ${badgeColor};" class="profile-badge">${initials}</div>
      <div class="profile-name">${name}</div>
    </div>    
  </div>
  `);
}

function generatePlaceholer(name) {
  document.getElementById(
    name,
  ).innerHTML += `<div class="placeholderCard"></div>`;
}

function generateOverlayContent(element) {
  let id = getTaskIndex(element);
  let dueDate = getDueDate(tasks[id]['duedate']);
  let prioIcon = tasks[id]['prio'].toLowerCase();

  content = document.getElementById('overlayTaskContent');
  content.innerHTML = '';
  badgeHTMLTask = '';
  subtaskHTML = '';

  assignedToTask(id);
  generateSubtaskList(id);
  content.innerHTML = /*html*/ `
  <div class="frame203_task">                   
    <div class="board_card_task" style="background: ${
      taskCategory[tasks[id]['category']]['bgColor']
    }">
      <span class="board_card_label_task">${
        taskCategory[tasks[id]['category']]['title']
      }</span>
    </div>  
    <img src="../assets/img/contacts/close.svg" class="close-button pointer" onclick="closeTaskOverlay()">
    </div>
      <span class="frame119_title_task">${tasks[id]['title']}</span>
      <span class="frame119_content_task">${tasks[id]['description']}</span>
      
    <div class="frame179">      
      <div class="frame179_text">Due date:</div>
      <div class="frame179_date">${dueDate}</div>
    </div>

    <div class="frame178">
      <div class="frame178_text">Priority:</div>
      <div class="frame178_content">${tasks[id]['prio']}</div>    
      <div class="frame178_icon">
        <img src="../assets/img/add-task/${prioIcon}.svg">
      </div>
    </div>
   
    <div class="frame214">
      <div class="frame214_text">Assigned To:</div>  
      <div class="task-contactlist">${badgeHTMLTask}</div>
    </div>    

    <div class="frame215">
      <div class="frame215_text">Subtasks</div>
      <div id="frame204" class="frame204">${subtaskHTML}</div>
    </div>

    <div class="frame20">      
      <div class="delete-task pointer" onclick="deleteTask(${element})">
      <img class="delete-icon" src="../assets/img/board/delete.svg">
        <div class="delete-text">Delete</div>     
      </div> 
      <div class="task-vector"></div>
      <div class="edit-task pointer" onclick="generateOverlayEditTask(${element})">
        <img class="edit-icon" src="../assets/img/board/edit.svg">
        <div class="edit-text">Edit</div>
      </div>
    </div>
  `;
}

async function generateOverlayAddTask(status) {
  await openAddTaskOverlay();
  content = document.getElementById('overlayAddTaskContent');
  content.innerHTML = '';
  content.innerHTML = /*html*/ `
    <img src="../assets/img/contacts/close.svg" class="close-button pointer" onclick="closeAddTaskOverlay()">        
    `;
  document.getElementById('temporaryStatus').innerHTML = status;
  document.getElementById('addTaskClear').classList.add('d-none');
  document.getElementById('addTaskCancel').classList.remove('d-none');
}

function generateSubtaskList(id) {
  subtaskHTML = '';
  let subtasks = tasks[id]['subtasks'];
  for (let i = 0; i < subtasks.length; i++) {
    let subtask = subtasks[i];    
    generateSubtaskListStatus(id, subtask);
  }
}

function generateSubtaskListStatus(id, subtask) {
  let subStatus = '';
  subStatus = subtask['substatus'];
  let currentImg;
  let newImg;
  let newStatusText;
  if(subStatus == 'open'){
    currentImg = '../assets/img/login/checkbox_unchecked.png'
    newImg = '../assets/img/login/checkbox_checked.png';
    newStatusText = 'done';
  } else {
    currentImg = '../assets/img/login/checkbox_checked.png';
    newImg = '../assets/img/login/checkbox_unchecked.png';
    newStatusText = 'open';
  }  
  generateSubtaskListHTML(id, subtask, currentImg, newImg, newStatusText);
}

function generateSubtaskListHTML(id, subtask, currentImg, newImg, newStatusText) {  
  return (subtaskHTML += /*html*/ `
    <div id="subtaskImage${subtask['subid']}" class="subtasks-check pointer" onclick="changeSubtask(${id}, ${subtask['subid']}, '${newStatusText}', '${newImg}')">
      <img id="${subtask['subid']}" class="subtasks-checkbutton" src="${currentImg}">      
      <div class="subtasks-title">${subtask['subtitle']}</div>
    </div>        
  `);
}

async function changeSubtask(id, subtask, newStatusText, newImg){  
  tasks[id]['subtasks'][subtask]['substatus'] = newStatusText;  
  document.getElementById(subtask).src = `${newImg}`;  
  await setItem('tasks', tasks);  
  updateHTML();  
  generateOverlayContent(tasks[id]['id']);
}

async function generateOverlayEditTask(element) {
  await openEditTaskOverlay(element);
  content = document.getElementById('overlayEditTaskContent');
  content.innerHTML = '';
  content.innerHTML = /*html*/ `
    <img src="../assets/img/contacts/close.svg" class="close-button pointer" onclick="closeEditTaskOverlay()">
  `;  
  getTaskData();
}