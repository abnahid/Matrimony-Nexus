const RangeSlider = ({ label, min, max, values, onChange }) => {
  const [minValue, maxValue] = values; // Destructure the current range values

  const handleRangeChange = (e) => {
    const newValue = parseInt(e.target.value);
    const middle = (min + max) / 2;

    if (newValue <= middle) {
      const adjustedMin = Math.min(newValue, maxValue - 1); // Adjust min value
      onChange([adjustedMin, maxValue]);
    } else {
      const adjustedMax = Math.max(newValue, minValue + 1); // Adjust max value
      onChange([minValue, adjustedMax]);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm">{minValue}</span>
        <span className="text-sm">{maxValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={handleRangeChange}
        className="w-full accent-blue-500"
      />
    </div>
  );
};

export default RangeSlider;
