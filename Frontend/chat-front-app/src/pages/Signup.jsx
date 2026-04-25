import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as yup from "yup";
import { useAuthStore } from "../store/useAuthStore";

const schema = yup.object({
  fullName: yup
    .string()
    .required("Full Name is required.")
    .min(3, "FullName must be at least 3 chars"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 chars")
    .required("Password is required"),
});

function Signup() {
  const { signUp, isSigningUp } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    signUp(data);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center p-4  bg-white">
        <div className="relative w-full max-w-6xl  md:h-[800px] h-[650px]">
          <div className="w-full flex  flex-col md:flex-row">
            {/* left side */}
            <div className="md:w-1/2 p-8 md:border-r border-slate-600/30 ">
              {/* message heading */}
              <div className="text-center max-w-md">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-green-400 mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Create Account
                </h2>
                <p className="text-green-700">Sign up for a new account</p>
              </div>

              {/* Form */}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* FULL NAME */}
                <div>
                  <label className="auth-input-label">Full Name</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />

                    <input
                      type="text"
                      className="input"
                      placeholder="example: said elamy"
                      {...register("fullName", { required: true })}
                    />
                  </div>

                  <p className="text-red-400 mt-3">
                    {errors?.fullName?.message}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="auth-input-label">Email</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />

                    <input
                      type="text"
                      className="input"
                      placeholder="example: example@gmail.com"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <p className="text-red-400 mt-3">{errors?.email?.message}</p>
                </div>

                {/* password */}
                <div>
                  <label className="auth-input-label">Password</label>
                  <div className="relative">
                    <UserIcon className="auth-input-icon" />

                    <input
                      type="text"
                      className="input"
                      placeholder="********"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <p className="text-red-400 mt-3">
                    {errors?.password?.message}
                  </p>
                </div>

                {/* submit button */}

                <button
                  className="auth-btn"
                  type="submit"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    " Create Acount"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to={"/login"} className="auth-link">
                  Already have acount
                </Link>
              </div>
            </div>

            {/* right side */}

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-500/20 to-transparent">
              <img src="/Signup.gif" alt="sign up ILLUSTRATION image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
