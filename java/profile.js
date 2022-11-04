import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged ,
    signOut
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

import { 
    getFirestore,
    doc,
    setDoc,
    getDoc 
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

// html ids

let innerdetails = document.getElementById("innerdetails");



// check user login

window.onload = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          currentuser(user.uid)
          // ...
        } else {
          window.location = "../html/login.html"
        }
      });

// current user profile

let currentuser = async (uid) => {
    const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  innerdetails.innerHTML = `<h3>Name: ${docSnap.data().name}</h3>
  <h3>Email: ${docSnap.data().email}</h3>
  <h3>Password: ${docSnap.data().password}</h3>
  <h3>UID: ${docSnap.data().uid}</h3>`

} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
}

// logout function

let logout = () => {
    signOut(auth).then(() => {
        window.location = "../html/login.html"
    }).catch((error) => {
        // An error happened.
      });
}

window.logout = logout