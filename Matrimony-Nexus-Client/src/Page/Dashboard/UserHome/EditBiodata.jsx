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
    biodataType: "",
    name: "",
    profileImage: "",
    dateOfBirth: "",
    heightFeet: "",
    heightInches: "",
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

      const biodataToSubmit = {
        ...biodata,
        height: combinedHeight.trim(),
      };

      console.log("Biodata to Submit:", biodataToSubmit);

      // Handle image upload
      if (biodata.profileImage && typeof biodata.profileImage !== "string") {
        const formData = new FormData();
        formData.append("image", biodata.profileImage);

        const res = await axiosPublic.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (res.data.success) {
          biodataToSubmit.profileImage = res.data.data.display_url;
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {existingBiodata ? "Edit Your Biodata" : "Create Your Biodata"}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Biodata Type */}
        <div>
          <label className="block text-sm font-medium">Biodata Type</label>
          <select
            name="biodataType"
            value={biodata.biodataType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Profile Image
          </label>
          <div className="gap-2 grid grid-cols-2 items-center">
            {/* File Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const generatedUrl = URL.createObjectURL(file);
                    setBiodata({ ...biodata, profileImage: generatedUrl });
                  }
                }}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* URL Input */}
            <div>
              <input
                type="text"
                placeholder="Or enter an image URL"
                required
                value={biodata.profileImage || ""}
                onChange={(e) =>
                  setBiodata({ ...biodata, profileImage: e.target.value })
                }
                className="w-full p-2.5 border rounded"
              />
            </div>
          </div>
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">age</label>
          <input
            type="text"
            name="age"
            required
            value={biodata.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={biodata.occupation}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Weight</label>
          <input
            type="number"
            name="weight"
            value={biodata.weight}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Race (Skin Color)</label>
          <select
            name="race"
            value={biodata.race}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block text-sm font-medium">
            Permanent Division
          </label>
          <select
            name="permanentDivision"
            required
            value={biodata.permanentDivision}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
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
          <label className="block text-sm font-medium">
            Expected Partner Age
          </label>
          <input
            type="number"
            name="expectedPartnerAge"
            value={biodata.expectedPartnerAge}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            min="18"
          />
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block text-sm font-medium">
            Expected Partner Height
          </label>
          <select
            name="expectedPartnerHeight"
            value={biodata.expectedPartnerHeight}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Height</option>
            <option value="Below 5 feet">Below 5 feet</option>
            <option value="5 feet - 5 feet 4 inches">
              5 feet - 5 feet 4 inches
            </option>
            <option value="5 feet 5 inches - 5 feet 9 inches">
              5 feet 5 inches - 5 feet 9 inches
            </option>
            <option value="Above 5 feet 9 inches">Above 5 feet 9 inches</option>
          </select>
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block text-sm font-medium">
            Expected Partner Weight
          </label>
          <select
            name="expectedPartnerWeight"
            required
            value={biodata.expectedPartnerWeight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Weight</option>
            <option value="Below 50 kg">Below 50 kg</option>
            <option value="50 kg - 60 kg">50 kg - 60 kg</option>
            <option value="60 kg - 70 kg">60 kg - 70 kg</option>
            <option value="Above 70 kg">Above 70 kg</option>
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={biodata.contactEmail}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            required
            value={biodata.mobileNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-custom-gradient text-white rounded"
          disabled={isLoading}
        >
          {isLoading
            ? existingBiodata
              ? "Updating..."
              : "Creating..."
            : "Save and Publish Now"}
        </button>
      </form>
    </div>
  );
};

export default EditBioData;
