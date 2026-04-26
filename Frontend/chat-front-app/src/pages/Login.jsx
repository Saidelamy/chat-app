import { yupResolver } from "@hookform/resolvers/yup";
import { LoaderIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
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
  } = useForm(yupResolver(schema));

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      <div>
        {/* right */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="auth-input-label" htmlFor="">
                Email
              </label>
              <div>
                <UserIcon className="auth-input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
              </div>

              <p className="text-red-600"> {errors?.email?.message}</p>
            </div>
            <div>
              <label className="auth-input-label" htmlFor="">
                Password
              </label>

              <div>
                <UserIcon className="auth-input-icon" />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your email"
                  {...register("password", { required: true })}
                />
              </div>

              <p className="text-red-600"> {errors?.password?.message}</p>
            </div>
            <div>
              <button className="auth-btn" type="submit" disabled={isLogin}>
                {isLogin ? (
                  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
        {/* left */}
        <div>
          <img src="/login.gif" alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
