import BlogCard from '../components/blog_card'
import Header from '../components/header'
import TopicChip from '../components/topics_chip'

export default function Home() {
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div className=' grid grid-cols-3 h-screen w-screen overflow-hidden'>
        <div className='border-r-2 border-purple-400 col-span-1 overflow-scroll px-16 py-20 flex flex-col '>
          <p className='text-xl font-semibold pb-2'>Suggested topics</p><hr className='mb-4'/>
          <div className='flex flex-wrap'>
            <TopicChip topic={'flutter'}/>
            <TopicChip topic={'react'}/>
            <TopicChip topic={'web development'}/>
            <TopicChip topic={'dev ops'}/>
            <TopicChip topic={'artificial intelligence'}/>
            <TopicChip topic={'android'}/>
            <TopicChip topic={'laravel'}/>
            <TopicChip topic={'python'}/>
          </div>
        </div>
        <div className='overflow-scroll col-span-2 ml-20 mr-10 pt-10'>
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
