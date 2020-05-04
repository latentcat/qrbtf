let seed = 0;

export function srand(sd) {
    seed = sd;
}

export function rand(min, max) {
    seed = (seed * 9301 + 49297) % 233280;
    return min + (seed / 233280.0) * (max - min);
}

export function randRGB() {
    let randNum = rand(50,230);
    let rgb = [];
    rgb.push(
        'rgb(' + String(20 + randNum) + ',' + String(170 - randNum / 2) + ',' + String(60 + randNum * 2) + ')'
    )
    rgb.push(
        'rgb(' + String(-20 + randNum) + ',' + String(130 - randNum / 2) + ',' + String(20 + randNum * 2) + ')'
    )
    return rgb;
}

export function isWeiXin(){
    const ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
