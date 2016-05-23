//Problem: user interaction doesn't provide desired results
//Solution: add interactivity so the user can manage daily tasks

var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');

//new task list itemv
var createNewTaskElement = function (taskString) {
  //create list item
  var listItem = document.createElement('li');

  //input (checkbox)
  var checkBox = document.createElement('input');
  //label
  var label = document.createElement('label');
  //input (text)
  var editInput = document.createElement('input');
  //button.edit
  var editButton = document.createElement('button');
  //button.delete
  var deleteButton = document.createElement('button');

  //each element needs modified
  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  label.innerText = taskString;


  //each element needs appended
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}
//add a new task
var addTask = function() {
  console.log('add task...');
  //create a new list item with the text from #new-task
  var listItem =  createNewTaskElement(taskInput.value);
    //append listItem to incompleteTaskHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';
    }
//edit an existing task
var editTask = function() {
  console.log('edit task...');

      var listItem = this.parentNode;

      var editInput = listItem.querySelector('input[type=text]');
      var label = listItem.querySelector('label');

      var containsClass = listItem.classList.contains('editMode');
  //if the class of the parent is .editMode
  if(containsClass) {
    //switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  }
  else {
    //switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  //toggle .editMode on the li
  listItem.classList.toggle('editMode');

}

//delete an existing task
var deleteTask = function() {
  console.log('delete task');

    var listItem = this.parentNode;
    var ul = listItem.parentNode;

      //remove the parent list item from the ul
      ul.removeChild(listItem);

}

//mark a task as complete
var taskCompleted = function(){
  console.log('task completed...');
    //append the task li to the #completed-tasks
  var listItem =  this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//mark a task as incomplete
var taskIncomplete = function(){
  console.log('task incomplete...');
    //append to incomplete tasks
 var listItem = this.parentNode;
incompleteTasksHolder.appendChild(listItem);
bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events')
  //cycle over completeTaskHolder ul list items
    //for each list item
      //select taskListItem's children
      var checkBox = taskListItem.querySelector('input[type=checkbox]');
      var editButton = taskListItem.querySelector('button.edit');
      var deleteButton = taskListItem.querySelector('button.delete');

      //bind editTask to edit button
      editButton.onclick = editTask;

      //bind deleteTask to delete button/
      deleteButton.onclick = deleteTask;

      //bind checkBoxEventHandler to checkbox
      checkBox.onchange = checkBoxEventHandler;
}
//set the click handler to the addTask function
addButton.addEventListener('click', addTask);


//cycle over incompleteTaskHolder ul list items
for(var i =0; i < incompleteTasksHolder.children.length; i++){
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
    //cycle over completeTaskHolder ul list items
    for(var i =0; i < completedTasksHolder.children.length; i++){
        //bind events to list item's children (taskIncomplete)
          bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
