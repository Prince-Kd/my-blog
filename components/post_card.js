
export default function PostCard({post}){
    return(
        <div className="flex flex-col lg:w-40 w-50 h-58 lg:mr-5 mr-2 cursor-pointer">
            <img src={post.postImage} className="lg:h-40 lg:w-40 h-40 w-44 lg:mb-4 mb-2 shadow-md"/>
            <div className="flex flex-col justify-between">
                <div className="lg:text-lg font-semibold flex-wrap">{post.title.toUpperCase()}</div>
                <div className="text-gray-500 lg:text-sm text-xs ">{post.date}</div>
            </div>
        </div>
    )
}