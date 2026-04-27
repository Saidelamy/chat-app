import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import { useAuthStore } from "../store/useAuthStore";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 chars")
    .required("Password is required"),
});

const Login = () => {
  const { isLogin, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-4  bg-white">
        <div className="relative w-full max-w-6xl  md:h-[800px] h-[650px]">
          <div className="flex w-full flex-col md:flex-row ">
            {/* left */}
            <div className="md:w-1/2 p-8 md:border-r border-slate-600/30 ">
              <div className="text-center mb-8">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-green-400 mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Welcome Back
                </h2>
                <p className="text-green-400">
                  Login to access to your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* email */}
                <div>
                  <label className="auth-input-label" htmlFor="">
                    Email
                  </label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      className="input"
                      type="text"
                      placeholder="Enter your email"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <p className="text-red-400 mt-3"> {errors?.email?.message}</p>
                </div>
                {/* password */}
                <div>
                  <label className="auth-input-label" htmlFor="">
                    Password
                  </label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", { required: true })}
                    />
                  </div>

                  <p className="text-red-400 mt-3">
                    {errors?.password?.message}
                  </p>
                </div>
                {/* button */}

                <button className="auth-btn" type="submit" disabled={isLogin}>
                  {isLogin ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/signup" className="auth-link">
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>

            {/* right */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-500/20 to-transparent">
              <img src="/login.gif" alt="login ILLUSTRATION image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
