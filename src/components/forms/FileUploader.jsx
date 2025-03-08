// Upload file directly to s3 endpoint.
// Created this because nextjs serverless only supported
// 4.5mb payload. Request more than that will through
// 413 Request Entity Too Large in production.

import { useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { useSession } from "next-auth/react";
import { styled } from "styled-components";
import {
	FILE_URL,
	IN_DEV_MODE,
	slugifyFileName,
} from "@/assets/js/helpFunction";
import { openToast } from "@/assets/js/modals/modals";

function FileUploader(props) {
	const { data: session } = useSession();
	const [selectedFile, setSelectedFile] = useState(null);
	const [message, setMessage] = useState(
		props.labels || "Drag and drop files here to upload."
	);
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const handleFileChange = async (event) => {
		// setDuration(video_dr.duration);
		setSelectedFile(event.files[0]);
		setUploadPercentage(0);
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			return;
		} else {
			const AWS_S3 = (await import("aws-sdk/clients/s3")).default;

			const s3Client = new AWS_S3({
				endpoint: process.env.NEXT_PUBLIC_AWS_S3_ENDPOINT_URL,
				region: process.env.NEXT_PUBLIC_AWS_REGION,
				credentials: {
					accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
					secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
				},
			});

			const username = session?.user?.name?.username;
			const timestamp = new Date().toISOString();
			const uniqueKey = slugifyFileName(
				`${username}-${timestamp}-${selectedFile.name}`
			);
			const prefixUniqueKey = IN_DEV_MODE
				? `test-env__${uniqueKey}`
				: uniqueKey;

			const keyLocation =
				props.accepts === "video/*"
					? process.env.NEXT_PUBLIC_AWS_LOCATION
					: process.env.NEXT_PUBLIC_AWS_LOCATION_FILES;

			const uploadParams = {
				Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
				Key: `${keyLocation}/${prefixUniqueKey}`,
				Body: selectedFile,
				ACL: "public-read",
			};

			s3Client
				.upload(uploadParams)
				.on("httpUploadProgress", (progress) => {
					const percentage = Math.round(
						(progress.loaded / progress.total) * 100
					);
					setUploadPercentage(percentage);
				})
				.send((err, data) => {
					if (err) {
						console.log(err);
						openToast("Error uploading file!", 400);
					} else {
						openToast("File Uploaded Successfully!");
						const res = {
							bucket: uploadParams.Bucket,
							title: selectedFile.name,
							key: prefixUniqueKey,
							content_type: selectedFile.type,
							size: selectedFile.size,
							location: `${FILE_URL}creators/${prefixUniqueKey}`,
						};
						// console.log("Uploaded successfully:", res);

						// console.log(res);
						props.setResponse && props.setResponse(res);
						props.setValues && props.setValues(props.names, res.key);
						props.setModules &&
							props.setModules(props.module, props.names, res.key);
						props.setModules &&
							props.setModules(props.module, props.names, res.key);
						props.setSteps &&
							props.setSteps(props.module, props.step, props.names, res.key);

						// Handle any additional logic after successful upload
						// For example, you can update the UI to display the uploaded file details
					}
				});
		}
	};

	// Custom progress bar template
	const progressBarTemplate = () => {
		return (
			<div className="progress">
				<div className="progress-bar" style={{ width: `${uploadPercentage}%` }}>
					{uploadPercentage}%
				</div>
			</div>
		);
	};
	// Custom progress bar template
	const handleItemTemplate = () => {
		if (uploadPercentage && uploadPercentage < 100) {
			return (
				<div className="progress">
					<div
						className="progress-bar"
						style={{ width: `${uploadPercentage}%` }}
					>
						{uploadPercentage}%
					</div>
				</div>
			);
		} else if (uploadPercentage === 100) {
			return <p>Processing...</p>;
		}
	};

	return (
		<ReactUploader className="card primereact">
			<h3>{props.headers}</h3>
			<FileUpload
				name="upload"
				customUpload={true}
				accept={props.accepts || "*"}
				maxFileSize={props.maxFileSize || 0}
				onSelect={handleFileChange}
				uploadHandler={handleUpload}
				emptyTemplate={<p className="m-0">{message}</p>}
				onError={() => setMessage("Upload failed, try again!")}
				progressTemplate={progressBarTemplate} // Use the custom progress bar template
				itemTemplate={uploadPercentage && handleItemTemplate}
				pt={{
					content: { className: "surface-ground" },
					message: {
						root: {
							className: "w-1rem",
						},
					},
				}}
			/>
		</ReactUploader>
	);
}

export default FileUploader;

const ReactUploader = styled.div`
	.progress-bar {
		padding: 5px;
		background: var(--DarkCyan);
		color: #fff;
	}
	h3{
		font-size: 1.5em;
	}
`;
