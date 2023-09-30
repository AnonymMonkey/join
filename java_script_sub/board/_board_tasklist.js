

/**
 * Nicht mehr nutzen - dient nur noch als Vorlage für den Aufbau
 * Sämtliche Inhalte können vom remote-Storage abgerufen werden 
 * key = "tasks" oder key = "taskCategory"
 * 
 * 
 
let taskCategory = [
  {
    id: 0,
    title: 'HTML + CSS',
    bgColor: '#1dd7c1',
  },
  {
    id: 1,
    title: 'JavaScript',
    bgColor: '#0837ff',
  },
  {
    id: 2,
    title: 'Team',
    bgColor: '#ff3d00',
  },
  {
    id: 3,
    title: 'Meeting',
    bgColor: '#1b5e00',
  },
  {
    id: 4,
    title: 'Angular',
    bgColor: '#5f2562',
  },
];


let tasks = [
  {
    id: 0,
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
    member: [0, 1, 4],
    category: 1,
    duedate: '2023-05-10',
  },
  {
    id: 1,
    title: 'HTML Base Template Creation',
    description: 'Create reusable HTML base templates...',
    status: 'awaitFeedback',
    prio: 'Low',
    subtasks: [],
    member: [1],
    category: 0,
    duedate: '2023-05-01',
  },
  {
    id: 2,
    title: 'Daily Kochwelt Recipe',
    description: 'Implement daily recipe and portion calculator...',
    status: 'todo',
    prio: 'Low',
    subtasks: [],
    member: [2, 3],
    category: 1,
    duedate: '2023-05-01',
  },
  {
    id: 3,
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
    member: [0],
    category: 0,
    duedate: '2023-05-01',
  }
];

*/