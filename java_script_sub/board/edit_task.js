const FORM_FIELDS = {  
  id: 'currentTask',
  title: 'frame14_text',    
  description: 'frame17_text',
  status: 'temporaryStatus',
  prio: 'prioResult',
  subtasks: '',
  member: '',
  category: '',
  duedate: '',
};

function getTaskData() {
  let taskId =+ document.getElementById('currentTask').innerHTML;
  let currentTask = getTaskIndex(taskId);
  getTaskValues(currentTask);
}

function getTaskValues(currentTask) {

  let currentTaskData = tasks[currentTask];  
  for (const key in currentTaskData) {
    if (currentTaskData.hasOwnProperty(key)) {
        const keyValue = currentTaskData[key];        
        setTaskValues(currentTask, key, keyValue);
    }
  }
}

function setTaskValues(currentTask, key, keyValue) {
  let formId = FORM_FIELDS[key];
  console.log(formId + " neuer Wert: " + keyValue);
  document.getElementById(formId).value = keyValue;
  // radiobuttons-funktion
  selectedRadioButton('Urgente', 'frame24');
}


// radiobuttons-funktion / eigene Funktion nötig je nachdem was keyValue für einen Wert hat
//selectedRadioButton(keyValue, 'frame24');
//selectedRadioButton(keyValue, 'frame25');
//selectedRadioButton(keyValue, 'frame26');
