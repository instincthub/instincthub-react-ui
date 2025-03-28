import React from "react";
import { useRouter } from "next/navigation";

interface SearchFieldProps {
  labels?: string;
  setSearchValues?: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ labels, setSearchValues }) => {
  const router = useRouter();

  const handleUpdateQueryParam = (value: string): void => {
    // Update the search params onChange
    const query = new URLSearchParams(window.location.search);
    query.set("search", value);
    
    const newUrl = 
      window.location.pathname + "?" + query.toString() + 
      window.location.hash;
      
    router.replace(newUrl);
  };

  return (
    <div className="ihub-search-field event-input">
      <div className="ihub-search-set">
        <div className="ihub-input-div">
          <svg 
            className="ihub-search-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M21 21L16.65 16.65" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <input
            className="ihub-event-input"
            type="text"
            name="name"
            placeholder={`Search ${labels ? labels : "Blog"} ...`}
            onChange={(e) => {
              handleUpdateQueryParam(e.target.value);
              setSearchValues && setSearchValues(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchField;