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
  detectDarkmode();
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
  frames.forEach((frame) =>
    document.getElementById(frame).classList.remove(`${frame}_selected`),
  );
  Object.keys(images).forEach(
    (key) =>
      (document.getElementById(
        images[key],
      ).src = `../../assets/img/add-task/${key.toLowerCase()}.svg`),
  );
  document.getElementById('priority').classList.remove('error');
  document.getElementById('priority_label').classList.add('d-none');
  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(`img${prio}`).src = `../../assets/img/add-task/${prio.toLowerCase()}_white.svg`;
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
async function getNextFreeId(items, idKey) {
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
  let category = document.getElementById('category_select').innerHTML;
  let id = parseInt(await checkExistingTask(), 10);
  let title = document.getElementById('frame14_text').value;
  let description = document.getElementById('frame17_text').value;
  let prio = document.getElementById('prioResult').innerHTML;
  let addTaskSubtasks = newSubtasks;
  let allMember = contactSelection;
  let duedate = document.getElementById('addtask-duedate').value;
  let formattedTaskDate = new Date(duedate).getTime();
  await smallAnimatedLabel(
    'Task added to board',
    '../assets/img/summary/board.svg',
  );
  await createTask(
    id,
    title,
    description,
    status,
    prio,
    addTaskSubtasks,
    allMember,
    category,
    formattedTaskDate,
  );
  if (origin) {
    await closeAddTaskOverlay();
  }
  else{
    await resetForm();
    await identifyGuest();
    openSelectedQuicklink('quickBoard')
  }
}


/**
 * Used to check whether it is a new or an existing task.
 * @returns {number} id - currentTask-Id or new Task-Id
 */
async function checkExistingTask() {
  let id;
  let currentTask = document.getElementById('currentTask').innerText;
  if (currentTask === '') {
    id = await getNextFreeId(tasks, 'id');
  } else {
    id = currentTask;
  }
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
async function createTask(
  id,
  title,
  description,
  status,
  prio,
  addTaskSubtasks,
  allMember,
  category,
  formattedTaskDate,
) {
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
    list.innerHTML += /*html*/ `
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
async function addnewSubtask() {
  let subtitleValue = document.getElementById('frame14_subtask_text').value;
  if (!subtitleValue) {
    return;
  }

  hideEditSubtask();
  let nextSubId = await getNextFreeId(newSubtasks, 'subid');
  if (newSubtasks.length < 5) {
    let newSubtask = {
      subid: nextSubId,
      subtitle: subtitleValue,
      substatus: 'open',
    };
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
  moveTaskFormFooter(0);
}

/**
 * Edit subtask on input
 * @param {number} id - id of subtask in array
 */
function editSubtask(id) {
  let subtaskfield = document.getElementById('subtaskEditInput');
  let subTaskActions = document.getElementById('subtaskEditActions');
  let editField = document.getElementById('subtaskEdit');  

  editField.classList.remove('d-none');
  subtaskfield.value = newSubtasks[id]['subtitle'];
  subTaskActions.innerHTML = '';
  subTaskActions.innerHTML = /*html*/ `
    <img onclick="deleteSubtask(${id})" class="pointer button-hover" src="../../assets/img/board/delete.svg">
    <img class="subtask-vector" src="../../assets/img/add-task/vector.png">
    <img onclick="updateSubtask(${id})" class="pointer button-hover" src="../../assets/img/add-task/check_black.svg">
    `;
  setEditPosition(id, editField);
  moveTaskFormFooter(40);
}

/**
 * Function to change style on taskFormFooter when editing subtask
 * @param {number} pixel - number of pixels to move up/down
 */
function moveTaskFormFooter(pixel) {  
  let taskFormFooter = document.getElementById('taskFormFooter');
  taskFormFooter.style.top = `-${pixel}px`;
  taskFormFooter.style.position = 'relative';
}

/**
 * This function sets the EditField of a Subtask above the selected list-element
 * @param {number} id - selected Subtask
 * @param {string} editField - the Subtask editField
 */
function setEditPosition(id, editField) {
  let editPosition = newSubtasks.length - (id + 1);
  let defaultPxl = 38;
  let everySub = 29;
  let newPos = defaultPxl + editPosition * everySub;
  editField.style = `top: -${newPos}px`;
}

/**
 * Update subtask
 * @param {number} id - id of subtask in array
 */
function updateSubtask(id) {
  newSubtasks[id]['subtitle'] =
    document.getElementById('subtaskEditInput').value;
  addSubtask();
  hideEditSubtask();
  moveTaskFormFooter(0);
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

/**
 * Hide/Unhide the Category-Selection, Transform Arrow-Image and sets Focus
 */
function toggleCategory() {
  let arrowDropdown = document.getElementById('arrow_dropdown_addCategory');
  let categorySelection = document.getElementById(
    'category_selection-background',
  );
  let categorySelect = document.getElementById('category_select');

  if (categorySelection.classList.contains('d-none')) {
    categorySelect.focus();
    arrowDropdown.style.transform = 'rotate(180deg)';
    categorySelection.classList.remove('d-none');
  } else {
    arrowDropdown.style.transform = 'rotate(360deg)';
    categorySelection.classList.add('d-none');
  }
}

/**
 * Hide/Unhide the AssignetTo-Selection, Transform Arrow-Image and sets Focus
 */
function toggleAssignedTo() {
  let arrowDropdown = document.getElementById('arrow_dropdown_addTask');
  let userSelection = document.getElementById('user_selection-background');

  if (userSelection.classList.contains('d-none')) {
    arrowDropdown.style.transform = 'rotate(180deg)';
    userSelection.classList.remove('d-none');
  } else {
    arrowDropdown.style.transform = 'rotate(360deg)';
    userSelection.classList.add('d-none');
  }
}

/**
 * Set Values of your choice in Form
 * @param {number} key - number of key
 * @param {number} choice - value of choice
 * @param {string} origin - name of origin where function was called
 */
function setCategory(key, choice, origin) {
  let categoryName = taskCategory[choice]['title'];
  document.getElementById('category_select_name').value = categoryName;
  document.getElementById('category_select').innerHTML = choice;
  if (origin) {
    toggleCategory();
  }
}

/**
 * Find active User in User-List
 */
function whoAmi() {
  for (let i = 0; i < contacts.length; i++) {
    let contactMaillist = contacts[i]['register_entry'][0]['contact_mail'];
    let checkedMaillist = contactMaillist.includes(activeUserMail);
    if (checkedMaillist) {
      contactID = contacts[i]['register_entry'][0]['contact_ID'];
      let userDiv = 'user_name_' + contactID;
      document.getElementById(userDiv).innerHTML += ` <b>(You)`;
    }
  }
}
