import firebase from "firebase/app";
import { useRouter } from "next/router";
import swal from "sweetalert";

import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var database = firebase.database();
var storage = firebase.storage();

export async function loginUser(email, password, setLoading) {
  setLoading(true)
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
      setLoading(false)
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
                id: newUser.uid,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                posts: [],
              },
              (error) => {
                if (error) {
                  swal("Error!", "An error occurred.", "error");
                }else{
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
                }
              }
            )
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

export const getUser = () => {
  const user = firebase.auth().currentUser;
  return user;
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
            updates["/posts/" + newPostKey] = {
              ...postData,
              postImage: downloadURL,
              authorId: user.uid,
              authorName: user.displayName,
              authorPhoto: user.photoURL
            };
            updates["users/" + user.uid + "/posts/" + newPostKey] = {
              ...postData,
              postImage: downloadURL,
            };
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

export async function uploadProfilePhoto(photo, setLoading) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoading(true);
      storage
        .ref("/profile-photos" + user.uid)
        .put(photo)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            database
              .ref("users/" + user.uid)
              .update({ profilePhoto: downloadURL }, (error) => {
                if (error) {
                  setLoading(false);
                  swal(
                    "Profile photo",
                    "An error occureed. Try again.",
                    "error"
                  );
                } else {
                  firebase
                    .auth()
                    .currentUser.updateProfile({
                      photoURL: downloadURL,
                    })
                    .then(async () => {
                      database
                        .ref("users/" + user.uid)
                        .update({ profilePhoto: downloadURL });
                      setLoading(false);
                      swal(
                        "Profile Photo",
                        "Profile photo updated successfully.",
                        "success"
                      );
                    })
                    .catch((error) => {
                      setLoading(false);
                      swal(
                        "Profile photo",
                        "An error occureed. Try again.",
                        "error"
                      );
                    });
                }
              });
          });
        });
    }
  });
}

export async function sendPassResetEmail(email, setLoading){
  setLoading(true)
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    setLoading(false)
    swal('Password reset email', "Password reset email sent. Check your email to reset your password", "success")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    setLoading(false)
    swal('Password reset email', errorMessage, "error")
  });  

}

export async function changePassword(password, setLoading) {
  const user = firebase.auth().currentUser;
  setLoading(true)
  return user
    .updatePassword(password)
    .then(() => {
      setLoading(false)
      swal('Reset password', "Password reset was successful", "success")
      return true
    })
    .catch((error) => {
      setLoading(false)
      swal('Reset password', "An error occurred. Try again.", "error")
      return false
    });
}

export async function resetPassword(password, code, setLoading){
  setLoading(true)
  return firebase.auth().confirmPasswordReset(code, password)
    .then(() => {
      setLoading(false)
      swal('Reset password', "Password reset was successful", "success")
      return true
    })
    .catch((error) => {
      setLoading(false)
      swal('Reset password', "Invalid reset code. Check your email and try again.", "error")
      return false
    })
}

export async function getFollowing(setFollowing){
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      database.ref('users/' + user.uid + "/following").once('value').then(async (snapshot) => {
        var following = [];
        for (var id in snapshot.val()) {
          await database.ref('users/' + user.uid + "/following/" + id).get().then((snapshot) => {
            following.push(snapshot.val())
          })
        }
        setFollowing(following)
      })
    }
  })
  
}

export async function followUser(userId, setLoading, setUser){
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      setLoading(true)
      var newFollowingKey = database.ref(`users/${user.uid}`).push().key;
      var newFollowerKey = database.ref(`users/${userId}`).push().key;
      var following = {};
      var follower = {};
      following['users/' + user.uid + "/following/" + newFollowingKey] = {
        id: userId
      }
      database.ref().update(following, (error) => {
        if(error){
          setLoading(false)
        }else{
          setLoading(false)
          follower['users/' + userId + "/followers/" + newFollowerKey] = {
            id: user.uid
          }
          database.ref().update(follower)
        }
      })
    }else{
      setUser(false)
    }
  })
}

export function unFollowUser(id){
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      database.ref(`users/${user.uid}/following`).orderByKey().once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var followingKey = childSnapshot.key;
          var followingUser = childSnapshot.val()?.id;
          if(followingUser == id){
            database.ref(`users/${user.uid}/following/${followingKey}`).remove().then(() => {
              console.log(`${followingKey} removed`)
            }).catch(error => {
              console.log(error)
            })
          }
        })
      })
    }
  })
}

export function updateAbout(data, setLoading){
  setLoading(true)
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      database.ref(`users/${user.uid}`).update({about: data}).then(() => {
        swal('Success', 'About saved successfully!', 'success')
        setLoading(false)
      }).catch(error => {
        swal('Error', 'An error occurred. Try again', 'error')
        setLoading(false)
      })
    }
  })
}

