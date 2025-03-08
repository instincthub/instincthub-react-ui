// Sentry
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

import { format } from "date-fns";
import { forbidden, notFound } from "next/navigation";

export const IN_DEV_MODE = process.env.NODE_ENV === "development";

export const API_HOST_URL = process.env.NEXT_PUBLIC_API_HOST;

export const FILE_URL = process.env.NEXT_PUBLIC_FILE_URL;
export const VIDEO_URL = process.env.NEXT_PUBLIC_VIDEO_URL;
export const CODECS_URL_M3U8 = process.env.NEXT_PUBLIC_VIDEO_URL_CODECS_M3U8;

export const romansFigure = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
];

export const addUserDomain = (domain) => {
  // Add subdomain

  const raw = JSON.stringify({
    name: `${domain}.instincthub.com`,
  });
  const vercelOptions = {
    body: raw,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_AUTH_BEARER_TOKEN}`,
    },
    method: "post",
  };

  const res = fetch(
    `https://api.vercel.com/v10/projects/${process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID}/domains?teamId=${process.env.NEXT_PUBLIC_VERCEL_TEAM_ID}`,
    vercelOptions
  );

  return res;
};

export const stripHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, "");
};

export const stripCommaFromNumber = (str) => {
  try {
    if (typeof str === "number") return str;
    const val = str.replaceAll(",", "");
    return Number(val);
  } catch (error) {
    return 0;
  }
};

export const calculateTotalCredits = (courses) => {
  return courses.reduce((total, courseObj) => {
    const credits = parseInt(courseObj.course.credits, 10); // Convert credits to an integer
    return total + credits;
  }, 0); // Start the total at 0
};

export const calculateAmountAfterDeduction = (amount, percentage) => {
  if (amount < 0 || percentage < 0 || percentage > 100) {
    return {
      amount: 0,
      detail:
        "Amount and percentage should be positive, and percentage should be between 0 and 100.",
    };
  }

  let deduction = (amount * percentage) / 100;
  let finalAmount = amount - deduction;

  return finalAmount;
};

export const findNullOrEmptyKeys = (namesArray, obj) => {
  /*
	This function findNullOrEmptyKeys filters the namesArray and returns an 
	array of keys that have null, undefined, or empty string ("") values in the objects.
	*/
  return namesArray.filter((key) => obj[key] == null || obj[key] === "");
};

export const extractSubDomain = (hostname) => {
  // const { hostname } = window.location;

  if (IN_DEV_MODE) {
    return { value: "eportal.hust.edu.ng", field: "username" };
  }

  if (!hostname.includes("instincthub.com") && !IN_DEV_MODE) {
    return { value: hostname, field: "domain" };
  }

  const parts = hostname?.split(".") || ["localhost:3001"];

  // Check if the hostname contains a subdomain
  if (parts.length > 1) {
    if (parts[1] == "ngrok-free") {
      return { value: "skills", field: "username" };
    } else if (
      parts[parts.length - 2] !== "instincthub" &&
      !hostname.includes("localhost")
    ) {
      //if primary domain is not instincthub, return full domain
      console.log("it logs");
      return { value: hostname, field: "domain" };
    } else {
      // Else, return sub domain
      return { value: parts[0], field: "username" };
    }
  } else if (parts.length === 2 || parts.length === 1) {
    if (
      parts[0].includes("localhost:3000") ||
      parts[0] === "instincthub" ||
      parts[1] == "ngrok-free"
    ) {
      // return instincthub skills if no sub domain or localhost
      return { value: "eportal.hust.edu.ng", field: "username" };
    } else if (
      !parts[parts.length - 2].includes("instincthub") &&
      !hostname.includes("localhost")
    ) {
      // return user custom domain
      return { value: hostname, field: "domain" };
    } else {
      return { value: parts[0], field: "domain" };
    }
  } else {
    return null;
  }
};

export const convertArrayToFormData = (array) => {
  const formData = new FormData();

  array.forEach((item, index) => {
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const value = item[key];

        if (Array.isArray(value)) {
          // If the value is an array, stringify it
          formData.append(`item[${index}].${key}`, JSON.stringify(value));
        } else if (typeof value === "object" && value !== null) {
          // Handle nested objects (e.g., upload_result)
          if (key === "upload_result" && value.objectURL) {
            // If value is an object with a file or blob, append the file
            fetch(value.objectURL)
              .then((response) => response.blob())
              .then((blob) => {
                formData.append(
                  `item[${index}].${key}`,
                  blob,
                  "upload_result_file"
                );
              })
              .catch((error) =>
                console.error("Error converting blob URL:", error)
              );
          } else {
            // If it's a generic object, convert to JSON string
            formData.append(`item[${index}].${key}`, JSON.stringify(value));
          }
        } else {
          // Append primitive values directly
          formData.append(`item[${index}].${key}`, value);
        }
      }
    }
  });

  return formData;
};

export const handleInvalid = (e, formError, setFormError) => {
  // Function to handle form validation errors when a field is invalid
  // Check if the error list already includes the name of the invalid field
  if (!formError.includes(e.target.name)) {
    // If the field's name is not already in the error list, add it
    const err = [...formError, e.target.dataset.name];
    setFormError(err); // Update the form error state with the new list
  }

  // Attempt to find the HTML element associated with the invalid field using its ID
  const errTag = document.getElementById(`id_${e.target.name}`);
  if (errTag) {
    // If the element is found, scroll it into view to bring attention to the error
    errTag.scrollIntoView();
  }

  // Display a toast notification informing the user that the specified fields cannot be left blank
  return `Error: ${formError} field(s) cannot be left blank.`, 400;
};

export const calculateAverageRating = (ratings) => {
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = sum / ratings.length;
  return averageRating.toFixed(1); // Round to 1 decimal place
};

export const convertToFloat = (value) => {
  const sanitizedValue = value.replaceAll(",", "");
  return parseFloat(sanitizedValue);
};

export const formatNumberWithCommas = (number) => {
  // Check if the input is a valid number
  if (isNaN(number)) {
    return "Invalid number";
  }

  // Convert the number to a string and split it into integer and decimal parts
  const parts = number.toString().split(".");

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join the integer and decimal parts and return the formatted number
  return parts.join(".");
};

export const TrackViewPort = (element) => {
  const rect = element?.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const formatDuration = (durationInMinutes) => {
  if (durationInMinutes === 0) {
    return "...";
  }
  if (durationInMinutes < 60) {
    if (Math.floor(durationInMinutes)) {
      return Math.floor(durationInMinutes) + " Minutes";
    } else return durationInMinutes.toFixed(1) + " Seconds";
  } else if (durationInMinutes === 60) {
    return "1 Hour";
  } else {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
    if (minutes === 0) {
      return hours + " Hours";
    } else {
      return hours + " Hours, " + minutes + " Minutes";
    }
  }
};

export const truncateHtml = (markdownText, maxLength) => {
  // Truncate the HTML content to a certain number of characters
  let truncated = markdownText;
  if (markdownText?.length > maxLength) {
    truncated = markdownText.substr(0, maxLength) + "...";
  }
  return truncated;
};

export const formatDateToWord = (date, type = "iiii do MMMM yyyy") => {
  if (!date) {
    return "";
  }
  return format(new Date(date), type);
};

export const hostUrlEncode = () => {
  if (typeof document !== "undefined") {
    return encodeURIComponent(window.location);
  }
};

export const isValidAlphanumeric = (input) => {
  if (input?.length < 3) {
    return false;
  } else {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(input);
  }
};

export const isValidEmail = (input) => {
  if (input?.length < 3) {
    return false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }
};

export const toTitleCase = (str) => {
  if (typeof str === "string") {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else return str;
};

export const getCookie = (cname) => {
  let name = cname + "=";
  if (typeof document !== "undefined") {
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (Number(c.indexOf(name)) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return null;
};

export const removeCookie = (cname) => {
  // backdate
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // console.log(`${cname}=${cvalue}; cookies was created`)
};

export const printErr = (key, value, index) => {
  let inputField = document
    .querySelector("#regForm")
    .querySelector(`[name="${key}"]`);
  // console.log(key, value)

  let error_tag = null;

  // Make input border red and check for the parent tag
  if (inputField !== null) {
    inputField.style.borderColor = "var(--TurkishRose)";

    if (inputField.getAttribute("type") === "radio") {
      error_tag =
        inputField.parentElement.parentElement.parentElement.querySelector(
          ".error"
        );
    } else if (inputField.getAttribute("type") === "file") {
      error_tag =
        inputField.parentElement.parentElement.querySelector(".error");
    } else {
      error_tag = inputField.parentElement.querySelector(".error");
    }
  }

  if (error_tag) {
    error_tag.textContent = value;
  } else {
    let span_tag = document.createElement("SPAN");
    span_tag.classList.add("error");
    span_tag.textContent = value;
    span_tag.style.color = "var(--TurkishRose)";
    span_tag.style.display = "inline-block";

    if (key === "user") {
    } else if (inputField !== null) {
      // console.log(inputField.parentElement)
      if (inputField.getAttribute("type") === "radio") {
        // console.log(key)
        inputField.parentElement.parentElement.parentElement.append(span_tag);
      } else if (inputField.getAttribute("type") === "file") {
        // console.log(key)
        inputField.parentElement.parentElement.append(span_tag);
      } else if (inputField.nodeName === "SELECT") {
        // console.log(key)
        inputField.parentElement.append(span_tag);
      } else {
        inputField.parentElement.parentElement.append(span_tag);
      }
    }
  }
  if (index === 0 && inputField !== null) {
    inputField.focused = true;
  }
};

export const handleError = (status, items, registerForm, r_path) => {
  const serverTag = document.querySelector(".server_err");

  if (status === 400) {
    // console.log(items);
    if (items.user || items.username) {
      if (items.user[0] === "This field must be unique.") {
        serverTag.style.display = "block";
        serverTag.style.backgroundColor = "var(--DarkCyan)";

        if (
          document.location.pathname === "/register/details" ||
          document.location.pathname === "/register/details/"
        ) {
          serverTag.querySelector("a button span").innerHTML =
            "Take Assessment";
          serverTag.querySelector("a").href = "/quiz/";
        }
        serverTag.querySelector("h3").textContent =
          "We already have your details!";

        spinBtn(registerForm, "none", false);
        window.location.href = "#Socials";
      }
    } else {
      spinBtn(registerForm, "none", false); // spin button: parameter >> form, display and status
      Object.entries(items).forEach((item, index) => {
        const [key, value] = item;
        printErr(key, value, index);
      });
      document.querySelector(".server_err").style.display = "none";
    }
  } else if (status === 200 || status === 201 || status === 202) {
    if (r_path !== null) {
      window.location.href = r_path;
    }
  } else {
    if (status === 401) {
      serverTag.style.display = "block";
      serverTag.querySelector("a").innerHTML = "";
      serverTag.querySelector("h3").textContent = items.detail;
      spinBtn(registerForm, "none", false);
      window.location.href = "#Socials";
    }
  }
};

// Set type to null if not required.
export const reqOptions = (
  method,
  data = null,
  token = null,
  content_type = false,
  channel = null,
  auth_sk = false
) => {
  let myHeaders = {};
  myHeaders["instincthub-sk-header"] =
    process.env.NEXT_PUBLIC_INSTINCTHUB_SK_HEADER;

  if (token) myHeaders["Authorization"] = "Bearer " + token;
  if (channel) myHeaders["channel-id"] = channel;

  if (content_type === "json") myHeaders["Content-Type"] = "application/json";
  if (content_type === "form-data")
    myHeaders["Content-Type"] = "multipart/form-data";

  if (auth_sk)
    myHeaders["instincthub-auth-sk-header"] =
      process.env.NEXT_PUBLIC_INSTINCTHUB_AUTH_SECRET;

  var request = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };

  if (data) request["body"] = data;

  if (IN_DEV_MODE) {
    console.log(request);
  }

  return request;
};

export const fetchAPI = async (
  session,
  api,
  reqOptions,
  isFunctionComponent = false,
  setStatus = null,
  setError = null,
  flag = false
) => {
  try {
    const response = await fetch(api, reqOptions);
    const status = response.status;
    const result = await response.json();

    if (isFunctionComponent) {
      if ([400, 401, 404, 500].includes(status)) {
        setError?.(result);
      } else if ([200, 201].includes(status)) {
        session(result);
        setError?.(); // Clears error message
      }
      setStatus?.(status);
    } else {
      session.setState({ data: result, status });
    }

    if (IN_DEV_MODE) {
      console.log("Request Options:", reqOptions);
      console.log("Response Data:", result);
      console.log("Status Code:", status);
    }
    if (flag) {
      handleStatusError(status);
    }

    return result;
  } catch (error) {
    if (isFunctionComponent) {
      session(error);
      setError?.(error);
      setStatus?.(null);
    } else {
      session.setState({ error });
    }

    if (IN_DEV_MODE) {
      console.log("Request Options:", reqOptions);
      console.log("Error:", error);
    }

    return error;
  }
};

// Helper function to handle HTTP status codes
export const handleStatusError = (status) => {
  if (status === 401) forbidden();
  else if (status === 404) notFound();
  return;
};

export const spinBtn = (form, display, status) => {
  form.querySelector("button.submit_bt").disabled = status; // this disable the button
  form.disabled = status; // This disables the whole form via the fieldset
  form.querySelector("button .bt-spinner").style.display = display;
};

// var country_list = ;

export async function handleResendOTP(email) {
  const formData = new FormData();
  formData.append("email", email);
  const requestOptions = reqOptions("POST", formData);
  const req = await fetch(
    API_HOST_URL + "auth/skills/request_new_otp/",
    requestOptions
  );
  const res = await req.json();
  return res;
}
