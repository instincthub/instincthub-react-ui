import React, { useState } from "react";
import { fetchAPI, reqOptions } from "../lib/helpFunction";
import THeadSortBtn from "./THeadSortBtn";

/**
 * Interface for table header item configuration
 * @interface HeaderItem
 * @property {string} label - The display label for the header
 * @property {string} [key] - Optional key for sortable columns, matches data object property
 * @property {string} [width] - Optional CSS width value for the column
 */
interface HeaderItem {
  label: string;
  key?: string;
  width?: string;
}

interface THeadSortListProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  setNext: React.Dispatch<React.SetStateAction<string | null>>;
  onChange?: (urlPath: string, reset?: boolean) => void;
  token?: string;
  handle?: string;
  urlPath: string;
  headerItems: HeaderItem[];
}

/**
 * Interface for API response structure
 * @interface ApiResponse
 * @property {any[]} results - Array of data items
 * @property {string} [next] - Optional URL for next page of results
 */
interface ApiResponse {
  results: any[];
  next?: string;
}

/**
 * Component for sortable table headers
 * Renders a table header row with sortable columns based on the provided configuration
 *
 * @component
 * @example
 * ```tsx
 * Steps for implementing Sort:
 * 1. Declare the header list array
 * const headerItems = [
 *   { label: "No." },
 *   { label: "Name" },
 *   { label: "Enrolled", key: "total_enrolled" },
 *   { label: "Courses", key: "total_courses" },
 *   { label: "Projects", key: "total_projects" },
 *   { label: "Visibility", key: "" },
 *   { label: "Updated", key: "" },
 * ];
 * b. declare width
 * const headerItems = [
 *   { label: "No.", width: 'auto' },
 *   { label: "Name", width: '200px' },
 *   { label: "Email", width: 'auto' },
 *   { label: "Ap Fee", width: '100px' },
 *   { label: "Status", key: "status", width: 'auto' },
 *   { label: "Mode", key: "mode", width: '100px' },
 *   { label: "First Choice", key: "first_course_choice_title", width: '200px' },
 *   { label: "Last Action", key: "last_action", width: '200px'},
 *   { label: "Action", width: 'auto' },
 * ];
 *
 * 2. Import the component and add props
 * <THeadSortList
 *   setData={setData}
 *   setNext={setNext}
 *   onChange={onChange}
 *   token={token}
 *   urlPath="/api/users"
 *   headerItems={headerItems}
 * />
 *
 * ```
 * Props interface for the THeadSortList component
 * @interface THeadSortListProps
 * @property {React.Dispatch<React.SetStateAction<any[]>>} setData - State setter for the table data
 * @property {React.Dispatch<React.SetStateAction<string>>} setNext - State setter for the pagination next URL
 * @property {Function} onChange - Function to fetch data from the API
 * @property {string} [token] - Optional authentication token
 * @property {string} [handle] - Optional user/account handle
 * @property {string} urlPath - API endpoint path for data
 * @property {HeaderItem[]} headerItems - Configuration for table headers
 */
const THeadSortList: React.FC<THeadSortListProps> = (props) => {
  /**
   * State to store the complete set of unpaginated data for sorting
   * False when data hasn't been fetched yet
   */
  const [unpaginatedData, setUnpaginatedData] = useState<ApiResponse | false>(
    false
  );

  /**
   * Currently sorted column name
   * Empty string means no sorting is applied
   */
  const [sorted, setSorted] = useState<string>("");

  /**
   * Request options for API calls
   * Generated using the reqOptions utility from react-ui lib
   */
  const options = reqOptions("GET", null, props.token, false, props.handle);

  /**
   * Handles sorting of data based on the selected column
   * Fetches complete dataset if not already available
   * Applies sorting and updates the parent component's data state
   * Clicking the same column twice resets to unsorted state
   *
   * @param column - The column key to sort by
   * @returns Promise<void>
   */
  const handleSort = async (column: string): Promise<void> => {
    // fetch data if doesn't exist
    let items: any[] = [];
    if (!unpaginatedData) {
      const res = (await fetchAPI(
        setUnpaginatedData,
        `${props.urlPath}?limit=36500`,
        options,
        true
      )) as ApiResponse;

      items = [...res.results];
    } else {
      items = [...unpaginatedData.results];
    }

    if (column === sorted) {
      if (props.onChange) {
        props.onChange(props.urlPath, true);
      }
      setSorted("");
    } else {
      // Sort the array based on the 'column' field in descending order
      const formattedStr = column.replaceAll(" ", "_").toLowerCase();

      // sort by name
      items.sort((a, b) => {
        const nameA = a[formattedStr];
        const nameB = b[formattedStr];
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      props.setData(items);
      props.setNext("");
      setSorted(column);
    }
  };

  /**
   * Renders a table header with sortable columns
   * Maps through headerItems to create either:
   * - Regular <th> elements for non-sortable columns
   * - THeadSortBtn components for sortable columns (those with key property)
   *
   * @returns JSX.Element - The rendered table header
   */
  return (
    <thead>
      <tr>
        {props.headerItems.map((option, index) =>
          !option.key ? (
            <th key={index} style={{ minWidth: option.width || "auto" }}>
              {option.label}
            </th>
          ) : (
            <THeadSortBtn
              key={index}
              handleSort={handleSort}
              sorted={sorted}
              labels={option.label}
              keys={option.key}
              widths={option.width}
            />
          )
        )}
      </tr>
    </thead>
  );
};

export default THeadSortList;
