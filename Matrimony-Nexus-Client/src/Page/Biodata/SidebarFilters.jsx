import { useState } from "react";
import GenderFilter from "./Filter/GenderFilter";
import RangeSlider from "./Filter/RangeSlide";

const SidebarFilters = ({ onFiltersChange }) => {
  const [gender, setGender] = useState("Male");
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [heightRange, setHeightRange] = useState([125, 190]);
  const [permanentDivision, setPermanentDivision] = useState("");
  const [biodataId, setBiodataId] = useState("");

  const divisions = [
    "Dhaka",
    "Chattogram",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];

  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setGender(newGender);
    onFiltersChange({
      gender: newGender,
      ageRange,
      heightRange,
      permanentDivision,
      biodataId,
    });
  };

  const handleAgeChange = (newAgeRange) => {
    setAgeRange(newAgeRange);
    onFiltersChange({
      gender,
      ageRange: newAgeRange,
      heightRange,
      permanentDivision,
      biodataId,
    });
  };

  const handleHeightChange = (newHeightRange) => {
    setHeightRange(newHeightRange);
    onFiltersChange({
      gender,
      ageRange,
      heightRange: newHeightRange,
      permanentDivision,
      biodataId,
    });
  };

  const handleDivisionChange = (selectedDivision) => {
    const newDivision =
      permanentDivision === selectedDivision ? "" : selectedDivision;
    setPermanentDivision(newDivision);
    onFiltersChange({
      gender,
      ageRange,
      heightRange,
      permanentDivision: newDivision,
      biodataId,
    });
  };

  const handleAllDivisions = () => {
    setPermanentDivision("");
    onFiltersChange({
      gender,
      ageRange,
      heightRange,
      permanentDivision: "",
      biodataId,
    });
  };

  const handleBiodataIdChange = (e) => {
    const id = e.target.value;
    setBiodataId(id);
    onFiltersChange({
      gender,
      ageRange,
      heightRange,
      permanentDivision,
      biodataId: id,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Search by Biodata ID</label>
        <input
          type="text"
          value={biodataId}
          onChange={handleBiodataIdChange}
          placeholder="Enter Biodata ID"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <GenderFilter
        selectedGender={gender}
        onGenderChange={handleGenderChange}
      />
      <RangeSlider
        label="Age"
        min={16}
        max={60}
        values={ageRange}
        onChange={handleAgeChange}
      />
      <RangeSlider
        label="Height (cm)"
        min={137}
        max={190}
        values={heightRange}
        onChange={handleHeightChange}
      />
      <div>
        <label className="block font-medium mb-2">Present Division</label>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded ${
              permanentDivision === ""
                ? "bg-custom-gradient text-white"
                : "bg-gray-200"
            }`}
            onClick={handleAllDivisions}
          >
            All Divisions
          </button>
          {divisions.map((div) => (
            <button
              key={div}
              className={`px-4 py-2 rounded ${
                permanentDivision === div
                  ? "bg-custom-gradient text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleDivisionChange(div)}
            >
              {div}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
