import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  const handleNavigate = (path: any) => {
    navigate(path);
  };
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl">Welcome envision blog editor</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                className="mx-4"
                onClick={() => handleNavigate("/")}
              >
                View Site
              </button>{" "}
              <button
                className="hover:text-gray-400"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
