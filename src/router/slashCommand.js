const util = require("util");
const moment = require("moment");
const inChannel = require("../view/inChannel");
const error = require("../view/error");
const Count = require("../model/Count");

module.exports = {
    name: "SlashCommandRouter",
    register: (server) => {
        server.route({
            method: "POST",
            path: "/count",
            /**
             *
             * @param {Object} req
             * @param {Object} req.payload
             * @param {String} req.payload.token
             * @param {String} req.payload.team_id
             * @param {String} req.payload.team_domain
             * @param {String} req.payload.channel_id
             * @param {String} req.payload.channel_name
             * @param {String} req.payload.user_id
             * @param {String} req.payload.user_name
             * @param {String} req.payload.command
             * @param {String} req.payload.text
             * @param {String} req.payload.trigger_id
             * @param {Object} h
             * @returns {*}
             */
            handler: async (req, h) => {
                try {
                    const ERROR_MESSAGE = "등록방법 ```/count text=[일정이름]&value=[날짜]&template=[문자열포맷]&diff=[기준]\nEX) /count text=일정&value=2019-12-25&template=크리스마스 까지 %d일 남았습니다.&diff=days```";
                    const key = req.payload.text;
                    const {value, template, diff} = req.payload;
                    if (!key || key === "") {
                        return h.response(error("일정이름을 입력해주세요."));
                    }
                    let count = null;
                    if (value) {
                        count = await Count.createOrUpdate(req.payload.user_id, key, moment(value).toDate(), {
                            template,
                            diff
                        });
                    } else {
                        count = await Count.findByKey(key, null, {lean: true});
                        if (!count) {
                            return h.response(error(`일정이 없습니다.\n${ERROR_MESSAGE}`));
                        }
                    }
                    server.log('info', count);
                    return h.response(inChannel({
                        text: util.format(count.template, moment(count.value).diff(moment(), count.diff))
                    }));
                } catch (e) {
                    server.log('error', e);
                    return h.response(error(e));
                }
            }
        });
    }
};