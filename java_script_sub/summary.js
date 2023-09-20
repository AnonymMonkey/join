let amountTodos;
let amountDone;
let amountUrgent;
let amountInBoard = todos.length;
let amountInProgress;
let amountAwaitingFeedback;


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
        }
    }
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


function renderSummary(){
    getAmountTodos();
    getAmountDone();
    getAmountUrgent();
    getAmountInProgress();
    getAmountAwaitingFeedback()
    //Source out into Template?
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