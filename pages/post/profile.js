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
import AboutModal from "../../components/about_modal";
import Example from "../../components/tailwindHeader";
import PostCard from "../../components/post_card";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [ImgModal, setImgModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  //console.log(userData);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("/users/" + user.uid)
          .get()
          .then((snapshot) => {
            var data = snapshot.val();
            firebase
              .database()
              .ref("/users/" + user.uid + "/posts")
              .once("value")
              .then((snapshot) => {
                var posts = [];
                snapshot.forEach((childSnapshot) => {
                  posts.push(childSnapshot.val());
                });
                setLoading(false);
                setUserData({ ...data, posts: posts });
              });
          });
      }
    });
  });

  const toggleImgModal = () => setImgModal(!ImgModal);
  const toggleAboutModal = () => setAboutModal(!aboutModal);

  const followerCount = () => {
    var count = [];
    for (var follower in userData?.followers) {
      count.push(follower);
    }
    return count.length;
  };

  const followingCount = () => {
    var count = [];
    for (var following in userData?.following) {
      count.push(following);
    }
    return count.length;
  };

  const editProflePhoto = () => {};
  return (
    <div className="w-screen overflow-hidden ">
      <Head>
        <title>BLOGGERSPACE | PROFILE</title>
      </Head>
      {/* <Header /> */}
      <Example />
      <div className="lg:px-72 py-10 px-10">
        <div className="pb-10">
          <div className="mb-10 lg:p-10 p-5 rounded-md flex lg:flex-row flex-col bg-gray-100 shadow-sm items-center lg:justify-around border-t-4 border-purple-500 ">
            <div className=" lg:h-52 lg:w-52 h-48 w-48 rounded-full border-4 border-white text-center flex justify-center items-center relative">
              {userData && userData.profilePhoto ? (
                <img
                  src={userData.profilePhoto}
                  className="rounded-full lg:h-52 lg:w-52 h-48 w-48"
                />
              ) : userData ? (
                <h1 className="text-2xl lg:text-3xl lg:font-bold font-semibold">
                  {userData.firstname.charAt(0)}
                  {userData.lastname.charAt(0)}
                </h1>
              ) : (
                ""
              )}
              <button
                className="py-1 px-3 rounded-md bg-purple-200 text-center text-sm absolute bottom-2 right-2"
                onClick={toggleImgModal}
              >
                Edit
              </button>
              <ProfilePhotoModal toggle={toggleImgModal} modal={ImgModal} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl lg:font-bold font-semibold pb-2">
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
                  <h3 className="font-bold pr-1">{followerCount()}</h3>
                  <h3>followers</h3>
                </div>
                <div className="text-purple-700 flex pr-2">
                  <h3 className="font-bold pr-1">{followingCount()}</h3>
                  <h3>following</h3>
                </div>
                <div className="text-purple-700 flex ">
                  <h3 className="font-bold pr-1">0</h3>
                  <h3>posts</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col rounded-md bg-gray-100 shadow-sm justify-center items-center lg:p-10 p-5 mb-10 border-t-4 border-purple-500">
            <button
              className="py-1 px-3 rounded-md bg-purple-200 text-center text-sm absolute top-2 right-2"
              onClick={toggleAboutModal}
            >
              Edit
            </button>
            <h1 className="text-2xl font-medium pb-2">About</h1>
            <div>{userData?.about || "Say something about yourself."}</div>
            <AboutModal
              toggle={toggleAboutModal}
              modal={aboutModal}
              about={userData?.about}
            />
          </div>
          <div className="flex flex-col rounded-md bg-gray-100 shadow-sm justify-center items-center lg:p-10 p-5 mb-10 border-t-4 border-purple-500">
            <h1 className="text-2xl font-medium pb-2">Posts</h1>
            <div className="flex flex-row lg:flex-wrap overflow-x-scroll lg:items-start justify-center">
              {userData?.posts.length > 0 ? (
                userData.posts.map((post) => {
                  return <PostCard post={post} />;
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
    </div>
  );
}
