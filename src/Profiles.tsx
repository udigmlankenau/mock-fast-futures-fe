import { useQuery } from "@apollo/client";

import { GET_PROFILES } from "./graphql/queries";
import Profile from "./Profile";
import "./Profiles.css";

const Profiles = () => {
  const { loading, error, data } = useQuery(GET_PROFILES);

  if (loading) {
    return <div className="profiles">Loading...</div>;
  }
  if (error) {
    return <div className="profiles">Error!</div>;
  }

  return (
    <div className="profiles">
      {data.profiles.map((profile) => (
        <Profile key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default Profiles;
