import React from 'react';
import {handleZoom} from "../../utils/gaHelper";

const ImageZoom = ({ zoom, ...other }) => {
    const zoomRef = React.useRef(zoom.clone(other));
    zoomRef.current.on('open', event => {handleZoom(event.target.src)})


    function attachZoom(image) {
        zoomRef.current.attach(image);
    }

    return <img ref={attachZoom} {...other} />
};

export default ImageZoom;
