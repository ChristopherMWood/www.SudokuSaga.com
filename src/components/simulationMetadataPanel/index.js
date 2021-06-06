import React, { useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

function SimulationMetadataPanel(props) {
    return (
        <div className="simulation-metadata-container">
            <div className="metadata-section">
                <div>Current Step: {props.runMetadata.currentStep}</div>
            </div>
            <div className="metadata-section">
                <label className="section-title">Function Calls</label>
                <div className="info-pane">SetCell(): {props.runMetadata.calls.setCell}</div>
                <div className="info-pane">GetSection(): {props.runMetadata.calls.getSection}</div>
                <div className="info-pane">GetRow(): {props.runMetadata.calls.getRow}</div>
                <div className="info-pane">GetColumn(): {props.runMetadata.calls.getColumn}</div>
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