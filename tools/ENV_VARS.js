let ENV_VARS;

const CONSTANTS = {
  MAX_PHRASE_TOKEN_LENGTH: 50,
  MAX_RESPONSE_LENGTH: 300,
  RESPONSE_VAR_TOKEN: '$',
  RESPONSE_ESCAPE_TOKEN: '\\'
};

if (process.env.NODE_ENV === "production") {
  ENV_VARS = {
    SERVER_URL: "https://server:8080",
    CONSTANTS: CONSTANTS
  };
} else {
  ENV_VARS = {
    SERVER_URL: "http://localhost:8080",
    CONSTANTS: CONSTANTS
  };
}

export default ENV_VARS;
