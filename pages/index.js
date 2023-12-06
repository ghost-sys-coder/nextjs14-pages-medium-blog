import react, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Categories, Hero, PopularPosts, RecentPost } from '@/components';
import { Loader } from 'lucide-react';
import { errorOptions, successOptions } from '@/constants';


export async function getStaticProps(){
  const response = await axios.get('http://localhost:3000/api/post');
  
  const category = await axios.get('http://localhost:3000/api/categories');

  const postDoc = await response.data;
  const categories = await category.data;

  return {
    props: { categories, postDoc }
  }
}


const inter = Inter({ subsets: ['latin'] });

export default function Home({ categories,postDoc }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/posts?page=${currentPage}`);
        console.log(response.data);
        setPosts(response.data)
        toast.success('Posts have been fetched!', successOptions)
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch posts!', errorOptions);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [currentPage]);


  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <Loader size={50} className='text-white font-bold' />
      </div>
    )
  }

  return (
    <main className={inter.className}>
      <Hero posts={postDoc} />
      <Categories categories={categories} />
      <div className="flex gap-10 justify-between">
        <RecentPost
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postCount={postDoc}
        />
        <PopularPosts />
      </div>
      <Toaster />
    </main>
  )
}

