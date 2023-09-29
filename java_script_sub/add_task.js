// async function init() {
//   await includeHTML();
//   adjustQuicklinkBG();
// }

function selectedRadioButton(numberyo, bgColor, frameName) {
  let radio = document.getElementById(numberyo);
  let frame = document.getElementById(frameName);
 
  document.getElementById('frame24').style.background = 'blue !important';

  radio.checked = true; 
  //frame.style.backgroundColor = `${bgColor} !important`;
}


function addNewTask() {
  
  let id = 555;
  let title = "titel hier";
  let description = "taskbeschreibung";
  let status = "todo";
  let prio = "Medium";
  //let subtasks = "";
  let member = [6339];
  let category = 1;
  let duedate = 1699138800000;

  let newTask = {  
    'id': id,
    'title': title,
    'description': description,
    'status': status,
    'prio': prio,
    'subtasks': [
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
    'member': member,
    'category': category,
    'duedate': duedate,
  }

  tasks.push(newTask);
  setItem('tasks', tasks);
  // close overlay
  // aktualisieren mit updateHtml()?
}