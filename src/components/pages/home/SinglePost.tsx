import ArrowLeft from "../../common/logo/ArrowLeft";
import { getPost } from "../../../lib/content";
import Tag from "./Tag";
import AuthorAvatar from "./AuthorAvatar";
import AuthorAttribution from "./AuthorAttribution";
import DOMPurify from "isomorphic-dompurify";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../../lib/type";
import FormTextArea from "../../common/form-components/FormTextArea";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { axios_post } from "../../../service/api.service";
import { getErrorMessage } from "../../../utils";
import { toast } from "react-toastify";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<any[]>([]); // Changed to local state

  const { isLoading, data } = useQuery({
    queryKey: ["Comment"],
    queryFn: () => axios_post("/blog/comment/all", { slug: slug }),
    onSuccess: (data) => {
      const commentsData = Array.isArray(data?.data?.comments) ? data.data.comments : [];
      setComments(commentsData); // Set comments data on initial load
    },
  });

  const mutation = useMutation(
    (data) => {
      return axios_post("blog/comment/add", data);
    },
    {
      onSuccess: (data: any) => {
        toast.success("Comment added !");
        const comment = get(data, "data.comment");
        setComments((prevComments) => [
          ...prevComments,
          {
            id: comment.id,
            content: comment.content,
            author: {
              name: "You",
            },
            createdAt: new Date().toISOString(),
          },
        ]);
        formik.resetForm();
      },
      onError: (error: any) => {
        const message = getErrorMessage(error);
        console.log(message || "An error occurred");
      },
    }
  );

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

  const formik = useFormik({
    initialValues: { slug: "", comment: "" },
    onSubmit: (values: any) => {
      values.slug = slug;
      mutation.mutate(values);
    },
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

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

                {/* Comments Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">Comments</h3>
                  {comments.length === 0 && <p className="text-zinc-500 dark:text-zinc-400">No comments yet. Be the first to comment!</p>}
                  <ul className="mt-4 space-y-4">
                    {comments.map((comment) => (
                      <li
                        key={comment.id}
                        className="border-b border-zinc-300 pb-4 dark:border-zinc-700"
                      >
                        <p className="text-zinc-700 dark:text-zinc-300">{comment.content}</p>
                        <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                          By {comment.author.name} on {new Date(comment.createdAt).toLocaleDateString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add Comment Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300">Add a Comment</h3>
                  <FormTextArea
                    label=""
                    className="mt-4 w-full rounded-md border border-zinc-300 p-2 text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                    name="comment"
                    formik={formik}
                    placeholder="Write your comment here..."
                    rows={4}
                  />
                  <button
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
export const revalidate = 60;
