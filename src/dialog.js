
import editImgPath from "./edit.svg";
import delImgPath from "./delete.svg"

const dialog = document.querySelector(".popUp")
const createNew = document.querySelector(".add")
const taskDirectory = document.querySelector(".main-bar")

let isEditMode = false;
let editTask = null;



function createDialog () {


    
createNew.addEventListener("click" , function(){
    const makeForm = document.createElement("form")
    const formExists = document.querySelector(".dynamic-form")

    if (formExists) {
        formExists.remove()
    }
    makeForm.className = "dynamic-form";
    makeForm.setAttribute("action", "#")
    makeForm.setAttribute("dialog", "post")
    makeForm.innerHTML = `<textarea id="title"placeholder="Title: Example" name="titleText"></textarea><textarea id="description" placeholder="Details: eg. phone, rent, food etc..."name="descriptionText"></textarea>  <div class="radioButtons"> <label for="priority" id="priority">Priority:</label> <input type="radio" name="priority" data-label="Low" id="low">
    <input type="radio" name="priority" data-label="Medium" id="medium">
    <input type="radio" name="priority" data-label="High" id="high"> </div><button type="submit" id="submit">ADD TO DO</button> <label for="dueDate" id="dueDate">Due Date:</label> <input type="date" name="date" id="dateFormat">`
    dialog.appendChild(makeForm)
    dialog.showModal()   

    //submit form function
    makeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleValue = e.target.querySelector("#title").value
        const descriptionValue = e.target.querySelector("#description").value
        const radioButtons = e.target.querySelector('input[name = "priority"]:checked')
        const radioValue = radioButtons ? radioButtons.id : null; 
        const dateValue = e.target.querySelector('input[name="date"]').value

        if (!titleValue.trim() || !descriptionValue.trim() || !radioValue || !dateValue) {
            alert("Please fill out all fields.");
            return;
        }

        if (isEditMode === true) {
            editTask.querySelector(".title").textContent = `${titleValue}`;
            
            editTask.classList.remove("low-priority", "medium-priority", "high-priority");

// Add new priority class
if (radioValue) {
    editTask.classList.add(`${radioValue}-priority`);
}

        
        // Update details button with new data
        const detailsButton = editTask.querySelector(".details");

        detailsButton.setAttribute("data-title", titleValue);
        detailsButton.setAttribute("data-description", descriptionValue);
        detailsButton.setAttribute("data-priority", radioValue);
        detailsButton.setAttribute("data-due-date", dateValue);
            isEditMode = false;
            editTask = null
            dialog.close()
          } else {
       
       
        const newTask = document.createElement("div");
        newTask.classList.add("todoCards");
        newTask.classList.add(`${radioValue}-priority`);
        newTask.innerHTML= `<input type="checkbox" class ="checkmark"> <span class="title"> ${titleValue} </span> ` ;
      
        
        const detailsButton = document.createElement("button")
        
        detailsButton.classList.add("details")
        detailsButton.innerHTML="details";
        detailsButton.setAttribute("data-title", titleValue);
        detailsButton.setAttribute("data-description", descriptionValue);
        detailsButton.setAttribute("data-priority", radioValue);
        detailsButton.setAttribute("data-due-date", dateValue);
        newTask.appendChild(detailsButton)

        const editButton = document.createElement("button")
        editButton.classList.add("edit")
        newTask.appendChild(editButton)

        const editImg = document.createElement("img")
        editImg.classList.add("editImg")
        editImg.src = editImgPath
        editButton.appendChild(editImg)

        const deleteButton = document.createElement("button")
        deleteButton.classList.add ("delete")
        newTask.appendChild(deleteButton)

        const deleteImg = document.createElement("img")
        deleteImg.classList.add("createImg")
        deleteImg.src = delImgPath
        deleteButton.appendChild(deleteImg)
      
     
       
        detailsButton.addEventListener("click", () => { 
            const closeDialog = document.createElement("button")
            const detailsDialog = document.createElement("dialog")


            if (detailsDialog) {
                detailsDialog.remove()
            }
          
            detailsDialog.classList.add("detailsPopUp")
            closeDialog.classList.add("closeDialog")
            closeDialog.textContent="x"
           closeDialog.classList.add("closeDialog")

        const title = detailsButton.getAttribute("data-title");
          const description = detailsButton.getAttribute("data-description");
          const dueDate = detailsButton.getAttribute("data-due-date");
          const priority = detailsButton.getAttribute("data-priority");


            detailsDialog.innerHTML = `<h1>${title}</h1> <p class="descriptionDialog">Details: ${description}</p> <p class = "dueDateDialog"> Due Date: ${dueDate}</p> <p class ="priorityDialog">Priority: ${priority}</p> `
            
           

            taskDirectory.appendChild(detailsDialog)


            const closedDialog = document.querySelector(".detailsPopUp");
            detailsDialog.appendChild(closeDialog)
            detailsDialog.showModal()
            closeDialog.addEventListener("click", () =>{
                detailsDialog.close()
                closedDialog.remove()
            })
         
        })

   

        taskDirectory.appendChild(newTask);
        
        dialog.close();

        newTask.querySelector(".delete").addEventListener("click" ,() => {
            taskDirectory.removeChild(newTask)
        }) 

        newTask.querySelector(".edit").addEventListener ("click" , () => {

            makeForm.innerHTML = `<textarea id="title"placeholder="Title: Example" name="titleText"></textarea><textarea id="description" placeholder="Details: eg. phone, rent, food etc..."name="descriptionText"></textarea>  <div class="radioButtons"> <label for="priority" id="priority">Priority:</label> <input type="radio" name="priority" data-label="Low" id="low">
    <input type="radio" name="priority" data-label="Medium" id="medium">
    <input type="radio" name="priority" data-label="High" id="high"> </div><button type="submit" id="submit">Edit to do</button> <label for="dueDate" id="dueDate">Due Date:</label> <input type="date" name="date" id="dateFormat">`;

            isEditMode = true;
            editTask = newTask;

            
        const title = detailsButton.getAttribute("data-title");
        const description = detailsButton.getAttribute("data-description");
        const priority = detailsButton.getAttribute("data-priority");
        const dueDate = detailsButton.getAttribute("data-due-date");

    document.querySelector("#title").value = title;
    document.querySelector("#description").value = description;
    document.querySelector("#dateFormat").value = dueDate;

    const radioInputs = document.querySelectorAll('input[name="priority"]');
    radioInputs.forEach((radio) => {
        if (radio.id === priority) {
            radio.checked = true;
        }
    });
            dialog.showModal()
           
        })

         

           
        

        const checkbox = document.querySelector(".checkmark")
        newTask.querySelector(".checkmark").addEventListener("change" , () => {
            if (checkbox.checked) {
                newTask.classList.toggle ("checked")
            } else {
                newTask.classList.toggle("checked")
            }

        })
    }
    })


    
})
}



createDialog()


export {createDialog}