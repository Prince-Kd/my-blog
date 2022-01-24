import BlogCard from "../components/blog_card";
import Header from "../components/header";
import PersonCard from "../components/person_card";
import TopicChip from "../components/topics_chip";
import Head from "next/head";
import firebase from "firebase/app";
import { useEffect, useState } from "react";

import "firebase/database";
import { getUser, unFollowUser } from "../firebaseConfig";
import Example from "../components/tailwindHeader";

export default function Home({ posts, users }) {
  const [myuser, setUser] = useState()
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setUser(user)
      }
    })
    unFollowUser()
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <Head>
        <title>BLOGGERSPACE | HOME</title>
      </Head>
      {/* <Header /> */}
      <Example />
      <div className="sm:flex-none lg:grid lg:grid-cols-3 h-full w-screen">
        <div className="hidden border-r-2 border-purple-400 col-span-1 overflow-scroll px-16 py-20 lg:flex lg:flex-col ">
          <p className="text-xl font-semibold pb-2">Suggested topics</p>
          <hr className="mb-4" />
          <div className="flex flex-wrap mb-8">
            <TopicChip topic={"flutter"} />
            <TopicChip topic={"react"} />
            <TopicChip topic={"web development"} />
            <TopicChip topic={"dev ops"} />
            <TopicChip topic={"artificial intelligence"} />
            <TopicChip topic={"android"} />
            <TopicChip topic={"laravel"} />
            <TopicChip topic={"python"} />
          </div>
          <div>
            <p className="text-xl font-semibold pb-2">Who to follow</p>
            <hr className="mb-4" />
            <div className="flex flex-col mb-8">
              {
                users.map((user, index) => {
                  if(user.id != myuser?.uid){
                    return <PersonCard key={index} name={`${user.firstname} ${user.lastname}`} img={user.profilePhoto} id={user.id}/>
                  }
                })
              }
              {/* <PersonCard />
              <PersonCard />
              <PersonCard />
              <PersonCard /> */}
            </div>
          </div>
        </div>
        <div className="overflow-scroll lg:col-span-2 lg:px-10 px-5 pb-20 pt-10">
          <h2 className="text-xl lg:text-3xl font-medium ">Recommended Posts For You</h2>
          <hr className="w-82 mb-10" />
          {posts.map((post, index) => {
            //console.log(index)
            return <BlogCard key={index} post={post} />
})}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  var posts = [];
  var users = [];
  
  await firebase
    .database()
    .ref("posts/")
    .once("value")
    .then(async (snapshot) => {
      for (var postId in snapshot.val()) {
        await firebase
          .database()
          .ref("posts/" + postId)
          .get()
          .then((snapshot) => {
            posts.push(snapshot.val());
          });
      }
      return posts;
    });

  await firebase
    .database()
    .ref("users")
    .limitToFirst(5)
    .once("value")
    .then(async (snapshot) => {
      for (var userId in snapshot.val()) {
        await firebase
          .database()
          .ref("users/" + userId)
          .get()
          .then((snapshot) => {
            users.push(snapshot.val());
          });
      }
      return users;
    });

  return {
    props: {
      posts,
      users,
    },
  };
}
