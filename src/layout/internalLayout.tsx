import { axios_post } from "../service/api.service";
import { useQuery } from "react-query";
import { LAYOUT } from "../const/methods.conts";
import { get } from "lodash";
import { Outlet, useNavigate } from "react-router-dom";
import { LAYOUT_TAGS } from "../const/tags.const";
import { StoreContext } from "../provider/contectProvider";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "../components/pages/home/Loader";
import Sidebar from "../components/pages/admin/partial/sidebar/Sidebar";
import NavBar from "../components/pages/admin/partial/navbar/NavBar";

const InternalLayout = () => {
  const { setValue } = useContext(StoreContext);
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: [LAYOUT_TAGS.USER],
    queryFn: () =>
      axios_post(LAYOUT.GET_USER_AUTH, { token: "your-token-here" })
        .then((res) => {
          if (get(res, "data.user.id")) {
            const userID: string = get(res, "data.user.id");
            if (userID === null || userID === undefined || userID === "Guest") {
              navigate("/login", { replace: true });
              window.location.reload();
              return;
            }
            setValue({ path: "user", data: get(res, "data.user", {}) });
          }
          return res.data;
        })
        .catch(() => {
          toast.error("Your session is expired, please login again");
          navigate("/login", { replace: true });
        }),
  });

  console.log(data);
  console.log(error);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed */}
      <Sidebar />
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <NavBar />
        <main className="p-4">
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-5">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default InternalLayout;
