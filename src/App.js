import React from "react";
import SudokuBoard from 'components/sudokuBoard';
import CodeEditor from 'components/codeEditor';
import Docs from 'components/docs';
import About from 'components/about';

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from "@material-ui/core/Box";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

function changeBoard() {
  
}

function App() {
  const [value, setValue] = React.useState(0);
  const [stepSpeed, setStepSpeed] = React.useState(500);
  const [paused, setPausedState] = React.useState(true);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function onPlayPausePressed() {
    setPausedState(!paused);
  }

  function changeStepSpeed(event) {
    setStepSpeed(event.target.value);
  }


  let playPauseButtonClass = "fa-play";

  if (!paused) {
    playPauseButtonClass = "fa-pause";
  }

  return (
    <div className="app">
      <header className="site-header">
        <h2>Sudoku Saga</h2>
      </header>
      <div className="board-container">
        <SudokuBoard />
        <div className="board-selection-container">
          <label>Difficulty:</label>             
          <select onChange={changeBoard} name="board-difficulty" id="board-difficulty">
              <option value="easy">Easy</option>
              <option value="easy">Medium</option>
              <option value="easy">Hard</option>
          </select>
        </div>
        <div className="board-controls">
          <button onClick={onPlayPausePressed} className="btn left-button"><i className={"fa " + playPauseButtonClass} title=""></i></button>
          <button className="btn"><i className="fa fa-step-backward" title="Step back"></i></button>
          <button className="btn"><i className="fa fa-step-forward" title="Step forward"></i></button>
          <div className="speed-controls">
            <label>{"Step Speed: " + stepSpeed + "ms"}</label>
            <input onChange={changeStepSpeed} type="range" min="1" max="2500" value={stepSpeed}></input>
          </div>
          <button className="btn push"><i className="fa fa-undo" title="Reset board"></i></button>
        </div>
      </div>
      <div className="simulation-controls-container">
      </div>
      <div className="interaction-container">
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="<> Code" {...a11yProps(0)} />
            <Tab label="Docs" {...a11yProps(1)} />
            <Tab label="About" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div className="scrollable-contents">
          <TabPanel value={value} index={0}>
            <CodeEditor />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Docs />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <About />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
