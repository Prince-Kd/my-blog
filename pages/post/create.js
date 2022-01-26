import Header from "../../components/header";
import { getUser, addPost } from "../../firebaseConfig";
import Head from "next/head";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import Example from "../../components/tailwindHeader";
import firebase from "firebase/app";
import 'firebase/auth';

export default function Create({ author }) {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date();
  const [user, setUser] = useState()
  const [postData, setPostData] = useState({
    title: "",
    post: "",
    author: user?.displayName,
    date: today.toLocaleDateString(undefined, options),
    postImage: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        setUser(user)
      }
    })
  })

  return (
    <div className="h-screen overflow-scroll">
      <Head>
        <title>BLOGGERSPACE | CREATE</title>
      </Head>
      {/* <Header /> */}
      <Example />
      <div className=" h-full lg:w-1/2 mx-auto lg:p-10 p-5">
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
            <button
              className="bg-purple-500 rounded-md lg:h-12 lg:w-52 h-10 w-44 text-center cursor-pointer text-white font-medium hover:border-2 hover:border-purple-500 hover:bg-white hover:text-purple-500"
              type={"submit"}
            >
              {loading ? (
                <div className="flex flex-row justify-center items-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  LOADING...
                </div>
              ) : (
                "POST"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
