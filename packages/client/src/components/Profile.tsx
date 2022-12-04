import React from "react";
import useSession from "../hooks/useSession";

const Profile = () => {
  const { user, isLoading } = useSession();
  if (isLoading) return <>loading</>;
  return <div>{user?.username}</div>;
};

export default Profile;
