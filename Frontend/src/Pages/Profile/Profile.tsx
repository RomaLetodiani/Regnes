import CurrentUser from "@/Components/CurrentUser";
import GlobalStore from "@/Stores/GlobalStore";

const Profile = () => {
  const { globalSignInCount, personalSignInCount } = GlobalStore();
  return (
    <div>
      <CurrentUser />

      <div>
        <p>Global Sign In Counts: {globalSignInCount}</p>
        <p>Personal Sign In Counts: {personalSignInCount}</p>
      </div>
    </div>
  );
};

export default Profile;
