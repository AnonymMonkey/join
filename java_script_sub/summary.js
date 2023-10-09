let amountTodos;
let amountDone;
let amountUrgent;
let amountInBoard;
let amountInProgress;
let amountAwaitingFeedback;
let todos = [];
let urgentDueDates = [];
let urgentDueDate;
let currentGreeting;

let deviceWidth;
let currentUser;
let user;


let greeting = false;




async function renderSummary(){
    getDeviceWidth();
    if(deviceWidth <= 910){
        await getLoginType();
        if(login){
            getCurrentGreeting();
            greetingUser1();
            setTimeout(greetingUser2, 2000);
            setTimeout(renderMobileContent, 4000);
        }
        else{
            getCurrentGreeting();
            greetingGuest();
            setTimeout(renderMobileContent, 2000);
        }
    }else{
        renderDesktopContent();
    }
}


async function renderMobileContent(){
    includeHTML();
    await loadTodos();
    getCurrentGreeting();
    await getLoginType();
    getAmountInBoard();
    getAmountTodos();
    getAmountDone();
    getAmountUrgent();
    getAmountInProgress();
    getAmountAwaitingFeedback();
    getDueDate();
    await getInitialHTMLTemplate();
    getHTMLTemplateforSummary();
    adjustQuicklinkBG();
}


async function renderDesktopContent(){
    includeHTML();
    await loadTodos();
    getCurrentGreeting();
    await getLoginType();
    getAmountInBoard();
    getAmountTodos();
    getAmountDone();
    getAmountUrgent();
    getAmountInProgress();
    getAmountAwaitingFeedback();
    getDueDate();
    getHTMLTemplateforSummary();
    adjustQuicklinkBG();
}


function loadFromLocalStorage(){
    activeUserMail = localStorage.getItem('activeUser');
}


async function getLoginType(){
    if(login){
        await loadUsers();
        loadFromLocalStorage();
        activeUserName = await setActiveUser();
    }
    else{
        activeUserName = " ";
    }
}

function getCurrentGreeting(){
    /* Get Hours */
    let hours = new Date().getHours();

    if(hours >= 18  && hours <= 5 ){
        currentGreeting = 'Good evening!';
    }
    else if(hours >= 6  && hours <= 11){
        currentGreeting = 'Good morning!';
    }
    else{
        currentGreeting = 'Good afternoon!';
    }
}


async function greetingGuest(){
    document.getElementById('content').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
    `
}

async function greetingUser1(){
    document.getElementById('content').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
        
    `
}

async function greetingUser2(){
    document.getElementById('content').innerHTML = /*html*/`
        <span class="spanName">${activeUserName}</span>
    `
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
}


function getDueDate(date){
    //Get nearest Date from Array
    let nearestDate =  Math.min.apply(Math, urgentDueDates)
    let dueDate;
    //Convert DateNumber to String    
    if(date){
        dueDate = new Date(date);
    }
    else{
        dueDate = new Date(nearestDate);
    }

    let currentday = String(dueDate.getDate()).padStart(2, '0');
    let currentMonth = String(dueDate.getMonth()+1).padStart(2, '0');
    let currentYear = String(dueDate.getFullYear());
    let urgentDate = `${currentday}-${currentMonth}-${currentYear}`; 
    let formattedDate = `${currentday}/${currentMonth}/${currentYear}`;
    urgentDueDate = urgentDate;
    return formattedDate;
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





/*Get Mobile Greeting */
function getDeviceWidth(){
    deviceWidth = window.innerWidth;
}


async function getHTMLTemplateforSummary(){
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

    document.getElementById('greeting').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
        <span class="spanName">${activeUserName}</span>
    `;
}

async function getInitialHTMLTemplate(){
    document.getElementById('content').innerHTML = /*html*/`
                        <!-- insert content and own style from here -->
                
                        <section class="headlineSection">
                    <span class="headlineSummary">Summary</span>
                    <img  class="headlineVector" src="../assets/img/summary/vector_blue.png" alt="">
                    <span class="headlineSpan">Everything in a nutshell!</span>
                    <img  class="headlineVectorMobile" src="../assets/img/summary/vector_blue_mobile.png" alt="">
                </section>

                <section class="flex mediumCardSection">
                    <div onclick="openBoard()" class="cardMedium svgPen">
                        
                        <!--Pen Desktop-->
                        <svg class="penDesktop" width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="34.5" cy="35" r="34.5" fill="#2A3647"/>
                            <mask id="mask0_85887_5517" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="18" y="19" width="33" height="32">
                              <rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_85887_5517)">
                              <path d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z" fill="white"/>
                            </g>
                        </svg>
                        
                        <!--Pen Mobile-->
                        <svg class="penMobile" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="#2A3647"/>
                            <path d="M17.8932 27.1084L14.6672 25.1506L22.4986 12.2468C23.0393 11.3559 24.1997 11.0721 25.0905 11.6127C25.9813 12.1534 26.2652 13.3138 25.7246 14.2046L17.8932 27.1084Z" fill="white"/>
                            <path d="M17.5013 27.7538L14.2754 25.7959L14.6718 27.4164C14.8031 27.9529 15.3443 28.2814 15.8808 28.1502L17.5013 27.7538Z" fill="white"/>
                            </svg> 
                        
                        <div id="summaryToDo" class="flex column">

                        </div>
                    </div>

                    <div onclick="openBoard()" class="cardMedium">
                         
                        <!--Cehckmark Desktop-->
                        <svg class="checkmarkDesktop" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="35" cy="35" r="34.5" fill="#2A3647"/>
                            <path d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> 
                        
                        <!--Cehckmark Mobile-->
                        <svg class="checkmarkMobile" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="20" fill="#2A3647"/>
                            <path d="M11.3203 20.0001L17.8297 26.4151L28.6788 13.585" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> 
                        
                        <div id="summaryDone" class="flex column">

                        </div>
                    </div>
                </section>

                <section class="flex largeCardSection">
                    <div onclick="openBoard()" class="cardLarge">
                        <div class="urgentSection">
                            <img class="redArrows" src="../assets/img/summary/red_up_arrows.png" alt="">
                            <img class="redArrowsMobile" src="../assets/img/summary/red_up_arrows_mobile.png" alt="">

                            <div id="summaryUrgent" class="flex column">

                            </div>

                        </div>
                        
                        <img class="vectorGrey" src="../assets/img/summary/vector_grey.png" alt="">
                        <img class="vectorGreyMobile" src="../assets/img/summary/vector_grey_mobile.png" alt="">

                        <div id="deadline" class="deadlineSection">

                        </div>

                    </div>
                </section>
                <div id="greeting" class="greetingSection">

                </div>
                

                <section class="flex smallCardSection">
                    <div id="summaryTasks" onclick="openBoard()" class="cardSmall">

                    </div>

                    <div id="summaryInProgress" onclick="openBoard()" class="cardSmall">

                    </div>
                    
                    <div id="summaryAwaitingFeedback" onclick="openBoard()" class="cardSmall">

                    </div>
                </section>

                
            </div>`;
}