import React from 'react';
import './App.css';
import '../Qrcode.css';
import Footer from "../footer/Footer";
import Header from "../header/Header";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="Qr-outer">
                    <Header/>

                    <Footer/>
                </div>
            </header>
        </div>
    );
}

export default App;
