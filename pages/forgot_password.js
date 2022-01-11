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
      <div className="flex flex-col justify-center items-center h-screen my-auto">
        <h1 className="text-5xl text-purple-500 text-center font-bold ">
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
          <input
            className="bg-purple-500 rounded-md h-12 w-80 text-center cursor-pointer text-white font-medium"
            type={"submit"}
            value={loading ? "LOADING..." : "VERIFY"}
          />
        </form>
      </div>
    </>
  );
}
