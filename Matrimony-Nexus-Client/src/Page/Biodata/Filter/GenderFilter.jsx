const GenderFilter = ({ selectedGender, onGenderChange }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">Gender</h3>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <span className="text-purple-700">👨</span>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={selectedGender === "Male"}
            onChange={onGenderChange}
            className="accent-purple-700"
          />
          <span>Male</span>
        </label>
        <label className="flex items-center space-x-2">
          <span className="text-pink-600">👩</span>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={selectedGender === "Female"}
            onChange={onGenderChange}
            className="accent-pink-600"
          />
          <span>Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderFilter;
