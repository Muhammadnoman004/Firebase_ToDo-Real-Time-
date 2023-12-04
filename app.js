import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlzNer2kChEaFoLw2X4sbUTbG3JqWFFbk",
  authDomain: "todo-app-real-time.firebaseapp.com",
  projectId: "todo-app-real-time",
  storageBucket: "todo-app-real-time.appspot.com",
  messagingSenderId: "773115970194",
  appId: "1:773115970194:web:c6ebb2d8192dedc4755c4b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let getinp = document.querySelector("#inp");
let getaddbtn = document.querySelector("#add")
let getul = document.querySelector("#ul");
let getclearbtn = document.querySelector("#clear");


getaddbtn.addEventListener("click", async () => {

  if(getinp.value == ""){
    alert("please Enter a value")
  }
  else{
    let getli = document.createElement("li");
    getli.className = "list"
    let liTextDiv = document.createElement("div");
    liTextDiv.setAttribute("class", "liTextDiv")
    let liTextPara = document.createElement("p");
    let litext = document.createTextNode(getinp.value);
  
   
    function writeUserData() {
      const dataRef = push(ref(db, `users/Karachi`))
      set(dataRef, {
        ToDo: getinp.value,
        Time: new Date().toLocaleString()
      });
  
    }
    writeUserData()

    liTextPara.appendChild(litext);
    liTextDiv.appendChild(liTextPara);
    getli.appendChild(liTextDiv)
    getul.appendChild(getli);
    getinp.value = ""
  
    let div = document.createElement("div");
    div.classList.add("divClass");
  
    let editIcon = document.createElement("i");
    editIcon.setAttribute('onclick', 'editTodo(this)')
    editIcon.className = 'edit'
    editIcon.classList.add("fa");
    editIcon.classList.add("fa-pencil-square");
  
  
    let delIcon = document.createElement("i");
    delIcon.setAttribute("onclick", "delTodo(this)")
    delIcon.className = "deleted"
    delIcon.classList.add("fa");
    delIcon.classList.add("fa-trash");
    div.appendChild(editIcon)
    div.appendChild(delIcon)
    getli.appendChild(div);

  }

})

function getData() {

  const starCountRef = ref(db, `users/Karachi`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    
    console.log(data);
    // updateStarCount(postElement, data);
  });
}
getData()


function delTodo(event) {
  event.parentNode.parentNode.remove();
}

function editTodo(e) {
  let editToDo = prompt("Edit your ToDo", e.parentNode.parentNode.firstChild.textContent)
  e.parentNode.parentNode.firstChild.textContent = editToDo
}


getclearbtn.addEventListener("click", () => {
  getul.innerHTML = ""
})

window.delTodo = delTodo
window.editTodo = editTodo