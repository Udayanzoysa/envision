import { useRoutes } from "react-router-dom";
import _ from "lodash";
import RootLayout from "../layout/rootLayout";
import HomePage from "../components/pages/home/homePage";
import { SinglePost } from "../components/pages/home/SinglePost";
import ExternalLayout from "../layout/externalLayout";
import LoginPage from "../components/pages/login/loginPage";
import InternalLayout from "../layout/internalLayout";
import AdminHomePage from "../components/pages/admin/homePage";
import BlogListPage from "../components/pages/admin/BlogListPage";
import NewArticel from "../components/pages/admin/NewArticel";
import BlogViewPage from "../components/pages/admin/BlogViewPage";

const RouterConfigs = () => {
  // const user = useSelector((state: any) => _.get(state, 'common.user'))

  const element = useRoutes([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/posts/:slug",
          element: <SinglePost />,
        },
      ],
    },
    {
      path: "/login",
      element: <ExternalLayout />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
      ],
    },
    {
      path: "/blog",
      element: <InternalLayout />,
      children: [
        {
          index: true,
          element: <AdminHomePage />,
        },
        {
          path: "list",
          element: <BlogListPage />,
        },
        {
          path: "create",
          element: <NewArticel />,
        },
        {
          path: "view/:id",
          element: <BlogViewPage />,
        },
      ],
    },
  ]);

  return element;
};
export default RouterConfigs;
