import React from "react";

interface StepProgressBarProps {
  step: number;
  counts: number[];
  widths?: string;
  [key: string]: any;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ 
  step, 
  counts, 
  widths = "400px", 
  ...props 
}) => {
  return (
    <div className="ihub-progress-bar-container" style={{ maxWidth: widths }}>
      {counts.map((num, index) => (
        <React.Fragment key={index}>
          <div 
            className={`ihub-progress-step ${step >= num ? "ihub-step-active" : ""}`}
          >
            {num}
          </div>
          {(counts.length !== index + 1) && (
            <div 
              className="ihub-progress-line" 
              style={{ width: `calc(100% / ${counts.length})` }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepProgressBar;