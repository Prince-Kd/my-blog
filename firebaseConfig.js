import firebase from "firebase/app";
import { useRouter } from "next/router";
import swal from "sweetalert";

import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var database = firebase.database();
var storage = firebase.storage();

export async function loginUser(email, password) {
  return firebase
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
      swal("Auht error", errorMessage, "error");
    });
}

export async function createUser(firstname, lastname, email, phone, password) {
  return firebase
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
          database
            .ref("users/" + newUser.uid)
            .set(
              {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                posts: [],
              },
              (error) => {
                if (error) {
                  swal("Error!", "An error occurred.", "error");
                }
              }
            )
            .then(() => {
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
            });
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
      sessionStorage.removeItem("user");
      return true;
    })
    .catch((error) => {
      swal("Error!", error.message, "error");
    });
}

export async function getUser() {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return user;
    }
  });
}

export function addPost(postData, setLoading, setPostData) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoading(true);
      var newPostKey = database.ref(`users/${user.uid}`).push().key;
      storage
        .ref("post-images/" + newPostKey)
        .put(postData.postImage)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            var updates = {};
            updates["/posts/" + newPostKey] = {...postData, postImage: downloadURL};
            updates["users/" + user.uid + "/posts/" + newPostKey] = {...postData, postImage: downloadURL};
            database.ref().update(updates, (error) => {
              setLoading(false);
              if (error) {
                swal("Add post", "Post not saved. An error occurred", "error");
              } else {
                swal("Add post", "Post uploaded successfully.", "success");

                setPostData((oldState) => ({
                  ...oldState,
                  title: "",
                  post: "",
                }));
              }
            });
          });
        });
    }
  });
}
