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

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

import { messages as enMessages } from '../../locales/en/messages'
import { messages as chMessages } from '../../locales/ch/messages'
import LanguageSwitcher from './langSwitcher';

i18n.load({
    en: enMessages,
    ch: chMessages,
})
i18n.activate('en')

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
            trackingId: 'G-3NKS6ZG27V',
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
                        <I18nProvider i18n={i18n}>
                            <LanguageSwitcher />
                            <PartHeader />
                            <PartStylesViewer />
                            <PartParams />
                            <PartDownloadViewer updateDownloadData={updateDownloadData} />
                            <PartMore />
                            <PartFooter />
                        </I18nProvider>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default connect()(App);
