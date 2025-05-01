import { useState } from 'react';
import RangeSlider from './Filter/RangeSlide';

const SidebarFilters = ({ onFiltersChange }) => {
  const defaultFilters = {
    gender: "Male",
    ageRange: [18, 35],
    heightRange: [0, 190],
    permanentDivision: "",
    biodataId: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

  const handleGenderChange = (e) => {
    setFilters({ ...filters, gender: e.target.value });
  };

  const handleAgeChange = (newAgeRange) => {
    setFilters({ ...filters, ageRange: newAgeRange });
  };

  const handleHeightChange = (newHeightRange) => {
    setFilters({ ...filters, heightRange: newHeightRange });
  };

  const handleDivisionChange = (e) => {
    setFilters({ ...filters, permanentDivision: e.target.value });
  };

  const handleBiodataIdChange = (e) => {
    setFilters({ ...filters, biodataId: e.target.value });
  };

  const applyFilters = () => {
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="space-y-4">
      {/* Gender Filter */}
      <div>
        <label className="block text-sm font-medium">Gender</label>
        <select
          value={filters.gender}
          onChange={handleGenderChange}
          className="w-full p-2 border rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Age Range Filter */}
      <RangeSlider
        label="Age Range"
        min={0}
        max={100}
        values={filters.ageRange}
        onChange={handleAgeChange}
      />

      {/* Height Range Filter */}
      <RangeSlider
        label="Height Range"
        min={0}
        max={250}
        values={filters.heightRange}
        onChange={handleHeightChange}
      />

      {/* Permanent Division Filter */}
      <div>
        <label className="block text-sm font-medium">Permanent Division</label>
        <select
          value={filters.permanentDivision}
          onChange={handleDivisionChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Division</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattagra">Chattagra</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Barisal">Barisal</option>
          <option value="Khulna">Khulna</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Sylhet">Sylhet</option>
        </select>
      </div>

      {/* Biodata ID Filter */}
      <div>
        <label className="block text-sm font-medium">Biodata ID</label>
        <input
          type="text"
          value={filters.biodataId}
          onChange={handleBiodataIdChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full py-2 bg-gray-500 text-white rounded mt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SidebarFilters;