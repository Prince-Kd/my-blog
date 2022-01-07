import { useRouter } from "next/router";
import Link from "next/link";
import { loginUser } from "../firebaseConfig";
import { useState } from "react";

export default function LogIn() {
    const router = useRouter();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser(email, password).then((user) => {
            if(user){
                router.push('/')
            }
        })
    }
  return (
    <div className="flex flex-col justify-center items-center h-screen my-auto">
      <h1 className="text-5xl text-purple-500 text-center font-bold ">BLOGGER SPACE </h1>
      <div className="h-8"></div>
      <h3>Log in to create your own blogs...</h3>
      <div className="h-4"></div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label>Email:</label>
          <input type={"text"} required className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80" onChange={(e) => {
              setEmail(e.target.value);
          } } />
        </div>
        <div className="h-2"></div>
        <div className="flex flex-col">
          <label>Password:</label>
          <input type={"password"} required className="rounded-md p-1 border-2 border-gray-300 focus:border-2 hover:border-purple-500 h-12 w-80" onChange={(e) => {
              setPassword(e.target.value);
          }}/>
        </div>
        <div className="h-4"></div>
        <input className="bg-purple-500 rounded-md h-12 w-80 text-center cursor-pointer text-white font-medium" type={'submit'} value={'LOG IN'}/>
        <div className="h-4"></div>
        <div className="text-center">Don't have an account? <Link href={'/sign_up'}><a className="text-purple-500 text-center">Sign up</a></Link></div>
      </form>
    </div>
  );
}
