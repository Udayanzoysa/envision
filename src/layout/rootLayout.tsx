import { Outlet } from "react-router-dom";
import HomeNavBar from "../components/navbar/homeNavBar";
import HomeFooter from "../components/footer/homeFooter";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <>
      <div className="bg-white dark:bg-zinc-950">
        <HomeNavBar />
        <Outlet />
        <HomeFooter />
      </div>
      <ToastContainer />
    </>
  );
};

export default RootLayout;
