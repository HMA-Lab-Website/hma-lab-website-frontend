import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/publications" element={<Publications />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/contact" element={<Contact />} /> */}
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
