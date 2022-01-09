import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import { getUser } from "../../firebaseConfig";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Link from "next/link";
import Head from "next/head";


export default function Profile() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref("/users/" + user.uid)
        .get()
        .then((snapshot) => {
          var data = snapshot.val();
          if(data){
              setLoading(false);
              setUserData(data);
          }
        });
    }
  });
  return (
    <div>
        <Head>
        <title>BLOGGERSPACE | PROFILE</title>
      </Head>
      <Header />
      <div className="px-72 py-10">
        <div className="pb-10">
          <div className="mb-10 p-10 rounded-md flex flex-row bg-gray-100 shadow-sm justify-around border-t-4 border-purple-500">
            <div className=" h-52 w-52 rounded-full border-4 border-white text-center flex justify-center items-center">
            <img className="rounded-full" src={"https://firebasestorage.googleapis.com/v0/b/blogger-space-adbeb.appspot.com/o/post-images%2F-Mt03Ofc6sn0ceE_jH1w?alt=media&token=77113d11-5523-41b8-89fe-50cc531df418"} />
              {/* {userData && userData.profilePhoto ? (
                <Image src={userData.profilePhoto} width={52} height={52} />
              ) : userData ? (
                <h1 className="text-3xl font-bold">
                  {userData.firstname.charAt(0)}
                  {userData.lastname.charAt(0)}
                </h1>
              ) : (
                ""
              )} */}
            </div>
            <div>
              <h1 className=" text-3xl font-bold pb-2">
                {loading ? `loading...` : (`${userData && userData.firstname} ${userData && userData.lastname}`)}
              </h1>
              <h2 className="text-gray-500 pb-2">
                {loading ? `loading...` : (`${userData && userData.email}`)}
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
            <button className="py-1 px-3 rounded-md bg-purple-200 text-center text-sm absolute top-2 right-2">Edit</button>
            <h1 className="text-2xl font-medium pb-2">About</h1>
            <div>
              I am passionate about software engineering and learning new
              technologies. Always striving to improve my knowledge of this
              wonderful field, so I can contribute as much as possible to the
              future of this industry. Always willing to work on projects that
              can make life easier for others. My latest project is a mobile
              application which was built with flutter
            </div>
          </div>
          <div className="flex flex-col rounded-md bg-gray-100 shadow-sm justify-center items-center p-10 mb-10 border-t-4 border-purple-500">
            <h1 className="text-2xl font-medium pb-2">Posts</h1>
            {/* {userData && userData.posts ? (
              userData.posts.map((post) => {
                return <div key={post.index}>{post}</div>;
              })
            ) : (
              <div>
                You do not have any posts.{" "}
                <Link href={"/post/create"}>
                  <a className="text-purple-500">Create one now!</a>
                </Link>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
