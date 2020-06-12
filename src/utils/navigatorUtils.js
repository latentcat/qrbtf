export function isWeiXin(){
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) === 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

export function isPC() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function isChrome() {
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
}
