import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderRightMenu({ user, logout }) {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm text-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 lg:h-12 lg:w-12 rounded-full text-center text-lg font-bold"
            src={user?.photoURL}
            alt={`${user?.displayName
              .charAt(0)
              .toUpperCase()}${user?.displayName
              .split(" ")[1]
              .charAt(0)
              .toUpperCase()}`}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Link href={"/post/profile"}>
          <Menu.Item>
            {({ active }) => (
              
                <a
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your Profile
                </a>
              
            )}
          </Menu.Item>
          </Link>
          <Menu.Item>
            {({ active }) => (
                <a
                onClick={logout}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-purple-500"
                  )}
                >
                  Log out
                </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
