import * as tcb from 'tcb-js-sdk';

const app = tcb.init({
    env: 'qrbtf-1d845d'
});

let isLogin;
const auth = app.auth();
const db = app.database();
const _ = db.command

export async function login() {
    if (isLogin) return;
    await auth.signInAnonymously();
    const loginState = await auth.getLoginState();
    isLogin = loginState;
}

export function getDownloadCount(callback) {
    if (!isLogin) return;
    db.collection('QRCounter').get().then(res => {
        if (callback) callback(res);
    });
}

export function increaseDownloadData(value, callback) {
    if (!isLogin) return;
    db.collection('QRCounter').where({
        value: _.eq(value)
    }).get().then(res => {
        if (res.data.length > 0) {
            db.collection('QRCounter').where({
                value: _.eq(value)
            }).update({
                count: _.inc(1),
                date: new Date().toString()
            }).then(() => {
                if (callback) callback();
            }).catch(console.error)
        }
        else {
            db.collection('QRCounter').add({
                value: value,
                count: 1,
                date: new Date().toString()
            }).then(() => {
                if (callback) callback()
            }).catch(console.error)
        }
    })
}

export function recordDownloadDetail({text, value, type, params, history}, callback) {
    if (!isLogin) return;
    db.collection('QRDownloadData').add({
        date: new Date().toString(),
        text: text,
        value: value,
        type: type,
        params: params,
        history: history
    }).then(res => {
        if (callback) callback(res);
    }).catch(console.error);
}
