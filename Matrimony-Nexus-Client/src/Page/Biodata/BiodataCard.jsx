import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const BiodataCard = ({ biodata }) => {
  const {
    biodataId,
    type,
    name,
    profileImageLink,
    age,
    height,
    dateOfBirth,
    permanentDivision,
    occupation,
  } = biodata;

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`border rounded-lg p-4 shadow-md w-full mx-auto flex flex-col justify-between ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
        }`}
    >
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
        {/* Profile Image */}
        <img
          src={profileImageLink}
          alt={name}
          className="w-20 h-20 rounded-full border object-cover"
        />
        {/* Basic Info */}
        <div className="text-center sm:text-left mt-4 sm:mt-0">
          <h2 className="text-lg font-bold">{name}</h2>
          <p
            className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
          >
            Biodata No: {biodataId}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <p>
          <span className="font-semibold">Type:</span> {type}
        </p>
        <p>
          <span className="font-semibold">Age:</span> {age} years
        </p>
        <p>
          <span className="font-semibold">Height:</span> {height}
        </p>
        <p>
          <span className="font-semibold">Division:</span> {permanentDivision}
        </p>
        <p>
          <span className="font-semibold">DOB:</span> {dateOfBirth}
        </p>
        <p>
          <span className="font-semibold">Occupation:</span> {occupation}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4">
        <Link to={`/biodata-details/${biodataId}`}>
          <button
            className={`px-4 py-2 w-full rounded hover:bg-BgPrimary transition ${isDarkMode ? "text-gray-200 bg-red-500" : "text-white bg-red-400"
              }`}
          >
            View Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BiodataCard;