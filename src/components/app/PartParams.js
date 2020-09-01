import React from 'react';
import './App.css';
import ParamListViewer from "../../containers/param/ParamListViewer";
import ParamCorrectLevelViewer from "../../containers/param/ParamCorrectLevelViewer";
import ParamIconViewer from "../../containers/param/disposable/ParamIconViewer";

const PartParams = () => (
    <div className="Qr-titled-nobg">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Parameters</div>
            <p className="Qr-s-subtitle">参数调整</p>
        </div>
        <div className="Qr-Centered">
            <div className="Qr-div-table">
                <ParamCorrectLevelViewer/>
                <ParamIconViewer/>
                <ParamListViewer/>
            </div>
        </div>
    </div>
)

export default PartParams;
