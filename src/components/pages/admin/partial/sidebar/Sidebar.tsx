import { ArrowRightIcon, ArrowLeftIcon, HomeIcon, CogIcon, UserIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import SidebarItem from "./components/SidebarItem";
import { Link, useNavigate } from "react-router-dom";

// This sidebar component is for both mobile and desktop
function Sidebar({ children, expanded, setExpanded }: any) {
  return (
    <div className={`h-full sticky top-0 transition-all duration-300 ${expanded ? "sm:w-64" : "lg:w-20"} sm:transition-none`}>
      <div className="relative">
        {/*
        This div is used to create the background overlay when the sidebar is expanded
        It is only visible on mobile screens
      */}
        <div className={`fixed inset-0 -z-10 block bg-gray-400  ${expanded ? "block sm:hidden" : "hidden"}`} />
        <aside className={`box-border h-screen transition-all ${expanded ? "w-5/6 sm:w-64" : "w-0 sm:w-20"}`}>
          <nav className="flex h-full flex-col border-r bg-white shadow-sm">
            <div className="flex items-center justify-between p-4 pb-2">
              <h1
                className={`flex items-center space-x-4 bg-white p-4 transition-all duration-500 ease-in-out ${
                  expanded ? "w-full opacity-100" : "w-0 opacity-0 overflow-hidden hidden"
                }`}
              >
                <Link
                  to="/"
                  className="bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent dark:from-cyan-300 dark:to-teal-200"
                >
                  Envision
                </Link>
              </h1>
              <div className={`${expanded ? "" : "hidden sm:block"}`}>
                <button
                  onClick={() => setExpanded((curr: boolean) => !curr)}
                  className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
                >
                  {expanded ? <ArrowRightIcon className="h-6 w-6" /> : <ArrowLeftIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
            <ul className="flex-1 px-3">{children}</ul>
            <div className="flex border-t p-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
                alt=""
                className="h-10 w-10 rounded-md"
              />
              <div
                className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
          `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">Mark Ruffalo</h4>
                  <span className="text-xs text-gray-600">mark@gmail.com</span>
                </div>
                <EllipsisVerticalIcon className="h-6 w-6" />
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default function MakeSidebar() {
  const [expanded, setExpanded] = useState(true);
  const navBarItems = [
    {
      icon: <HomeIcon />,
      text: "Home",
      active: true,
      link: "/blog",
    },
    {
      icon: <UserIcon />,
      subMenu: [
        {
          icon: <UserIcon />,
          text: "New Article",
          link: "/blog/create",
        },
        {
          icon: <UserIcon />,
          text: "Article Lists",
          link: "/blog/list",
        },
      ],
      text: "My Blogs",
    },
  ];

  // Desktop Sidebar
  return (
    <Sidebar
      expanded={expanded}
      setExpanded={setExpanded}
    >
      {navBarItems.map((item, index) => (
        <SidebarItem
          key={index}
          expanded={expanded}
          {...item}
        />
      ))}
    </Sidebar>
  );
}
