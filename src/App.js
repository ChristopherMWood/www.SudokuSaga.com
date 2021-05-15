import './App.scss';
import SudokuBoard from 'components/sudokuBoard';

function App() {
  return (
    <div className="App">
      <div className="editorContainer">
        <SudokuBoard />
      </div>
    </div>
  );
}

export default App;
