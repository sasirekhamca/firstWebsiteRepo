
const form = /** @type {HTMLFormElement} */ (document.querySelector("#noteForm"));
const noteInput =document.querySelector("#noteInput");
const noteList =document.querySelector("#noteList");
const clearButton = document.querySelector("#clear");
const removeLastButton=document.querySelector("#removeLast");
let notesArray=[];


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    
    let note=noteInput.value.trim();
    if(!note){
        alert("Please enter the notes");
        return;
    }
    if(note){
        notesArray.push(note);
        displayNotes();
         form.reset();
    }
});

clearButton.addEventListener("click", () => {
        noteList.innerHTML = ""; // Clear <ul id="noteList">
        noteInput.value="";
        console.log("All notes cleared.");
});

removeLastButton.addEventListener("click",()=>{
       notesArray.pop();
       displayNotes();
     });

const displayNotes=() =>{
    noteList.innerHTML="";
    for(let i=0;i<notesArray.length;i++){
        const li=document.createElement("li");
        li.textContent=`${i+1}. ${notesArray[i]}`;
        noteList.appendChild(li);

    }
};
