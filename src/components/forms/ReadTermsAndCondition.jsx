import Link from "next/link";
import { useState } from "react";
import styled from "styled-components"


export default function ReadTermsAndCondition(props) {
    const [checked, setChecked] = useState()
  return (
    <ReactTerms>
        <p>Please read and accept the <Link href="https://instincthub.com/policies/terms-and-conditions" className="link"> terms and conditions </Link>  before submitting this form. By submitting this form, you agree to comply with the terms and conditions. </p>

        <label for="id_Seminars" className="label-cbx" 
            onClick={()=> {
                if(checked){
                    setChecked(false)
                    props.setTermsStatus(false)
                }
                 else{
                    setChecked(true);
                    props.setTermsStatus(true)
                }
                
                
                }
            }>
            <input name={props.names} id="id_accept_terms_and_conditions" type="checkbox" hidden data-id="Seminars" defaultValue={checked} checked={checked}/>
            <div className="checkbox">
                <svg width="20px" height="20px" viewBox="0 0 20 20"><path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path><polyline points="4 11 8 15 16 6"></polyline></svg>
            </div>
            <span>Agree</span>
        </label>
    </ReactTerms>
  )
}

const ReactTerms = styled.div`
    .link{
        text-decoration: underline;
        color: var(--DarkCyan);
    }
`;
