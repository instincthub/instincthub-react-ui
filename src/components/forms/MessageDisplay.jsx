import styled from "styled-components";

const MessageDisplay = (props) => {
	if (props.messages) {
		return (
			<ReactMessage className={props.flag}>
				<p>{props.messages}</p>
			</ReactMessage>
		);
	}
};

export default MessageDisplay;

const ReactMessage = styled.div`
	&.success {
		background-color: #2c333a;
		p {
			color: #fff !important;
		}
	}
	&.failed {
		background-color: #ea5f5e;
	}
	&.note {
		background-color: #69779b;
	}
	padding: 15px;
	margin: 20px 0px;
	background-color: #2c333a;
	border-radius: 5px;
	p {
		color: var(--White);
	}
`;
