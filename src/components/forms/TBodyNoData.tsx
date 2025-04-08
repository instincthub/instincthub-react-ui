import React from "react";
import GroupWorkOutlinedIcon from "@mui/icons-material/GroupWorkOutlined";

const TBodyNoData: React.FC = () => {
  return (
    <tr>
      <td colSpan={99}>
        <div className="ihub-empty-state">
          <GroupWorkOutlinedIcon />
          <h4>No Data</h4>
          <p>You have no cohort with the selected category.</p>
        </div>
      </td>
    </tr>
  );
};

export default TBodyNoData;
