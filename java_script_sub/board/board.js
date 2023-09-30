let currentDraggedElement;
let contacts = [];
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
  let id = getTaskIndex(currentDraggedElement);
  tasks[id]['status'] = status;
  await setItem('tasks', JSON.stringify(tasks));
  updateHTML();
}

function addHighlight(status) {
  let matches = document.querySelectorAll('div.placeholderCard');
  // Element mit der ID "todo" auswählen
  let excludeContainer = document.getElementById(status);

  // Array zum Speichern der ausgeschlossenen Elemente erstellen
  let excludedElements = [];

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

function assignedTo(task) {
  let pixelLeft = 0;
  
  for (let i = 0; i < contacts.length; i++) {
    
    let contactTask = contacts[i];
    let contactId = contactTask['register_entry'][0]['contact_ID'];

    if(task['member'].includes(contactId)) {      
      
      let contactInitials = contactTask['register_entry'][0]['contact_initials'];
      let contactColor = contactTask['register_entry'][0]['contact_color'];
      let contactName = contactTask['register_entry'][0]['contact_name'];
      
      generateProfileBadges(contactInitials, contactColor, pixelLeft);      
      pixelLeft = pixelLeft + 8;
    }
  }
}

function assignedToTask(task) {  

  for (let i = 0; i < contacts.length; i++) {
    
    let contactTask = contacts[i];
    let contactId = contactTask['register_entry'][0]['contact_ID'];

    if(tasks[task]['member'].includes(contactId)) {      
      let contactInitials = contactTask['register_entry'][0]['contact_initials'];
      let contactColor = contactTask['register_entry'][0]['contact_color'];
      let contactName = contactTask['register_entry'][0]['contact_name'];
      
      generateProfileBadgesTask(contactInitials, contactColor, contactName);      
    }
  }
}


async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem('contacts'));
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

function insertTasks() {
  let xtasks = [
    {
      id: 14,
      title: 'Kochwelt Page & Recipe Recommender',
      description: 'Build start page with recipe recommendation.',
      status: 'todo',
      prio: 'Medium',
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
      member: [6529,378],
      category: 1,
      duedate: 1699138800000,
    },
    {
      id: 8,
      title: 'HTML Base Template Creation',
      description: 'Create reusable HTML base templates...',
      status: 'awaitFeedback',
      prio: 'Low',
      subtasks: [],
      member: [378,6339,6529],
      category: 0,
      duedate: 1704495600000,
    },
    {
      id: 22,
      title: 'Daily Kochwelt Recipe',
      description: 'Implement daily recipe and portion calculator...',
      status: 'todo',
      prio: 'Urgent',
      subtasks: [],
      member: [378, 6339],
      category: 1,
      duedate: 1701385200000,
    },
    {
      id: 5,
      title: 'CSS Architecture Planning',
      description: 'Define CSS naming conventions and structure...',
      status: 'done',
      prio: 'Urgent',
      subtasks: [
        {
          subid: 0,
          subtitle: 'Establish CSS Methodology',
          substatus: 'done',
        },
        {
          subid: 1,
          subtitle: 'Setup Base Styles',
          substatus: 'open',
        },
        {
          subid: 2,
          subtitle: 'Do something',
          substatus: 'open',
        },
      ],
      member: [6529],
      category: 0,
      duedate: 1700002800000,
    }
  ];
  setItem('tasks', xtasks);
}