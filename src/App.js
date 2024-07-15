import Home from './home/Home';
import Questionnaire from './questionnaire/questionnaire';
import TestResult from './test-result/testResult';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="container mx-auto my-4 prose">
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
