import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword ,
  onAuthStateChanged
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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const UserUid = user.uid;
    localStorage.setItem("UserUid", UserUid);
    location.href = "../index.html"
  }
});

let log_Btn = document.querySelector("#signIn");

log_Btn.addEventListener("click" , ()=>{
    let log_Email = document.querySelector("#lemail");
    let log_password = document.querySelector("#lpass");
    let message = document.querySelector("#para");

    if(log_Email.value == '' && log_password.value == ''){
      message.innerHTML = "Please Fill The Form."
    }
    else if(log_Email.value == '' ){
      message.innerHTML = "Please Enter The Email."
    }
    else if(log_password.value == ''){
      message.innerHTML = "Please Enter The Password"
    }
    else{
      signInWithEmailAndPassword(auth, log_Email.value, log_password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user =>" , user);
      localStorage.setItem("userEmail" , user.email)
      localStorage.setItem("UserId" , user.uid)
      window.location = "../index.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error =>" , errorMessage);
      
    });
    }
})

let getBtn1 = document.querySelector("#Sbutton");
getBtn1.addEventListener("click" , ()=>{
    window.location = "/signUp/index.html"
})