let todos = [
  {
    id: 0,
    title: 'Putzen',
    description: 'Beschreibung',
    status: 'inProgress',
    prio: 'urgent',
    subtasks: [
      {
        subid: 0,
        subtitle: 'Badezimmer',
        substatus: 'open',
      },
      {
        subid: 1,
        subtitle: 'Küche',
        substatus: 'open',
      },
    ],
    member: [],
    category: 1,
  },
  {
    id: 1,
    title: 'Kochen',
    description: 'Beschreibung',
    status: 'todo',
    prio: 'medium',
    subtasks: [],
    member: [],
    category: 0,
  },
  {
    id: 2,
    title: 'Bügeln',
    description: 'Beschreibung',
    status: 'done',
    prio: 'low',
    subtasks: [],
    member: [],
    category: 0,
  },
];

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

let currentDraggedElement;

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
      const element = job[index];
      document.getElementById(name).innerHTML +=
        generateTasksHTML(element);
    }
  }
}

function generateTasksHTML(element) {
  return /*html*/`
  <div draggable="true" ondragstart="startDragging(${element['id']})" class="taskCard">${element['title']}</div>
  `;
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
