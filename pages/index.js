import BlogCard from '../components/blog_card'
import Header from '../components/header'
import PersonCard from '../components/person_card'
import TopicChip from '../components/topics_chip'
import Head from "next/head";


export default function Home() {
  return (
    <div className='h-screen overflow-hidden'>
      <Head>
        <title>BLOGGERSPACE | HOME</title>
      </Head>
      <Header />
      <div className=' grid grid-cols-3 h-screen w-screen overflow-hidden'>
        <div className='border-r-2 border-purple-400 col-span-1 overflow-scroll px-16 py-20 flex flex-col '>
          <p className='text-xl font-semibold pb-2'>Suggested topics</p><hr className='mb-4'/>
          <div className='flex flex-wrap mb-8'>
            <TopicChip topic={'flutter'}/>
            <TopicChip topic={'react'}/>
            <TopicChip topic={'web development'}/>
            <TopicChip topic={'dev ops'}/>
            <TopicChip topic={'artificial intelligence'}/>
            <TopicChip topic={'android'}/>
            <TopicChip topic={'laravel'}/>
            <TopicChip topic={'python'}/>
          </div>
          <div>
          <p className='text-xl font-semibold pb-2'>Who to follow</p><hr className='mb-4'/>
          <div className='flex flex-col mb-8'>
            <PersonCard />
            <PersonCard />
            <PersonCard />
            <PersonCard />
          </div>
          </div>
        </div>
        <div className='overflow-scroll col-span-2 px-10 pb-20 pt-10'>
          <h2 className='text-3xl font-medium '>Recommended Posts For You</h2><hr className='w-82 mb-10'/>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
     )
}
