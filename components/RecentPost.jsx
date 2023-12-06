import React from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";

const RecentPost = ({ posts, currentPage, setCurrentPage, postCount }) => {

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1)
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h1 className="font-bold text-2xl text-dark-3 dark:text-light-2">
        Recent Posts
      </h1>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <Pagination
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentPage={currentPage}
        postCount={postCount}
      />
    </div>
  );
};

export default RecentPost;
