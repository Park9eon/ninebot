const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    token: String,
    provider: String,
    username: {
        type: String,
        required: true,
        index: true
    },
    realName: String,
    displayName: String,
    phone: String,
    description: String,
    image: String,
    profile: mongoose.Schema.Types.Mixed
}, {
    timestamp: true
});

class UserClass {
    static async findBySlackProfileWithCredentialsAndUpdate(profile, credentials) {
        const username = credentials.profile.user_id;
        const newProfile = {
            token: credentials.token,
            username: username,
            provider: credentials.provider,
            realName: profile.real_name,
            displayName: profile.display_name,
            phone: profile.phone,
            description: profile.title,
            image: profile.image_192,
            profile: Object.assign(profile, credentials.profile),
        };
        return this.findOneAndUpdate({username}, newProfile, {new: true, upsert: true});
    }

    static async findByUsername(username, projection, options) {
        return this.findOne({username}, projection, options);
    }
}

schema.loadClass(UserClass);

module.exports = mongoose.model("User", schema);