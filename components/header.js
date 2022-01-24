import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { logOut } from "../firebaseConfig";
import firebase from "firebase/app";

import "firebase/auth";

export default function Header() {
  const router = useRouter();

  const home = "/";
  const profile = "/post/profile";
  const create = "/post/create";
  const cat = "/post/categories";
  const log_in = "/log_in";
  const sign_up = "/sign_up";

  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  function handleLogout() {
    swal({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        logOut().then(() => {
          router.push(home);
        });
      }
    });
  }

  return (
    <div className="flex flex-row justify-between items-center p-3 shadow-purple-300 shadow-md">
      <Link href={home}>
        <a className=" flex items-center justify-center text-xl lg:text-3xl text-purple-500 font-bold">BLOGGER SPACE</a>
      </Link>
      <div className=" hidden lg:flex lg:flex-row lg:items-center">
        <Link href={home}>
          <a
            className={`mx-2 ${
              router.pathname == home
                ? "border-2 border-purple-500 rounded-md p-1"
                : ""
            }`}
          >
            Home
          </a>
        </Link>
        {/* <Link href={cat}>
          <a
            className={`mx-2 ${
              router.pathname == cat
                ? "border-2 border-purple-500 rounded-md p-1"
                : ""
            }`}
          >
            Categories
          </a>
        </Link> */}
        <Link href={user ? create : log_in}>
          <a
            className={`mx-2 ${
              router.pathname == create
                ? "border-2 border-purple-500 rounded-md px-2"
                : ""
            }`}
          >
            Create
          </a>
        </Link>
        <Link href={user ? profile : log_in}>
          <a
            className={`mx-2 ${
              router.pathname == profile
                ? "border-2 border-purple-500 rounded-md px-2"
                : ""
            }`}
          >
            Profile
          </a>
        </Link>
      </div>
      {user ? (
        <div className=" lg:flex lg:flex-row lg:justify-center lg:items-center">
          <div className="h-8 w-8 lg:h-12 lg:w-12 rounded-full flex justify-center items-center text-center">
            {user && user.photoURL ? (
              <img src={user.photoURL} className="h-8 w-8 lg:h-12 lg:w-12 rounded-full" />
            ) : user && user.displayName ? (
              `${user.displayName.charAt(0).toUpperCase()}${user.displayName
                .split(" ")[1]
                .charAt(0)
                .toUpperCase()}`
            ) : null}
          </div>
          <button
            type="button"
            className="hidden bg-purple-500 rounded-md h-8 p-1 text-white font-medium text-center hover:h-9 mx-2 w-24"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>
      ) : (
        <div className="hidden lg:flex lg:flex-row">
          <Link href={log_in}>
            <a
              type="button"
              className="bg-purple-500 rounded-md h-8 p-1 text-white font-medium text-center hover:h-9 mr-2 w-24"
            >
              LOG IN
            </a>
          </Link>
          <Link href={sign_up}>
            <a
              type="button"
              className="shadow-sm rounded-md text-purple-500 font-medium text-center h-8 p-1 w-24 hover:h-9  hover:border-purple-500 hover:border-2 hover:rounded-md"
            >
              SIGN UP
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}


