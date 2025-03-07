import BreakSection from "@/app/components/BreakSection";
import { EditProfile } from "@/app/components/Pages/DASHBOARD/user/_rsc_pages/settings/EditProfile";
import { authApi } from "@/lib/axiosInstance";
import { UserNotFound } from "@/app/components/Pages/DASHBOARD/UserNotFound";

async function getUser() {
  try {
    const response = await authApi.get("/api/profile");
    
    return { user: response.data.user || null, error: null };

  } catch (error) {
    console.log("Error fetching user:", error);
    return { user: null, error: "Failed to load profile. Please try again." };
  }
}

const ProfilePage = async () => {
  const { user } = await getUser();  

  return (
    <div className="w-full">
      <h2 className="font-bold text-lg">Profile</h2>
      <p className="text-base text-[#71717A] my-2">
        This is how others will see you on the site.
      </p>
      <BreakSection marginTop="my-4" />

      {user !== null && user !== undefined ? (
        <EditProfile user={user} />
      ) : (
        <UserNotFound />
      )}
    </div>
  );
};

export default ProfilePage;
