let tasks = [];

const tasksList = document.getElementById('list');
const addTasksInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');




  function addTasktodom (tasks){
    
const li = document.createElement('li');

 li.innerHTML = `
 <input type ="checkbox"  id ="${tasks.id}" ${tasks.done ? 'checked' : ''}
 class = "custom-checkbox">
 <label for ="${tasks.id}" > ${tasks.text} </label>
 <img src= "bin.svg" class="delete" id="${tasks.id}"/>
 `;



    
tasksList.append(li);
 } 
function renderList () {
    
    tasksList.innerHTML = '';
    for(let i = 0; i<tasks.length; i++){
        addTasktodom( tasks[i]) ;
       }
       tasksCounter.innerHTML = tasks.length; 
       
}

function markTaskAsComplete (taskId) {
    const task = tasks.filter(function(task){
        return task.id == taskId
    });
    if (task.length >0){
        const currenttask = task [0];
        currenttask.done = !currenttask.done;
        renderList();
        showNotification('task markTaskAsCompleted');
        return;

    } 
    showNotification('task was not Completed');
}

function deleteTask (taskId) {
    const newtask = tasks.filter(function(task){
        return task.id !== taskId ;
        
    });
    tasks = newtask ;
    
    
    renderList ();

    showNotification ('task deleted sucessfully');
}

function addTask (task) {
    if (task) {
        tasks.push(task);
        renderList();
       
        showNotification ('Task added sucessfully');
        return;
    }
   
    showNotification ('Task cannot be added');
}

function showNotification(text) {
    alert(text);
}

function handle(e){
    if(e.key == 'Enter'){
        const text = e.target.value;
        console.log('text',text);
        if( !text ) {
            showNotification('task text can not be empty');
            return;
        }
        const task = {
            text,
            id: Date.now().toString(),
            done: false 
        }
        e.target.value ='';
        addTask(task);
        
    }
}
function handleClickListener(e){
    const target =  e.target;
    if (target.className == "delete"){
    const taskId = target.id;
    deleteTask(taskId);
    return;
}else if (target.className =="custom-checkbox"){
    const taskId = target.id;
    markTaskAsComplete(taskId);
    return;
}
}
    addTasksInput.addEventListener('keyup',handle);
document.addEventListener('click', handleClickListener);