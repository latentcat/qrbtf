import React, {useCallback, useEffect} from 'react';
import './App.css';
import '../Qrcode.css';
import PartFooter from "./PartFooter";
import PartHeader from "./PartHeader";
import PartMore from "./PartMore";
import PartParams from "./PartParams";
import PartDownloadViewer from "../../containers/app/PartDownloadViewer";
import PartStylesViewer from "../../containers/app/PartStylesViewer";
import {getDownloadCount, login} from "../../api/TcbHandler";
import {connect} from 'react-redux';
import {loadDownloadData} from "../../actions";
import ReactGA from 'react-ga';
import {setScrollbarWidthProp} from "../../utils/util"

ReactGA.initialize('UA-165845289-1');

ReactGA.addTrackers(
    [
        {
            trackingId: 'UA-165845289-1',
            gaOptions: {
                name: 'trackerUA',
            }
        },
        {
            trackingId: 'G-XKEWNQ1T0E',
            gaOptions: { name: 'trackerG' }
        }
    ],
    { alwaysSendToDefaultTracker: false }
);

function App({ dispatch }) {
    const updateDownloadData = useCallback((downloadData) => dispatch(loadDownloadData(downloadData)), []);
    setScrollbarWidthProp()

    useEffect(() => {
        login().then(() => {
            getDownloadCount((res) => {
                let downloadData = [];
                res.data.forEach((item) => {
                    downloadData[item.value] = item.count;
                });
                dispatch(loadDownloadData(downloadData));
            });
        })
    })

    return (
        <div className="App">
            <header className="App-header">
                <div className="Layout">
                    <div className="Qr-outer">
                        <PartHeader/>
                        <PartStylesViewer/>
                        <PartParams/>
                        <PartDownloadViewer updateDownloadData={updateDownloadData}/>
                        <PartMore/>
                        <PartFooter/>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default connect()(App);
