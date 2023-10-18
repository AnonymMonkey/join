const FORM_FIELDS = {
  id: 'currentTask',
  title: 'frame14_text',
  description: 'frame17_text',
  status: 'temporaryStatus',
  prio: 'prioResult',
  Urgent: 'frame24',
  Medium: 'frame25',
  Low: 'frame26',
  category: 'category_select',
  duedate: 'addtask-duedate',
};

/**
 * Getting current Task-ID
 */
function getTaskData() {
  let taskId = + document.getElementById('currentTask').innerHTML;
  let currentTask = getTaskIndex(taskId);
  getTaskValues(currentTask);
}

/**
 * Getting all Values from Task
 * @param {number} currentTask - ID of the Task
 */
async function getTaskValues(currentTask) {

  let currentTaskData = tasks[currentTask];
  for (const key in currentTaskData) {
    if (currentTaskData.hasOwnProperty(key)) {
      const keyValue = currentTaskData[key];
      if (key === 'prio') {
        setValuesOnRadioButtons(keyValue);
      } else 
      if (key === 'duedate') {
          setValueOnDueDate(key, keyValue);
        } else
          if (key === 'subtasks') {
            for (let i = 0; i < keyValue.length; i++) {
              const element = keyValue[i];
              setSubtasks(element);
            }
          } 
          else 
          if (key === 'status') {              
            setStatus(key, keyValue);
            }          
          else
            if (key === 'member') {              
              await userSelection('isClosed');
              for (let i = 0; i < keyValue.length; i++) {
                const element = keyValue[i];
                checkContacts(element);
              }
            }
            else {              
              setTaskValues(currentTask, key, keyValue);
            }
    }
  }
  document.getElementById('frame39').style = 'margin-top: 42px;';
}

/**
 * Sets Input-Values of the given Task (like Title, Description)
 * @param {number} currentTask - ID of the Task
 * @param {string} key - Array-Key
 * @param {string} keyValue - Array-Value
 */
function setTaskValues(currentTask, key, keyValue) {
  let formId = FORM_FIELDS[key];
  document.getElementById(formId).value = keyValue;
}

/**
 * Set the priority (value of Radio-Button-Group) of the given Task
 * @param {string} keyValue - Array-Value
 */
function setValuesOnRadioButtons(keyValue) {
  let formId = FORM_FIELDS[keyValue];
  selectedRadioButton(keyValue, formId);
}

/**
 * Generates Subtasklist
 * @param {string} keyValue - Subtasks of the given Task
 */
function setSubtasks(keyValue){    
  newSubtasks.push(keyValue);
  addSubtask();
}

/**
 * Set the dueDate of the given Task
 * @param {string} key - Array-Key
 * @param {string} keyValue - Array-Value
 */
function setValueOnDueDate(key, keyValue) {
  let formId = FORM_FIELDS[key];
  let formattedDate = getValueDueDate(keyValue);
  document.getElementById(formId).value = `${formattedDate}`;  
}

/**
 * Sets the current Task-Status like todo, inProgress, ...
 * @param {string} key - Array-Key
 * @param {string} keyValue - Array-Value
 */
function setStatus(key, keyValue) {
  let formId = FORM_FIELDS[key];
  document.getElementById('temporaryStatus').innerHTML = keyValue;
}

/**
 * Convert Timestamp to formattedDate
 * @param {number} date - UTC Timestamp
 * @returns - the formatted Date
 */
function getValueDueDate(date) {
  dueDate = new Date(date);
  let currentday = String(dueDate.getDate()).padStart(2, '0');
  let currentMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  let currentYear = String(dueDate.getFullYear());
  let formattedDate = `${currentYear}-${currentMonth}-${currentday}`;
  return formattedDate;
}

/**
 * Check if Contact-ID is in Array and start function to create Contact-Badge
 * @param {number} thisContact - Contact-ID
 */
async function checkContacts(thisContact) {  
  const contactInArray = contacts.some(entry => entry.register_entry.some(contact => contact.contact_ID === thisContact));
  if (contactInArray) {    
    createBadge(thisContact);
  }
}


