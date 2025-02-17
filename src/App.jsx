// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/Layout";

function App() {
    return (
        <Router>
            <Layout>
                {/* this content will be passed as children to Layout */}
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-firefly mb-8">
                        Welcome to HMA Lab
                    </h1>

                    {/* hero section */}
                    <div className="bg-iron p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-semibold text-san-juan mb-4">
                            Research Areas
                        </h2>
                        <p className="text-nevada">
                            Our lab focuses on cutting-edge research in machine
                            learning, computer vision, and artificial
                            intelligence.
                        </p>
                    </div>

                    {/* news section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-san-juan mb-4">
                            Latest News
                        </h2>
                        <ul className="space-y-4">
                            <li className="text-nevada">
                                <span className="text-casal font-medium">
                                    March 2024:
                                </span>{" "}
                                New paper accepted at top conference
                            </li>
                            <li className="text-nevada">
                                <span className="text-casal font-medium">
                                    February 2024:
                                </span>{" "}
                                Lab received new GPU cluster
                            </li>
                        </ul>
                    </div>
                </div>
            </Layout>
        </Router>
    );
}

export default App;
