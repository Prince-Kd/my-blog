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
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal(errorCode, errorMessage, "error");
    });
}

export function createUser(firstname, lastname, email, password) {
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
                  return newUser;
            })
        })
        .catch((error) => {
          swal("Error!", error.message, "error");
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      swal(errorCode, errorMessage, "error");
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
