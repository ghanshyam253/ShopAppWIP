const config = {
    development: {
        url: 'mongodb://localhost/hci',
        tokensecret: 'hciproject',
        sessionsecret: 'hciproject'
    }
}

module.exports = config[process.env.ENV] || config.development