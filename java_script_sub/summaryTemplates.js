/**
 * rendering the initial template for summary.html
 */
async function getInitialHTMLTemplate() {
    document.getElementById('content').innerHTML = /*html*/` 
    
                <!-- insert content and own style from here -->
                <div class="d-flex column">
                <section class="headlineSection">
                    <span class="headlineSummary">Summary</span>
                    <img class="headlineVector" src="../assets/img/summary/vector_blue.png" alt="">
                    <span class="headlineSpan">Everything in a nutshell!</span>
                    <img class="headlineVectorMobile" src="../assets/img/summary/vector_blue_mobile.png" alt="">
                </section>

                <div class="table">
                    <section class="flex mediumCardSection">
                        <div onclick="openBoard()" class="cardMedium svgPen">

                            <!--Pen Desktop-->
                            <div class="penDesktop"></div>

                            <!--Pen Mobile-->
                            <!--                             <svg class="penMobile" width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#2A3647" />
                                <path
                                    d="M17.8932 27.1084L14.6672 25.1506L22.4986 12.2468C23.0393 11.3559 24.1997 11.0721 25.0905 11.6127C25.9813 12.1534 26.2652 13.3138 25.7246 14.2046L17.8932 27.1084Z"
                                    fill="white" />
                                <path
                                    d="M17.5013 27.7538L14.2754 25.7959L14.6718 27.4164C14.8031 27.9529 15.3443 28.2814 15.8808 28.1502L17.5013 27.7538Z"
                                    fill="white" />
                            </svg> -->

                            <div id="summaryToDo" class="flex column"></div>
                        </div>

                        <div onclick="openBoard()" class="cardMedium">

                            <!--Cehckmark Desktop-->
                            <div class="checkmarkDesktop"></div>

                            <!--Cehckmark Mobile-->
                            <!--                             <svg class="checkmarkMobile" width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="20" fill="#2A3647" />
                                <path d="M11.3203 20.0001L17.8297 26.4151L28.6788 13.585" stroke="white"
                                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg> -->

                            <div id="summaryDone" class="flex column"></div>
                        </div>
                    </section>
                    <section class="flex largeCardSection">
                        <div onclick="openBoard()" class="cardLarge">
                            <div class="urgentSection">
                                <img class="redArrows" src="../assets/img/summary/red_up_arrows.png" alt="">
                                <img class="redArrowsMobile" src="../assets/img/summary/red_up_arrows_mobile.png"
                                    alt="">

                                <div id="summaryUrgent" class="flex column"></div>
                            </div>

                            <img class="vectorGrey" src="../assets/img/summary/vector_grey.png" alt="">
                            <img class="vectorGreyMobile" src="../assets/img/summary/vector_grey_mobile.png" alt="">

                            <div id="deadline" class="deadlineSection"></div>
                        </div>
                    </section>
                    <section class="flex smallCardSection">
                        <div id="summaryTasks" onclick="openBoard()" class="cardSmall"></div>

                        <div id="summaryInProgress" onclick="openBoard()" class="cardSmall"></div>

                        <div id="summaryAwaitingFeedback" onclick="openBoard()" class="cardSmall"></div>
                    </section>
                </div>
            </div>

            <div id="greeting" class="greetingSection"></div>

    <!--
    <section class="headlineSection">
        <span class="headlineSummary">Summary</span>
        <img  class="headlineVector" src="../assets/img/summary/vector_blue.png" alt="">
        <span class="headlineSpan">Everything in a nutshell!</span>
        <img  class="headlineVectorMobile" src="../assets/img/summary/vector_blue_mobile.png" alt="">
    </section>
    <section class="flex mediumCardSection">
        <div onclick="openBoard()" class="cardMedium svgPen">
            
            <div class="penDesktop"></div>
                        
            <div id="summaryToDo" class="flex column">

            </div>
        </div>
        <div onclick="openBoard()" class="cardMedium">          
        <div class="checkmarkDesktop"></div>        
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
</div> -->

`;

}


/**
 * rendering the summary including all needed values from board
 */
async function getHTMLTemplateforSummary() {
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

    if (activeUserName == 'undefined') {
        document.getElementById('greeting').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>  
    `;
    }
    else {
        document.getElementById('greeting').innerHTML = /*html*/`
        <span class="spanGreeting">${currentGreeting}</span>
        <br>
        <span class="spanName">${activeUserName}</span>
    `;
    }
}