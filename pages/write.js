import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { Description, DropDown, ImageUpload } from "@/components";
import { errorOptions, successOptions } from "@/constants";



export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/categories');

  const categories = await response.json();
  return {
    props: { categories }
  }
}

export default function Write({ categories }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((values) => ({ ...values, [name]: value }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.post("/api/posts", {
        title: details.title,
        description: details.description,
        category: details.category,
        tags: details.tags,
        imageUrl: details.imageUrl,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log({ data });
      toast.success("Your post has been created!", successOptions);
      setTimeout(() => {
        if (status === 200) {
          router.push("/");
        }
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", errorOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="title">Create a new post</h1>
      <form className="max-w-[1200px] shadow-md rounded-md p-4 flex flex-col gap-4">
        <div className="">
          <label
            className="block text-neutral-700 font-semibold text-xl pb-2 dark:text-neutral-300"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="block w-full h-[45px] outline-none border-none pl-2 font-semibold focus:bg-primary-500 focus:text-white shadow-lg rounded-md"
            type="text"
            id="title"
            name="title"
            placeholder="Post title..."
            value={details.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            className="block text-neutral-700 font-semibold text-xl pb-2 dark:text-neutral-300"
            htmlFor="category"
          >
            Category:
          </label>
          <DropDown
            setDetails={setDetails}
            categories={categories}
          />
        </div>
        <div className="shadow-md rounded-md w-full mt-4">
          <label
            className="block text-neutral-700 dark:text-neutral-300 font-semibold text-xl pb-4"
            htmlFor="image"
          >
            Upload Image
          </label>

          <ImageUpload setDetails={setDetails} />
        </div>
        <div className="shadow-md rounded-md">
          <label
            className="block text-neutral-700 dark:text-neutral-300 font-semibold text-xl pb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <Description setDetails={setDetails} />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="block text-neutral-700 font-semibold text-xl pb-2 dark:text-neutral-300"
            htmlFor="tags"
          >
            Tags:
          </label>
          <span className="text-dark-3 dark:text-light-2 font-mono">
            Add comma separated tags for your post
          </span>
          <input
            className="block w-full h-[45px] outline-none border-none pl-2 font-semibold focus:bg-primary-500 focus:text-white shadow-lg rounded-md"
            type="text"
            id="tags"
            name="tags"
            placeholder="Add tags.... travel, culture, books"
            value={details.tags}
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <button
            onClick={handlePublish}
            className="px-4 py-2 rounded-md bg-primary-500 text-white text-xl cursor-pointer w-full flex gap-2 items-center justify-center"
          >
            {loading ? (
              <>
                <Loader />
                <span>Publishing...</span>
              </>
            ) : (
              <span>Publish</span>
            )}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}


