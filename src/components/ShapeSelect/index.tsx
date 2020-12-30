import { ShapeOptions } from "../../models";
import "./style.css";

export type ShapeSelectOption = {
  label: string;
  value: ShapeOptions;
  imageSrc: string;
};

interface ShapeSelectProps {
  selected?: string;
  options?: ShapeSelectOption[];
  onSelect?: (value: any) => void;
}

function ShapeSelect({ selected, options, onSelect }: ShapeSelectProps) {
  return (
    <ul className="shape-select-container">
      {options?.map((option) => (
        <li
          key={option.value}
          title={option.label}
          className={`shape-select-option${
            option.value === selected ? " selected" : ""
          }`}
          onClick={() => {
            if (onSelect) {
              onSelect(option.value);
            }
          }}
        >
          <img className="option-icon" alt="option" src={option.imageSrc} />
        </li>
      ))}
    </ul>
  );
}

export default ShapeSelect;
