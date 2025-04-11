import React from "react";

interface RangeRadioProps {
  range: number;
  name?: string;
  label: string;
  required?: boolean;
  setSelectedValue?: (value: string) => void;
  setNameIDValueIndex?: (
    name: string,
    id: string,
    value: string,
    index: number
  ) => void;
  note?: string;
}

const RangeRadio: React.FC<RangeRadioProps> = ({
  range,
  name,
  label,
  required,
  setSelectedValue,
  setNameIDValueIndex,
  note,
}) => {
  const rangeArray = Array.from({ length: range }, (_, i) => i + 1);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setSelectedValue) {
      setSelectedValue(event.target.value);
    }
    if (setNameIDValueIndex) {
      setNameIDValueIndex(
        name || "",
        String(event.target.dataset.id),
        event.target.value,
        Number(event.target.dataset.index)
      );
    }
  };

  if (!range) {
    return null;
  }

  return (
    <div className={name}>
      <h5 className="mt-3">{label}</h5>

      <div className="ihub-field">
        <div className="ihub-range-wrapper">
          {rangeArray.map((option, index) => {
            return (
              <div className="ihub-radio-parent" key={index}>
                <label className="ihub-radio">
                  <input
                    type="radio"
                    name={name}
                    value={option}
                    id={name || "" + index}
                    required={index === 0 ? required : false}
                    onChange={handleOptionChange}
                    data-id={name}
                    data-index={index}
                  />
                  <span>{option}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {note && <p className="ihub-input-notes">{note}</p>}
    </div>
  );
};

export default RangeRadio;
