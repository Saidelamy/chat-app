import { LogOut } from "lucide-react";
import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ProfileHeader() {
  const { logout, authUser, updateImageProfile } = useAuthStore();

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profilePicture", file);

    await updateImageProfile(formData);
  };

  console.log(authUser);
  return (
    <>
      <div className="w-full p-5 flex justify-between items-center border-r-2">
        <div className="flex gap-10">
          {/* avatar */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={
                  selectedImage ||
                  authUser?.profilePicture ||
                  "/avatar.png"
                }
                alt="User image"
                className="size-full object-cover "
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* username and status */}
          <div>
            <h2 className="text-slate-800 font-medium text-base max-w-[180px]">
              {authUser.fullName}
            </h2>
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
