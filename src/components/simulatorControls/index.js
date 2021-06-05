import React, { useState } from 'react';
import { connect } from 'react-redux'

function SimulatorControls(props) {
    const [stepSpeed, setStepSpeed] = useState(500);

    function simulationBoardOnChange(event) {
        window.store.dispatch({
            type: "CHANGE_BOARD",
            payload: { 
                board: event.target.value
            }
        });
    }

    function onPlayPauseClicked() {
        window.store.dispatch({
            type: "PLAY_PAUSE",
            payload: { 
                stepSpeed: stepSpeed
            }
        });
    }

    function stepSpeedOnChange(event) {
        setStepSpeed(event.target.value);
    }
    
    function stepBackwardsClicked() {
        window.store.dispatch({type: "STEP_BACK"});
    }

    function stepForwardClicked() {
        window.store.dispatch({type: "STEP_FORWARD"});
    }

    function resetClicked() {
        window.store.dispatch({type: "RESET_BOARD"});
    }

    let controlsDisabled = props.playing || props.gameWon;
    let stepBackDisabled = controlsDisabled || props.currentStep === 0;

    return (
        <div>
            <div className="board-selection-container">
                <label>Difficulty:</label>             
                <select onChange={simulationBoardOnChange} name="board-difficulty" id="board-difficulty" disabled={props.playing}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div className="board-controls">
                <button onClick={onPlayPauseClicked} className="btn left-button" disabled={props.gameWon}>
                    <i className={"fa " + (props.playing ? "fa-pause" : "fa-play")} title=""></i>
                </button>
                <button className="btn" onClick={stepBackwardsClicked} disabled={stepBackDisabled}>
                    <i className="fa fa-step-backward" title="Step back"></i>
                </button>
                <button className="btn" onClick={stepForwardClicked} disabled={controlsDisabled}>
                    <i className="fa fa-step-forward" title="Step forward"></i>
                </button>
                <div className="speed-controls">
                    <label>{"Step Speed: " + stepSpeed + "ms"}</label>
                    <input onChange={stepSpeedOnChange} type="range" min="1" max="2500" value={stepSpeed} disabled={controlsDisabled}></input>
                </div>
                <button className="btn push" onClick={resetClicked}>
                    <i className="fa fa-undo" title="Reset board"></i>
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { 
        gameWon: state.gameWon,
        playing: state.playing,
        currentStep: state.currentStep
    }
}

export default connect(mapStateToProps)(SimulatorControls);