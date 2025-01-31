import { Button } from "@/Components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ViewBiodataPage = () => {
  const [biodata, setBiodata] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBiodata = async () => {
      if (!user?.email) return;

      const response = await axiosSecure.get(`/biodatas?email=${user.email}`);
      if (response.data.data.length > 0) {
        setBiodata(response.data.data[0]);
      } else {
        toast.error("No biodata found.");
      }
    };

    fetchBiodata();
  }, [user?.email, axiosSecure]);

  const handleMakePremiumRequest = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Your biodata will be sent for admin approval to become premium.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it premium!",
    });

    if (isConfirmed) {
      const response = await axiosSecure.post("/users/premium-request", {
        id: biodata._id,
      });

      if (response.data.success) {
        Swal.fire(
          "Success!",
          "Your premium request has been submitted.",
          "success"
        );
      } else {
        Swal.fire(
          "Error",
          response.data.message || "Failed to submit premium request.",
          "error"
        );
      }
    }
  };

  if (!biodata) return <div>Loading biodata...</div>;

  return (
    <div className="container mx-auto p-10 py-24">
      <h2 className="text-3xl font-bold mb-6">View Biodata</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Profile Image */}

          {/* Biodata Details */}
          <div>
            {Object.entries({
              "Biodata Type": biodata.biodataType,
              Name: biodata.name,
              "Date of Birth": biodata.dateOfBirth,
              Height: biodata.height,
              Weight: biodata.weight,
              Age: biodata.age,
              Occupation: biodata.occupation,
              Race: biodata.race,
              "Father's Name": biodata.fathersName,
              "Mother's Name": biodata.mothersName,
              "Permanent Division": biodata.permanentDivision,
              "Present Division": biodata.presentDivision,
              "Expected Partner Age": biodata.expectedPartnerAge,
              "Expected Partner Height": biodata.expectedPartnerHeight,
              "Expected Partner Weight": biodata.expectedPartnerWeight,
              "Contact Email": biodata.contactEmail,
              "Mobile Number": biodata.mobileNumber,
            }).map(([label, value]) => (
              <div key={label} className="mb-4">
                <h4 className="text-sm font-medium text-gray-500">{label}</h4>
                <p className="text-lg text-gray-800">{value || "N/A"}</p>
              </div>
            ))}
          </div>
          <div>
            <img
              src={biodata.profileImage}
              alt={biodata.name}
              className="w-64 h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Make Premium Button */}
        <div className="mt-6 text-center">
          <Button
            onClick={handleMakePremiumRequest}
            className="bg-custom-gradient text-white"
          >
            Make Biodata to Premium
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodataPage;
