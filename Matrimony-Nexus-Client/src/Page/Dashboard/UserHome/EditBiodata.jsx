import Header from "@/Components/Header";
import { AuthContext } from "@/context/AuthProvider";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditBioData = ({ existingBiodata, biodataId }) => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const image_hosting_key = import.meta.env.VITE_IMAGE_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [biodata, setBiodata] = useState({
    type: "",
    name: "",
    profileImageLink: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fathersName: "",
    mothersName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: user?.email,
    mobileNumber: "",
    biodataId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Populate form if editing existing biodata
  useEffect(() => {
    if (existingBiodata) {
      const [feet, inches] = existingBiodata.height
        ? existingBiodata.height
          .split("'")
          .map((part) => part.replace('"', "").trim())
        : [0, 0];
      setBiodata({
        ...existingBiodata,
        heightFeet: feet || "0",
        heightInches: inches || "0",
      });
    }
  }, [existingBiodata]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiodata({ ...biodata, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const feet = biodata.heightFeet || "0";
      const inches = biodata.heightInches || "0";
      const combinedHeight = `${feet}'${inches}"`;

      const age = parseInt(biodata.age);

      const biodataToSubmit = {
        ...biodata,
        height: combinedHeight.trim(),
        age,
      };

      console.log("Biodata to Submit:", biodataToSubmit);

      // Handle image upload
      if (biodata.profileImageLink && typeof biodata.profileImageLink !== "string") {
        const formData = new FormData();
        formData.append("image", biodata.profileImageLink);

        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          biodataToSubmit.profileImageLink = res.data.data.display_url;
        } else {
          throw new Error("Image upload failed. Please try again.");
        }
      }

      // API request to create or update biodata
      let response;
      if (existingBiodata) {
        response = await axiosSecure.patch(
          `/biodatas/${biodataId}`,
          biodataToSubmit
        );
      } else {
        response = await axiosSecure.post("/biodatas", biodataToSubmit);
      }

      if (response.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: existingBiodata
            ? "Biodata updated successfully!"
            : "Biodata created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(response.data.message || "Error saving biodata.");
      }
    } catch (error) {
      console.error("Error submitting biodata:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Header
        header={existingBiodata ? "Edit Your Biodata" : "Create Your Biodata"}
        title={
          existingBiodata
            ? "Update and refine your biodata to keep your profile current and relevant."
            : "Build and customize your personal biodata to stand out and connect with your ideal match."
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <form
          onSubmit={onSubmit}
          className="col-span-2 bg-gray-100 p-6 rounded-lg shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Biodata Type */}
            <div>
              <label className="block text-sm font-medium">Biodata Type</label>
              <select
                name="type"
                value={biodata.type}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded"
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={biodata.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={biodata.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                required
                value={biodata.age}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={biodata.occupation}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium">Height</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="heightFeet"
                  value={biodata.heightFeet || ""}
                  onChange={(e) =>
                    setBiodata({ ...biodata, heightFeet: e.target.value })
                  }
                  placeholder="Feet"
                  min="0"
                  max="9"
                  required
                  className="w-1/2 p-2 bg-white border rounded"
                />
                <input
                  type="number"
                  name="heightInches"
                  value={biodata.heightInches || ""}
                  onChange={(e) =>
                    setBiodata({ ...biodata, heightInches: e.target.value })
                  }
                  placeholder="Inches"
                  min="0"
                  max="11"
                  required
                  className="w-1/2 p-2 bg-white border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                required
                value={biodata.mobileNumber}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={biodata.contactEmail}
                disabled
                className="w-full p-2 border rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Permanent Division
              </label>
              <select
                name="permanentDivision"
                required
                value={biodata.permanentDivision}
                onChange={handleChange}
                className="w-full p-2 bg-white border rounded"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagra">Chattagra</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>

            {/* Present Division */}
            <div>
              <label className="block text-sm font-medium">Present Division</label>
              <select
                name="presentDivision"
                value={biodata.presentDivision}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white border rounded"
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Chattagra">Chattagra</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Barisal">Barisal</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Weight</label>
              <input
                type="number"
                name="weight"
                value={biodata.weight}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Race (Skin Color)</label>
              <select
                name="race"
                value={biodata.race}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">Select Skin Color</option>
                <option value="Fair">Fair</option>
                <option value="Medium">Medium</option>
                <option value="Olive">Olive</option>
                <option value="Brown">Brown</option>
                <option value="Dark">Dark</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Fathers name</label>
              <input
                type="text"
                name="fathersName"
                value={biodata.fathersName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mothers name</label>
              <input
                type="text"
                name="mothersName"
                value={biodata.mothersName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Expected Partner Age</label>
              <select
                name="expectedPartnerAge"
                value={biodata.expectedPartnerAge}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white border rounded"
              >
                <option value="20-24">20-24</option>
                <option value="24-28">24-28</option>
                <option value="28-32">28-32</option>
                <option value="32-36">32-36</option>
                <option value="36-40">36-40</option>
              </select>
            </div>

            {/* Expected Partner Height */}
            <div>
              <label className="block text-sm font-medium">Expected Partner Height</label>
              <select
                name="expectedPartnerHeight"
                value={biodata.expectedPartnerHeight}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white border rounded"
              >
                <option value="Below 5 feet">Below 5 feet</option>
                <option value="5'0&quot;-5'3&quot;">5'0"-5'3"</option>
                <option value="5'4&quot;-5'6&quot;">5'4"-5'6"</option>
                <option value="5'7&quot;-5'9&quot;">5'7"-5'9"</option>
                <option value="Above 5'9&quot;">Above 5'9"</option>
              </select>
            </div>


            {/* Expected Partner Weight */}
            <div>
              <label className="block text-sm font-medium">Expected Partner Weight</label>
              <select
                name="expectedPartnerWeight"
                value={biodata.expectedPartnerWeight}
                onChange={handleChange}
                required
                className="w-full p-2 bg-white border rounded"
              >
                <option value="Below 45 kg">Below 45 kg</option>
                <option value="45-50 kg">45-50 kg</option>
                <option value="50-55 kg">50-55 kg</option>
                <option value="55-60 kg">55-60 kg</option>
                <option value="Above 60 kg">Above 60 kg</option>
              </select>
            </div >



          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-BgPrimary text-white rounded shadow-md hover:bg-rad-700"
            disabled={isLoading}
          >
            {isLoading
              ? existingBiodata
                ? "Updating..."
                : "Creating..."
              : "Save and Publish Now"}
          </button>
        </form>

        {/* Right Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Upload Profile Image</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const generatedUrl = URL.createObjectURL(file);
                    setBiodata({ ...biodata, profileImageLink: generatedUrl });
                  }
                }}
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Enter Image URL</label>
              <input
                type="text"
                placeholder="Enter URL"
                value={biodata.profileImageLink || ""}
                onChange={(e) =>
                  setBiodata({ ...biodata, profileImageLink: e.target.value })
                }
                className="w-full p-2 bg-white border rounded"
              />
            </div>

            {biodata.profileImageLink && (
              <div>
                <h4 className="text-sm font-medium">Preview</h4>
                <img
                  src={biodata.profileImageLink}
                  alt="Profile Preview"
                  className="w-full h-40 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>
      </div >
    </div >
  );
};

export default EditBioData;