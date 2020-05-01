import React from 'react';
import './App.css';
import Layout from './containers/Layout'
import Qrcode from "./components/Qrcode";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Qrcode></Qrcode>
        </Layout>
      </header>
    </div>
  );
}

export default App;
