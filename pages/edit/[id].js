import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { ImageUpdate, UpdateDescription } from "@/components";
import { errorOptions, successOptions } from "@/constants";


const EditPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('')
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`/api/posts/${router.query.id}`);
        setPostId(data?._id);
        setTitle(data?.title);
        setDescription(data?.description);
        setImageUrl(data?.imageUrl);
        setTags(data?.tags);
        setCategory(data?.category)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [router.query.id])
  

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.put(`/api/posts/${postId}`, {
        title,
        description,
        category,
        tags,
        imageUrl
      });
      console.log(data);
      toast.success("Your post has been updated!", successOptions);
      toast.success("Update successful", successOptions);
      setTimeout(() => {
        if (status === 200) {
          router.push("/");
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Update failed", errorOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit--page">
      <h1 className="text-3xl font-bold text-dark-3 dark:text-light-2 text-left py-2 text-center">
        Edit Page
      </h1>
      <form>
        <div className="input-container">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Post title...."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="my-8">
          <label
            className="block text-dark-3 dark:text-light-2 pb-2 font-semibold text-xl"
            htmlFor="image"
          >
            Image:
          </label>
          <ImageUpdate
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            postId={postId}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <UpdateDescription
            setDescription={setDescription}
            description={description}
          />
        </div>
        <div className="input-container">
          <label htmlFor="tags">Tags:</label>
          <span className="text-dark-3 dark:text-light-2 font-mono">
            Add comma separated tags for your post
          </span>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Add tags..."
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>
        <div className="input-container">
          <button
            onClick={handlePublish}
            className="px-4 py-2 rounded-md bg-primary-500 text-white text-xl cursor-pointer w-full flex gap-2 items-center justify-center"
          >
            {loading ? (
              <>
                <Loader />
                <span>Updating...</span>
              </>
            ) : (
              <span>Update Post</span>
            )}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default EditPost;
