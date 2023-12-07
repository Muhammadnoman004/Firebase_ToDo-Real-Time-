import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase, ref, set,} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyDlzNer2kChEaFoLw2X4sbUTbG3JqWFFbk",
  authDomain: "todo-app-real-time.firebaseapp.com",
  projectId: "todo-app-real-time",
  storageBucket: "todo-app-real-time.appspot.com",
  messagingSenderId: "773115970194",
  appId: "1:773115970194:web:c6ebb2d8192dedc4755c4b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

let Btn = document.querySelector("#signUp");

Btn.addEventListener("click", () => {
  let message = document.querySelector("#para");
  let Email = document.querySelector("#semail");
  let password = document.querySelector("#spass");

  if (Email.value == '' && password.value == '') {
    message.innerHTML = "Please Fill The Form."
  }
  else if (Email.value == '') {
    message.innerHTML = "Please Enter The Email."
  }
  else if (password.value == '') {
    message.innerHTML = "Please Enter The Password"
  }
  else {
    console.log(Email.value);
    console.log(password.value);
    createUserWithEmailAndPassword(auth, Email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("user =>", user);

        await set(ref(db, `/users/Karachi/${user.uid}`), {
         
          Email: Email.value,
          Password: password.value,
        });
        window.location = "/LogIn/logIN.html"
        

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error =>", errorCode);

      });
  }

});

let getBtn = document.querySelector('#Sbutton1');
getBtn.addEventListener('click', () => {
  window.location = "/LogIn/logIn.html"
})