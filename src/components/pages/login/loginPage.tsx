import React, { useState } from "react";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";

const LoginPage: React.FC = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full h-full rounded-md shadow-lg">
      {/* Left Section (Image with text) */}
      <div
        className="hidden md:flex flex-col justify-between p-4 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3194523/pexels-photo-3194523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div>
          <p className="text-black">SMS Portal</p>
        </div>
        <div className="mt-auto">
          <p className="text-black">Powered By Techwing Solutions</p>
        </div>
      </div>

      {/* Right Section (Login or Registration Form) */}
      <div className="w-full h-full">
        {isLoginPage ? <LoginForm setIsLoginPage={setIsLoginPage} /> : <RegistrationForm setIsLoginPage={setIsLoginPage} />}
      </div>
    </div>
  );
};

export default LoginPage;
