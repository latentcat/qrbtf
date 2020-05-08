import React from 'react';
import './App.css';
import ParamListViewer from "../../containers/param/ParamListViewer";

const PartParams = () => (
    <div className="Qr-titled-nobg">
        <div className="Qr-Centered title-margin">
            <div className="Qr-s-title">Parameters</div>
            <p className="Qr-s-subtitle">参数调整</p>
        </div>
        <div className="Qr-Centered">
            <div className="Qr-div-table">
                <table className="Qr-table">
                    <tbody>
                    {/*<tr>*/}
                    {/*    <td>容错率</td>*/}
                    {/*    <td>*/}
                    {/*        <select*/}
                    {/*            className="Qr-select"*/}
                    {/*            value={this.state.correctLevel}*/}
                    {/*            onChange={(e) => {*/}
                    {/*                this.setState({correctLevel: parseInt(e.target.value)}, () => this.handleCreate())*/}
                    {/*            }}>*/}
                    {/*            <option value={1}>7%</option>*/}
                    {/*            <option value={0}>15%</option>*/}
                    {/*            <option value={3}>25%</option>*/}
                    {/*            <option value={2}>30%</option>*/}
                    {/*        </select>*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    <ParamListViewer/>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
)

export default PartParams;
