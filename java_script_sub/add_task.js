let newSubtasks = [];

async function initAddTasks() {
  await loadTasks();
  await loadTaskCategory();
  await includeHTML();
  adjustQuicklinkBG();
  setDateRange();
  addSubtask();
}

function resetForm() {
  newSubtasks = [];
  addSubtask();
  document.getElementById('addTaskInputForm').reset();
  document.getElementById('temporaryStatus').innerHTML = '';
  document.getElementById('prioResult').innerHTML = '';
  document.getElementById('Urgent').checked = false;
  document.getElementById('Medium').checked = false;
  document.getElementById('Low').checked = false;
  document.getElementById('frame24').classList.remove('frame24_selected');
  document.getElementById('frame25').classList.remove('frame25_selected');
  document.getElementById('frame26').classList.remove('frame26_selected');
  document.getElementById('imgUrgent').src = '../assets/img/add-task/urgent.svg';
  document.getElementById('imgMedium').src = '../assets/img/add-task/medium.svg';
  document.getElementById('imgLow').src = '../assets/img/add-task/low.svg';
  document.getElementById('frame74').classList.remove('error');
  document.getElementById('category_select_label').classList.add('d-none');
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
  Object.keys(images).forEach((key) =>(document.getElementById(images[key],).src = `../assets/img/add-task/${key.toLowerCase()}.svg`),  );
  document.getElementById('priority').classList.remove('error');
  document.getElementById('priority_label').classList.add('d-none');
  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(`img${prio}`,).src = `../assets/img/add-task/${prio.toLowerCase()}_white.svg`;
  document.getElementById('prioResult').innerHTML = prio;
}

function subtaskActions(view) {
  if(view == 'show'){
    document.getElementById('clearSubtaskInput').classList.remove('d-none');
    document.getElementById('addSubtaskInput').classList.remove('d-none');
    document.getElementById('subtask-vector').classList.remove('d-none');
  } else {
    document.getElementById('clearSubtaskInput').classList.add('d-none');
    document.getElementById('addSubtaskInput').classList.add('d-none');  
    document.getElementById('subtask-vector').classList.add('d-none');
  }
}

function getNextFreeTaskId() {
  if (tasks.length === 0) {
    return 0;
  }
  let allIds = tasks.map((task) => task.id);
  let nextFreeId = Math.max(...allIds) + 1;
  return nextFreeId;
}

function getNextFreeSubtaskId() {
  if (newSubtasks.length === 0) {
      return 0;
  }
    let allSubtaskIds = newSubtasks.map((subtask) => subtask.subid);
    let nextFreeId = Math.max(...allSubtaskIds) + 1;
    return nextFreeId;  
}

function validation() {
  let prioResult = document.getElementById('prioResult').innerHTML;
  let category = document.getElementById('category_select').value;

  if(prioResult === ''){      
    document.getElementById('priority').classList.add('error');
    document.getElementById('priority_label').classList.remove('d-none');
    return;
  }
  else{
    document.getElementById('priority').classList.remove('error');
    document.getElementById('priority_label').classList.add('d-none');
  }

  if(category === ''){      
    document.getElementById('frame74').classList.add('error');
    return;
  }
  else
  {
    document.getElementById('frame74').classList.remove('error');    
  }
}

async function addNewTask(origin) {
  let status = document.getElementById('temporaryStatus').innerHTML;
  let category = document.getElementById('category_select').value;
  let id = getNextFreeTaskId();
  let title = document.getElementById('frame14_text').value;
  let description = document.getElementById('frame17_text').value;  
  let prio = document.getElementById('prioResult').innerHTML;
  let addTaskSubtasks = newSubtasks;
  let member = [6339];
  let duedate = document.getElementById('addtask-duedate').value;
  let formattedTaskDate = new Date(duedate).getTime();

  await createTask(id, title, description, status, prio, addTaskSubtasks, member, category, formattedTaskDate);
  
  //TODO - Info dass neuer Task gespeichert wurde!
  // dazu die Funktion von Andino nutzen
  //smallAnimatedLabel('Task added to board <img src="../assets/img/summary/board.svg">');
  // die Funktion ohne Bild funktioniert auch noch nicht
  await smallAnimatedLabel('Task added to board');
  
  if(origin){
    closeAddTaskOverlay();
  }
  openSelectedQuicklink('quickBoard');
}

async function createTask(id, title, description, status, prio, addTaskSubtasks, member, category, formattedTaskDate) {
  let newTask = {
    id: id,
    title: title,
    description: description,
    status: status,
    prio: prio,
    subtasks: addTaskSubtasks,
    member: member,
    category: category,
    duedate: formattedTaskDate,
  };

  tasks.push(newTask);
  await setItem('tasks', tasks);
}

//TODO - Stefan - bin dabei die Funktion umzusetzen
// es fehlt noch die Möglichkeit den Wert zu editieren.
function addSubtask() {
  let list = document.getElementById('subtasklist');
  list.innerHTML = '';
  for (let i = 0; i < newSubtasks.length; i++) {
    list.innerHTML += `
      <li>
      <div>&bull; 
      ${newSubtasks[i].subtitle}       
      </div>      
      <div>
        <img id="clearSubtaskInput" onclick="clearInput('frame14_subtask_text')" class="pointer button-hover" src="../assets/img/board/edit.svg" alt="">
        <img id="subtask-vector" src="../assets/img/add-task/vector.png" alt="">
        <img id="addSubtaskInput" onclick="deleteSubtask(${i})" class="pointer button-hover" src="../assets/img/board/delete.svg" alt="">
      </div>
      </li>
      `;
  }
}

function addnewSubtask() {
  nextSubId = getNextFreeSubtaskId();  
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
}

function clearInput(field) {  
  document.getElementById(field).value = '';
}