let currentDraggedElement;
let contactsStefan = [];
let tasks = [];
let taskCategory = [];
let progressHTML = '';

async function init() {
  await loadTasks();
  await loadTaskCategory();
  await loadContacts();
  includeHTML();
  updateHTML();
}

function updateHTML(search) {
  let statuses = ['todo', 'inProgress', 'awaitFeedback', 'done'];
  let longText = ['No tasks To do', 'No tasks in progress', 'No await feedback', 'No tasks done'];

  let filteredTasks = search
    ? tasks.filter(
        (t) =>
          statuses.includes(t['status']) &&
          (t['title'].toLowerCase().includes(search) ||
            t['description'].toLowerCase().includes(search))
      )
    : tasks;

  statuses.forEach((status, index) => {
    let filteredByStatus = filteredTasks.filter((t) => t['status'] === status);
    issue(status, filteredByStatus, longText[index]);
  });
}

function issue(name, job, longText) {
  if (job.length) {
    document.getElementById(name).innerHTML = '';
    for (let index = 0; index < job.length; index++) {
      let element = job[index];
      document.getElementById(name).innerHTML += generateTasksHTML(element);
    }
  }
  else{
    document.getElementById(name).innerHTML = `<div class="no_tasks_feedback">${longText}</div>`;
  }
}

function startDragging(id) {
  currentDraggedElement = id;  
}

function startTransform(id){
  console.log("start transform: " + id);
  document.getElementById(id).style.transform = 'rotate(5deg)';
  // transform: rotate(5deg);
}

function stopTransform(id){
  console.log("stop transform: " + id);
  // transform: rotate(0deg);
  document.getElementById(id).style.transform = 'rotate(0deg)';
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(status) {
  tasks[currentDraggedElement]['status'] = status;
  await setItem('tasks', JSON.stringify(tasks));
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}

function calculateProgress(doneSubtaskCount, allSubtaskCount) {
  const basis = 128;
  let percent = doneSubtaskCount * 100 / allSubtaskCount;
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

function assignetTo(element) {
  let pixelLeft = 0;
  // console.log(element['id'] + " member " + element['member']);
  // get all contacts from remote storage where member of this task
  generateProfileBadges('AM', '#FFA800', pixelLeft);
  generateProfileBadges('SJ', '#4589FF', 8);
  pixelLeft = pixelLeft + 8;
}

async function loadContacts(){
  try {
      contactsStefan = JSON.parse(await getItem('contacts'));
  } catch(e){
      console.error('Loading error:', e);
  }
}

async function loadTasks(){
  try {
      tasks = JSON.parse(await getItem('tasks'));
  } catch(e){
      console.error('Loading error:', e);
  }
}

async function loadTaskCategory(){
  try {
    taskCategory = JSON.parse(await getItem('taskCategory'));
  } catch(e){
      console.error('Loading error:', e);
  }
}