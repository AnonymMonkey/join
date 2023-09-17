let todos = [{
  'id': 0,
  'title': 'Putzen',
  'description': 'Beschreibung',
  'status': 'in_progress',
  'prio': 'urgent',
  'subtasks': [
    {
      'subid': 0,
      'subtitle': 'Badezimmer',
      'substatus': 'open'
    },
    {
      'subid': 1,
      'subtitle': 'Küche',
      'substatus': 'open'
    }
  ],
  'member': [] 
},{
  'id': 1,
  'title': 'Kochen',
  'description': 'Beschreibung',
  'status': 'todo',
  'prio': 'medium',
  'subtasks': [],
  'member': []
},{
  'id': 2,
  'title': 'Bügeln',
  'description': 'Beschreibung',
  'status': 'done',
  'prio': 'low',
  'subtasks': [],
  'member': []
}];

let category = [{
  'id': 1,
  'title': 'Technical Task',
  'bgColor': '#1dd7c1'
},{
  'id': 2,
  'title': 'User Story',
  'bgColor': '#0837ff'
}]

let currentDraggedElement;

function updateHTML() {
  let open = todos.filter(t => t['category'] == 'open');
  document.getElementById('open').innerHTML = '';
  for (let index = 0; index < open.length; index++) {
    const element = open[index];
    document.getElementById('open').innerHTML += generateTodoHTML(element);
  }

  let closed = todos.filter(t => t['category'] == 'closed');
  document.getElementById('closed').innerHTML = '';
  for (let index = 0; index < closed.length; index++) {
    const element = closed[index];
    document.getElementById('closed').innerHTML += generateTodoHTML(element);
  }

}

function generateTodoHTML(element) {
  return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function moveTo(category) {
  todos[currentDraggedElement]['category'] = category;
  updateHTML();
}

function highlight(id) {
  document.getElementById(id).classList.add('drag-area-highlight')
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('drag-area-highlight')
}