import React from "react";

interface RangeRadioProps {
  ranges: number;
  names?: string;
  labels: string;
  requireds?: boolean;
  setSelectedValue?: (value: string) => void;
}

const RangeRadio: React.FC<RangeRadioProps> = ({
  ranges,
  names,
  labels,
  requireds,
  setSelectedValue
}) => {
  const rangeArray = Array.from({ length: ranges }, (_, i) => i + 1);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelectedValue) {
      setSelectedValue(event.target.value);
    }
  };

  if (!ranges) {
    return null;
  }

  return (
    <div className={names}>
      <h5 className="mt-3">{labels}</h5>

      <div className="ihub-field">
        <div className="ihub-range-wrapper">
          {rangeArray.map((option, index) => {
            return (
              <div className="ihub-radio-parent" key={index}>
                <label className="ihub-radio">
                  <input
                    type="radio"
                    name={names}
                    value={option}
                    required={index === 0 ? requireds : false}
                    onChange={handleOptionChange}
                  />
                  <span>{option}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RangeRadio;