import Header from "../../components/header";
import { getUser } from "../../firebaseConfig";
import Head from "next/head";


export default function Create() {
  return (
    <div className="h-screen overflow-clip">
      <Head>
        <title>BLOGGERSPACE | CREATE</title>
      </Head>
      <Header />
      <div className="w-1/2 h-full mx-auto p-10">
        <h2 className="text-xl font-semibold">Create a post</h2>
        <hr className="mb-4" />
        <form className="h-1/2">
          <div className="border-2 border-gray-300 rounded-md mb-4 ">
            <input type={"text"} className="p-4 w-full " placeholder="TITLE" />
          </div>
          <div className="border-2 h-full border-gray-300 rounded-md mb-4">
            <textarea
              placeholder="POST HERE ..."
              className="p-4 w-full h-full overflow-scroll"
            ></textarea>
          </div>
          <div className="flex flex-row justify-end">
            <input
              className="bg-purple-500 rounded-md h-12 w-52 text-center cursor-pointer text-white font-medium"
              type={"submit"}
              value={"POST"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
