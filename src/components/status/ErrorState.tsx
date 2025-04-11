import Link from "next/link";
import React from "react";

// Define the props interface
interface ErrorStateProps {
  title: string;
  text: string;
}

/**
 * 
 * @component
 * @example
 * ```tsx
 *
 * <ErrorState title="Oops!" text="Something went wrong." />
 * ```
 * Props interface for the ErrorStateProps interface
 * @property {string} title - Title of the error
 * @property {string} text - Text of the error
 */

const ErrorState: React.FC<ErrorStateProps> = ({ title, text }) => {
  return (
    <section className="ihub-error-state">
      <div className="ihub-error-status">
        <div className="ihub-error-svg-container">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24.3809"
            height="22.3873"
          >
            <g>
              <rect
                height="22.3873"
                opacity="0"
                width="24.3809"
                x="0"
                y="0"
              />
              <path
                d="M2.95219 22.1639L21.4287 22.1639C23.2719 22.1639 24.3809 20.8755 24.3809 19.2497C24.3809 18.7098 24.2241 18.1501 23.9311 17.6309L14.692 1.45289C14.1335 0.47004 13.1705 0 12.1904 0C11.2068 0 10.2356 0.47004 9.68519 1.45289L0.449766 17.6309C0.136992 18.1582 0 18.7098 0 19.2497C0 20.8755 1.10531 22.1639 2.95219 22.1639ZM2.96391 20.7382C2.00918 20.7382 1.46614 20.0436 1.46614 19.2343C1.46614 18.9463 1.53844 18.6069 1.70367 18.2991L10.9274 2.13645C11.2062 1.64473 11.706 1.44996 12.1904 1.44996C12.6749 1.44996 13.163 1.64473 13.4418 2.13645L22.6655 18.3071C22.8343 18.615 22.9111 18.9463 22.9111 19.2343C22.9111 20.0436 22.3519 20.7382 21.4089 20.7382ZM12.1904 14.3672C12.633 14.3672 12.8994 14.0899 12.9075 13.5932L13.0425 7.33746C13.0506 6.85242 12.6836 6.49793 12.1823 6.49793C11.673 6.49793 11.3222 6.84433 11.3303 7.32937L11.4572 13.5932C11.4653 14.0818 11.7316 14.3672 12.1904 14.3672ZM12.1904 17.9978C12.7829 17.9978 13.2817 17.5205 13.2817 16.9389C13.2817 16.3455 12.7874 15.88 12.1904 15.88C11.5898 15.88 11.0992 16.3536 11.0992 16.9389C11.0992 17.5124 11.5979 17.9978 12.1904 17.9978Z"
                fill="#ffffff"
                fillOpacity="0.85"
              />
            </g>
          </svg>
        </div>
        <h3>{title}</h3>
        <p>{text}</p>

        <Link href="/">Back to homepage</Link>
      </div>
    </section>
  );
};

export default ErrorState;