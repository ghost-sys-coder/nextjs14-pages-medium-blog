import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { errorOptions, successOptions } from '@/constants'


export async function getStaticPaths() {
  const { data } = await axios.get('http://localhost:3000/api/posts');

  const paths = await data.map((post) => ({
    params: { id: post._id.toString() }
  }));

  return {
    paths, fallback: false
  }
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`http://localhost:3000/api/posts/${params.id}`);
  const post = await response.data;

  return {
    props: {post}
  }
}

const Post = ({post}) => {
  const { query } = useRouter();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const { data: session, status } = useSession();


  const getComments = useCallback(async() => {
    try {
      const response = await axios.get(`/api/comments/${post._id}`);
      setComments(response.data)
    } catch (error) {
      console.log(error);
    }
  }, [post?._id])

  useEffect(() => {
    getComments();
  }, [getComments, post?._id])


  const handleAddComment = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data, status } = await axios.post('/api/comments', {
        comment: {
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
          text: value
        },
        postId: post._id
      });
      console.log({data})
      if (status === 200) {
        toast.success('Comment Added!', successOptions);
        setValue('')
      }
      getComments();
    } catch (error) {
      console.log(error);
      toast.error('Failed to add comment', errorOptions);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className='h-full flex justify-center items-center'>
        <Loader2 size={50} className='text-dark-3 dark:text-primary-500 font-bold' />
      </div>
    )
  }

  return (
    <div className='min-h-screen'>
      <div className="flex flex-row-reverse gap-4 h-[300px] justify-between">
        <div className="flex-1">
          <Image
            src={post.imageUrl}
            alt='post image'
            width={300}
            height={200}
            className='rounded-md shadow-md object-cover h-full w-full'
          />
        </div>
        <div className="flex-1 flex flex-col gap-8 items-start justify-center">
          <h1 className='text-dark-3 dark:text-light-2 font-bold text-2xl md:text-3xl'>{post.title}</h1>
          <div className='flex gap-2'>
            <Image
              src={post.creator?.image}
              alt='profile'
              width={50}
              height={50}
              className='rounded-full object-cover'
            />
            <div className='flexflex-col gap-1 items-start justify-center'>
              <p className='text-xl font-bold text-neutral-800 dark:text-light-2'>{post.creator?.name}</p>
              <span className='text-sm font-semibold text-neutral-800 dark:text-light-2'>{format(new Date(post.createdAt), 'yyyy-MM-dd')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='flex gap-4 justify-between my-10 min-h-full'>
        <div className='w-2/3'>
          <div
            className='text-dark-3 font-medium dark:text-light-2'
            dangerouslySetInnerHTML={{__html: post.description}}
          />
          <div className='my-6 flex flex-col gap-3'>
            <h1 className='font-medium text-dark-3 dark:text-neutral-600 text-3xl'>Comments</h1>

            {status === 'authenticated' ? (
              <form className='shadow-lg rounded-lg p-2 w-full'>
                <label className='font-bold text-dark-4 dark:text-neutral-700 text-xl block pb-3' htmlFor="comment">Add a Comment:</label>
                <textarea name="comment" id="comment"
                  placeholder='Add a comment...'
                  className='w-full min-h-[100px] outline-none border-none bg-gray-200 rounded-sm p-2 font-medium'
                  value={value}
                  onChange={(e)=> setValue(e.target.value)}
                />
                <button className='flex gap-2 items-center justify-center bg-dark-3 dark:bg-primary-500 rounded-md cursor-pointer text-white font-semibold py-2 px-4 text-xl max-sm:w-full mt-2 hover:bg-primary-600'
                  onClick={handleAddComment}
                >
                  {loading ? (
                    <>
                      <Loader2 size={25} />
                      <span>Adding Comment</span>
                    </>
                  ) : (
                      <span>Comment</span>
                  )}
                </button>
            </form>
            ) : (
                <Link className='font-bold text-dark-4 dark:text-neutral-700 underline' href={"/login"}>Login to write a comment!</Link>
            )}
            
            <div className='flex flex-col gap-6 mt-10 pl-4'>
            {(comments.map(({ comment, _id, createdAt }) => (
            <div key={_id}>
              <div className='flex gap-2 items-center'>
                  <Image
                    src={comment?.image}
                    alt='profile'
                    width={40}
                    height={40}
                    className='rounded-full object-cover'
                  />
                  <div className="flex flex-col gap-[1px] items-start justify-start">
                    <p className='font-medium text-sm text-dark-3 dark:text-light-2'>{comment?.name}</p>
                    <span className='font-medium text-[10px] text-dark-3 dark:text-light-2'>{format(new Date(createdAt), 'yyyy-MM-dd')}</span>
                  </div>
                </div>
                <div>
                  <p className='font-medium text-[15px] text-neutral-700 dark:text-light-2'>{comment?.text}</p>
                  <div className='mt-2 flex justify-start items-start gap-2'>
                    <FaEdit  size={20} className='cursor-pointer text-primary-500 font-medium hover:text-primary-600'/>
                    <FaTrash  size={20} className='cursor-pointer text-red font-medium'/>
                  </div>
                </div>
            </div>
          )))}
            </div>
          </div>

        </div>
        <div className='flex-1 bg-black'>
          
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Post