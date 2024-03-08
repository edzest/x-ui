import './App.css';
import Questionnaire from './questionnaire';
import TestResult from './testResult';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Questionnaire />} />
          <Route path="/result" element={<TestResult />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
