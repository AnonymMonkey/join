let amountTodos;
let amountDone;
let amountUrgent;
let amountInBoard;
let amountInProgress;
let amountAwaitingFeedback;

let todos = [];

let urgentDueDates = [];

let urgentDueDate;


async function renderSummary(){
    includeHTML();
    await loadTodos();
    getAmountInBoard();
    getAmountTodos();
    getAmountDone();
    getAmountUrgent();
    getAmountInProgress();
    getAmountAwaitingFeedback();
    getHTMLTemplateforSummary();
    adjustQuicklinkBG();
}


async function loadTodos(){
    try {
        todos = JSON.parse(await getItem('tasks'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


function getAmountInBoard(){
    amountInBoard = todos.length;
}


function getAmountTodos(){
    amountTodos = 0;
    for (let index = 0; index < todos.length; index++) {
        if(todos[index].status == 'todo'){
            amountTodos++
        }
    }
}


function getAmountDone(){
    amountDone = 0
    for (let index = 0; index < todos.length; index++) {
        if(todos[index].status == 'done'){
            amountDone++
        }
    }
}


function getAmountUrgent(){
    amountUrgent = 0
    for (let index = 0; index < todos.length; index++) {
        if(todos[index].prio == 'Urgent'){
            amountUrgent++
            let dateInSeconds = todos[index].duedate;
            urgentDueDates.push(dateInSeconds);
        }
    }
    getDueDate();
}

function getDueDate(){
    //Get nearest Date from Array
    let nearestDate =  Math.min.apply(Math, urgentDueDates)
    
    //Convert DateNumber to String
    const dueDate = new Date(nearestDate);
    let currentday = String(dueDate.getDate()).padStart(2, '0');
    let currentMonth = String(dueDate.getMonth()+1).padStart(2, '0');
    let currentYear = String(dueDate.getFullYear());
    let urgentDate = `${currentday}-${currentMonth}-${currentYear}`; 
    
    

    /* Get Hours
    let today = new Date()
    let hours = today.getHours();
    console.log(hours);
    */

    urgentDueDate = urgentDate;
}


function getAmountInProgress(){
    amountInProgress = 0
    for (let index = 0; index < todos.length; index++) {
        if(todos[index].status == 'inProgress'){
            amountInProgress++
        }
    }
}


function getAmountAwaitingFeedback(){
    amountAwaitingFeedback = 0
    for (let index = 0; index < todos.length; index++) {
        if(todos[index].status == 'awaitFeedback'){
            amountAwaitingFeedback++
        }
    }
}


function getHTMLTemplateforSummary(){
    //Amount To-do
    document.getElementById('summaryToDo').innerHTML = /*html*/`
        <span class="tasksAmount">${amountTodos}</span>
        <span class="tasksSpan">To-do</span>
    `;
    //Amount Tasks In Board
    document.getElementById('summaryTasks').innerHTML = /*html*/`
        <span class="tasksAmount">${amountInBoard}</span>
        <span class="tasksSpan">Tasks In</span>
        <span class="tasksSpan">Board</span>
    `;
    //Amount Tasks Done
    document.getElementById('summaryDone').innerHTML = /*html*/`
        <span class="tasksAmount">${amountDone}</span>
        <span class="tasksSpan">Done</span>
    `;
    //Amount Tasks Urgent
    document.getElementById('summaryUrgent').innerHTML = /*html*/`
        <span class="tasksAmount">${amountUrgent}</span>
        <span class="tasksSpan">Urgent</span>
    `;
    //Urgent duedate / Deadline
    document.getElementById('deadline').innerHTML = /*html*/`
        <span class="deadlineSpan">${urgentDueDate}</span>
        <span class="dateTextSpan">Upcoming Deadline</span>
    `;
    //Amount Tasks In Progress
    document.getElementById('summaryInProgress').innerHTML = /*html*/`
        <span class="tasksAmount">${amountInProgress}</span>
        <span class="tasksSpan">Tasks In</span>
        <span class="tasksSpan">Progress</span>
    `;
    //Amount Tasks In Awaiting Feedback
    document.getElementById('summaryAwaitingFeedback').innerHTML = /*html*/`
        <span class="tasksAmount">${amountAwaitingFeedback}</span>
        <span class="tasksSpan">Awaiting</span>
        <span class="tasksSpan">Feedback</span>
    `;
}