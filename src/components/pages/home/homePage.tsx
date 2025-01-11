import React from "react";
import { PostList } from "./PostList";
import { Loader } from "./Loader";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className="mx-auto mt-4 w-full max-w-3xl flex-col space-y-16 px-4 lg:px-0">
      <Suspense fallback={<Loader />}>
        <PostList />
      </Suspense>
    </main>
  );
}
export const revalidate = 60;
