import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  addDoc,
  onSnapshot,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.12.0/firebase-firestore.js";

// if(window.innerWidth === "768"){
//   let left = document.getElementById("left")
//   let right = document.getElementById("right")
//   left.classList.add("left-hide")
//   right.classList.add("right-show")
// }
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
let righttop = document.getElementById("righttop")
let sendbtn = document.getElementById("sendbtn")
let mess = document.getElementById("mess")
let messagelist = document.getElementById("messagelist")

// check user login

window.onload = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    friendsdata(user.email, user.uid)
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

let friendsdata = async (email, uid) => {
  const q = query(collection(db, "users"), where("email", "!=", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    friendlist.innerHTML += ` <li onclick="startChat('${doc.data().uid}','${uid}','${doc.data().name}'),check()">
  <div class="friend">
      <div class="img_name">
          <img class="ava" src="../images/test.png" alt="">
          <h3>${doc.data().name}</h3>
      </div>
  </div>
</li>
    
  `
  });
}

let ffrienduid;
let uniqueuid;
let curentuid;

// start chat function 

let startChat = (frienduid, currentuid, friendname) => {
  event.preventDefault()
  sendbtn.removeAttribute("disabled")
  ffrienduid = frienduid;
  curentuid = currentuid;
  messagelist.innerHTML = ""

  if (curentuid > ffrienduid) {
    uniqueuid = curentuid + ffrienduid
  } else {
    uniqueuid = ffrienduid + curentuid
  }

  // messages
  const q = query(
    collection(db, "messages"),
    where("chatid", "==", uniqueuid),
    orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    messagelist.innerHTML = ""
    querySnapshot.forEach((doc) => {
      if (doc.data().sender === curentuid) {

        messagelist.innerHTML += `
        
        <li class="user">
           <div>${doc.data().message}</div>
             <sub>${doc.data().time}</sub>
           </li>
           `
      } else {
        messagelist.innerHTML += `
        
        <li class="friendd">
           <div>${doc.data().message}</div>
           <sub>${doc.data().time}</sub>

           </li>
           `
      }
      // console.log();

    });
  });

  // chat top
  righttop.innerHTML = `<div class="img_name">
  <i class="fas fa-regular fa-arrow-left back" onclick="backf()"></i>
  <img class="ava" src="../images/test.png" alt="">
  <h3 >${friendname}</h3>
</div>`


};
window.startChat = startChat

// send message function

sendbtn.addEventListener("click", async () => {
  event.preventDefault()
  if (mess.value.trim() !== "") {
    messagelist.innerHTML = ""
    let value = mess.value;
    mess.value = "";
    const docRef = await addDoc(collection(db, "messages"), {
      message: value,
      sender: curentuid,
      getter: ffrienduid,
      chatid: uniqueuid,
      time: new Date().toString().slice(15, 21),
      timestamp: new Date()
    });
  }
})






let check = () => {
  if (window.innerWidth <= "768") {
    let left = document.getElementById("left")
    let right = document.getElementById("right")
    left.classList.add("left-hide")
    right.classList.add("right-show")
  }
}
window.check = check

let backf = () => {
  let left = document.getElementById("left")
    let right = document.getElementById("right")
    left.classList.remove("left-hide")
    right.classList.remove("right-show")
}
window.backf = backf