import Image from "next/image";

export default function BlogCard() {
  return (
    <div className=" h-52 grid grid-cols-4 mb-10">
      <div className="p-2 col-span-3">
        <div id="title" className="text-xl font-bold ">Learning Next.js</div>
        <div id="author" className="flex flex-row items-center">
            <div className="text-gray-500 text-sm italic mr-10">By Mawuli Kwadzofio</div>
            <div className="h-5 w-5 rounded-full bg-gray-200">
                <Image src="/" alt="dp" height={5} width={5}/>
            </div>
        </div><br/>
        <div id="summary" className=" flex-wrap font-medium">
            Next.js gives you the best developer experience with all the features you need for production: hybrid static and server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.
        </div><br/>
        <div id="details" className="flex flex-row justify-around items-center text-sm text-gray-500">
            <div>Jan 7 2022 </div>
            <div>10 mins read </div>
            <div className="text-center rounded-3xl px-2 py-1 bg-purple-200">Next js</div>
        </div>
      </div>
      <div id="image" className="h-52 w-72 bg-gray-200">
          <Image src="/" alt="poster" height={60} width={72}/>
      </div>
    </div>
  );
}
