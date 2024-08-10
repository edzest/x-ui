import Home from './home/Home';
import Landing from './landing/Landing';
import Questionnaire from './questionnaire/questionnaire';
import Solution from './solution/Solution';
import TestResult from './test-result/testResult';
import MultiSelectQuestion from './multi-select-question/MultiSelectQuestion';
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
          <Route path="/solution" element={<Solution />} />
          <Route path="/multi" element={<MultiSelectQuestion answer={[1,2]}/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
