"use client";

import { useEffect, useState } from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import { useUser } from "@clerk/nextjs"; // Using Clerk's useUser hook for client-side user fetching

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isNext, setIsNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user} = useUser(); // Client-side method to fetch user data
  const [page, setPage] = useState(1); // State to manage pagination

  useEffect(() => {
    const fetchPostsData = async () => {
      try {
        const response = await fetch(`/api/thread?pageNumber=${page}&pageSize=20`);

        // Check if the response is OK (status code 200)
        if (response.ok) {
          const data = await response.json();

          console.log(data) ;

          if (data?.posts) {
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
            setIsNext(data.isNext);
          }
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsData();
  }, [page]); // Re-fetch posts whenever the page changes

  const loadMorePosts = () => {
    if (isNext) {
      setPage((prevPage) => prevPage + 1); // Load next page of posts
    }
  };
  console.log("Post = " ,posts);
  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div>
      <h1 className="head-text text-center text-4xl font-bold mb-8">Posts</h1>
      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="no-result text-center text-xl text-gray-500">No thread found</p>
        ) : (
          <>
            {posts.map((post ,index) => (
              <ThreadCard
                key={index}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
        {isNext && !loading && (
          <button
            onClick={loadMorePosts}
            className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            Load More
          </button>
        )}
      </section>
    </div>
  );
}
