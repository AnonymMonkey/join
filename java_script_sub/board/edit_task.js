const FORM_FIELDS = {  
  id: 'currentTask',
  title: 'frame14_text',    
  description: 'frame17_text',
  status: 'temporaryStatus',
  prio: 'prioResult',
  //subtasks: '',
  //member: '',
  //category: '',
  //duedate: '',
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
               
        if(key === 'member') {          
          for (let i = 0; i < keyValue.length; i++) {
            const element = keyValue[i];            
            createBadge(element);
          }
        }
        setTaskValues(currentTask, key, keyValue);
    }
  }
}

function setTaskValues(currentTask, key, keyValue) {
  let formId = FORM_FIELDS[key];
  console.log(formId + " neuer Wert: " + keyValue);
  document.getElementById(formId).value = keyValue;
  // radiobuttons-funktion
  selectedRadioButton('Urgent', 'frame24');  
}


// radiobuttons-funktion / eigene Funktion nötig je nachdem was keyValue für einen Wert hat
//selectedRadioButton(keyValue, 'frame24');
//selectedRadioButton(keyValue, 'frame25');
//selectedRadioButton(keyValue, 'frame26');
