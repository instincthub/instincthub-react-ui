import { useState } from "react";
import ReactTimeAgo from "./ReactTimeAgo";

interface TooltipContent {
  feedback: string;
  timestamp: string | number | Date;
}

interface TooltipProps {
  content: string | TooltipContent[];
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div
      className="ihub-tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className="ihub-tip-wrapper">
          <div className="ihub-tooltip">
            {Array.isArray(content)
              ? content.map((option, index) => (
                  <div key={index} className="ihub-tip-item">
                    <p>{option.feedback}</p>
                    <p className="ihub-timestamp">
                      <ReactTimeAgo date={new Date(option.timestamp)} />
                    </p>
                  </div>
                ))
              : content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;