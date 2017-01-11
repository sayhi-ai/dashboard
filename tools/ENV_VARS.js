let ENV_VARS;

// Checks if docker replaced url correctly, otherwise jump back to dev
const isProdUrl = url => {
  return !url.startsWith('$')
}

const CONSTANTS = {
  MAX_PHRASE_TOKEN_LENGTH: 50,
  MAX_RESPONSE_LENGTH: 300,
  RESPONSE_VAR_TOKEN: '$',
  RESPONSE_ESCAPE_TOKEN: '\\'
};

const SERVER_URL_PROD = "${SERVER_URL}"
const DASHBOARD_URL_PROD = "${DASHBOARD_URL}"
const PAGE_URL_PROD = "${PAGE_URL}"

if (process.env.NODE_ENV === "production" && isProdUrl(SERVER_URL_PROD)) {
  ENV_VARS = {
    SERVER_URL: SERVER_URL_PROD,
    DASHBOARD_URL: DASHBOARD_URL_PROD,
    PAGE_URL: PAGE_URL_PROD,
    CONSTANTS: CONSTANTS
  };
} else {
  ENV_VARS = {
    SERVER_URL: "http://localhost:8080",
    DASHBOARD_URL: "http://localhost:4000",
    PAGE_URL: "http://localhost:4001",
    CONSTANTS: CONSTANTS
  };
}

export default ENV_VARS

