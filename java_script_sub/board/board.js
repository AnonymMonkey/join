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

function init() {
  includeHTML();
  updateHTML();
}

function updateHTML(search) {
  let statuses = ['todo', 'inProgress', 'awaitFeedback', 'done'];
  let longText = ['No tasks To do', 'No tasks in progress', 'No await feedback', 'No tasks done'];

  let filteredTodos = search
    ? todos.filter(
        (t) =>
          statuses.includes(t['status']) &&
          (t['title'].toLowerCase().includes(search) ||
            t['description'].toLowerCase().includes(search))
      )
    : todos;

  statuses.forEach((status, index) => {
    let filteredByStatus = filteredTodos.filter((t) => t['status'] === status);
    issue(status, filteredByStatus, longText[index]);
  });
}

function uxpdateHTML(search) {
  let todo;
  let inProgress;
  let awaitFeedback;
  let done;
  
  if (search) {
    todo = todos.filter((t) => t['status'] == 'todo' && (t['title'].toLowerCase().includes(search) || t['description'].toLowerCase().includes(search)));
    inProgress = todos.filter((t) => t['status'] == 'inProgress' && (t['title'].toLowerCase().includes(search) || t['description'].toLowerCase().includes(search)));
    awaitFeedback = todos.filter((t) => t['status'] == 'awaitFeedback' && (t['title'].toLowerCase().includes(search) || t['description'].toLowerCase().includes(search)));
    done = todos.filter((t) => t['status'] == 'done' && (t['title'].toLowerCase().includes(search) || t['description'].toLowerCase().includes(search)));
  } else {
    todo = todos.filter((t) => t['status'] == 'todo');
    inProgress = todos.filter((t) => t['status'] == 'inProgress');
    awaitFeedback = todos.filter((t) => t['status'] == 'awaitFeedback');
    done = todos.filter((t) => t['status'] == 'done');
  }  
  
  issue('todo', todo, 'No tasks To do');
  issue('inProgress', inProgress, 'No tasks in progress');
  issue('awaitFeedback', awaitFeedback, 'No await feedback');
  issue('done', done, 'No tasks done');
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

// Funktioniert noch nicht!
document.querySelector(".btn_search").addEventListener("click", function() {
  this.querySelector("path").setAttribute("fill", "#5fc0e9");
});