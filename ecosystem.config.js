require("dotenv").config();

module.exports = {
    apps: [{
        name: 'ninebot',
        script: 'app.js',
        watch: true,
        env: process.env,
    }],
};