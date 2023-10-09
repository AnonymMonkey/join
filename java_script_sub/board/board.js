let currentDraggedElement;
let contactsTask = [];
let tasks = [];
let taskCategory = [];
let progressHTML = '';

async function init() {
  await loadTasks();
  await loadTaskCategory();
  await loadContacts();
  await loadData();
  await includeHTML();
  updateHTML();
  adjustQuicklinkBG();
  setDateRange();
  addSubtask();
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
  let id = getTaskIndex(currentDraggedElement);
  tasks[id]['status'] = status;
  await setItem('tasks', JSON.stringify(tasks));
  updateHTML();
}

function addHighlight(status) {
  let matches = document.querySelectorAll('div.placeholderCard');
  let excludeContainer = document.getElementById(status);

  matches.forEach(function (placeholderItem) {
    if (!excludeContainer.contains(placeholderItem)) {
      placeholderItem.classList.add('highlight');
    }
  });
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
  let doneSubtaskCount = 0;
  let allSubtaskCount = element['subtasks'].length;
  if (element['subtasks'] && allSubtaskCount > 0) {
    for (const subtask of element['subtasks']) {
      if (subtask['substatus'] === 'done') {
        doneSubtaskCount++;
      }
    }
    let resultProgress = calculateProgress(doneSubtaskCount, allSubtaskCount);
    generateProgressHTML(resultProgress, doneSubtaskCount, allSubtaskCount);
  }
}

async function assignedTo(task) {
  let pixelLeft = 0;
  let numberOfMembers = 0;  

for (let i = 0; i < contactsTask.length; i++) {
    let contactTask = contactsTask[i];
    if (contactTask['register_entry'] && contactTask['register_entry'][0]) {
        let contactId = contactTask['register_entry'][0]['contact_ID'];
        
        if (task && task['member'] && task['member'].includes(contactId)) {
            numberOfMembers++;        
            let contactInitials = contactTask['register_entry'][0]['contact_initials'];
            let contactColor = contactTask['register_entry'][0]['contact_color'];        
            if (i == 5 || i == 10 || i == 15 ) {
              pixelLeft = 0;
            }
            generateProfileBadges(contactInitials, contactColor, pixelLeft);
            pixelLeft = pixelLeft + 8;
        }
    }    
  }
}

function assignedToTask(task) {

  for (let i = 0; i < contactsTask.length; i++) {

    let contactTask = contactsTask[i];
    let contactId = contactTask['register_entry'][0]['contact_ID'];

    if (tasks[task]['member'].includes(contactId)) {
      let contactInitials = contactTask['register_entry'][0]['contact_initials'];
      let contactColor = contactTask['register_entry'][0]['contact_color'];
      let contactName = contactTask['register_entry'][0]['contact_name'];

      generateProfileBadgesTask(contactInitials, contactColor, contactName);
    }
  }
}

async function loadContacts() {
  try {
    contactsTask = JSON.parse(await getItem('contacts'));
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

function getTaskIndex(searchId) {
  return tasks.findIndex(item => item.id === searchId);
}

async function deleteTask(searchId) {
  let taskIndex = getTaskIndex(searchId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    closeTaskOverlay();
    await setItem('tasks', tasks);
    init();
  }
}

//TODO Stefan - Funktionen um außerhalb der Dialoge das Schließen zu erzwingen bzw. dieses zu unterbinden / not working
function close() {
  console.log('jetzt muss es zu');
}

function doNotClose(event) {
  event.stopPropagation();
}

// onclick="previousImage(),doNotClose(event)"