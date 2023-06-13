import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_PROFILE, GET_PROFILES } from "./graphql/queries";
import "./ProfileInput.css";

const updateCache = (cache, { data }) => {
  const existingProfiles = cache.readQuery({
    query: GET_PROFILES,
  });

  const newProfile = data.insert_profiles_one;
  cache.writeQuery({
    query: GET_PROFILES,
    data: { profiles: [...existingProfiles.profiles, newProfile] },
  });
};

function ProfileInput() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [addProfile] = useMutation(ADD_PROFILE, { update: updateCache });

  const submitProfile = () => {
    // console.log(firstName);
    // console.log(lastName);
    // console.log(address);
    addProfile({ variables: { firstName, lastName, address } }); // need to review this
    setFirstName("");
    setLastName("");
    setAddress("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        className="profileInput"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="profileInput"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        className="profileInput"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={submitProfile}>Add</button>
    </div>
  );
}

export default ProfileInput;
