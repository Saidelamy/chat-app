import { MessageCircleIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";

function Signup() {
  // const { setData, setSetData } = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const { signUp, isSigningUp } = useAuthStore();
  return (
    <>
      <div className="w-full flex items-center justify-center p-4 bg-slate-800">
        <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
          <div className="w-full flex flex-col md:flex-row">
            {/* left side */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30 ">
              {/* message heading */}
              <div className="text-center max-w-md">
                <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">
                  Create Account
                </h2>
                <p className="text-slate-400">Sign up for a new account</p>
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
                </div>

                {/* submit button */}

                <button className="auth-btn" type="submit">
                  Create Acount
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
