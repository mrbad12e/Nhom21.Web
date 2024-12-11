
import React, { useState } from "react";
import LoginForm from "@/pages/client/Login/LoginForm";
import RegisterForm from "@/pages/client/Login/RegisterForm";
import ForgotPassword from "@/pages/client/Login/ForgotPassword";
import LoginSVG from "@/assets/images/LoginPage/Login.png";

export default function Login() {
  const [currentForm, setCurrentForm] = useState("login");

  const switchToRegister = () => setCurrentForm("register");

  const switchToLogin = () => setCurrentForm("login");

  const switchToForgotPassword = () => setCurrentForm("forgotPassword");

  return (
    <div className="flex w-full bg-gradient-to-r from-orange-100 to-orange-300 h-screen px-20 py-20">
      <div className="w-full flex items-center">
        {currentForm === "login" && (
          <LoginForm
            switchToRegister={switchToRegister}
            switchToForgotPassword={switchToForgotPassword}
            className="w-full max-w-5xl mr-4"
          />
        )}

        {currentForm === "register" && (
          <RegisterForm onSwitchToSignIn={switchToLogin} />
        )}

        {currentForm === "forgotPassword" && (
          <ForgotPassword onSwitchToSignIn={switchToLogin} />
        )}

        <div className="w-1/2 hidden lg:block">
          <img src={LoginSVG} alt="Login Illustration" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
