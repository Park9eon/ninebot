const {WebClient} = require("@slack/client");
const {SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SLACK_TOKEN} = process.env;
const User = require("../model/User");

const webClient = new WebClient(SLACK_TOKEN);

module.exports = {
    name: "auth",
    register: async (server) => {
        await server.register(require("bell"));
        server.auth.strategy("slack", "bell", {
            provider: "slack",
            password: "cookie_encryption_password_secure",
            clientId: SLACK_CLIENT_ID,
            clientSecret: SLACK_CLIENT_SECRET,
            isSecure: false
        });
        server.route({
            method: ["GET", "POST"],
            path: "/auth/slack",
            options: {
                auth: "slack",
                handler: async (req, h) => {
                    const credentials = req.auth.credentials;
                    if (credentials.token) {
                        const res = await webClient.users.profile.get({
                            token: credentials.token
                        });
                        const user = await User.findBySlackProfileWithCredentialsAndUpdate(res.profile, credentials);
                        return h.response(user);
                    } else {
                        return h.response(req.auth.credentials);
                    }
                },
            }
        });
    }
};