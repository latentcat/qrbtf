import React from "react";

const Renderer = ({ rendererType, ...other }) => (
    React.createElement(rendererType, other)
)

function areEqual(prevProps, nextProps) {
    return !(prevProps.selected == true || nextProps.selected == true)
}

export default React.memo(Renderer, areEqual)
