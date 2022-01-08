import Image from "next/image";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import { getUser } from "../../firebaseConfig";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Link from "next/link";

export default function Profile() {
  const [userData, setUserData] = useState();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase
        .database()
        .ref("/users/" + user.uid)
        .get()
        .then((snapshot) => {
          var data = snapshot.val();
          setUserData(data);
        });
    }
  });
  return (
    <div>
      <Header />
      <div className="px-20 py-10 grid grid-cols-3">
        <div className="col-span-2 pb-10">
          <div className="mb-10 rounded-md flex flex-col bg-gray-100 shadow-sm justify-center items-center border-t-4 border-purple-500">
            <div className=" h-52 w-52 m-10 rounded-full border-2 border-white text-center flex justify-center items-center">
              {userData && userData.profilePhoto ? (
                <Image src={userData.profilePhoto} width={52} height={52} />
              ) : userData ? (
                <h1 className="text-3xl font-bold">
                  {userData.firstname.charAt(0)}
                  {userData.lastname.charAt(0)}
                </h1>
              ) : (
                ""
              )}
            </div>
            <h1 className=" text-3xl font-bold pb-4">
              {userData && userData.firstname} {userData && userData.lastname}
            </h1>
          </div>
          <div className="flex flex-col rounded-md bg-gray-100 shadow-sm justify-center items-center p-10 mb-10 border-t-4 border-purple-500">
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
            {userData && userData.posts
              ? (userData.posts.map((post) => {
                  return <div>{post}</div>;
                }))
              : (<div>You do not have any posts. <Link href={"/post/create"}><a className="text-purple-500">Create one now!</a></Link></div>)}
          </div>
        </div>
        <div className="col-span-1" className=""></div>
      </div>
    </div>
  );
}
