import React from 'react';

const ImageZoom = (props) => {
    const zoomRef = React.useRef(props.zoom.clone(props));

    function attachZoom(image) {
        zoomRef.current.attach(image);
    }

    return <img ref={attachZoom} {...props} />
};

export default ImageZoom;
