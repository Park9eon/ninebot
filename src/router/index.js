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
                description: "Route 정보를 가져옵니다."
            }
        });
    }
};