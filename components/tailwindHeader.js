/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { logOut } from "../firebaseConfig";
import firebase from "firebase/app";

import "firebase/auth";
import HeaderRightMenu from "./headerRightMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();

  const [user, setUser] = useState();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Create", href: `${user ? "/post/create" : "/log_in"}` },
    { name: "Profile", href: `${user ? "/post/profile" : "/log_in"}` },
  ];

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
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
          router.push('/');
        });
      }
    });
  }

  return (
    <Disclosure as="nav" className="bg-white shadow-purple-300 shadow-md">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2  lg:px-2">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-purple-500 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-around ">
                <div className="flex-shrink-0 flex items-center">
                  <Link href={"/"}>
                    <a className=" flex items-center justify-center text-xl lg:text-3xl text-purple-500 font-bold">
                      BLOGGER SPACE
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6 ">
                  <div className="flex space-x-4 lg:justify-center lg:items-center">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={`mx-2 ${
                            router.pathname == item.href
                              ? "border-2 border-purple-500 rounded-md p-1"
                              : ""
                          }`}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                {user ? (
                  <HeaderRightMenu user={user} logout={handleLogout} />
                ) : (
                  <Link href={"/log_in"}>
                    <a
                      type="button"
                      className="bg-purple-500 rounded-md h-8 p-1 text-white font-medium text-center hover:h-9 ml-2 w-20 lg:w-24"
                    >
                      LOG IN
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      router.pathname == item.href
                        ? "bg-gray-200 text-purple-500 border-l-4 border-l-purple-500"
                        : "text-gray-500 hover:bg-gray-700 hover:text-purple-500",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
