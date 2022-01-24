export default function BlogCard({post}) {
  return (
    <div className=" h-52 grid grid-cols-4 mb-10 shadow-md">
      <div className="p-4 col-span-3">
        <div id="title" className="text-xl font-bold ">{post.title}</div>
        <div id="author" className="flex flex-row items-center">
            <div className="text-gray-500 text-sm italic mr-5">By {post.authorName}</div>
            <div className="h-6 w-6 rounded-full bg-gray-200">
                <img src={post.authorPhoto} alt="dp" className="h-6 w-6 rounded-full flex items-center justify-center text-xs" />
            </div>
        </div><br/>
        {/* <div id="summary" className=" flex-wrap font-medium">
          {post.post}
        </div><br/> */}
        <div id="details" className="flex flex-row justify-around items-center text-sm text-gray-500">
            <div className="flex text-ellipsis">{post.date}</div>
            <div>{'10 mins read '}</div>
            {/* <div className="text-center rounded-3xl px-2 py-1 bg-purple-200">{'Next js'}</div> */}
        </div>
      </div>
      <div id="image" className=" lg:h-48 lg:w-52 h-24 w-28 bg-gray-200 ">
          <img className=" lg:h-48 lg:w-52 h-24 w-28" src={post.postImage} alt="poster" />
      </div>
    </div>
  );
}
