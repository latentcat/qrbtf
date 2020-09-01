import ReactGA from "react-ga";

export function handleStyle(rendererName) {
    ReactGA.event({
        category: 'Style',
        action: 'Switch',
        label: rendererName
    });
}

export function handleDownloadSvg(rendererName) {
    ReactGA.event({
        category: 'Style',
        action: 'DownloadSvg',
        label: rendererName,
    });
}

export function handleDownloadImg(rendererName, type) {
    ReactGA.event({
        category: 'Style',
        action: 'Download' + type.charAt(0).toUpperCase() + type.slice(1),
        label: rendererName,
    });
}

export function handleParam(rendererName, paramName) {
    ReactGA.event({
        category: 'Param',
        action: rendererName,
        label: paramName,
    });
}

export function handleLink(link) {
    ReactGA.event({
        category: 'Link',
        action: 'Click',
        label: link,
    });
}

export function handleUpload() {
    ReactGA.event({
        category: 'URL',
        action: 'Upload',
    });
}

export function handleInputUrl() {
    ReactGA.event({
        category: 'URL',
        action: 'Input',
    });
}

export function handleScroll(label) {
    ReactGA.event({
        category: 'ScrollContainer',
        action: 'Scroll',
        label: label
    });
}

export function handleZoom(url) {
    ReactGA.event({
        category: 'Image',
        action: 'Zoom',
        label: url
    });
}
