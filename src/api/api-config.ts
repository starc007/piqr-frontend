// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
const API_URL_LOCAL = "http://localhost:6969/api/v1";
// const API_URL_PROD = "https://apis.piqr.in/api/v1";
// const API_URL_PROD = "https://api.piqr.in/api/v1";
const API_URL_PROD = "https://api-test.piqr.in/api/v1";

const API_URL =
  process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_LOCAL;

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
};
