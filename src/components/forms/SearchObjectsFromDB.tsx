import React, { useEffect, useState, useCallback, memo } from "react";
import { API_HOST_URL, reqOptions } from "../lib";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// Define interface for data items
interface DataItem {
  id?: number | string;
  username?: string;
  [key: string]: any; // Allow for dynamic properties
}

interface defaultValuesProps {
  id?: number | string;
  title?: string;
  [key: string]: any; // Allow for dynamic properties
}

// Define interface for the component props with generic type
interface SearchObjectsFromDBProps<T extends DataItem = DataItem> {
  label: string | null;
  token: string;
  handle: string;
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  value?: T[];
  appLabel?: string;
  modelName?: string;
  filterChannel?: boolean;
  limit_query?: number;
  limit_select?: number;
  key_name?: string;
  placeholder?: string;
  searchUrl?: string;
  selected: T[];
  err?: boolean;
}

/**
 * Component for searching objects from a database with filtering capabilities
 * @example
 * ```tsx
 * <SearchObjectsFromDB<UserType>
 *  token={authToken}
 *  handle={channelHandle}
 *  set={setSelectedUser}
 *  key_name="display_name"
 *  selected={selectedUsers}
 * />
 * ```
 * @param {SearchObjectsFromDBProps<T>} props - The component props
 * @param {string} props.token - The token for the API request
 * @param {string} props.handle - The handle for the API request
 * @param {Function} props.setSelected - The function to set the handle object
 * @param {T[]} props.value - The prevent defaults for the API request
 * @param {string} props.appLabel - The app label for the API request
 * @param {string} props.modelName - The model name for the API request
 * @param {boolean} props.filterChannel - The filter channel for the API request
 * @param {number} props.limit_query - The limit for the API request
 * @param {number} props.limit_select - The limit user can select (0 means unlimited)
 * @param {keyof T | "name_plus_username"} props.key_name - The key_name to display search results (option[key_name])
 * @param {string} props.placeholder - The placeholder for the API request
 * @param {string} props.searchUrl - The search url for the API request
 * @param {T[]} props.selected - The selected for the API request
 * @param {boolean} props.err - The error for the API request
 */

function SearchObjectsFromDB<T extends DataItem = DataItem>({
  label,
  token,
  handle,
  setSelected,
  appLabel,
  modelName,
  filterChannel = false,
  limit_query = 5,
  limit_select = 0,
  key_name = "title",
  placeholder = "Search by Username or Email",
  searchUrl,
  selected,
  err = false,
}: SearchObjectsFromDBProps<T>): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with value
  useEffect(() => {
    if (selected && selected.length > 0) {
      setData(selected as DataItem[]);
    }
  }, [selected]);

  /**
   * Handles search functionality by fetching data from API
   */
  const handleSearch = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const requestOptions = reqOptions("GET", null, token);
    let url: string;

    if (searchUrl) {
      // Check if there is search url passed and append search input
      url = searchUrl.includes("/?")
        ? `${searchUrl}&search=${input}`
        : `${searchUrl}?search=${input}`;
    } else {
      // Build user channel search urls
      url = appLabel
        ? `${API_HOST_URL}channels/${handle}/dynamic-search/?app_label=${appLabel}&model_name=${modelName}&value=${input}&filter_channel=${filterChannel}`
        : `${API_HOST_URL}auth/${handle}/search-user/${input}/?limit=${limit_query}`;
    }

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const newData = await response.json();
      setData(newData.results || []);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error fetching search results:", errorMessage);
      setError(errorMessage);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [
    input,
    token,
    searchUrl,
    appLabel,
    modelName,
    handle,
    filterChannel,
    limit_query,
  ]);

  /**
   * Handles key press events for search input
   */
  const handleSearchKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    },
    [handleSearch]
  );

  /**
   * Clears search input and results
   */
  const handleCancelSearch = useCallback((): void => {
    setInput("");
    setData([]);
    setError(null);
  }, []);

  /**
   * Determines if an item is selected
   */
  const isItemSelected = useCallback(
    (option: T): boolean => {
      return selected.some((item) => {
        const itemId = typeof item === "object" ? item?.id : item;
        const optionId = option?.username || option?.id;
        return itemId === optionId;
      });
    },
    [selected]
  );

  const handleSelect = useCallback(
    (option: T): void => {
      const existingOption = selected.find((item) => item.id === option.id);
      if (
        !existingOption &&
        (limit_select === 0 || selected.length < limit_select)
      ) {
        setSelected([...(selected as T[]), option as T]);
      }
    },
    [selected, setSelected, limit_select]
  );
  const handleDelete = useCallback(
    (option: T): void => {
      setSelected(selected.filter((item) => item.id !== option.id));
    },
    [selected, setSelected]
  );

  return (
    <div className="ihub-react-search-container">
      <div className="ihub-react-search card">
        {label && <h4 className="ihub-fs-sm ihub-mt-2 ihub-mb-2">{label}</h4>}
        <div className="ihub-search-input">
          <input
            type="text"
            placeholder={placeholder}
            onKeyDown={handleSearchKey}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <div className="ihub-search-icons">
            {input && (
              <CloseOutlinedIcon
                onClick={handleCancelSearch}
                className="ihub-search-icon ihub-close-icon"
              />
            )}
            <SearchOutlinedIcon
              onClick={handleSearch}
              className={`ihub-search-icon ihub-search-button ${
                isLoading ? "ihub-disabled" : ""
              }`}
            />
          </div>
        </div>

        {isLoading && <div className="ihub-loading">Searching...</div>}

        {error && <div className="ihub-search-error">{error}</div>}

        <ul className="ihub-search-results">
          {data?.map((option, index) => (
            <li
              className="ihub-search-result-item ihub-valid"
              key={`${option.id || option.username || index}`}
              onClick={() => handleSelect(option as T)}
            >
              {isItemSelected(option as T) && (
                <CheckIcon
                  className="ihub-check-icon"
                  style={{
                    position: "relative",
                    top: "5px",
                    marginRight: "10px",
                  }}
                />
              )}
              {option[key_name] || option.title}
              <CloseOutlinedIcon
                className="ihub-delete-icon ihub-ml-auto"
                onClick={() => handleDelete(option as T)}
              />
            </li>
          ))}

          {!isLoading && !error && !data.length && !selected.length && (
            <li className="ihub-no-results">No available options</li>
          )}
        </ul>

        {err && <p className="ihub-error">This field is required</p>}
      </div>
      {/* {selected.length && (
        <ul className="ihub-selected-options">
          <h4 className="ihub-fs-sm ihub-mt-2 ihub-mb-2">Selected Options:</h4>
          {selected.map((item) => (
            <li className="ihub-default-values" key={item?.id}>
              {item[key_name] || item.title}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(SearchObjectsFromDB) as typeof SearchObjectsFromDB;
