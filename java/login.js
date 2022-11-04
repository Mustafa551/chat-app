import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";


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

let loginemail = document.getElementById('loginemail');
let loginpassword = document.getElementById('loginpassword');
let loginbtn = document.getElementById('login')
let errors = document.getElementById('hiddenmsg')
let emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const login = () => {
    

//     if (loginemail.value.trim() === "") {
//         errors.innerHTML = "Please enter Email"
//         setTimeout(function () {
//             errors.innerHTML = ""
//         }, 2000)
//     }
//     else if (!emailRegx.test(loginemail.value)) {
//         errors.innerHTML = "Please enter valid email"
//         setTimeout(function () {
//             errors.innerHTML = ""
//         }, 2000)
//     }
//     else if (loginpassword.value.trim() === "") {
//         errors.innerHTML = "Please enter password"
//         setTimeout(function () {
//             errors.innerHTML = ""
//         }, 2000)

//     }
//     else if (loginpassword.value.length < 6) {
//         errors.innerHTML = "Password Should be at least 6"
//         setTimeout(function () {
//             errors.innerHTML = ""
//         }, 2000)
//     }
    
//     else {


//         createUserWithEmailAndPassword(auth, sigupEmail.value, signupPassword.value)
//             .then(async (userCredential) => {

//                 const user = userCredential.user;
//                 location.href = "login.html"
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;

//                 if (errorCode == "auth/email-already-in-use") {

//                     errors.innerHTML = "Email already in use"
//                     setTimeout(function () {
//                         errors.innerHTML = ""
//                     }, 2000)
//                 }


//             });



//     }

    
// }

// loginbtn.addEventListener("click", login )



if (loginbtn) {
    loginbtn.addEventListener("click", () => {

        signInWithEmailAndPassword(auth, loginemail.value, loginpassword.value)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user)
                location.href = "../html/profile.html"
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (loginemail.value.trim() === "") {
                    errors.innerHTML = "Please enter Email"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
                }
                else if (!emailRegx.test(loginemail.value)) {
                    errors.innerHTML = "Please enter valid email"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
                }
                else if (loginpassword.value.trim() === "") {
                    errors.innerHTML = "Please enter password"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
            
                }
                else if (loginpassword.value.length < 6) {
                    errors.innerHTML = "Password Should be at least 6"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
                }
                else if(errorCode === "auth/wrong-password"){
                    errors.innerHTML = "wrong password"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
                }else if(errorCode === "auth/user-not-found"){
                    errors.innerHTML = "user doesn't exist"
                    setTimeout(function () {
                        errors.innerHTML = ""
                    }, 2000)
                }
                else {
                    console.log(errorMessage)
                }


            });
    })

}
