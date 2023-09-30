async function initAddTasks() {
  await loadTasks();
  await loadTaskCategory();
  await includeHTML();
  adjustQuicklinkBG();
  setDateRange();
}

function setDateRange() {
  let no_of_years = 1;
  let year = new Date().getFullYear();  
  let maxyear = new Date().getFullYear() + no_of_years;
  let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  let date = ("0" + new Date().getDate()).slice(-2);
  let today = year + "-" + month + "-" + date;
  let maxdate = maxyear + "-" + month + "-" + date;
  document.getElementById('addtask-duedate').min = today;
  document.getElementById('addtask-duedate').max = maxdate;
}

function invalid(fieldName) {
  alert('invalid field' + fieldName);
  document.getElementById(`${fieldName}`).classList.add('error');
}

function selectedRadioButton(prio, frameName) {
  let frames = ['frame24', 'frame25', 'frame26'];
  let images = { Urgent: 'imgUrgent', Medium: 'imgMedium', Low: 'imgLow' };
  frames.forEach(frame => document.getElementById(frame).classList.remove(`${frame}_selected`));
  Object.keys(images).forEach(key => document.getElementById(images[key]).src = `../assets/img/add-task/${key}.svg`);
  
  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(`img${prio}`).src = `../assets/img/add-task/${prio}_white.svg`;  
  document.getElementById('prioResult').innerHTML = prio;  
}

function showSubtaskActions() {
  document.getElementById('cancelSubtaskInput').classList.remove('d-none');
  document.getElementById('addSubtaskInput').classList.remove('d-none');
}

function hideSubtaskActions() {
  document.getElementById('cancelSubtaskInput').classList.add('d-none');
  document.getElementById('addSubtaskInput').classList.add('d-none');
}

function getNextFreeTaskId(){
  let allIds = tasks.map(task => task.id);
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
    'id': id,
    'title': title,
    'description': description,
    'status': status,
    'prio': prio,
    'subtasks': [
      {
        'subid': 0,
        'subtitle': 'Implement Recipe Recommendation',
        'substatus': 'open',
      },
      {
        'subid': 1,
        'subtitle': 'Start Page Layout',
        'substatus': 'done',
      },
    ],
    'member': member,
    'category': category,
    'duedate': formattedTaskDate,
  };

  tasks.push(newTask);
  await setItem('tasks', tasks);  
  closeAddTaskOverlay();  


  // Info dass neuer Task gespeichert wurde!

  openSelectedQuicklink('quickBoard');
}
