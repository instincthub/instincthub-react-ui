import _ from "lodash";
import { extractSubDomain, reqOptions, API_HOST_URL } from "../helpFunction";

// Define interfaces for parameters
interface RequestParams {
  host_url?: string;
  path: string;
  data?: any;
  token?: string | null;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  type?: "json" | "form-data" | null | false;
  channel?: string;
}

interface DomainObjects {
  field: string;
  value: string;
}

// Default parameters with proper types
const defaultParams: RequestParams = {
  host_url: API_HOST_URL,
  path: "",
  data: null,
  token: null,
  method: "GET",
  type: null,
  channel: "",
};

/**
 * Fetches data from the API
 * @example
 * ```ts
 * const data = await getData({ path: "/api/data", token: "your_token" });
 * ```
 * @param params Request parameters
 * @param params.host_url The host url to use for the request (optional)
 * @param params.path The path to the API endpoint (required) eg. "sis/${handle}/student/"
 * @param params.token The token to use for the request (optional)
 * @param params.method The method to use for the request (optional)
 * @param params.type The type of the request (optional)
 * @param params.channel The channel to use for the request (optional)
 * @returns Promise with the response data
 */
export async function getData(params: Partial<RequestParams>): Promise<any> {
  const _par: RequestParams = { ...defaultParams, ...params };

  try {
    // Get the initial course list belonging to a channel..
    const endpoint = _par.host_url + _par.path;
    const options = reqOptions(
      _par.method || "GET",
      _par.data,
      _par.token,
      _par.type || null,
      _par.channel
    );
    const response = await fetch(endpoint, options);

    if (response.status === 401 || response.status === 403) {
      return { detail: "Unauthorized" };
    }

    if (response.status === 404) return { detail: "Not found." };

    return await response.json();
  } catch (e) {
    console.error(e);
    throw new Error(`Couldn't fetch data from ${_par.path}`);
  }
}

/**
 * Gets channel information based on host
 * @param host The hostname to extract subdomain from
 * @returns Promise with channel data
 */
export async function getChannel(host: string): Promise<any> {
  const domainObjects: DomainObjects = extractSubDomain(host) || {
    field: "",
    value: "",
  };
  const funcParams: RequestParams = {
    path: `channels/${domainObjects.field}/${domainObjects.value}/`,
  };
  return await getData(funcParams);
}
