import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const PopularPosts = () => {
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const { data } = await axios.get("/api/popular");
        setPopular(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopularPosts();
  }, []);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, [])


  return (
    <div className="flex-1 flex flex-col gap-3 p-2">
      <span className="text-left text-neutral-700 font-semibold">
        {"What's hot"}
      </span>
      <h1 className="text-dark-3 dark:text-light-2 font-bold text-2xl">
        Most Popular
      </h1>
      <div className="flex flex-col gap-4">
        {popular?.map((post) => (
          <div
            key={post._id}
            className="flex flex-col gap-1 justify-center items-start"
          >
            <p className="text-[10px] font-medium text-white rounded-lg bg-teal-500 py-[5px] px-1">
              {post?.category}
            </p>
            <Link
              href={`/posts/${post?._id}`}
              className="flex gap-[2px] flex-col"
            >
              <span className="text-sm font-semibold text-dark-3 dark:text-light-2">
                {post?.title}
              </span>
              <div
                className="text-[10px] text-dark-3 dark:text-light-2 font-semibold"
                dangerouslySetInnerHTML={{
                  __html: post?.description.slice(0, 100),
                }}
              />
            </Link>
            <div className="flex gap-2 items-center justify-start">
              <p className="text-dark-3 dark:text-light-3 font-medium text-sm">
                {post?.creator?.name}
              </p>
              <span className="text-dark-3 dark:text-neutral-600 text-[10px] font-medium ">
                {post?.createdAt.split("T")[0]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <span className="text-sm font-medium text-dark-3 dark:text-neutral-600 pb-1">
          Discover by topic
        </span>
        <h1 className="text-xl font-bold text-dark-3 dark:text-light-2 pb-2">
          Categories
        </h1>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Link
              className="text-white bg-primary-600 rounded-md px-2 py-1 text-sm shadow-md flex items-center justify-center min-w-[100px]"
              key={category?._id}
              href={`/categories/${category?.title}`}
            >
              {category?.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium text-dark-3 dark:text-neutral-600 pb-1">
          Chosen by the Editor
        </span>
        <h1 className="text-xl font-bold text-dark-3 dark:text-light-2 pb-2">
          {"Editor's Pick"}
        </h1>
        <div className="flex flex-col gap-3">
          {popular.map((post) => (
            <div key={post._id} className="flex gap-2 justify-start items-center">
              <Image
                src={post?.imageUrl}
                alt="post"
                width={50}
                height={50}
                className="rounded-full object-cover border-white border-[2px] shadow-md"
              />
              <div>
              <p className="text-[10px] font-medium text-white rounded-lg bg-teal-500 py-[5px] px-3 inline-block">
                {post?.category}
              </p>
              <Link
                href={`/posts/${post?._id}`}
                className="flex gap-[5px] flex-col"
              >
                <span className="text-[10px] font-semibold text-dark-3 dark:text-light-2 font-bold">
                  {post?.title}
                </span>
                <div
                  className="text-[10px] text-dark-3 dark:text-light-2 font-bold"
                  dangerouslySetInnerHTML={{
                    __html: post?.description.slice(0, 100),
                  }}
                />
              </Link>
              <div className="flex gap-2 items-center justify-start mt-1">
                <p className="text-dark-3 dark:text-light-3 font-medium text-[10px] font-medium">
                  {post?.creator?.name}
                </p>
                <span className="text-dark-3 dark:text-neutral-600 text-[10px] font-medium ">
                  {post?.createdAt.split("T")[0]}
                </span>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPosts;
