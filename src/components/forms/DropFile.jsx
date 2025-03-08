import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropFile({ onDrop }) {
  const [fileName, setFileName] = useState("");

  const onDropAccepted = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    onDrop(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: ".xlsx, .xls, .csv",
    maxFiles: 1,
  });

  return (
    <div  className="dropzone">
        <div {...getRootProps()} className="dropzone_wrap">
        <input {...getInputProps()} />
        {isDragActive ? (
            <p>Drop the files here ...</p>
        ) : (
            <p>Drag 'n' drop ".xlsx, .xls, .csv" files here, or click to select files</p>
        )}
        
        {fileName && <p>File: {fileName}</p>}
        <style jsx>{`
            .dropzone{
                padding: 30px;
                position: fixed;
            }
            .dropzone_wrap {
            border: 2px dashed #ccc;
            padding: 10px;
            max-width: 700px;
            margin: 0px auto;
            cursor: pointer;
            }
            p{
            text-align: center;}
            
        `}</style>
        </div>
        {!fileName &&
        <div className="download_template">
            <p> PS: Existing contact will be update while new contacts will be created.</p>
            <a href={'https://github.com/instincthub/images/raw/main/leadcontact_upload_template.xlsx'}
             >Download Template </a>
        </div>
        }
    </div>
  );
}

export default DropFile;
