let ENV_VARS;

if (process.env.NODE_ENV === "production") {
    ENV_VARS = {
        SERVER_URL: "https://api.sayhi.ai",
    };
} else {
    ENV_VARS = {
        SERVER_URL: "http://localhost:8080",
    };
}

export default ENV_VARS;
