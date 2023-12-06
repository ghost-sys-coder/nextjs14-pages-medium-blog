import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";

const PostCard = ({ post }) => {
  const { data } = useSession();


  return (
    <div className="flex gap-4 mt-4">
      <Image
        src={post?.imageUrl}
        alt={post?.title}
        width={250}
        height={250}
        className="rounded-md object-cover"
      />
      <div className="flex flex-col justify-center items-start gap-2 py-6">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-neutral-400 font-medium dark:text-light-3">
            {format(new Date(post?.createdAt), "yyyy-MM-dd")}
          </p>
          <div className="bg-red h-[2px] w-[2px] rounded-full"></div>
          <span className="text-red font-semibold">{post?.category}</span>
          <div className="bg-red h-[2px] w-[2px] rounded-full"></div>
          {post?.creator?.email === data?.user?.email && (
            <Link className="font-semibold text-dark-3 dark:text-light-2" href={`/edit/${post?._id}`}>
              <FaEdit size={30} />
            </Link>
          )}
        </div>
        <h1 className="font-semibold text-xl text-dark-3 dark:text-light-2 pb-2">
          {post?.title}
        </h1>
        <div
          className="text-neutral-500 font-medium dark:text-light-2"
          dangerouslySetInnerHTML={{ __html: post?.description.slice(0, 250) }}
        />
        <Link
          className="mt-2 shadow-md rounded-md bg-light-2 text-dark-2 dark:bg-light-2 py-1 px-2 font-medium"
          href={"/posts/" + post?._id}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
