import React, { useEffect, useState } from "react";
import ArrowLeft from "../../common/logo/ArrowLeft";
import { getPost } from "../../../lib/content";
import Tag from "./Tag";
import AuthorAvatar from "./AuthorAvatar";
import AuthorAttribution from "./AuthorAttribution";
import DOMPurify from "isomorphic-dompurify";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../../lib/type";

export function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const fetchedPost = await getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          console.log("No post found or empty response");
        }
      }
    };

    fetchPost();
  }, [slug]);
  return (
    <>
      {post && post.metadata.hero?.imgix_url && (
        <img
          width={1400}
          height={720}
          className="mb-5 h-[720px] w-full bg-no-repeat object-cover object-center"
          src={`${post.metadata.hero?.imgix_url}?w=1400&auto=format,compression`}
          alt={post.title}
        />
      )}
      <main className="mx-auto flex flex-col justify-center">
        <div className="mx-auto flex w-full flex-col items-start justify-center px-4 md:flex-row">
          <div className="mt-4 flex justify-start pb-4 md:justify-center md:pb-0 md:pr-20">
            <Link
              to="/"
              className="rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="mr-20 flex w-full max-w-3xl flex-col justify-start md:w-3/4">
            <h2>
              {!post && <div className="text-center">Post Not found</div>}
              {post && <Link to={`/posts/${post.slug}`}>{post.title}</Link>}
            </h2>
            {post && (
              <>
                <div className="flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
                  <div className="flex items-center space-x-2 text-zinc-500 md:space-y-0 dark:text-zinc-400">
                    <AuthorAvatar post={post} />
                    <AuthorAttribution post={post} />
                  </div>
                  <div className="flex select-none justify-start space-x-2 md:justify-end">
                    {post.metadata.categories &&
                      post.metadata.categories.map((category) => <Tag key={category.title}>{category.title}</Tag>)}
                  </div>
                </div>
                <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
                <div
                  className="text-zinc-700 dark:text-zinc-300"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.metadata.content) ?? "",
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
export const revalidate = 60;
