### GET Request
Example of reqOptions and fetchAPI

```typescript
//Import
import React, { useEffect, useState } from "react";
import { reqOptions, API_HOST_URL, fetchAPI } from "@instincthub/react-ui/lib";
import { FilterObjects } from "@instincthub/react-ui";

const OpenAdmissionObjects = ({handle, token}) => {
	const [data, setData] = useState({});

  useEffect(()=>{
    /**
     * Using reqOptions helper
     * Creates request options for fetch API.
     * @param method HTTP method (GET, POST, PUT, DELETE)
     * @param data Request body (BodyInit | FormData | null)
     * @param token Auth token string or null
     * @param content_type Content type (json, form-data, null, false)
     * @param channel Channel ID string or null
     * @param auth_sk Use auth secret boolean (true, false)
     * @returns Request options object
    */
    const requestOptions = reqOptions("GET", null, token, null, handle);
    const apis = `${API_HOST_URL}admissions/${handle}/admin-open-admission-list-create/`;
    
  /**
    * Using fetchAPI helper
    * @param session Callback or state setter
    * @param api API endpoint
    * @param reqOptions Request options
    * @param isFunctionComponent Is functional component
    * @param setIsLoading (optional) IsLoading state setter (boolean)
    * @param setStatus (optional) Status setter (number | null)
    * @param setError (optional) Error setter (any)
    * @param flag (optional) Handle status errors (boolean)
    * @returns Promise with result or error
  */
    fetchAPI(setData, apis, requestOptions, true)
  }, [handle])

	return (
		<div>
			<FilterObjects 
				labels="Select Admission" 
				options={data.results} 
				defaultValues={data.count ? data?.results[0]: {}}
				names="open_admission"/>
		</div>
	);
};

export default OpenAdmissionObjects;

```