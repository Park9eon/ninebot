module.exports = (error) => ({
    "response_type": "ephemeral",
    "text": typeof error === "string" ? error : error.message || error.toString()
});