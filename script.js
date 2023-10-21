let categories = [];

//TODO Stefan
/**
 * Close Dialogs on Overlay-BG 
 * works on task-overlay, create-contact
 * not working od Add-/Edit-Task
 * @param {string} event - event-data
 */
function doNotClose(event) {  
  event.stopPropagation();
}
