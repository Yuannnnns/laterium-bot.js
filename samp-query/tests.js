/// @proj.samp-query : tests.js

// please see https://www.npmjs.com/package/samp-query
const query = require('samp-query');

const _host = process.env.SAMP_HOST || '127.0.0.1';
const _port = Number(process.env.SAMP_PORT) || 7777;

const options = {
    host: _host,
    port: _port
};

query(options, (error, response) => {
    if (error) {
        console.error('SA-MP Query Error:', error);
        return;
    }

    console.log('SA-MP Query Data:', response);
});
