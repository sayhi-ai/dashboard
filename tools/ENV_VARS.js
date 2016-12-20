let ENV_VARS;

const CONSTANTS = {
    MAX_PHRASE_TOKEN_LENGTH: 50,
    MAX_RESPONSE_LENGTH: 300
};

if (process.env.NODE_ENV === "production") {
    ENV_VARS = {
        SERVER_URL: "https://api.sayhi.ai",
        CONSTANTS: CONSTANTS
    };
} else {
    ENV_VARS = {
        SERVER_URL: "http://localhost:8080",
        CONSTANTS: CONSTANTS
    };
}

export default ENV_VARS;
