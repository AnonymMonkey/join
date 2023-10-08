let newSubtasks = [];

async function initAddTasks() {
  await loadTasks();
  await loadTaskCategory();
  await includeHTML();
  adjustQuicklinkBG();
  setDateRange();
  addSubtask();
  await userSelection();
}

function resetForm() {
  newSubtasks = [];
  addSubtask();
  document.getElementById('addTaskInputForm').reset();


  // document.getElementById('temporaryStatus').innerHTML = '';
  // document.getElementById('prioResult').innerHTML = '';

  // document.getElementById('Urgent').checked = false;
  // document.getElementById('Medium').checked = false;
  // document.getElementById('Low').checked = false;

  // document.getElementById('frame24').classList.remove('frame24_selected');
  // document.getElementById('frame25').classList.remove('frame25_selected');
  // document.getElementById('frame26').classList.remove('frame26_selected');

  // document.getElementById('imgUrgent').src = '../assets/img/add-task/urgent.svg';
  // document.getElementById('imgMedium').src = '../assets/img/add-task/medium.svg';
  // document.getElementById('imgLow').src = '../assets/img/add-task/low.svg';

  // document.getElementById('frame74').classList.remove('error');

  // document.getElementById('category_select_label').classList.add('d-none');  
  // document.getElementById('subtaskEdit').classList.add('d-none');
}

function setDateRange() {
  let no_of_years = 1;
  let year = new Date().getFullYear();
  let maxyear = new Date().getFullYear() + no_of_years;
  let month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  let date = ('0' + new Date().getDate()).slice(-2);
  let today = year + '-' + month + '-' + date;
  let maxdate = maxyear + '-' + month + '-' + date;
  document.getElementById('addtask-duedate').min = today;
  document.getElementById('addtask-duedate').max = maxdate;
}

function invalid(fieldName, labelField) {
  document.getElementById(`${fieldName}`).classList.add('error');
  document.getElementById(labelField).classList.remove('d-none');
}

function valid(fieldName, labelField) {
  document.getElementById(`${fieldName}`).classList.remove('error');
  document.getElementById(labelField).classList.add('d-none');
}

function validateField(inputField, errorField, labelField) {
  if (document.getElementById(inputField).value === '') {
    invalid(errorField, labelField);
  } else {
    valid(errorField, labelField);
  }
}

function selectedRadioButton(prio, frameName) {
  let frames = ['frame24', 'frame25', 'frame26'];
  let images = { Urgent: 'imgUrgent', Medium: 'imgMedium', Low: 'imgLow' };
  frames.forEach((frame) => document.getElementById(frame).classList.remove(`${frame}_selected`),);
  Object.keys(images).forEach((key) => (document.getElementById(images[key],).src = `../assets/img/add-task/${key.toLowerCase()}.svg`),);
  document.getElementById('priority').classList.remove('error');
  document.getElementById('priority_label').classList.add('d-none');
  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(`img${prio}`,).src = `../assets/img/add-task/${prio.toLowerCase()}_white.svg`;
  document.getElementById('prioResult').innerHTML = prio;
}

function subtaskActions(view) {
  if (view == 'show') {
    document.getElementById('clearSubtaskInput').classList.remove('d-none');
    document.getElementById('addSubtaskInput').classList.remove('d-none');
    document.getElementById('subtask-vector').classList.remove('d-none');
  } else {
    document.getElementById('clearSubtaskInput').classList.add('d-none');
    document.getElementById('addSubtaskInput').classList.add('d-none');
    document.getElementById('subtask-vector').classList.add('d-none');
  }
}

function getNextFreeId(items, idKey) {
  if (items.length === 0) {
    return 0;
  }
  let allIds = items.map((item) => item[idKey]);
  let nextFreeId = Math.max(...allIds) + 1;
  return nextFreeId;
}

async function addNewTask(origin) {
  let status = document.getElementById('temporaryStatus').innerHTML;
  let category = document.getElementById('category_select').value;
  let id = getNextFreeId(tasks, 'id');
  let title = document.getElementById('frame14_text').value;
  let description = document.getElementById('frame17_text').value;
  let prio = document.getElementById('prioResult').innerHTML;
  let addTaskSubtasks = newSubtasks;
  let allMember = contactSelection;
  let duedate = document.getElementById('addtask-duedate').value;
  let formattedTaskDate = new Date(duedate).getTime();

  await createTask(id, title, description, status, prio, addTaskSubtasks, allMember, category, formattedTaskDate);

  //TODO - Info dass neuer Task gespeichert wurde!
  // dazu die Funktion von Andino nutzen
  //smallAnimatedLabel('Task added to board <img src="../assets/img/summary/board.svg">');
  // die Funktion ohne Bild funktioniert auch noch nicht
  await smallAnimatedLabel('Task added to board');

  if (origin) {
    closeAddTaskOverlay();
  }
  openSelectedQuicklink('quickBoard');
}

async function createTask(id, title, description, status, prio, addTaskSubtasks, allMember, category, formattedTaskDate) {
  let newTask = {
    id: id,
    title: title,
    description: description,
    status: status,
    prio: prio,
    subtasks: addTaskSubtasks,
    member: allMember,
    category: category,
    duedate: formattedTaskDate,
  };

  tasks.push(newTask);
  await setItem('tasks', tasks);
}

function addSubtask() {
  let list = document.getElementById('subtasklist');
  list.innerHTML = '';
  for (let i = 0; i < newSubtasks.length; i++) {
    list.innerHTML += `
      <li class="pointer" ondblclick="editSubtask(${i})">
        <div>&bull; 
          ${newSubtasks[i].subtitle}
        </div>      
        <div class="subtaskActionPanel">
          <img onclick="editSubtask(${i})" class="pointer button-hover" src="../assets/img/board/edit.svg">
          <img class="subtask-vector" src="../assets/img/add-task/vector_dark.png">
          <img onclick="deleteSubtask(${i})" class="pointer button-hover" src="../assets/img/board/delete.svg">
        </div>
      </li>
      `;
  }
}

function addnewSubtask() {
  hideEditSubtask();
  let nextSubId = getNextFreeId(newSubtasks, 'subid');
  if (newSubtasks.length < 5) {
    let newSubtask = {
      subid: nextSubId,
      subtitle: document.getElementById('frame14_subtask_text').value,
      substatus: 'open',
    }
    newSubtasks.push(newSubtask);
    document.getElementById('frame14_subtask_text').value = '';
    addSubtask();
  } else {
    document.getElementById('frame14_subtask').classList.add('error');
    document.getElementById('frame14_subtask_label').classList.remove('d-none');
  }
}

function deleteSubtask(id) {
  document.getElementById('frame14_subtask_label').classList.add('d-none');
  document.getElementById('frame14_subtask').classList.remove('error');
  newSubtasks.splice(id, 1);
  addSubtask();
  hideEditSubtask();
}

function editSubtask(id) {
  let subtaskfield = document.getElementById('subtaskEditInput');
  let subTaskActions = document.getElementById('subtaskEditActions');
  document.getElementById('subtaskEdit').classList.remove('d-none');
  subtaskfield.value = newSubtasks[id]['subtitle'];
  subTaskActions.innerHTML = '';
  subTaskActions.innerHTML = /*html*/`
    <img onclick="deleteSubtask(${id})" class="pointer button-hover" src="../assets/img/board/delete.svg">
    <img class="subtask-vector" src="../assets/img/add-task/vector.png">
    <img onclick="updateSubtask(${id})" class="pointer button-hover" src="../assets/img/add-task/check_black.svg">
  `;
}

function updateSubtask(id) {
  newSubtasks[id]['subtitle'] = document.getElementById('subtaskEditInput').value;
  addSubtask();
  hideEditSubtask();
}

function hideEditSubtask() {
  subtaskEditInput = document.getElementById('subtaskEditInput');
  subtaskEditInput.value = '';
  subtaskEdit = document.getElementById('subtaskEdit');
  subtaskEdit.classList.add('d-none');
}

function clearInput(field) {
  document.getElementById(field).value = '';
  hideEditSubtask();
}