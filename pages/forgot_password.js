import Head from "next/head";
import { useState } from "react";
import { sendPassResetEmail } from "../firebaseConfig";

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState();

  const handleSubmit = (e) => {
    if (!loading) {
      e.preventDefault();
      sendPassResetEmail(email, setLoading);
    }
  };
  return (
    <>
      <Head>
        <title>BLOGGERSPACE | FORGOT PASSWORD</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen my-auto overflow-hidden">
        <h1 className=" text-3xl lg:text-5xl text-purple-500 text-center font-bold ">
          BLOGGER SPACE{" "}
        </h1>
        <div className="h-8"></div>
        <h3>Enter your email to set a new password</h3>
        <div className="h-4"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Email:</label>
            <input
              type={"text"}
              required
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="h-4"></div>
          <button
            className="bg-purple-500 rounded-md h-12 w-80 text-center cursor-pointer text-white font-medium"
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
              "VERIFY"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
