import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail ,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
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

let Btn2 = document.querySelector("#send_btn");

Btn2.addEventListener("click" , ()=>{
    let getEmail = document.querySelector("#inp");

    sendPasswordResetEmail(auth, getEmail.value)
      .then(() => {
        console.log("Email Send");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log("error =>" , errorMessage);
      });
})

