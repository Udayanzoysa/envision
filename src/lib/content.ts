import { axios_get } from "../service/api.service";
import { Post, Author } from "./type";

// export async function getGlobalData(): Promise<GlobalData> {
//   // Get global data
//   try {
//     const data: any = await Promise.resolve(
//       cosmic.objects
//         .findOne({
//           type: "globals",
//           slug: "header",
//         })
//         .props("metadata.site_title,metadata.site_tag")
//         .depth(1)
//     );
//     const siteData: GlobalData = data.object;
//     return Promise.resolve(siteData);
//   } catch (error) {
//     console.log("Oof", error);
//   }
//   return Promise.resolve({} as GlobalData);
// }

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await axios_get("/blog/posts", {
      type: "posts",
      props: "id,slug,title,content,created_at",
      depth: 1,
    });

    // Parse the response data to extract the posts
    const posts: Post[] = response.data.objects || [];
    return Promise.resolve(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return Promise.resolve([]);
  }
}

export async function getPost(slug: string): Promise<Post> {
  try {
    const response = await axios_get(`blog/post/${slug}`);
    return response.data;
  } catch (error) {
    console.log("Oof", error);
  }
  return Promise.resolve({} as Post);
}

// export async function getRelatedPosts(slug: string): Promise<Post[]> {
//   try {
//     // Get suggested posts
//     const data: any = await Promise.resolve(
//       cosmic.objects
//         .find({
//           type: "posts",
//           slug: {
//             $ne: slug,
//           },
//         })
//         .props(["id", "type", "slug", "title", "metadata", "created_at"])
//         .sort("random")
//         .depth(1)
//     );
//     const suggestedPosts: Post[] = await data.objects;
//     return Promise.resolve(suggestedPosts);
//   } catch (error) {
//     console.log("Oof", error);
//   }
//   return Promise.resolve([]);
// }

export async function getAuthor(authorId: string): Promise<Author> {
  try {
    const response = await axios_get("/blog/posts", {
      type: "posts",
      props: "id,full_name,first_name,last_name,created_at",
      depth: 1,
      filters: {
        id: authorId, // Pass the author ID as a filter
      },
    });

    // Parse the response data to extract the author
    const posts: Author[] = response.data.objects || [];
    if (posts.length > 0) {
      return posts[0]; // Return the matching author
    }

    throw new Error(`Author with ID ${authorId} not found`); // Error if no author found
  } catch (error) {
    console.error("Error fetching author:", error);
    throw new Error("Failed to fetch author"); // Re-throw the error
  }
}

export async function getAuthorPosts(id: string): Promise<Post[]> {
  try {
    const response = await axios_get("/blog/posts", {
      type: "posts",
      filters: { authorId: id },
      props: ["id", "type", "slug", "title", "metadata", "created_at"],
      sort: "random",
      depth: 1,
    });

    const authorPosts: Post[] = response.data.objects || [];
    return authorPosts;
  } catch (error) {
    console.error("Error fetching author posts:", error);
    return [];
  }
}
