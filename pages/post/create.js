import Header from "../../components/header";
import { getUser, addPost } from "../../firebaseConfig";
import Head from "next/head";
import { useState } from "react";
import swal from "sweetalert";

export default function Create({ author }) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date();
  const [postData, setPostData] = useState({
    title: "",
    post: "",
    author: getUser().then((user) => {
      return user && user.displayName;
    }),
    date: today.toLocaleDateString(undefined, options),
    postImage: "",
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen overflow-scroll">
      <Head>
        <title>BLOGGERSPACE | CREATE</title>
      </Head>
      <Header />
      <div className="w-1/2 h-full mx-auto p-10">
        <h2 className="text-xl font-semibold">Create a post</h2>
        <hr className="mb-4" />
        <form
          className="h-1/2"
          onSubmit={(e) => {
            if (loading == false) {
              e.preventDefault();
              addPost(postData, setLoading, setPostData);
            }
          }}
        >
          <div className="border-2 border-gray-300 rounded-md mb-4 ">
            <input
              required
              value={postData.title}
              type={"text"}
              className="p-4 w-full "
              placeholder="TITLE"
              onChange={(e) => {
                setPostData((oldState) => ({
                  ...oldState,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div className="border-2 h-full border-gray-300 rounded-md mb-4">
            <textarea
              value={postData.post}
              required
              placeholder="POST HERE ..."
              className="p-4 w-full h-full overflow-scroll"
              onChange={(e) => {
                setPostData((oldState) => ({
                  ...oldState,
                  post: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <label className="flex">
            Select post image<div className="text-red-500"> *</div>
          </label>
          <div className="border-2 border-gray-300 rounded-md mb-4 flex items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <input
              required
              type={"file"}
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                setPostData((oldState) => ({
                  ...oldState,
                  postImage: e.target.files[0],
                }));
              }}
            />
          </div>
          <div className="flex flex-row justify-end">
            <input
              className="bg-purple-500 rounded-md h-12 w-52 text-center cursor-pointer text-white font-medium"
              type={"submit"}
              value={loading ? "LOADING..." : "POST"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}


