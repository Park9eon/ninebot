const slashCommand = require("./slashCommand");

module.exports = {
    name: 'router',
    register: (server) => {
        server.route({
            method: "GET",
            path: "/",
            handler: (req, h) => {
                return h.response(server.table()
                    .map((row) => ({
                        method: row.method,
                        path: row.path,
                        description: row.settings.description
                    })));
            },
            options: {
                description: "라우터 정보를 가져옵니다."
            }
        });
        server.register(slashCommand, {
            routes: {
                prefix: "/slash"
            }
        });
    }
};