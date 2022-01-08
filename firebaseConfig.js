import firebase from "firebase/app";
import { useRouter } from "next/router";
import swal from "sweetalert";

import "firebase/auth";
import "firebase/database";

var database = firebase.database();

export async function loginUser(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          displayName: `${user.displayName}`,
          email: `${user.email}`,
          id: `${user.uid}`,
          profilePhoto: `${user.photoURL}`,
        })
      );
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal("Auht error", errorMessage, "error");
    });
}

export async function createUser(firstname, lastname, email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var newUser = userCredential.user;
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: `${firstname} ${lastname}`,
        })
        .then(() => {
            database.ref('users/' + newUser.uid).set({
                firstname: firstname,
                lastname: lastname,
                email: email,
                posts: []
            }, (error) => {
                if(error){
                    swal('Error!', "An error occurred.", "error")
                }
            }).then(()=> {
                sessionStorage.setItem(
                    "user",
                    JSON.stringify({
                      displayName: `${newUser.displayName}`,
                      email: `${newUser.email}`,
                      id: `${newUser.uid}`,
                      profilePhoto: `${newUser.photoURL}`,
                    })
                  );
            })
        })
        .catch((error) => {
          swal("Error!", error.message, "error");
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal("Auth error", errorMessage, "error");
    });
}

export async function logOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      sessionStorage.removeItem("user")
      return true;
    })
    .catch((error) => {
      swal("Error!", error.message, "error");
    });
}

export async function getUser() {
    var user = JSON.parse(sessionStorage.getItem('user'))
    //console.log(user)
    return database.ref('/users/' + user.id).get().then((snapshot) => {
        var data = snapshot.val()
        return data
    });   
}
