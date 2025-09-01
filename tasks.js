//const { createElement } = require("react");

document.addEventListener("DOMContentLoaded", () => {

const form = /** @type {HTMLFormElement} */ (document.querySelector("#tasksForm"));
//const tasksForm=document.querySelector("#tasksForm");
  /** @type {HTMLInputElement} */
const taskInput=document.querySelector("#taskInput");
const taskList=document.querySelector("#tasksList");
const clearButton=document.querySelector("#clearTasks");
const taskCount=document.querySelector("#taskCount");
const filterAllButton =document.querySelector("#filterAll");
const filterDoneButton =document.querySelector("#filterDone");
const filterNotDoneButton =document.querySelector("#filterNotDone");
let currentFilter ="all";
let tasksArray=[];


form.addEventListener("submit",(event) => {
    event.preventDefault();
    const taskText=taskInput.value.trim();
    if(taskText)
        {
             if (tasksArray.includes(taskText))
            {
                 alert("Task already exists!");
                form.reset();
                 console.log("Form reset successfully.");
                return;
            }
            const newTask={
            text: taskText,
            done: false,
            toogleDone: function(){
                console.log("this in toggleDone:", JSON.stringify(this, null, 2));
                this.done=!this.done;
            }
        };
           // const newTask={ text: task,done: false};
            tasksArray.push(newTask);
             console.log("New task object added:", JSON.stringify(newTask, null, 2)); // Log task object
            displayTasks();
            form.reset();
            console.log("New task object added:", newTask); // Log task object
            //taskInput.value="";
        }
        
        
         
});
 
clearButton.addEventListener("click",()=>{
    if(tasksArray.length===0){
        alert("No tasks to clear");
        return;
    } 
    else if(confirm("Are you sure you want to clear all tasks?")){
        taskList.innerHTML="";
        //taskInput.value="";
       tasksArray = [];
       currentFilter="all";
        alert("All the tasks are cleared");
        console.log("All tasks cleared. Tasks array:", JSON.stringify(tasksArray, null, 2));
       // form.reset();
       updateTaskCounter();
       displayTasks();
        return;
    }
    else{
        alert("Clear all cancelled");
    }
});

const displayTasks=()=>{
     taskList.innerHTML="";
     let filteredTasks =tasksArray;
     if(currentFilter ==="done")
     {
        filteredTasks=tasksArray.filter(task => task.done);
     }
     else if(currentFilter==="notDone")
     {
        filteredTasks=tasksArray.filter(task => !task.done);
     }
     
     for(let i=0;i<filteredTasks.length;i++)
        {
             const li=document.createElement("li");
             li.textContent=`${i+1}. ${filteredTasks[i].text} ${filteredTasks[i].done? " (Done)": ""}`;
              console.log(`li.textContent for task ${i}:`, li.textContent);
              //code starts here
                const btn=document.createElement("button");
                //btn.textContent="Mark Done";
                btn.textContent=`${filteredTasks[i].done? "Mark Not Done" : "Mark Done"}`; 
                li.appendChild(btn);
                btn.addEventListener("click",() => {
                     filteredTasks[i].toogleDone();
                     //btn.textContent="Mark Not Done";
                     console.log("button make done is clikced hereeeee");
                     displayTasks();
                });
              //code ends here
             //li.style.cursor="pointer";
             if(filteredTasks[i].done)
             {
                li.classList.add("done");
             }
            /*  li.addEventListener("click",() =>{
                const originalIndex = tasksArray.indexOf(filteredTasks[i]);
                //tasksArray[originalIndex].toogleDone();
                filteredTasks[i].toogleDone();
                console.log("Tasks array after clicking on li:", JSON.stringify(tasksArray[originalIndex],null,2));
                displayTasks();
             }); */
             taskList.appendChild(li);
        }
     updateTaskCounter();
       console.log("Tasks array:", JSON.stringify(filteredTasks,null,2));
        console.log("Total tasks:", filteredTasks.length);
    };


const updateTaskCounter = () =>{
    try{
        const filteredTasks =tasksArray.filter(task => currentFilter==="all" || 
            (currentFilter==="done" && task.done)|| (currentFilter==="notDone" && !task.done));

        taskCount.textContent=`Total Tasks : ${filteredTasks.length}`;
        console.log("Task counter updated:",taskCount.textContent);
        }
    catch(error)
    {
        console.error("Error updating the task counter:",error);
    }
};
    
filterAllButton.addEventListener("click",() =>
{
    currentFilter="all";
    console.log("Filter set to all");
    displayTasks();
});  

filterDoneButton.addEventListener("click",() =>
{
    currentFilter="done";
    console.log("Filter set to done");
    displayTasks();
});

filterNotDoneButton.addEventListener("click",() =>
{
    currentFilter="notDone";
    console.log("Filter set to not done");
    displayTasks();
});


});

//API code. 
/*
console.log("Starting fetch...");
newsContainer.classList.add("loading");
const apiKey="pub_6e25ce9e033e406ea5e1e00b67a8ad07";
 newsContainer.innerHTML = "<p>Loading...</p>";
//const newsContainer = document.querySelector("#news-item");


fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}&size=1&language=en`)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    const article = data.results[0]; // Select the first article
    const newsContainer = document.querySelector("#news-item");
   newsContainer.innerHTML = `
  <h2><a href="${article.link}" target="_blank">${article.title}</a></h2>
  <p>${article.description || "No description available"}</p>;
    console.log("News:", article); // Log for Day 64 task
  })

  .catch(error => console.error("Error:", error)); 
  newsContainer.classList.remove("loading"); */

  


const newsContainer = document.querySelector("#news-item");
  newsContainer.innerHTML ="News here";
  