import {ParamTypes} from "../constant/ParamTypes";
let seed = 0;

let idNum = 0;

export function rand(min, max) {
    seed = (seed * 9301 + 49297) % 233280;
    return min + (seed / 233280.0) * (max - min);
}

export function getIdNum() {
    idNum += 1
    return idNum.toString()
}

export function fillEmptyWith(arr, value) {
    for (let i = 0; i < arr.length; i++)
        if (!arr[i]) arr[i] = value;
    return arr;
}

export function getParamDetailedValue(item, paramValue) {
    if (item.type === ParamTypes.SELECTOR) return item.choices[paramValue];
    return paramValue;
}

export function outerHtml(selectedIndex) {
    return document.getElementsByClassName('Qr-item-svg')[selectedIndex].outerHTML;
}

export function getExactValue(value, defaultValue) {
    if (typeof value != "string") return value;
    if (value.length <= 0) value = defaultValue;
    if (!isNaN(value)) value = parseInt(value);
    return value;
}

export function extend(target, options) {
    for (let name in options) {
        target[name] = options[name]
    }
    return target
}

function getScrollbarWidth() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

}

export function setScrollbarWidthProp() {
    document.documentElement.style.setProperty('--scrollbar-width', getScrollbarWidth() + "px");
}
