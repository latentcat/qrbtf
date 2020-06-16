import ReactGA from "react-ga";

export function handleStyle(rendererName) {
    ReactGA.event({
        category: 'Style',
        action: 'Switch',
        label: rendererName
    });
}

export function handleDownloadEvent(rendererName, value) {
    ReactGA.event({
        category: 'Style',
        action: 'Download',
        label: rendererName,
        value: value
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
