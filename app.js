let getinp = document.querySelector("#inp");
let getaddbtn = document.querySelector("#add") 
let getul = document.querySelector("#ul");
let getclearbtn = document.querySelector("#clear");


getaddbtn.addEventListener("click" , async ()=>{

    let getli = document.createElement("li");
    getli.className = "list"
    let liTextDiv = document.createElement("div");
    liTextDiv.setAttribute("class", "liTextDiv")
    let liTextPara = document.createElement("p");
    let litext = document.createTextNode(getinp.value);

      
    liTextPara.appendChild(litext);
    liTextDiv.appendChild(liTextPara);
    getli.appendChild(liTextDiv)
    getul.appendChild(getli);
    getinp.value = ""
    
    let div = document.createElement("div");
    div.classList.add("divClass");
    
    let editIcon = document.createElement("i");
    editIcon.setAttribute('onclick' , 'editTodo(this)')
    editIcon.className = 'edit'
    editIcon.classList.add("fa");   
    editIcon.classList.add("fa-pencil-square");
    
    
    let delIcon = document.createElement("i");
    delIcon.setAttribute("onclick" , "delTodo(this)")
    delIcon.className = "deleted"
    delIcon.classList.add("fa");
    delIcon.classList.add("fa-trash");
    div.appendChild(editIcon)
    div.appendChild(delIcon)
    getli.appendChild(div);
    
    
  })
  

  function delTodo(event){
    event.parentNode.parentNode.remove();
  }
  
  function editTodo(e){
    let editToDo = prompt("Edit your ToDo" , e.parentNode.parentNode.firstChild.textContent)
    e.parentNode.parentNode.firstChild.textContent = editToDo
  }


  getclearbtn.addEventListener("click" , ()=>{
    getul.innerHTML = ""
  })
  
  window.delTodo = delTodo
  window.editTodo = editTodo