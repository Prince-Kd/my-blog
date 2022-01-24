export default function BlogCard({ post }) {
  return (
    <div className="lg:h-52 lg:grid lg:grid-cols-4 mb-10 shadow-md lg:p-4 p-2 flex justify-between">
      <div className="lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
        <div className="">
          <div
            id="title"
            className="lg:text-xl text-lg lg:font-bold font-semibold"
          >
            {post.title.toUpperCase()}
          </div>
          <div id="author" className="flex flex-row items-center">
            <div className="text-gray-500 italic mr-5">
              By {post.authorName}
            </div>
            <div className="lg:h-6 lg:w-6 h-5 w-5 rounded-full bg-gray-200">
              <img
                src={post.authorPhoto}
                alt="dp"
                className="lg:h-6 lg:w-6 h-5 w-5  rounded-full flex items-center justify-center text-xs"
              />
            </div>
          </div>
          <br />
        </div>
        <div
            id="details"
            className="flex lg:flex-row flex-col lg:justify-around justify-between lg:items-center lg:text-sm text-xs text-gray-500"
          >
            <div className="flex text-ellipsis ">~{post.date}</div>
            <div>{"~10 mins read "}</div>
            {/* <div className="text-center rounded-3xl px-2 py-1 bg-purple-200">{'Next js'}</div> */}
          </div>
      </div>
      <div id="image" className=" lg:h-44 lg:w-52 h-24 w-24 bg-gray-200 ">
        <img
          className=" lg:h-44 lg:w-52 h-24 w-24"
          src={post.postImage}
          alt="poster"
        />
      </div>
    </div>
  );
}
