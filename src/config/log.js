module.exports = {
    plugin: require('good'),
    options: {
        ops: {
            interval: 1000 * 60 * 60 // 1H
        },
        reporters: {
            console: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ops: '*', log: '*', response: '*', request: '*', error: '*'}]
                }, {
                    module: 'good-console',
                    args: [{
                        format: 'LLL',
                        utc: false,
                        color: true,
                    }]
                },
                'stdout'
            ],
        }
    }
};