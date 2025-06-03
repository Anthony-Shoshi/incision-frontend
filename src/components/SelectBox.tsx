"use client";

interface SelectBoxProps {
  label: string;
}

interface SelectBoxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
}

const SelectBox = ({ label, value, onChange, options }: SelectBoxProps) => (
  <label className="block mb-2 font-medium">
    {label}
    <select
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded px-4 py-2 w-48 ml-2"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </label>
);
export default SelectBox;