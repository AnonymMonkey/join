let subtasks = [];

async function initAddTasks() {
  await loadTasks();
  await loadTaskCategory();
  await includeHTML();
  adjustQuicklinkBG();
  setDateRange();
  addSubtasks();
}

function resetForm() {
  document.getElementById('addTaskInputForm').reset();
  document.getElementById('temporaryStatus').innerHTML = '';
  document.getElementById('prioResult').innerHTML = '';
  document.getElementById('Urgent').checked = false;
  document.getElementById('Medium').checked = false;
  document.getElementById('Low').checked = false;
  document.getElementById('frame24').classList.remove('frame24_selected');
  document.getElementById('frame25').classList.remove('frame25_selected');
  document.getElementById('frame26').classList.remove('frame26_selected');
  document.getElementById('imgUrgent').src =
    '../assets/img/add-task/Urgent.svg';
  document.getElementById('imgMedium').src =
    '../assets/img/add-task/Medium.svg';
  document.getElementById('imgLow').src = '../assets/img/add-task/Low.svg';
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
  frames.forEach((frame) =>
    document.getElementById(frame).classList.remove(`${frame}_selected`),
  );
  Object.keys(images).forEach(
    (key) =>
      (document.getElementById(
        images[key],
      ).src = `../assets/img/add-task/${key}.svg`),
  );

  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(
    `img${prio}`,
  ).src = `../assets/img/add-task/${prio}_white.svg`;
  document.getElementById('prioResult').innerHTML = prio;
}

function showSubtaskActions() {
  document.getElementById('clearSubtaskInput').classList.remove('d-none');
  document.getElementById('addSubtaskInput').classList.remove('d-none');
}

function hideSubtaskActions() {
  document.getElementById('clearSubtaskInput').classList.add('d-none');
  document.getElementById('addSubtaskInput').classList.add('d-none');
}

function getNextFreeTaskId() {
  let allIds = tasks.map((task) => task.id);
  let nextFreeId = Math.max(...allIds) + 1;
  return nextFreeId;
}

async function addNewTask() {
  // nextFreeId = getNextFreeTaskId();
  // alert(nextFreeId);
  // return;

  let id = getNextFreeTaskId();
  let title = document.getElementById('frame14_text').value;
  let description = document.getElementById('frame17_text').value;
  let status = document.getElementById('temporaryStatus').innerHTML;
  let prio = document.getElementById('prioResult').innerHTML;
  //let subtasks = "";
  let member = [6339];
  let category = document.getElementById('category_select').value;
  let duedate = document.getElementById('addtask-duedate').value;
  let formattedTaskDate = new Date(duedate).getTime();

  let newTask = {
    id: id,
    title: title,
    description: description,
    status: status,
    prio: prio,
    subtasks: [
      {
        subid: 0,
        subtitle: 'Implement Recipe Recommendation',
        substatus: 'open',
      },
      {
        subid: 1,
        subtitle: 'Start Page Layout',
        substatus: 'done',
      },
    ],
    member: member,
    category: category,
    duedate: formattedTaskDate,
  };

  tasks.push(newTask);
  await setItem('tasks', tasks);
  closeAddTaskOverlay();

  // Info dass neuer Task gespeichert wurde!
  openSelectedQuicklink('quickBoard');
}

function addSubtask() {
  let list = document.getElementById('subtasklist');
  list.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    list.innerHTML += `
      <li>${subtasks[i]} <a href="#" onclick="deleteSubtask(${i})">X</a></li>
      `;
  }
}

function addnewSubtask() {
  if (subtasks.length < 5) {
    let newSubtask = document.getElementById('frame14_subtask_text').value;
    subtasks.push(newSubtask);
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
  subtasks.splice(id, 1);
  addSubtask();
}

function clearInput(field) {  
  document.getElementById(field).value = '';
}