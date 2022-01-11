import Head from "next/head";
import { useState } from "react";
import { resetPassword } from "../firebaseConfig";
import { useRouter } from "next/router";

export async function getStaticProps({ params }){
    var code = params.oobCode;
    return {
        props : {
            code
        }
    }
}

export default function ForgotPassword({ code }) {
    console.log(code)
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState();

  const [hideError, setHideError] = useState(true);

  const router = useRouter();

  const handleSubmit = (e) => {
    if (!loading) {
      e.preventDefault();
      if (password == confirmPassword) {
        resetPassword(password, code, setLoading).then((val) => {
          if (val == true) {
            router.push("/");
          }
        });
      }
    }
  };
  return (
    <>
      <Head>
        <title>BLOGGERSPACE | RESET PASSWORD</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-screen my-auto">
        <h1 className="text-5xl text-purple-500 text-center font-bold ">
          BLOGGER SPACE{" "}
        </h1>
        <div className="h-8"></div>
        <h3>Change your password to get access to your account</h3>
        <div className="h-4"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>New password:</label>
            <input
              type={"password"}
              required
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="h-4"></div>
          <div className="flex flex-col">
            <label>Confirm password:</label>
            <input
              type={"password"}
              required
              className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80"
              onChange={(e) => {
                if (password != e.target.value) {
                  setHideError(false);
                } else {
                  setHideError(true);
                  setConfirmPassword(e.target.value);
                }
              }}
            />
            {!hideError ? (
              <div className="text-xs text-red">Passwords do not match</div>
            ) : null}
          </div>
          <div className="h-4"></div>
          <input
            className="bg-purple-500 rounded-md h-12 w-80 text-center cursor-pointer text-white font-medium"
            type={"submit"}
            value={loading ? "LOADING..." : "RESET PASSWORD"}
          />
        </form>
      </div>
    </>
  );
}
