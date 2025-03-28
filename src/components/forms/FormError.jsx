import styled from "styled-components";

const FormError = ({ errors, status }) => {
	try {
		if (status === 500) {
			return (
				<ReactFormError>
					<h4>Error {status}: </h4>
					<div>
						<p>- The server couldn't process your request.</p>
					</div>
				</ReactFormError>
			);
		} else if (status === 404) {
			return (
				<ReactFormError>
					<h4>Error {status}: </h4>
					<div>
						<p>- Details not found.</p>
					</div>
				</ReactFormError>
			);
		} else if (errors) {
			return (
				<ReactFormError className="err">
					<h4>Error {status}: </h4>
					{Object.keys(errors).length > 0 && (
						<div>
							{Object.keys(errors)?.map((field, index) => (
								<div key={index}>
									{errors[field]?.map((error, index) => (
										<p key={index}>
											<strong>{field}:</strong> {error}
										</p>
									))}
								</div>
							))}
						</div>
					)}
				</ReactFormError>
			);
		}
	} catch {
		(e) => {
			console.log(e);
		};
	}
};

export default FormError;

const ReactFormError = styled.div`
	padding: 20px;
	margin: 20px 0px;
	background-color: var(--Danger);
	border-radius: 5px;
	p {
		font-size: 14px;
		margin-bottom: 10px;
		text-align: left !important;
		margin-bottom: 10px !important;
		margin-height: 10px !important;
		color: #fff;
	}
	h4 {
		font-size: 1em;
		text-align: left !important;
		color: #fff;
	}
`;
