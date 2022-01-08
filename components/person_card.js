export default function PersonCard(){
    return(
        <div className="flex flex-row justify-between items-center mb-3">
            <div className="rounded-full h-16 w-16 border-white border-2 m-auto mr-2">
                <img className="text-gray-500 text-sm text-center rounded-full" src="https://avatars.githubusercontent.com/u/34554163?s=400&u=d4f60bd225226a48a0fbd7ed46e1d20954695559&v=4" alt="img"/>
            </div>
            <div className="flex flex-col text-sm ">
                <h2 className=" text-lg font-semibold">Mawuli Kwadzofio</h2>
                <h2 className="flex flex-wrap text-sm text-gray-500">Mobile App Developer at Nerasol Ghana limited</h2>
            </div>
            <button className="rounded-full px-2 py-1 border-purple-500 border-2 hover:bg-purple-500 hover:text-white">Follow</button>
        </div>
    )
}