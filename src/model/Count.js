const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        index: true
    },
    value: {
        type: Date,
    },
    author: {
        type: String,
        required: true,
        index: true
    },
    diff: {
        type: String,
        default: "days",
    },
    template: {
        type: String,
        default: "%d"
    }
}, {
    timestamp: true
});

class CountClass {
    static async createOrUpdate(author, key, value, {template, diff}) {
        const count = await this.findByKey(key);
        let newCount = null;
        if (count) {
            if (count.get("author") === author) {
                count.value = value;
                count.template = template || count.template;
                count.diff = diff || count.diff;
                newCount = await count.save();
            } else {
                throw "수정권한이 없습니다.";
            }
        } else {
            newCount = await this.create({
                author: author,
                key,
                value,
                template,
                diff
            });
        }
        return newCount;
    }

    static async findByKey(key, projection, options) {
        return this.findOne({key}, projection, options);
    }
}

schema.loadClass(CountClass);

module.exports = mongoose.model("Count", schema);