import './App.css';
import Home from './home/Home';
import Questionnaire from './questionnaire';
import TestResult from './testResult';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:id" element={<Questionnaire />} />
          <Route path="/result" element={<TestResult />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
