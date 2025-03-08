import { openToast } from "@/assets/js/modals";
import { SVGs } from "@/assets/svgs/SVGs";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";


const FileInputWrapper = styled.div`
  .tag_upload {
    margin-bottom: 5px;
  }
  .preview_img {
    position: static;
    width: 100% !important;
    object-fit: cover;
    height: 200px !important;
    border-radius: 5px;
    padding: 0 !important;
    // margin-top: 30px !important;
  }
`;
const FileField = ({ onChange, defaultImageUrl, ...props }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(defaultImageUrl || "");
  const [inputName, setInputName] = useState()

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Ensure file upload size limit.
    const maxFileSize = (props.maxLimit || 10) * 1024 * 1024; // 10MB in bytes
    if (file.size > maxFileSize) {
      openToast(`File ${file.name.slice(0, 15)}... exceeds 10MB limit`, 400);
      e.target.value = ''; // Reset the input field
      return; // Stop further processing
    }
    

    setPreviewUrl(URL.createObjectURL(file));
    if (onChange) {
      onChange(file);
    }

    // disable file name if on PUT if not updated
    if (file) {
      setInputName(props.names)
    }
  };

  const isImage = defaultImageUrl?.includes('.png') || defaultImageUrl?.includes('.jpg') || defaultImageUrl?.includes('.jpeg')

  return (
    <FileInputWrapper>
      <div className="custom_uploader mt-3">
        <div>
          <h4 htmlFor="upload">{props.labels}</h4>
          <input
            type="file"
            id="upload"
            name={inputName}
            ref={fileInputRef}
            required={props.requireds}
            onChange={handleFileChange}
            data-name={props.dataNames}
          />
        </div>
      </div>
      {/* <input type="file" ref={fileInputRef} onChange={handleFileChange} /> */}
      {(previewUrl || defaultImageUrl) && isImage ? 
        <img src={previewUrl || defaultImageUrl} alt="File Preview" className="preview_img" />:
        <a href={previewUrl || defaultImageUrl}>{(previewUrl || defaultImageUrl)?.slice(0, 15)}...</a>
      }
    </FileInputWrapper>
  );
};

export default FileField;
