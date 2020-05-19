import React from 'react';
import './App.css';
import '../Qrcode.css';
import PartFooter from "./PartFooter";
import PartHeader from "./PartHeader";
import PartMore from "./PartMore";
import PartParams from "./PartParams";
import PartDownloadViewer from "../../containers/app/PartDownloadViewer";
import PartStylesViewer from "../../containers/app/PartStylesViewer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="Layout">
                    <div className="Qr-outer">
                        <PartHeader/>
                        <PartStylesViewer/>
                        <PartParams/>
                        <PartDownloadViewer/>
                        <PartMore/>
                        <PartFooter/>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
