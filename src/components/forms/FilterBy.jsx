import React, { useState } from "react";

const FilterBy = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["Last 7days", "Last 14 days", "This month", "Last Month"];

  return (
    <div className="select_me">
      <div className="select-btn" onClick={(e) => setIsActive(!isActive)}>
        <input type="text" defaultValue={selected} read-only className="input_drop" onChange={''}/>
        {/* {selected} */}
        <img
          src="https://www.svgrepo.com/show/379863/chevron-down.svg"
          alt=""
        />
      </div>
      {isActive && (
        <div className="select_content">
          {options.map((option) => (
            <div
              className="select_items"
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBy;
