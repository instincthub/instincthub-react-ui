"use client";
import * as XLSX from "xlsx";
import { useState } from "react";
import { openConfirmModal, openToast } from "../lib/modals";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { API_HOST_URL, reqOptions } from "../lib/helpFunction";
import SubmitButton from "./SubmitButton";

interface DownloadAsExcelProps {
  token: string;
  urlPath: string;
  fileName?: string;
  labels?: string;
  plainBtn?: boolean;
}

interface DataResponse {
  results: any[];
  detail?: string;
}

const DownloadAsExcel = (props: DownloadAsExcelProps) => {
  const [status, setStatus] = useState<number>(1);

  const handleFetchData = async (): Promise<DataResponse> => {
    setStatus(0);
    const requestOptions = reqOptions("get", null, props.token);
    const request = await fetch(API_HOST_URL + props.urlPath, requestOptions);
    const res: DataResponse = await request.json();

    setStatus(1);
    return res;
  };

  const flattenObject = (data: DataResponse): Record<string, any>[] => {
    const flattened: Record<string, any>[] = [];

    data.results.forEach((entry) => {
      const flatObject: Record<string, any> = {};

      function flatten(obj: any, parentKey = ""): void {
        Object.keys(obj).forEach((key) => {
          const newKey = parentKey ? `${parentKey}_${key}` : key;

          if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any, idx: number) => {
              if (typeof item === "object" && item !== null) {
                flatten(item, `${newKey}_${idx}`);
              } else {
                flatObject[`${newKey}_${idx}`] = item;
              }
            });
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            flatten(obj[key], newKey);
          } else {
            flatObject[newKey] = obj[key];
          }
        });
      }

      flatten(entry);
      flattened.push(flatObject);
    });

    return flattened;
  };

  const handleDownload = async (e?: React.FormEvent): Promise<void> => {
    if (e) {
      e.preventDefault();
    }

    const msg = `Are you sure you want to download record?`;
    const confirm = await openConfirmModal(msg);
    if (!confirm) {
      setStatus(1);
      return;
    }

    const data = await handleFetchData();

    if (data?.detail) {
      openToast(`${data.detail}`, 400);
      return;
    } else if (!data?.results?.length) {
      openToast("No result was found!", 400);
      return;
    }

    let dataset = flattenObject(data);

    const worksheet = XLSX.utils.json_to_sheet(dataset);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const label = `${props.fileName || "data"}.xlsx`;
    XLSX.writeFile(workbook, label);
    openToast(`Record was downloaded: ${label}`);
  };

  if (props.plainBtn) {
    return (
      <div
        className="ihub-plain-download"
        onClick={() => handleDownload()}
        role="button"
        tabIndex={0}
      >
        <FileDownloadOutlinedIcon
          style={{
            position: "relative",
            top: "5px",
            marginRight: "10px",
          }}
        />{" "}
        {props.labels ? props.labels : "Download"}
      </div>
    );
  } else {
    return (
      <form onSubmit={handleDownload}>
        <SubmitButton
          label={props.labels ? props.labels : "Download"}
          status={status}
          name="download"
        />
      </form>
    );
  }
};

export default DownloadAsExcel;
