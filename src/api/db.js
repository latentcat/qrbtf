import * as tcb from 'tcb-js-sdk';

const app = tcb.init({
    env: 'qrbtf-1d845d'
});
const auth = app.auth();

async function login() {
    await auth.signInAnonymously();
    const loginState = await auth.getLoginState()
    console.log(loginState.isAnonymous);
}

login();

const db = app.database();
const _ = db.command
const counter = db.collection('QRCounter');

export function insert(value) {
    counter.add({
        value: value,
        count: 1
    }).then(res => {
        console.log(res);
    })
}

export function update(value) {
    counter.where({
        value: _.eq(value)
    }).update({
        count: _.inc(1)
    }).then(res => {
        console.log(res)
    })
}
