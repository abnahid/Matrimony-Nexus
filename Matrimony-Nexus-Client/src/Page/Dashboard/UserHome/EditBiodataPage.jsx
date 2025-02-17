import { AuthContext } from "@/context/AuthProvider";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import EditBioData from "./EditBioData";

const EditBiodataPage = () => {
  const [existingBiodata, setExistingBiodata] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        if (user?.email) {
          const response = await axiosPublic.get(
            `/biodatas?email=${user.email}`
          );
          const biodataArray = response.data.data;

          if (biodataArray && biodataArray.length > 0) {
            setExistingBiodata(biodataArray[0]);
          } else {
            setExistingBiodata(null);
          }
        } else {
          setError("User email not found. Please log in again.");
        }
      } catch (err) {
        console.error("Error fetching biodata:", err);
        setError("An error occurred while fetching the biodata.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBiodata();
  }, [user, axiosPublic]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <EditBioData existingBiodata={null} biodataId={null} />;
  }

  return (
    <EditBioData
      existingBiodata={existingBiodata}
      biodataId={existingBiodata?.biodataId}
    />
  );
};

export default EditBiodataPage;
