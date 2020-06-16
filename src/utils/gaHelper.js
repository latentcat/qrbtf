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

export function handleDownloadJpg(rendererName) {
    ReactGA.event({
        category: 'Style',
        action: 'DownloadJpg',
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
        category: 'Upload',
        action: 'Click',
    });
}

export function handleInputUrl() {
    ReactGA.event({
        category: 'Input',
        action: 'Focus',
    });
}