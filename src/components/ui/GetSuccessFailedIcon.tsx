import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const GetSuccessFailedIcon = (success: boolean) => {
  return success ? (
    <CheckCircleIcon
      className="text-green-600 ihub-text-success"
      fontSize="small"
    />
  ) : (
    <CancelIcon className="text-red-600 ihub-text-danger" fontSize="small" />
  );
};
export default GetSuccessFailedIcon;
