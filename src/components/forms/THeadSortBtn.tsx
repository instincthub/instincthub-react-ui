import React from "react";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

/**
 * Props interface for the THeadSortBtn component
 * @interface THeadSortBtnProps
 */
interface THeadSortBtnProps {
  /** The key used for sorting */
  keys: string;
  /** The content to display in the table header */
  labels: React.ReactNode;
  /** The currently sorted column key */
  sorted: string;
  /** Optional minimum width for the column */
  widths?: string;
  /** Function to call when clicking the sort button */
  handleSort: (key: string) => void;
}

/**
 * A sortable table header component with up/down arrows to indicate sort direction
 *
 * @param {THeadSortBtnProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const THeadSortBtn: React.FC<THeadSortBtnProps> = ({
  keys,
  labels,
  sorted,
  widths = "auto",
  handleSort,
}) => {
  return (
    <th
      onClick={() => handleSort(keys)}
      className={`ihub-thead-sort ${sorted === keys ? "ihub-sorted" : ""}`}
      style={{ minWidth: widths }}
    >
      {labels}
      {sorted !== keys ? (
        <ArrowDownwardOutlinedIcon />
      ) : (
        <ArrowUpwardOutlinedIcon />
      )}
    </th>
  );
};

export default THeadSortBtn;
