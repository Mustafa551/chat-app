import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

import { 
    getFirestore,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyATPfRRJXNcwQoCHM4V0YZTVT3PIpq-w7g",
    authDomain: "login-signup-570bf.firebaseapp.com",
    projectId: "login-signup-570bf",
    storageBucket: "login-signup-570bf.appspot.com",
    messagingSenderId: "256610605860",
    appId: "1:256610605860:web:1ab744880ee474a03fb1b1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let username = document.getElementById('username');
let sigupEmail = document.getElementById('sigupEmail');
let signupPassword = document.getElementById('signupPassword');
let signupBtn = document.getElementById('signupBtn')
let errors = document.getElementById('hiddenmsg')
let emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

signupBtn.addEventListener("click", () => {
    event.preventDefault()
    if (username.value.trim() === "") {
        errors.innerHTML = "Please enter username"
        setTimeout(function () {
            errors.innerHTML = ""
        }, 2000)
    }

   else if (sigupEmail.value.trim() === "") {
        errors.innerHTML = "Please enter Email"
        setTimeout(function () {
            errors.innerHTML = ""
        }, 2000)
    }
    else if (!emailRegx.test(sigupEmail.value)) {
        errors.innerHTML = "Please enter valid email"
        setTimeout(function () {
            errors.innerHTML = ""
        }, 2000)
    }
    else if (signupPassword.value.trim() === "") {
        errors.innerHTML = "Please enter password"
        setTimeout(function () {
            errors.innerHTML = ""
        }, 2000)

    }
    else if (signupPassword.value.length < 6) {
        errors.innerHTML = "Password Should be at least 6"
        setTimeout(function () {
            errors.innerHTML = ""
        }, 2000)
    }
    
    else {


        createUserWithEmailAndPassword(auth, sigupEmail.value, signupPassword.value)
            .then(async (userCredential) => {

                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    name: username.value,
                    email: sigupEmail.value,
                    password: signupPassword.value,
                    uid: user.uid
                  });
                window.location = "../html/profile.html"
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/email-already-in-use") {

                    errors.innerHTML = "Email already in use"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
                }


            });



    }

    
})


