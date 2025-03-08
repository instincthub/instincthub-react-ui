import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";

const Tooltip = ({ content, children }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleMouseEnter = () => setShowTooltip(true);
	const handleMouseLeave = () => setShowTooltip(false);

	return (
		<ReactToolTip
			className="tooltip-container"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			// onClick={handleMouseEnter}
		>
			{children}
			{showTooltip && (
				<div className="tip_wrapper">
					<div className="tooltip">
						{typeof content === "object"
							? content.map((option, index) => {
									return (
										<p className="tip_item">
											<p>{option.feedback}</p>
											<p className="timestamp">
												<ReactTimeAgo date={new Date(option.timestamp)} />
											</p>
										</p>
									);
							  })
							: content}
					</div>
				</div>
			)}
		</ReactToolTip>
	);
};

Tooltip.propTypes = {
	content: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired,
};

export default Tooltip;

const ReactToolTip = styled.div`
	position: relative;
	.tooltip {
		background: #3e474f;
		border-radius: 0.25em;
		bottom: 55px;
		color: #edeff0;
		margin-left: -8.75em;
		padding: 1em;
		transition: all 0.65s cubic-bezier(0.84, -0.18, 0.31, 1.26) 0.2s;
		transform: scale(0.6) translateY(50%);
		width: 400px;
		height: 200px;
		z-index: 100;
		position: absolute;
		font-size: 25px;
		overflow: auto;
		bottom: 65px;
		/* scale: 2 */

		p {
			color: var(--white);
			font-size: 25px;
			line-height: 120%;

			&.tip_item {
				margin-bottom: 20px;
				border-bottom: --borderDefault;
				border: var(--borderDefault);
			}
			.timestamp {
				font-size: 12px;
			}
		}
	}
	.tip_wrapper {
		position: relative;
		::after {
			border-style: solid;
			border-width: 1em 0.75em 0 0.75em;
			border-color: #3e474f transparent transparent transparent;
			bottom: 100%;
			content: "";
			position: absolute;
			bottom: 30px;
			left: 0px;
			transition: all 0.65s cubic-bezier(0.84, -0.18, 0.31, 1.26) 0.2s;
		}
	}
`;
