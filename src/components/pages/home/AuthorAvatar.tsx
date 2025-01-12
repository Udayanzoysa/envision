import { Post } from "../../../lib/type";

export default function AuthorAvatar({ post }: { post: Post }): JSX.Element {
  return (
    <img
      className="h-8 w-8 rounded-full"
      src={`${post.metadata.author?.metadata.image}?w=100&auto=format,compression`}
      alt={post.title}
    />
  );
}
