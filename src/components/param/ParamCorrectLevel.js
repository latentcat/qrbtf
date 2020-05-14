import React from 'react';
import PropTypes from 'prop-types'
import '../Qrcode.css';

const ParamCorrectLevel = ({value, onChange}) => (
    <table className="Qr-table">
        <tbody>
        <tr>
            <td>容错率</td>
            <td>
                <select
                    className="Qr-select"
                    value={value}
                    onChange={onChange}>
                    <option value={1}>7%</option>
                    <option value={0}>15%</option>
                    <option value={3}>25%</option>
                    <option value={2}>30%</option>
                </select>
            </td>
        </tr>
        </tbody>
    </table>
)

ParamCorrectLevel.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ParamCorrectLevel;
