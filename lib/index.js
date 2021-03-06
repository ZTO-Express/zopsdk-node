module.exports = {
    init(appKey, appSecret) {
        this.company_id = appKey;
        this.key = appSecret;
        this.crypto = require('crypto');
        this.fetch = require('node-fetch');
        this.querystring = require('querystring');
    },
    execute: function (request, callback) {
        let url = request.url;
        let company_id = this.company_id;
        let key = this.key;
        if(!request.body) {
            if (request.data) {
                if (typeof (request.data) === "string") {
                    request.params = JSON.parse(request.data);
                } else {
                    request.params = request.data;
                }
            }
            let params = request.params;
            let realParams = {};
            Object.keys(request.params).forEach(function (key) {
                let v = params[key];
                if (typeof (v) !== "string") {
                    v = JSON.stringify(v);
                }
                realParams[key] = v;
            });
            let requestBody = realParams;
            let query_string = [];
            for (let k in requestBody) {
                query_string.push(k + "=" + requestBody[k]);
            }
            let str_to_digest = query_string.join("&") + key;
            let data_digest = this.crypto.createHash('md5')
                .update(str_to_digest)
                .digest('base64');
            let query_string_urlencoded = this.querystring.stringify(requestBody);
            let fetch = this.fetch;

            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "x-companyid": company_id,
                    "x-datadigest": data_digest
                },
                body: query_string_urlencoded,
            });
        } else if(request.body) {
            if (typeof (request.body) !== "string") {
                request.body = JSON.stringify(request.body);
            }
            let str_to_digest = request.body + key;
            let data_digest = this.crypto.createHash('md5')
                .update(str_to_digest)
                .digest('base64');
            let fetch = this.fetch;
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-companyid": company_id,
                    "x-datadigest": data_digest
                },
                body: request.body,
            });
        }
    }
};