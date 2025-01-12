import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { axios_get } from "../../../service/api.service";
import { Loader } from "./Loader";

interface Post {
  id: string;
  title: string;
  slug: string;
  teaser: string;
  cover_img: string;
  category: string;
  createdAt: string;
  UserId: string;
}

export function PostList({ authorSlug }: { authorSlug?: string }) {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const author = "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Call the API to fetch posts (you can adjust the URL if needed)
        const response = await axios_get("blog/post/all", { authorSlug });
        const fetchedPosts = Array.isArray(response.data.posts) ? response.data.posts : [];
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Call the fetchPosts function when the component mounts
  }, [authorSlug]); // Re-fetch posts if authorSlug changes

  if (loading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {author && (
        <h1 className="my-4 text-4xl font-bold leading-tight tracking-tight text-zinc-700 dark:text-zinc-300">Posts by {author}</h1>
      )}
      {posts && posts.length === 0 && (
        <div className="w-full h-[80vh] my-4 text-xl text-center text-zinc-500 dark:text-zinc-300 flex justify-center items-center">
          No posts available.
        </div>
      )}
      {posts &&
        posts.length > 0 &&
        posts.map((post: any) => {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        })}
    </>
  );
}
