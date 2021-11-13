import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Series from "./pages/Series";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/series/:name" element={<Series />} />
          <Route path="/roadmap/:name" element={<Roadmap />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
