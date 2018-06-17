const request = require("request");
const async = require('async');

module.exports = class RestClient {
    constructor(urls = null, timeout = 10000) {
        if(typeof urls == "string")
            urls = [urls];
        this.urls = urls;
        this.timeout = timeout;
    }

    post(url = "". ops = {}, call) {
        let options = {
            uri:url,
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            form: ops
        }
        request.post(options, call);
    }

    get(url = "", call) {
        let options = {
            url: url,
            method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }
        request.get(options, call);
    }

    query(api = null, ops = {}, call) {
        if(api === null)
            return null;
        let opsstr = (()=>{
            let str = "";
            if (ops.args)
                Object.keys(ops.args).forEach((key) => {
                    str += "/" + ops.args[key];
                });
            return str;
        })();
        let opslist = (()=>{
            let str = "";
            if (ops.list)
                ops.list.forEach(el=> {
                    str += ',' + el;
                });
            return str;
        })();
        let opsflg = (()=> {
            let str = "";
            if(ops.flg)
                Object.keys(ops.flg).forEach((key) => {
                    str += key + '=' + ops.flg[key];
                });
            return str;
        })();
        let urlall = [];
        let urlpart = api + opsstr + opslist + (opsflg ? '?' + opsflg:"");
        this.urls.forEach(host => {
            urlall.push(host + urlpart);
        });
        let data = [];
        async.each(urlall, (u, callback) => {
            this.get(u, (req, res, body) => {
                let str = "";
                try {
                    str = JSON.parse(body);
                } catch (e) {
                    if (e.toString() == "SyntaxError: Unexpected token < in JSON at position 0")
                        str = null;
                    else
                        str = "{}";
                }
                data.push({
                    url: u,
                    data: str
                });
                callback();
            });
        }, (err) => {
            return call(data);
        });
    }
}