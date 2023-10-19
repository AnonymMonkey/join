let newSubtasks = [];

/**
 * Init-Functions on load * 
 */
async function initAddTasks() {
  await loadTasks();
  await loadTaskCategory();
  await includeHTML();
  adjustQuicklinkBG();
  setDateRange();
  addSubtask();
  await loadData();
  await userSelection('isClosed');
}

/**
 * Reset Form
 * This function resets all Values from Input,
 * resets added Styles and resets Variables and Arrays
 */
function resetForm() {  
  document.getElementById('addTaskInputForm').reset();
  resetArrays();
  addSubtask();
  resetRadioButtonClasses();    
  resetInnerHTML();  
  resetImages();
  resetClassError();
  resetRequiredFields();  
}
/**
 * Reset Arrays
 */
function resetArrays() {
  newSubtasks = [];
  contactSelection = [];
}

/**
 * Reset style from Radio-Buttons
 */
function resetRadioButtonClasses(){
  document.getElementById('frame24').classList.remove('frame24_selected');
  document.getElementById('frame25').classList.remove('frame25_selected');
  document.getElementById('frame26').classList.remove('frame26_selected');
}

/**
 * Reset content
 */
function resetInnerHTML() {
  document.getElementById('temporaryStatus').innerHTML = '';
  document.getElementById('prioResult').innerHTML = '';
  document.getElementById('selected_user').innerHTML = '';
}

/**
 * Reset images
 */
function resetImages() {
  document.getElementById('imgUrgent').src = '../../assets/img/add-task/urgent.svg';
  document.getElementById('imgMedium').src = '../../assets/img/add-task/medium.svg';
  document.getElementById('imgLow').src = '../../assets/img/add-task/low.svg';
}

/**
 * Reset style from all elements with class error
 */
function resetClassError() {
  Array.from(document.querySelectorAll('.error')).forEach(
    (el) => el.classList.remove('error')
  );  
}

/**
 * Change style to display: none for every element with class requiredField
 */
function resetRequiredFields() {
  Array.from(document.querySelectorAll('.requiredField')).forEach(
    (el) => el.classList.add('d-none')
  );  
}

/**
 * Sets min and max range for datepicker (from today to one year in the future)
 */
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

/**
 * Add and remove style for specified fields
 * @param {string} fieldName - the form-element
 * @param {string} labelField - the associated label
 */
function invalid(fieldName, labelField) {
  document.getElementById(`${fieldName}`).classList.add('error');
  document.getElementById(labelField).classList.remove('d-none');
}

/**
 * Add and remove style for specified fields
 * @param {string} fieldName - the form-element
 * @param {string} labelField - the associated label
 */
function valid(fieldName, labelField) {
  document.getElementById(`${fieldName}`).classList.remove('error');
  document.getElementById(labelField).classList.add('d-none');
}

/**
 * Validates input-fields and start additional functions depending of result
 * @param {string} inputField - form-field
 * @param {string} errorField - the associated label
 * @param {string} labelField - the associated label
 */
function validateField(inputField, errorField, labelField) {
  if (document.getElementById(inputField).value === '') {
    invalid(errorField, labelField);
  } else {
    valid(errorField, labelField);
  }
}

/**
 * Sets style for Radiobuttons
 * @param {string} prio - 
 * @param {string} frameName - 
 */
function selectedRadioButton(prio, frameName) {
  let frames = ['frame24', 'frame25', 'frame26'];
  let images = { Urgent: 'imgUrgent', Medium: 'imgMedium', Low: 'imgLow' };
  frames.forEach((frame) => document.getElementById(frame).classList.remove(`${frame}_selected`),);
  Object.keys(images).forEach((key) => (document.getElementById(images[key],).src = `../../assets/img/add-task/${key.toLowerCase()}.svg`),);
  document.getElementById('priority').classList.remove('error');
  document.getElementById('priority_label').classList.add('d-none');
  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(`img${prio}`,).src = `../../assets/img/add-task/${prio.toLowerCase()}_white.svg`;
  document.getElementById('prioResult').innerHTML = prio;
}

/**
 * Change style for displaying or not input-fields
 * @param {string} view - parameter which defines the origin of the function
 */
function subtaskActions(view) {
  if (view == 'show') {
    document.getElementById('clearSubtaskInput').classList.remove('d-none');
    document.getElementById('addSubtaskInput').classList.remove('d-none');
    document.getElementById('subtask-vector').classList.remove('d-none');
    document.getElementById('plusSubtaskButton').classList.add('d-none');

  } else {
    document.getElementById('clearSubtaskInput').classList.add('d-none');
    document.getElementById('addSubtaskInput').classList.add('d-none');
    document.getElementById('subtask-vector').classList.add('d-none');
    document.getElementById('plusSubtaskButton').classList.remove('d-none');
  }
}

/**
 * Gets the next unused free Id from specified array
 * @param {string} items - array-name
 * @param {string} idKey - id
 * @returns 
 */
function getNextFreeId(items, idKey) {
  if (items.length === 0) {
    return 0;
  }
  let allIds = items.map((item) => item[idKey]);
  let nextFreeId = Math.max(...allIds) + 1;
  return nextFreeId;
}

/**
 * Used to get all Form-field values
 * @param {string} origin - Origin, from where the function was called
 */
async function addNewTask(origin) {    
  let status = document.getElementById('temporaryStatus').innerHTML;
  let category = document.getElementById('category_select').value;  
  let id = parseInt(await checkExistingTask(), 10);
  let title = document.getElementById('frame14_text').value;
  let description = document.getElementById('frame17_text').value;
  let prio = document.getElementById('prioResult').innerHTML;
  let addTaskSubtasks = newSubtasks;
  let allMember = contactSelection;
  let duedate = document.getElementById('addtask-duedate').value;
  let formattedTaskDate = new Date(duedate).getTime();

  await createTask(id, title, description, status, prio, addTaskSubtasks, allMember, category, formattedTaskDate);  
  smallAnimatedLabel('Task added to board', '../assets/img/summary/board.svg');

  if (origin) {
    closeAddTaskOverlay();
  }
  openSelectedQuicklink('quickBoard');
}

/**
 * Used to check whether it is a new or an existing task.
 * @returns {number} id - currentTask-Id or new Task-Id
 */
async function checkExistingTask() {  
  let currentTask =+ document.getElementById('currentTask').innerText;  
  let id = !currentTask ? getNextFreeId(tasks, 'id') : currentTask;    
  return id;
}
  
/**
 * Used to create a new Task
 * @param {number} id - id of the new task
 * @param {string} title - title of the new task
 * @param {string} description - description of the new task
 * @param {string} status - status of the new task
 * @param {string} prio - prio of the new task
 * @param {string} addTaskSubtasks - subtasks of the new task
 * @param {string} allMember - member of the new task
 * @param {number} category - category of the new task
 * @param {date} formattedTaskDate - Duedate of the new task 
 */
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
  await changeTaskArray(id, newTask);
}

/**
 * Update Task or add new Task
 * @param {number} id - Task-id
 * @param {string} newTask - values of Task
 */
async function changeTaskArray(id, newTask) {  
  let indexToUpdate = getTaskIndex(id);
  console.log(id + " " + indexToUpdate);  
  if (indexToUpdate !== -1) {    
    tasks[indexToUpdate] = newTask;
  } else {
    tasks.push(newTask);
  }
  await setItem('tasks', tasks);
}

/**
 * Generate list of subtasks
 */
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
          <img onclick="editSubtask(${i})" class="pointer button-hover" src="../../assets/img/board/edit.svg">
          <img class="subtask-vector" src="../../assets/img/add-task/vector_dark.png">
          <img onclick="deleteSubtask(${i})" class="pointer button-hover" src="../../assets/img/board/delete.svg">
        </div>
      </li>
      `;
  }
}

/**
 * Add new Subtasks from input
 * @returns 
 */
function addnewSubtask() {
  let subtitleValue = document.getElementById('frame14_subtask_text').value;
  if(!subtitleValue){
    return;
  }

  hideEditSubtask();
  let nextSubId = getNextFreeId(newSubtasks, 'subid');
  if (newSubtasks.length < 5) {
    let newSubtask = {
      subid: nextSubId,
      subtitle: subtitleValue,
      substatus: 'open',
    }
    newSubtasks.push(newSubtask);
    document.getElementById('frame14_subtask_text').value = '';    
    addSubtask();
  } else {
    document.getElementById('frame14_subtask').classList.add('error');
    document.getElementById('frame14_subtask_label').classList.remove('d-none');
  }
  subtaskActions();
}

/**
 * Delete subtask from array
 * @param {number} id - id of subtask in array
 */
function deleteSubtask(id) {
  document.getElementById('frame14_subtask_label').classList.add('d-none');
  document.getElementById('frame14_subtask').classList.remove('error');
  newSubtasks.splice(id, 1);
  addSubtask();
  hideEditSubtask();
}

/**
 * Edit subtask on input
 * @param {number} id - id of subtask in array
 */
function editSubtask(id) {
  let subtaskfield = document.getElementById('subtaskEditInput');
  let subTaskActions = document.getElementById('subtaskEditActions');
  document.getElementById('subtaskEdit').classList.remove('d-none');
  subtaskfield.value = newSubtasks[id]['subtitle'];
  subTaskActions.innerHTML = '';
  subTaskActions.innerHTML = /*html*/`
    <img onclick="deleteSubtask(${id})" class="pointer button-hover" src="../../assets/img/board/delete.svg">
    <img class="subtask-vector" src="../../assets/img/add-task/vector.png">
    <img onclick="updateSubtask(${id})" class="pointer button-hover" src="../../assets/img/add-task/check_black.svg">
  `;
}

/**
 * Update subtask
 * @param {number} id - id of subtask in array
 */
function updateSubtask(id) {
  newSubtasks[id]['subtitle'] = document.getElementById('subtaskEditInput').value;
  addSubtask();
  hideEditSubtask();
}

/**
 * Hiding input-field
 */
function hideEditSubtask() {
  subtaskEditInput = document.getElementById('subtaskEditInput');
  subtaskEditInput.value = '';
  subtaskEdit = document.getElementById('subtaskEdit');
  subtaskEdit.classList.add('d-none');
}

/**
 * Set empty value on form-field
 * @param {string} field - associated fieldname
 */
function clearInput(field) {
  document.getElementById(field).value = '';
  hideEditSubtask();
  subtaskActions();
}

function searchCategory() {
  let arrowDropdown = document.getElementById('arrow_dropdown_addCategory');
  let categorySelection = document.getElementById('category_selection-background');
  console.log('ja');
  arrowDropdown.style.transform = 'rotate(180deg)';
  categorySelection.classList.remove('d-none');

}

function hideCategory() {
  let arrowDropdown = document.getElementById('arrow_dropdown_addCategory');
  let categorySelection = document.getElementById('category_selection-background');
  console.log('nein');
  arrowDropdown.style.transform = 'rotate(360deg)';  
  categorySelection.classList.add('d-none');
}
