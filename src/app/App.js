import React from "react";
import SudokuBoard from 'components/sudokuBoard';
import CodeEditor from 'components/codeEditor';
import Docs from 'components/docs';
import Leaderboard from 'components/leaderboard';
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

function App() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className="app">
      <div className="site-header">
        <h2>Sudoku Saga</h2>
      </div>
      <div className="board-container">
        <SudokuBoard />
      </div>
      <div className="simulation-controls-container">
        <label>This is a test</label>
      </div>
      <div className="interaction-container">
        <AppBar position="static" color="default" >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="<> Code" {...a11yProps(0)} />
            <Tab label="Docs" {...a11yProps(1)} />
            <Tab label="Leaderboard" {...a11yProps(2)} />
            <Tab label="About" {...a11yProps(3)} />
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
            <Leaderboard />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <About />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export default App;
