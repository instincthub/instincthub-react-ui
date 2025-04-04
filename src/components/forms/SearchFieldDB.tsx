import { API_HOST_URL, reqOptions } from "../lib/helpFunction";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../assets/css/forms/search-field-db.css";

/**
 * SearchFieldDB component for searching items and updating data via API
 *
 * @example
 * <SearchFieldDB
 *   urlPath={`channels/courses/${channel}/?`}
 *   setData={setData}
 *   setNext={setNext}
 *   setPrevious={setPrevious}
 *   token={session?.user?.name?.token}
 *   searchParams={{ channel, search }}
 *   labels="Courses"
 * />
 */

interface SearchFieldDBProps {
  /** The API endpoint path to search */
  urlPath: string;
  /** Function to set data state with API results */
  setData: (data: any[]) => void;
  /** Function to set next page URL */
  setNext: (nextUrl: string | null) => void;
  /** Function to set previous page URL */
  setPrevious: (prevUrl: string | null) => void;
  /** Auth token for API requests */
  token?: string;
  /** Search parameters from URL */
  searchParams: {
    channel?: string;
    search?: string;
  };
  /** Custom label for search placeholder */
  labels?: string;
}

const SearchFieldDB: React.FC<SearchFieldDBProps> = (props) => {
  const router = useRouter();
  const { channel, search } = props.searchParams;
  const [status, setStatus] = useState<number | undefined>();
  const [searchValue, setSearchValue] = useState<string | undefined>(search);

  const handleUpdateQueryParam = (values: string | undefined): void => {
    // Update the search params onChange
    const { query } = router as any;
    const newQuery = { ...query, search: values };
    router.replace({
      query: newQuery,
    } as any);
  };

  const handleSearchKey = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    reset: boolean = false
  ): Promise<void> => {
    // Search for courses and update states.
    if (e.keyCode === 13 || reset) {
      const value = e.currentTarget.value;
      handleUpdateQueryParam(value);
    }
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (): Promise<void> => {
    // Search for courses and update states.
    setStatus(0);

    const options = reqOptions("GET", null, props.token, false, channel);

    const url = `${API_HOST_URL}${props.urlPath}search=${search || ""}`;
    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        const newData = await response.json();
        props.setData(newData.results);
        props.setNext(newData.next);
        props.setPrevious(newData.previous);
      }
      setStatus(response.status);
    } catch (error) {
      console.error("Search error:", error);
      setStatus(500);
    }
  };

  const handleCloseSearch = (): void => {
    setSearchValue("");
    handleUpdateQueryParam("");
  };

  useEffect(() => {
    if (search !== undefined) {
      handleSearch();
      setSearchValue(search);
    }
  }, [search]);

  return (
    <div className="ihub-search-field">
      <div className="ihub-search-set"></div>
      <div className="ihub-search-courses">
        <input
          type="search"
          placeholder={`Search ${props.labels ? props.labels : "Items"} ...`}
          onChange={handleSearchChange}
          value={searchValue || ""}
          onKeyDown={handleSearchKey}
        />

        {searchValue ? (
          <svg
            className="ihub-search-cancel"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CloseIcon"
            onClick={handleCloseSearch}
          >
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        ) : null}

        <div className="ihub-search-btn">
          {status === 0 ? (
            <div className="ihub-loader"></div>
          ) : (
            <SearchRoundedIcon
              className="ihub-material-symbols-outlined"
              onClick={() => handleUpdateQueryParam(searchValue)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFieldDB;
