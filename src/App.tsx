import Layout from "./Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/hello" element={<div>Another page</div>} />
          <Route path="/" element={<div>Hello World</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
