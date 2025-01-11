import { Link } from "react-router-dom";

export default function SiteLogo(): JSX.Element {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0">
      <h1 className="flex space-x-2">
        <Link
          to="/"
          className="bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-4xl font-bold tracking-tighter text-transparent dark:from-cyan-300 dark:to-teal-200"
        >
          Envision
        </Link>
      </h1>
      <span className="relative hidden text-lg tracking-wide text-zinc-500 dark:text-zinc-200 md:flex">Welcome to envision</span>
    </div>
  );
}
