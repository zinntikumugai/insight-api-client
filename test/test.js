const IAC = require('./../index.js');
const api = new IAC([
    'http://insight.bitzeny.jp/api/',
    'https://zenyinsight.tomotomo9696.xyz/api/'
]);
const view = (data) => {
    console.log(data);
}
api.query('addr', {
    args: { address: 'ZxBNHC97x1X7o3ACSqbLPaUVj3YwkaCzPY' }
}, view);
api.query('addr', {
    args: { address: 'ZxBNHC97x1X7o3ACSqbLPaUVj3YwkaCzPY'},
    flg: { noTxList: 1 }
}, view);
api.query('txs', {
    flg: {
        address: "ZxBNHC97x1X7o3ACSqbLPaUVj3YwkaCzPY"
    }
}, view);
//err
api.query('ops', {
    flg: { hoge: "ZxBNHC97x1X7o3ACSqbLPaUVj3YwkaCzPY" }
}, view);