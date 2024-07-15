import Home from './home/Home';
import Landing from './landing/Landing';
import Questionnaire from './questionnaire/questionnaire';
import TestResult from './test-result/testResult';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* home can be moved to landing page later */}
          <Route path="/home" element={<Home />} />
          <Route path="/test/:id" element={<Questionnaire/>} />
          <Route path="/result" element={<TestResult />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
