import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import { getUser } from "../../firebaseConfig";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Link from "next/link";
import Head from "next/head";
import ProfilePhotoModal from "../../components/profile_photo_update_modal";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  //console.log(userData);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref("/users/" + user.uid)
        .get()
        .then((snapshot) => {
            var data = snapshot.val()
          firebase
            .database()
            .ref("/users/" + user.uid + "/posts")
            .once("value").then((snapshot) => {
                var posts = [];
                snapshot.forEach((childSnapshot) => {
                    posts.push(childSnapshot.val());
                })
              setLoading(false);
              setUserData({ ...data, posts: posts });
            });
        });
    }
  });

  const toggle = () => setModal(!modal);

  const editProflePhoto = () => {};
  return (
    <div className="w-screen overflow-hidden ">
      <Head>
        <title>BLOGGERSPACE | PROFILE</title>
      </Head>
      <Header />
      <div className="px-72 py-10">
        <div className="pb-10">
          <div className="mb-10 p-10 rounded-md flex flex-row bg-gray-100 shadow-sm justify-around border-t-4 border-purple-500 ">
            <div className=" h-52 w-52 rounded-full border-4 border-white text-center flex justify-center items-center relative">
              {userData && userData.profilePhoto ? (
                <img
                  src={userData.profilePhoto}
                  className="rounded-full h-52 w-52"
                />
              ) : userData ? (
                <h1 className="text-3xl font-bold">
                  {userData.firstname.charAt(0)}
                  {userData.lastname.charAt(0)}
                </h1>
              ) : (
                ""
              )}
              <button
                className="py-1 px-3 rounded-md bg-purple-200 text-center text-sm absolute bottom-2 right-2"
                onClick={toggle}
              >
                Edit
              </button>
              <ProfilePhotoModal toggle={toggle} modal={modal} />
            </div>
            <div>
              <h1 className=" text-3xl font-bold pb-2">
                {loading
                  ? `loading...`
                  : `${userData && userData.firstname} ${
                      userData && userData.lastname
                    }`}
              </h1>
              <h2 className="text-gray-500 pb-2">
                {loading ? `loading...` : `${userData && userData.email}`}
              </h2>
              <button className="rounded-md w-60 text-center shadow-sm bg-purple-200 p-2 mb-4">
                Edit profile
              </button>
              <div className="flex flex-row justify-around items-center">
                <div className="text-purple-700 flex mr-2">
                  <h3 className="font-bold pr-1">20</h3>
                  <h3>followers</h3>
                </div>
                <div className="text-purple-700 flex pr-2">
                  <h3 className="font-bold pr-1">10</h3>
                  <h3>following</h3>
                </div>
                <div className="text-purple-700 flex ">
                  <h3 className="font-bold pr-1">0</h3>
                  <h3>posts</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col rounded-md bg-gray-100 shadow-sm justify-center items-center p-10 mb-10 border-t-4 border-purple-500">
            <button className="py-1 px-3 rounded-md bg-purple-200 text-center text-sm absolute top-2 right-2">
              Edit
            </button>
            <h1 className="text-2xl font-medium pb-2">About</h1>
            <div>{userData && userData.about}</div>
          </div>
          <div className="flex flex-col rounded-md bg-gray-100 shadow-sm justify-center items-center p-10 mb-10 border-t-4 border-purple-500">
            <h1 className="text-2xl font-medium pb-2">Posts</h1>
            {userData && userData.posts ? (
              userData.posts.map((post) => {
                return <div key={post.index} >{post.title}</div>;
              })
            ) : (
              <div>
                You do not have any posts.{" "}
                <Link href={"/post/create"}>
                  <a className="text-purple-500">Create one now!</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
