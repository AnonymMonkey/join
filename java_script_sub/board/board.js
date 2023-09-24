let currentDraggedElement;
let contactsStefan = [];
let tasks = [];
let taskCategory = [];
let progressHTML = '';

async function init() {
  await loadTasks();
  await loadTaskCategory();
  await loadContacts();
  await includeHTML();
  updateHTML();
  adjustQuicklinkBG();
}

function updateHTML(search) {
  let statuses = ['todo', 'inProgress', 'awaitFeedback', 'done'];
  let longText = [
    'No tasks To do',
    'No tasks in progress',
    'No await feedback',
    'No tasks done',
  ];

  let filteredTasks = search
    ? tasks.filter(
        (t) =>
          statuses.includes(t['status']) &&
          (t['title'].toLowerCase().includes(search) ||
            t['description'].toLowerCase().includes(search)),
      )
    : tasks;

  statuses.forEach((status, index) => {
    let filteredByStatus = filteredTasks.filter((t) => t['status'] === status);
    issue(status, filteredByStatus, longText[index]);
  });
}

async function issue(name, job, longText) {
  if (job.length) {
    document.getElementById(name).innerHTML = '';
    for (let index = 0; index < job.length; index++) {
      let element = job[index];
      document.getElementById(name).innerHTML += generateTasksHTML(element);
    }
  } else {
    document.getElementById(
      name,
    ).innerHTML = `<div class="no_tasks_feedback">${longText}</div>`;
  }
  generatePlaceholer(name);
}

function startDragging(id) {
  currentDraggedElement = id;
}

function startTransform(id, status) {
  document.getElementById(id).style.transform = 'rotate(5deg)';
  addHighlight(status);
}

function stopTransform(id, status) {
  document.getElementById(id).style.transform = 'rotate(0deg)';
  removeHighlight(status);
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(status) {
  tasks[currentDraggedElement]['status'] = status;
  await setItem('tasks', JSON.stringify(tasks));
  updateHTML();
}

function addHighlight(status) {
  let matches = document.querySelectorAll('div.placeholderCard');
  // Element mit der ID "todo" auswählen
  let excludeContainer = document.getElementById(status);

  // Array zum Speichern der ausgeschlossenen Elemente erstellen
  let excludedElements = [];

  // Überprüfen Sie jedes placeholderCard-Element
  matches.forEach(function (placeholderItem) {
    // Überprüfen Sie, ob das placeholderCard-Element ein Kind des "todo" Containers ist
    if (!excludeContainer.contains(placeholderItem)) {
      // Wenn es kein Kind des "todo" Containers ist, fügen Sie es zu den ausgeschlossenen Elementen hinzu
      //excludedElements.push(card);
      placeholderItem.classList.add('highlight');
    }
  });

  // matches.forEach((placeholderItem) => {
  //   placeholderItem.classList.add('highlight');
  // });
}

function removeHighlight() {
  let matches = document.querySelectorAll('div.placeholderCard');
  matches.forEach((placeholderItem) => {
    placeholderItem.classList.remove('highlight');
  });
}

function calculateProgress(doneSubtaskCount, allSubtaskCount) {
  const basis = 128;
  let percent = (doneSubtaskCount * 100) / allSubtaskCount;
  let resultProgress = (basis * percent) / 100;
  resultProgress = basis - resultProgress;
  return resultProgress;
}

function filterTasks() {
  let search = document.getElementById('search').value;
  search = search.toLowerCase();
  updateHTML(search);
}

function taskProgress(element) {
  // Counter for completed Subtasks
  let doneSubtaskCount = 0;
  let allSubtaskCount = element['subtasks'].length;
  if (element['subtasks'] && allSubtaskCount > 0) {
    // Check, if subtasks aren´t empty
    for (const subtask of element['subtasks']) {
      if (subtask['substatus'] === 'done') {
        doneSubtaskCount++;
      }
    }
    let resultProgress = calculateProgress(doneSubtaskCount, allSubtaskCount);
    generateProgressHTML(resultProgress, doneSubtaskCount, allSubtaskCount);
  }
}

function assignedTo(element) {
  let pixelLeft = 0;
  // console.log(element['id'] + " member " + element['member']);
  // get all contacts from remote storage where member of this task
  generateProfileBadges('AM', '#FFA800', pixelLeft);
  generateProfileBadges('SJ', '#4589FF', 8);
  pixelLeft = pixelLeft + 8;
}

async function loadContacts() {
  try {
    contactsStefan = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem('tasks'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

async function loadTaskCategory() {
  try {
    taskCategory = JSON.parse(await getItem('taskCategory'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/*
let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches;
if(isDarkMode){
  document.getElementById("favicon").href="../assets/img/logo_light.png";
}
else
{
  document.getElementById("favicon").href="../assets/img/favicon.png";
}
*/

function getTaskIndex(searchId) {
  return tasks.findIndex(item => item.id === searchId);
}

//[{"id": 0, "title": "Kochwelt Page & Recipe Recommender", "description": "Build start page with recipe recommendation.", "status": "inProgress", "prio": "Medium", "subtasks": [{"subid": 0, "subtitle": "Implement Recipe Recommendation", "substatus": "open"}, {"subid": 1, "subtitle": "Start Page Layout", "substatus": "done"}], "member": [0, 1, 4], "category": 1, "duedate": "2023-05-10"}, {"id": 1, "title": "HTML Base Template Creation", "description": "Create reusable HTML base templates...", "status": "todo", "prio": "Low", "subtasks": [], "member": [1], "category": 0, "duedate": "2023-05-01"}, {"id": 2, "title": "Daily Kochwelt Recipe", "description": "Implement daily recipe and portion calculator...", "status": "done", "prio": "Low", "subtasks": [], "member": [2, 3], "category": 1, "duedate": "2023-05-01"}, {"id": 3, "title": "CSS Architecture Planning", "description": "Define CSS naming conventions and structure...", "status": "awaitFeedback", "prio": "Urgent", "subtasks": [{"subid": 0, "subtitle": "Establish CSS Methodology", "substatus": "done"}, {"subid": 1, "subtitle": "Setup Base Styles", "substatus": "open"}, {"subid": 2, "subtitle": "Do something", "substatus": "open"}], "member": [0], "category": 0, "duedate": "2023-05-01"}]

function deleteTask(searchId) {  
  let taskIndex = getTaskIndex(searchId);  
  if (taskIndex !== -1) {
    //console.log(`Das Element mit id ${searchId} wurde gefunden. Index: ${taskIndex}`);
    tasks.splice(taskIndex, 1);
    // close overlay
    // render
  }  
}