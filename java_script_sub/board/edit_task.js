const FORM_FIELDS = {  
  id: 'currentTask',
  title: 'frame14_text',    
  description: 'frame17_text',
  status: 'temporaryStatus',
  prio: 'prioResult',
  Urgent: 'frame24', 
  Medium: 'frame25', 
  Low: 'frame26',
  subtasks: '',
  member: '',
  category: 'category_select',
  duedate: 'addtask-duedate',
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
        if(key === 'prio') {                    
          setValuesOnRadioButtons(keyValue);
        } else
        if(key === 'duedate') {                    
          setValueOnDueDate(key, keyValue);          
        }
        else
        if(key === 'subtasks') {                    
          console.log('subtasks');
        } else
        if(key === 'member') {
          for (let i = 0; i < keyValue.length; i++) {
            const element = keyValue[i];            
            checkContacts(element);
          }
        } 
        else {
        // titel, description und category klappen hier
           setTaskValues(currentTask, key, keyValue);
        }
    }
  }  
  document.getElementById('frame39').style = 'margin-top: 42px;';  
}

function setTaskValues(currentTask, key, keyValue) {
  let formId = FORM_FIELDS[key];  
  document.getElementById(formId).value = keyValue;
}

function setValuesOnRadioButtons(keyValue) {  
  let formId = FORM_FIELDS[keyValue];  
  selectedRadioButton(keyValue, formId);
}

function setValueOnDueDate(key, keyValue) {
  let formId = FORM_FIELDS[key];
  let formattedDate = getValueDueDate(keyValue);  
  document.getElementById(formId).value = `${formattedDate}`;
  console.log(formattedDate);
}

function getValueDueDate(date) {  
  dueDate = new Date(date);  
  let currentday = String(dueDate.getDate()).padStart(2, '0');
  let currentMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
  let currentYear = String(dueDate.getFullYear());
  let formattedDate = `${currentYear}-${currentMonth}-${currentday}`;
  return formattedDate;
}

function checkContacts(thisContact) {
    const contactInArray = contacts.some(entry => entry.register_entry.some(contact => contact.contact_ID === thisContact));
    if(contactInArray){
      contactSelection.push(thisContact);      
      createBadge(`${thisContact}`);
    }
}