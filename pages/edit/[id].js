import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { ImageUpdate, UpdateDescription } from "@/components";
import { errorOptions, successOptions } from "@/constants";

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:3000/api/posts");

  const paths = await data.map((post) => ({
    params: { id: post._id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(
    `http://localhost:3000/api/posts/${params.id}`
  );
  const post = await response.data;

  return {
    props: { post },
  };
}

const EditPost = ({ post }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: post.title || "",
    description: post.description || "",
    imageUrl: post.imageUrl || "",
    tags: post.tags || "",
    category: post.category || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.put(`/api/posts/${post._id}`, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        imageUrl: formData.imageUrl,
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
            value={formData.title}
            onChange={handleChange}
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
            formData={formData}
            setFormData={setFormData}
            post={post}
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <UpdateDescription formData={formData} setFormData={setFormData} />
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
            value={formData.tags}
            onChange={handleChange}
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
