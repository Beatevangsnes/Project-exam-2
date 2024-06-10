import { useEffect, useState } from "react";
import { createApiKey } from "../auth/apiKey";
import { getProfile } from "../auth/profile";

const useFetchProfile = (name) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      if (!name) {
        throw new Error("Name not provided");
      }

      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      const profile = await getProfile(name, apiKey);
      setProfileData(profile.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.message || "Unknown error occurred");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [name]);

  const updateProfileData = (updatedData) => {
    setProfileData(updatedData);
  };

  return { profileData, isLoading, error, fetchProfile, updateProfileData };
};

export default useFetchProfile;
