import { useRouter } from "next/router";
import Link from "next/link";
import { createUser } from "../firebaseConfig";
import { useState } from "react";
import swal from "sweetalert";
import Head from "next/head";

export default function SignUp() {
  const router = useRouter();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassWord] = useState();

  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    if (!loading) {
      e.preventDefault();
      setLoading(true);
      if (password == confirmPassword) {
        createUser(firstname, lastname, email, phone, password).then(() => {
          swal("", "Sign up successful!", "success");
          router.push("/");
        });
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen my-auto mx-auto overflow-scroll">
      <Head>
        <title>BLOGGERSPACE | SIGN UP</title>
      </Head>
      <h1 className="text-3xl lg:text-5xl text-purple-500 text-center font-bold ">
        BLOGGER SPACE{" "}
      </h1>
      <div className="h-8"></div>
      <h3>Create an account and start sharing your posts</h3>
      <div className="h-4"></div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="flex flex-col mb-4">
            <label>Firstname:</label>
            <input
              type={"text"}
              required
              placeholder="Firstname"
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80 px-2"
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>
          <div className="w-10"></div>
          <div className="flex flex-col">
            <label>Lastname:</label>
            <input
              type={"text"}
              required
              placeholder="Lastname"
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80 px-2"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="h-4"></div>
        <div className="flex flex-col lg:flex-row items-center justify-around">
          <div className="flex flex-col mb-4">
            <label>Email:</label>
            <input
              type={"text"}
              required
              placeholder="Email"
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80 px-2"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="w-10"></div>
          <div className="flex flex-col">
            <label>Phone number:</label>
            <input
              type={"text"}
              required
              placeholder="Phone"
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80 px-2"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="h-4"></div>
        <div className="flex flex-col lg:flex-row justify-around items-center ">
          <div className="flex flex-col mb-4">
            <label>Password:</label>
            <input
              type={"password"}
              required
              placeholder="Password"
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80 px-2"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="w-10"></div>
          <div className="flex flex-col">
            <label>Confirm password:</label>
            <input
              type={"password"}
              required
              placeholder="Confirm password"
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80 px-2"
              onChange={(e) => {
                if (password != e.target.value) {
                  setHide(false);
                } else {
                  setHide(true);
                  setConfirmPassWord(e.target.value);
                }
              }}
            />
          </div>
        </div>
        {!hide ? (
          <div className="text-sm text-red-500 text-right">
            Passwords do not match
          </div>
        ) : null}

        <div className="h-6"></div>
        <div className="flex flex-row items-center justify-center">
          <button
            className="bg-purple-500 rounded-md h-14 w-80 text-center cursor-pointer text-white font-medium "
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
              "SIGN UP"
            )}
          </button>
        </div>

        <div className="h-6"></div>
        <div className="text-center">
          Already have an account?{" "}
          <Link href={"/log_in"}>
            <a className="text-purple-500 text-center">Log in</a>
          </Link>
        </div>
      </form>
    </div>
  );
}
