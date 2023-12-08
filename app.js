import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {getAuth , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlzNer2kChEaFoLw2X4sbUTbG3JqWFFbk",
  authDomain: "todo-app-real-time.firebaseapp.com",
  projectId: "todo-app-real-time",
  storageBucket: "todo-app-real-time.appspot.com",
  messagingSenderId: "773115970194",
  appId: "1:773115970194:web:c6ebb2d8192dedc4755c4b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let getinp = document.querySelector("#inp");
let getaddbtn = document.querySelector("#add");
let getul = document.querySelector("#ul");
let getclearbtn = document.querySelector("#clear");
let logOutBtn = document.querySelector('#logOut');

let UserUid = localStorage.getItem("UserId");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const UserUid = user.uid;
    localStorage.setItem("UserUid", UserUid);
  } else {
    localStorage.removeItem("UserUid");
    location.href = "./signUp/index.html";
  }
});


//  Add ToDo in Database  //

getaddbtn.addEventListener("click", async () => {
  if (getinp.value == "") {
    alert("please Enter a value");
  } else {
    const dataRef = push(ref(db, `users/Karachi/${UserUid}/ToDo`));
    set(dataRef, {
      ToDo: getinp.value,
    });
  }
});

//  Read ToDo from Database //

function getData() {
  const starCountRef = ref(db, `users/Karachi/${UserUid}/ToDo`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    getul.innerHTML = " ";

    for (const key in data) {
      const showToDo = data[key].ToDo;

      let getli = document.createElement("li");
      getli.className = "list";
      let liTextDiv = document.createElement("div");
      liTextDiv.setAttribute("class", "liTextDiv");
      let liTextPara = document.createElement("p");
      let litext = document.createTextNode(showToDo);

      liTextPara.appendChild(litext);
      liTextDiv.appendChild(liTextPara);
      getli.appendChild(liTextDiv);
      getul.appendChild(getli);
      getinp.value = "";

      let div = document.createElement("div");
      div.classList.add("divClass");

      let editIcon = document.createElement("i");
      editIcon.setAttribute("onclick", `editTodo(this, '${key}')`);
      editIcon.className = "edit";
      editIcon.classList.add("fa");
      editIcon.classList.add("fa-pencil-square");

      let delIcon = document.createElement("i");
      delIcon.setAttribute("onclick", `delTodo('${key}')`);
      delIcon.className = "deleted";
      delIcon.classList.add("fa");
      delIcon.classList.add("fa-trash");
      div.appendChild(editIcon);
      div.appendChild(delIcon);
      getli.appendChild(div);
    }
  });
}
getData();

//  Delete ToDo From Database //

function delTodo(id) {
  console.log(id);
  const deltodo = ref(db, `users/Karachi/${UserUid}/ToDo/${id}`);
  remove(deltodo);
}

//  Edit ToDo in Database //

function editTodo(e, id) {
  let editToDo = prompt(
    "Edit your ToDo",
    e.parentNode.parentNode.firstChild.textContent
  );

  if (editToDo) {
    const ToDoedit = ref(db, `users/Karachi/${UserUid}/ToDo/${id}`);

    const EditToDo = {
      ToDo: editToDo,
    };

    update(ToDoedit, EditToDo);
  }
}

//  Delete All from Database  //

getclearbtn.addEventListener("click", () => {
  getul.innerHTML = "";
  const clearTodo = ref(db, `users/Karachi/`);
  remove(clearTodo);
});

logOutBtn.addEventListener("click" , ()=>{
  auth.signOut().then(() =>{
    localStorage.removeItem("UserUid")
  })
})

window.delTodo = delTodo;
window.editTodo = editTodo;
