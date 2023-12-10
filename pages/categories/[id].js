import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
import axios from 'axios';
import { Loader } from 'lucide-react';
import { RecentPost, PopularPosts } from "@/components";


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700']
})

const Category = () => {
    const { query } = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postCount, setPostCount] = useState(0)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/categories/${query.id}?page=${currentPage}`);
                setPosts(data?.posts);
                setPostCount(data?.postCount)
                ;
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage, query.id])


    // If post data is still loading
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loader size={60} className="font-bold text-dark-4 dark:text-light-4" />
            </div>
        )
    }

    return (
        <div className={`min-h-screen ${poppins.className}`}>
            <div className="bg-primary-500 flex justify-center items-center my-5">
                <h1 className="text-xl font-bold py-1 px-2 text-white">{query.id} Blog</h1>
            </div>
                <div className="flex gap-10 justify-between lg:flex-row flex-col">
                    <RecentPost
                        posts={posts} 
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        postCount={postCount}
                    />
                    <PopularPosts />
                </div>
      </div>
  );
};

export default Category;
