document.addEventListener("DOMContentLoaded",()=>{
    const form=/** @type {HTMLFormElement} */ (document.querySelector("#courseForm"));
    /** @type {HTMLInputElement} */
    const courseInput=document.querySelector("#courseName");
    const platformName=document.querySelector("#platform");
    const progressRange=document.querySelector("#progressRange");
    const courseList=document.querySelector("#courseList");
    const filterAllButton=document.querySelector("#filterAll");
    const filterDoneButton=document.querySelector("#filterInProgress");
    const filterCompleted=document.querySelector("#filterComplete");
    let currentFilter='all';
    let courseArray=[];

    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const courseText=courseInput.value.trim();
        const platformText=platformName.value.trim();
        const progressInput=progressRange.value;
        if(courseText)
            {
                if(courseArray.includes(courseText))
                {
                    alert("The course already exists!");
                    form.reset();
                    console.log("Form reset successfully");
                    return;
                }
                const newCourse={
                    text: courseText,
                    platform : platformText,
                    progress : progressInput,
                    done:false,
                    toogleDone: function(){
                        console.log("This is toggle done:",JSON.stringify(this,null,2));
                        this.done=!this.done;
                    }

                };
                courseArray.push(newCourse);
                saveCourses();
                console.log("Course is added in array", JSON.stringify(courseText,null,2));
                displayCourse();
                form.reset();
                console.log("New courses are being displayed");
            }
    });

 
const displayCourse = () => {
    // Remove old table if it exists
    const existingTable = document.querySelector("#courseTable");
    if (existingTable) existingTable.remove();

    // Create table
    const table = document.createElement("table");
    table.id = "courseTable";
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.marginTop = "20px";

    // Create header row
    const headerRow = document.createElement("tr");
    ["#", "Course Name", "Platform", "Progress (%)", "Status", "Action"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        th.style.padding = "8px";
        th.style.background = "#f2f2f2";
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Filter logic
    let filteredCourse = courseArray;
    if (currentFilter === "done") {
        filteredCourse = courseArray.filter(course => course.done);
    } else if (currentFilter === "notDone") {
        filteredCourse = courseArray.filter(course => !course.done);
    }

    // Create rows for each course
    filteredCourse.forEach((course, index) => {
        const row = document.createElement("tr");

        // #
        const numCell = document.createElement("td");
        numCell.textContent = index + 1;
        row.appendChild(numCell);

        // Course Name
        const nameCell = document.createElement("td");
        nameCell.textContent = course.text;
        row.appendChild(nameCell);

        // Platform
        const platformCell = document.createElement("td");
        platformCell.textContent = course.platform || "-";
        row.appendChild(platformCell);

        // Progress
        const progressCell = document.createElement("td");
        progressCell.textContent = course.progress || "0";
        row.appendChild(progressCell);

        // Status
        const statusCell = document.createElement("td");
        statusCell.textContent = course.done ? "Completed" : "In Progress";
        row.appendChild(statusCell);

        // Action Button
        const actionCell = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = course.done ? "Mark Not Done" : "Mark Done";
        btn.addEventListener("click", () => {
            course.toogleDone();
            displayCourse(); // Refresh table
        });
        actionCell.appendChild(btn);
        row.appendChild(actionCell);

        table.appendChild(row);
    });

    // Append table to course list container
    courseList.appendChild(table);
};
filterAllButton.addEventListener("click", () => {
        currentFilter = "all";
        displayCourse();
    });

    filterCompleted.addEventListener("click", () => {
        currentFilter = "done";
        displayCourse();
    });

    filterDoneButton.addEventListener("click", () => {
        currentFilter = "notDone";
        displayCourse();
    });

// Load saved courses from localStorage
    const savedCourses = localStorage.getItem("courses");
    if (savedCourses) {
        courseArray = JSON.parse(savedCourses);
        // Restore methods (since JSON removes them)
        courseArray.forEach(course => {
            course.toogleDone = function () {
                this.done = !this.done;
                saveCourses();
            };
        });
        displayCourse();
    }

    // Save courses to localStorage
    const saveCourses = () => {
        localStorage.setItem("courses", JSON.stringify(courseArray));
    };

});
