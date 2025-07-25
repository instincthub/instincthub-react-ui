import React from "react";
import Link from "next/link";

interface FromInstinctHubProps {
  showText?: boolean;
  className?: string;
}

/**
 * Component to display the InstinctHub logo and text
 * @example
 * <FromInstinctHub showText={true} />
 * <FromInstinctHub showText={true} className="ihub-mt-3" />
 * @param showText - Whether to show the text "Powerred By:"
 * @param className - Additional CSS classes to apply to the component
 * @returns The InstinctHub logo and text
 */

const FromInstinctHub = ({
  showText = false,
  className,
}: FromInstinctHubProps) => {
  return (
    <div className={`ihub-text-center ihub-mb-5 ${className}`}>
      <Link
        href={"https://instincthub.com"}
        target="_blank"
        rel="noopener noreferrer"
      >
        {showText && (
          <span className="ihub-fs-sm ihub-mr-1 ihub-d-inline-block ihub-position-relative ihub-top-n9">
            Powered by
          </span>
        )}
        <svg
          className="ihub-m-auto"
          id="dy_svg_white"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 171.5 24"
          height="30"
          width="120"
        >
          <path
            className="cls-2"
            fill="#00838f"
            d="M3,10.41a5.12,5.12,0,0,1-.08-.87A4.34,4.34,0,0,1,7.27,5.2a4.89,4.89,0,0,1,.85.08L7.83,6.84a4.34,4.34,0,0,0-.53,0A2.75,2.75,0,0,0,4.55,9.54a3.53,3.53,0,0,0,0,.56Z"
          />
          <path
            className="cls-2"
            fill="#00838f"
            d="M7.24,16.78a7.23,7.23,0,1,1,7.25-7.21A7.24,7.24,0,0,1,7.24,16.78Zm0-12.87A5.65,5.65,0,1,0,12.9,9.54,5.65,5.65,0,0,0,7.24,3.91Z"
          />
          <path
            className="cls-1"
            fill="var(Gunmetal)"
            d="M4.73,12H9.85a.65.65,0,0,1,.65.65v9.09a.65.65,0,0,1-.65.65H4.62A.65.65,0,0,1,4,21.76v-9A.77.77,0,0,1,4.73,12Z"
          />
          <g id="Group_10" data-name="Group 10">
            <path
              id="Path_688"
              data-name="Path 688"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M32.5,14.27v8.15h-5V15.11c0-2-.89-2.92-2.33-2.92-1.59,0-2.84,1-2.84,3.35v6.88h-5V8.19h4.76V9.73A6.12,6.12,0,0,1,26.6,7.94c3.33,0,5.9,1.92,5.9,6.33"
            />
            <path
              id="Path_689"
              data-name="Path 689"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M34.47,21.2,36,17.79a10,10,0,0,0,4.95,1.32c1.68,0,2.25-.37,2.25-1,0-1.92-8.42.27-8.42-5.44C34.74,10,37.21,8,41.67,8A12.48,12.48,0,0,1,47.3,9.19l-1.49,3.38a8.37,8.37,0,0,0-4.09-1.06c-1.67,0-2.27.46-2.27,1,0,2,8.39-.16,8.39,5.5,0,2.62-2.41,4.68-7,4.68a13.62,13.62,0,0,1-6.33-1.49"
            />
            <path
              id="Path_690"
              data-name="Path 690"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M59.8,21.85a6.88,6.88,0,0,1-3.47.81c-3.65,0-5.79-1.79-5.79-5.44V12.46h-2V8.73h2.08V5h5V8.73h3.24v3.73H55.55v4.73a1.43,1.43,0,0,0,1.23,1.62H57a2.8,2.8,0,0,0,1.51-.44Z"
            />
            <path
              id="Path_691"
              data-name="Path 691"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M61.15,4a2.78,2.78,0,0,1,3.06-2.65c1.84,0,3.05,1.09,3.05,2.57A3.08,3.08,0,0,1,61.15,4m.57,4.23h5V22.42h-5Z"
            />
            <path
              id="Path_692"
              data-name="Path 692"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M85.09,14.27v8.15h-5V15.11c0-2-.89-2.92-2.32-2.92-1.6,0-2.84,1-2.84,3.35v6.88H70V8.19h4.76V9.73a6.1,6.1,0,0,1,4.52-1.79c3.3,0,5.84,1.92,5.84,6.33"
            />
            <path
              id="Path_693"
              data-name="Path 693"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M87.53,15.27c0-4.27,3.38-7.33,8.17-7.33,3.21,0,5.71,1.44,6.68,3.92l-3.87,2a3.11,3.11,0,0,0-2.84-1.92,3.07,3.07,0,0,0-3.11,3.35c0,2.22,1.35,3.41,3.11,3.41a3.06,3.06,0,0,0,2.84-1.92l3.87,2c-1,2.46-3.44,3.92-6.68,3.92-4.8,0-8.17-3-8.17-7.39"
            />
            <path
              id="Path_694"
              data-name="Path 694"
              className="cls-1"
              fill="var(Gunmetal)"
              d="M114.31,21.85a6.84,6.84,0,0,1-3.46.81c-3.66,0-5.79-1.79-5.79-5.44V12.46H103V8.73h2.09V5h5V8.73h3.25v3.73H110v4.73a1.45,1.45,0,0,0,1.23,1.62h.26a2.83,2.83,0,0,0,1.52-.44Z"
            />
            <path
              id="Path_695"
              data-name="Path 695"
              className="cls-2"
              fill="#00838f"
              d="M134,4.05V22.42h-5.19V15.25h-7.09v7.17h-5.2V4.05h5.2v6.89h7.09V4.05Z"
            />
            <path
              id="Path_696"
              data-name="Path 696"
              className="cls-2"
              fill="#00838f"
              d="M152.37,8.19V22.42h-4.76V20.9a5.6,5.6,0,0,1-4.22,1.76c-3.49,0-6-2-6-6.52v-8h5v7.14c0,2.22.86,3.08,2.35,3.08s2.68-1,2.68-3.35V8.19Z"
            />
            <path
              id="Path_697"
              data-name="Path 697"
              className="cls-2"
              fill="#00838f"
              d="M171.5,15.27c0,4.55-3.14,7.39-7,7.39A5.09,5.09,0,0,1,160.33,21v1.41h-4.76V2.94h5V9.43a5.3,5.3,0,0,1,4-1.46c3.87,0,7,2.79,7,7.3m-5,0c0-2.16-1.33-3.35-3-3.35a3,3,0,0,0-3,3.35c0,2.19,1.33,3.41,3,3.41s3-1.22,3-3.41"
            />
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default FromInstinctHub;
