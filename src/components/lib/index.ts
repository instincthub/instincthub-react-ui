// src/components/lib/index.ts

export * from "./auth/dbRequestst";
export * from "./roles";

// JSON exports
export * from "./json/accounts";
export * from "./json/countryNigeria";
export * from "./json/countryObjects";
export * from "./json/educationLevels";
export * from "./json/unsplashDefaultObject";

// Utility functions
export { default as createSubscription } from "./createSubscription";
export { default as elementIsVisibleInViewport } from "./elementIsVisibleInViewport";
export { default as handleFormErrors } from "./formError";
export { default as fileToBase64 } from "./fileToBase64";
export { default as getPriceObjects } from "./getPriceObjects";
export {default as convertArrayToObject} from "./convertArrayToObject";
export * from "./format";
export * from "./helpFunction";
export * from "./loadScript";
export * from "./oauth_json";
export * from "./paystack";
export * from "./permissions";
export * from "./utils";
export * from "./queryParameters";

// Charts
export * from "./charts";

// Modals
export * from "./modals/modals";
export * from "./modals/openConfirmDelete";

// Logo
export const instinctHubLogoUrl = "/assets/logo/instincthub-logo-color.png";
export const instinctHubLogoUrlWhite =
  "/assets/logo/instincthub-logo-white.png";
export const instinctHubLogoUrlBlack =
  "/assets/logo/instincthub-logo-black.png";
export const instinctHubThumbnailLogo =
  "/assets/logo/instincthub-logo-thumbnail.png";
