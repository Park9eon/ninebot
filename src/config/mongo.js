const mongoose = require("mongoose");

module.exports = {
    name: 'mongo',
    register: async (server) => {
        const {DB_HOST = "mongodb://localhost:27017/", DB_NAME = "ninebot"} = process.env;
        const connection = await mongoose.connect(`${DB_HOST}${DB_NAME}`, {useNewUrlParser: true});
        server.log("info", "MongoDB is connected");
        server.bind(connection);
    }
};