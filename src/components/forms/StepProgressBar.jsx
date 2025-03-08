import React from "react";
import styled from "styled-components";

/*
    import StepProgressBar from "../forms/StepProgressBar";
    <StepProgressBar step={1} counts={[1,2,3,4,5,6,7]} widths={"1000px"} />
*/

const StepProgressBar = ({ step,  counts, widths, ...props}) => {
  return (
    <ProgressBarContainer wrapWidths={widths ? widths : "400px"}>
        {
            counts.map((num, index) =>{ 
                return<>
                    <Step isActive={step >= num}>{num}</Step>
                    {(counts.length !== index+1)&& <ProgressLine lineCount={counts.length} />}
                </>
            })
        }
    </ProgressBarContainer>
  );
};

export default StepProgressBar;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${props => (props.wrapWidths)};
  height: 50px;
  margin: 100px auto;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: var(--borderDefault);
  border-radius: 100%;
  background-color: ${props => (props.isActive ? "var(--ViridianGreen)" : "white")};
  color: ${props => (props.isActive ? "white" : "var(--Gunmetal)")};
  font-weight: bold;
  font-family: var(--Montserat);
`;

const ProgressLine = styled.div`
  width: calc(100% / ${props => (props.lineCount)});
  height: 2px;
  background-color: rgba(44, 51, 58, 0.2);
`;

