let currentDraggedElement;
let category = [
  {
    id: 0,
    title: 'Technical Task',
    bgColor: '#1dd7c1',
  },
  {
    id: 1,
    title: 'User Story',
    bgColor: '#0837ff',
  },
];

// Hier wird der HTML-Code für den Fortschrittscontainer erstellt
let progressHTML = '';
// Zähler für erledigte Subtasks
let doneSubtaskCount;

function init() {
  includeHTML();
  updateHTML();
}

function updateHTML() {
  let todo = todos.filter((t) => t['status'] == 'todo');
  let inProgress = todos.filter((t) => t['status'] == 'inProgress');
  let awaitFeedback = todos.filter((t) => t['status'] == 'awaitFeedback');
  let done = todos.filter((t) => t['status'] == 'done');

  issue('todo', todo);
  issue('inProgress', inProgress);
  issue('awaitFeedback', awaitFeedback);
  issue('done', done);
}

function issue(name, job) {
  if (job.length) {
    document.getElementById(name).innerHTML = '';
    for (let index = 0; index < job.length; index++) {
      let element = job[index];
      document.getElementById(name).innerHTML += generateTasksHTML(element);
    }
  }
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(status) {
  todos[currentDraggedElement]['status'] = status;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight');
}
