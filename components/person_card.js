import { useEffect, useState } from "react"
import { followUser, getFollowing } from "../firebaseConfig"
import { useRouter } from "next/router";

export default function PersonCard({id, name, img}){
    const [loading, setLoading] = useState(false);
    const [follow, setFollow] = useState('Follow');
    const [user, setUser] = useState(true);
    const [following, setFollowing] = useState()

    var router = useRouter();

    useEffect(() => {
        getFollowing(setFollowing)
    }, [])

    return(
        <div className="flex flex-row justify-between items-center mb-3">
            <div className="rounded-full w-20 border-white border-2 m-auto mr-2">
                <img className="text-black-500 text-lg text-center m-auto rounded-full border-gray-500 border-2 w-12  h-12" src={img} alt={`${name.charAt(0).toUpperCase()}${name
                .split(" ")[1]
                .charAt(0)
                .toUpperCase()}`}/>
            </div>
            <div className="flex flex-col text-sm ">
                <h2 className=" text-lg font-semibold">{name}</h2>
                <h2 className="flex flex-wrap text-sm text-gray-500">Mobile App Developer at Nerasol Ghana limited</h2>
            </div>
            <button className="rounded-full px-2 py-1 border-purple-500 border-2 hover:bg-purple-500 hover:text-white" onClick={() => {
                followUser(id, setLoading, setFollow, setUser)
            }}>{follow}</button>
        </div>
    )
}

