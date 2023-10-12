async function taskContainerRenderHTML(view, viewName) {

  taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';
  taskContainer.innerHTML = /*html*/ `
  <div id="overlay-bg-${view}Task" class="overlay-bg-${view}Task d-none">
    <div id="overlay-content-${view}Task" class="overlay-content-${view}Task d-flex">

      <div id="overlay${viewName}TaskContent"></div>
      <div id="header" w3-include-html="../assets/templates/task_form.html"></div>

    </div>
    `;
    await includeHTML();
}
