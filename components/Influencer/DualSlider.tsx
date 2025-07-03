interface DualRangeSliderProps {
  min: number;
  max: number;
  value1: number;
  value2: number;
  onChange: (value1: number, value2: number) => void;
  step?: number;
  label: string;
  unit?: string;
  formatValue?: (val: number) => string;
}

export default function DualRangeSlider({
  min,
  max,
  value1,
  value2,
  onChange,
  step = 1,
  label,
  unit = "",
  formatValue = (val) => val.toString(),
}: DualRangeSliderProps) {
  const percentage1 = ((value1 - min) / (max - min)) * 100;
  const percentage2 = ((value2 - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}: {formatValue(value1)}
        {unit} - {formatValue(value2)}
        {unit}
      </label>
      <div className="relative h-2 bg-gray-200 rounded-lg">
        <div
          className="absolute h-2 bg-blue-500 rounded-lg"
          style={{
            left: `${Math.min(percentage1, percentage2)}%`,
            width: `${Math.abs(percentage2 - percentage1)}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value1}
          onChange={(e) => onChange(Number(e.target.value), value2)}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value2}
          onChange={(e) => onChange(value1, Number(e.target.value))}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
}
