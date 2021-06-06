import React, { useState } from 'react';
import { connect } from 'react-redux'

function SimulationMetadataPanel(props) {
    return (
        <div>
            <div className="metadata-section">
                <div>Current Step: {props.runMetadata.currentStep}</div>
            </div>
            <div className="metadata-section">
                <label>Function Calls</label>
                <div>SetCell(): {props.runMetadata.calls.setCell}</div>
                <div>GetSection(): {props.runMetadata.calls.getSection}</div>
                <div>GetRow(): {props.runMetadata.calls.getRow}</div>
                <div>GetColumn(): {props.runMetadata.calls.getColumn}</div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        runMetadata: {
            currentStep: state.runMetadata.currentStep,
            calls: {
                setCell: state.runMetadata.calls.setCell,
                getSection: state.runMetadata.calls.getSection,
                getRow: state.runMetadata.calls.getRow,
                getColumn: state.runMetadata.calls.getColumn
            }
        }
    }
}

export default connect(mapStateToProps)(SimulationMetadataPanel);