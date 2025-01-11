export interface GlobalData {
  metadata: {
    site_title: string;
    site_tag: string;
  };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  metadata: {
    published_date: string;
    content: string;
    hero?: {
      imgix_url?: string;
    };
    author?: {
      id: string;
      slug?: string;
      title?: string;
      metadata: {
        image?: {
          imgix_url?: string;
        };
      };
    };
    teaser: string;
    categories: {
      title: string;
    }[];
  };
}

export interface Author {
  id: string;
  slug: string;
  title: string;
  metadata: {
    image?: {
      imgix_url?: string;
    };
  };
}

// export interface GlobalData {
//   metadata: {
//     site_title: string;
//     site_tag: string;
//   };
// }

// export interface Post {
//   id: number;
//   title: string;
//   content: string;
//   slug?: string;
//   cover_img?: string;
//   tags?: string;
//   category: string;
//   comments: number;
//   status: "published" | "draft" | "archived";
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Author {
//   id: string;
//   full_name: string;
//   first_name: string;
//   last_name: string;
//   status: "active" | "inactive";
// }
