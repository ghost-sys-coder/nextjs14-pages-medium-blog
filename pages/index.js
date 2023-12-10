import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import axios from 'axios';
import useRouter from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { Categories, Hero, PopularPosts, RecentPost } from '@/components';
import { Loader } from 'lucide-react';
import { errorOptions, successOptions } from '@/constants';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/posts?page=${currentPage}`);
        setPosts(data.posts);
        setPostCount(data.postCount)
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
      <Hero posts={posts} />
      <Categories categories={categories} />
      <div className="flex gap-10 justify-between lg:flex-row flex-col">
        <RecentPost
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postCount={postCount}
        />
        <PopularPosts />
      </div>
      <Toaster />
    </main>
  )
}

