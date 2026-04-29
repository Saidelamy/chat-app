import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function ProfileHeader() {
  const { logout } = useAuthStore();
  return (
    <>
      <div className="w-full p-5 flex justify-between items-center border-r-2">
        <div className="flex gap-10">
          {/* avatar */}
          <div>
            <button className="size-14 rounded-full overflow-hidden relative group">
              <img
                src={"/avatar.png"}
                alt="User image"
                className="size-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input type="file" accept="image/*" className="hidden" />
          </div>

          {/* username and status */}
          <div>
            <h2 className="text-gray-800 font-semibold">said magdy</h2>
            <p className="text-gray-600">Online</p>
          </div>
        </div>
        <div className="">
          <button onClick={logout}>
            <LogOut className="hover:text-gray-100 text-green-500" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;
