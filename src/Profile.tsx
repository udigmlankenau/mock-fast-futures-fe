import { useMutation } from "@apollo/client";

import { GET_PROFILES, REMOVE_PROFILE } from "./graphql/queries";

import "./Profile.css";

interface ProfileProps {
  profile: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
  const [removeProfileMutation] = useMutation(REMOVE_PROFILE);

  const removeProfile = (id: number) => {
    removeProfileMutation({
      variables: { id },
      optimisticResponse: true,
      update: (cache) => {
        const existingProfiles = cache.readQuery<{
          profiles: Array<{
            id: number;
            firstName: string;
            lastName: string;
            address: string;
          }>;
        }>({ query: GET_PROFILES });
        const profiles = existingProfiles?.profiles.filter((p) => p.id !== id);
        cache.writeQuery({
          query: GET_PROFILES,
          data: { profiles },
        });
      },
    });
  };

  return (
    <div key={profile.id} className="profile">
      <span>{`${profile.firstName} ${profile.lastName}: ${profile.address}`}</span>
      <button type="submit" onClick={() => removeProfile(profile.id)}>
        remove
      </button>
    </div>
  );
};

export default Profile;
