// async function init() {
//   await includeHTML();
//   adjustQuicklinkBG();
// }

function selectedRadioButton(prio, frameName) {
  let image = `img${prio}`;  
  let radio = document.getElementById(prio);
  let frame = document.getElementById(frameName);

  document.getElementById('frame24').classList.remove('frame24_selected');
  document.getElementById('frame25').classList.remove('frame25_selected');
  document.getElementById('frame26').classList.remove('frame26_selected');
  document.getElementById('imgUrgent').src = `../assets/img/add-task/Urgent.svg`;
  document.getElementById('imgMedium').src = `../assets/img/add-task/Medium.svg`;
  document.getElementById('imgLow').src = `../assets/img/add-task/Low.svg`;
  radio.checked = true;
  frame.classList.add(`${frameName}_selected`);
  document.getElementById(image).src = `../assets/img/add-task/${prio}_white.svg`;
}

function addNewTask() {
  let id = 555;
  let title = 'titel hier';
  let description = 'taskbeschreibung';
  let status = 'todo';
  let prio = 'Medium';
  //let subtasks = "";
  let member = [6339];
  let category = 1;
  let duedate = 1699138800000;

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
    duedate: duedate,
  };

  tasks.push(newTask);
  setItem('tasks', tasks);
  // close overlay
  // aktualisieren mit updateHtml()?
}
