require("dotenv").config();

module.exports = {
    apps: [{
        name: 'ninebot',
        script: 'app.js',
        watch: false,
        env: process.env,
        env_production: process.env
    }],
};