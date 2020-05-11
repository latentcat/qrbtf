import * as tcb from 'tcb-js-sdk';

const app = tcb.init({
    env: 'qrbtf-1d845d'
});
const auth = app.auth();

async function login() {
    await auth.signInAnonymously();
<<<<<<< HEAD
    const loginState = await auth.getLoginState()
=======
    // const loginState = await auth.getLoginState();
>>>>>>> 47e31499e13fa4a29b3e69e6551268f3badb67b2
}

login();

const db = app.database();
const _ = db.command

<<<<<<< HEAD
export function increaseDownloadData(value, date) {
=======
export function increaseDownloadData(value) {
>>>>>>> 47e31499e13fa4a29b3e69e6551268f3badb67b2
    db.collection('QRCounter').where({
        value: _.eq(value)
    }).get().then(res => {
        if (res.data.length > 0) {
            db.collection('QRCounter').where({
                value: _.eq(value)
            }).update({
                count: _.inc(1),
<<<<<<< HEAD
                date: date
=======
                date: new Date().toString()
>>>>>>> 47e31499e13fa4a29b3e69e6551268f3badb67b2
            }).then(res => {
            })
        }
        else {
            db.collection('QRCounter').add({
                value: value,
                count: 1,
<<<<<<< HEAD
                date: date
=======
                date: new Date().toString()
>>>>>>> 47e31499e13fa4a29b3e69e6551268f3badb67b2
            }).then(res => {
            })
        }
    })
}

export function recordDownloadDetail({text, value, type, params, history}) {
    db.collection('QRDownloadData').add({
        date: new Date().toString(),
        text: text,
        value: value,
        type: type,
        params: params,
        history: history
    }).then(res => {
    })
}
