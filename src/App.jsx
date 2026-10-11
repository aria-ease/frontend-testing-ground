import ComponentTestHarness from "./ComponentTestHarness";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test-harness" element={<ComponentTestHarness />} />
      </Routes>
    </Router>
  )
}

export default App