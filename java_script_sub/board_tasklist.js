let todos = [
  {
    id: 0,
    title: 'Kochwelt Page & Recipe Recommender',
    description: 'Build start page with recipe recommendation.',
    status: 'inProgress',
    prio: 'Medium',
    subtasks: [
      {
        subid: 0,
        subtitle: 'Implement Recipe Recommendation',
        substatus: 'done',
      },
      {
        subid: 1,
        subtitle: 'Start Page Layout',
        substatus: 'open',
      },
    ],
    member: [],
    category: 1,
    duedate: '2023-05-10',
  },
  {
    id: 1,
    title: 'HTML Base Template Creation',
    description: 'Create reusable HTML base templates...',
    status: 'awaitFeedback',
    prio: 'low',
    subtasks: [],
    member: [],
    category: 0,
    duedate: '2023-05-01',
  },
  {
    id: 2,
    title: 'Daily Kochwelt Recipe',
    description: 'Implement daily recipe and portion calculator...',
    status: 'awaitFeedback',
    prio: 'low',
    subtasks: [],
    member: [],
    category: 1,
    duedate: '2023-05-01',
  },
  {
    id: 3,
    title: 'CSS Architecture Planning',
    description: 'Define CSS naming conventions and structure...',
    status: 'done',
    prio: 'high',
    subtasks: [],
    member: [],
    category: 0,
    duedate: '2023-05-01',
  }
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