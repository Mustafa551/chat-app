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
    getDocs,
    query,
    where,
    collection
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

// all html ids

let goback = document.getElementById("goback")
let logout = document.getElementById("logout")
let friendlist = document.getElementById("friendlist")


// check user login

window.onload = onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
        friendsdata(user.email,user.uid)
    } else {
      window.location = "../html/login.html"
    }
  });


// goback function

goback.addEventListener("click", () => {
    window.location = "../html/profile.html"
})

// logout function

logout.addEventListener("click", () => { 
    signOut(auth).then(() => {
        window.location = "../html/login.html"
    }).catch((error) => {
        // An error happened.
      });
    })

// show users data 

let friendsdata = async (email,uid) => {
    const q = query(collection(db, "users"), where("email", "!=", email));
    const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  friendlist.innerHTML += ` <li>
  <div class="friend">
      <div class="img_name">
          <img class="ava" src="../images/test.png" alt="">
          <h3>${doc.data().name}</h3>
      </div>
  </div>
</li>
    
  `
  console.log(doc.id, " => ", doc.data());
});
}

