import React from 'react';
import './App.css';
import '../Qrcode.css';
import Footer from "../footer/Footer";
import Header from "../header/Header";
import PartInput from "./PartInput";
import PartStyles from "./PartStyles";
import PartMore from "./PartMore";
import PartParams from "./PartParams";
import PartDownload from "./PartDownload";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="Qr-outer">
                    <Header/>
                    <PartInput/>
                    <PartStyles/>
                    <PartParams/>
                    <PartDownload/>
                    <PartMore/>
                    <Footer/>
                </div>
            </header>
        </div>
    );
}

export default App;
