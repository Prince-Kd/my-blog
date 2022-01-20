import BlogCard from "../components/blog_card";
import Header from "../components/header";
import PersonCard from "../components/person_card";
import TopicChip from "../components/topics_chip";
import Head from "next/head";
import firebase from "firebase/app";

import "firebase/database";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className="h-screen overflow-hidden">
      <Head>
        <title>BLOGGERSPACE | HOME</title>
      </Head>
      <Header />
      <div className=" grid grid-cols-3 h-full w-screen">
        <div className="border-r-2 border-purple-400 col-span-1 overflow-scroll px-16 py-20 flex flex-col ">
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
              <PersonCard />
              <PersonCard />
              <PersonCard />
              <PersonCard />
            </div>
          </div>
        </div>
        <div className="overflow-scroll col-span-2 px-10 pb-20 pt-10">
          <h2 className="text-3xl font-medium ">Recommended Posts For You</h2>
          <hr className="w-82 mb-10" />
          {
            posts.map((post) => (<BlogCard key={post.index} post={post} />))
          }
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return firebase
    .database()
    .ref("posts/")
    .once("value")
    .then(async (snapshot) => {
      var posts = [];
      for (var postId in snapshot.val()) {
        await firebase
          .database()
          .ref("posts/" + postId)
          .get()
          .then((snapshot) => {
            posts.push(snapshot.val())
          });
      }
      return {
        props: {
          posts
        }
      }
    });
}
