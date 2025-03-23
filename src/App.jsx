// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Publications from "./pages/Publications";
import Projects from "./pages/Projects";
import Datasets from "./pages/Datasets";
import Resources from "./pages/Resources";
import People from "./pages/People";
import Faculty from "./pages/people/Faculty";
import PhDScholars from "./pages/people/PhDScholars";
import HonorsStudents from "./pages/people/HonorsStudents";
import Students from "./pages/people/Students";
import Alumni from "./pages/people/Alumni";
import Contact from "./pages/Contact";
import Research from "./pages/Research";
import News from "./pages/News";
import Careers from "./pages/Careers";

// Admin Routes
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPublications from "./pages/admin/AdminPublications";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminDatasets from "./pages/admin/AdminDatasets";
import AdminResources from "./pages/admin/AdminResources";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminPhDScholars from "./pages/admin/AdminPhDScholars";
import AdminHonorsStudents from "./pages/admin/AdminHonorsStudents";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminAlumni from "./pages/admin/AdminAlumni";
import AdminNews from "./pages/admin/AdminNews";
import Current from "./pages/people/Current";
import AdminSettings from "./pages/admin/AdminSettings";

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/publications"
                    element={
                        <Layout>
                            <Publications />
                        </Layout>
                    }
                />
                <Route
                    path="/careers"
                    element={
                        <Layout>
                            <Careers />
                        </Layout>
                    }
                />
                <Route
                    path="/research"
                    element={
                        <Layout>
                            <Research />
                        </Layout>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <Layout>
                            <Projects />
                        </Layout>
                    }
                />
                <Route
                    path="/datasets"
                    element={
                        <Layout>
                            <Datasets />
                        </Layout>
                    }
                />
                <Route
                    path="/resources"
                    element={
                        <Layout>
                            <Resources />
                        </Layout>
                    }
                />
                <Route
                    path="/people"
                    element={
                        <Layout>
                            <People />
                        </Layout>
                    }
                />
                <Route
                    path="/people/faculty"
                    element={
                        <Layout>
                            <Faculty />
                        </Layout>
                    }
                />
                <Route
                    path="/people/phd-scholars"
                    element={
                        <Layout>
                            <PhDScholars />
                        </Layout>
                    }
                />
                <Route
                    path="/people/honors-students"
                    element={
                        <Layout>
                            <HonorsStudents />
                        </Layout>
                    }
                />
                <Route
                    path="/people/students"
                    element={
                        <Layout>
                            <Students />
                        </Layout>
                    }
                />
                <Route
                    path="/people/alumni"
                    element={
                        <Layout>
                            <Alumni />
                        </Layout>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <Layout>
                            <Contact />
                        </Layout>
                    }
                />
                <Route
                    path="/news"
                    element={
                        <Layout>
                            <News />
                        </Layout>
                    }
                />
                <Route
                    path="/people/current"
                    element={
                        <Layout>
                            <Current />
                        </Layout>
                    }
                />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={
                        <AdminLayout>
                            <AdminDashboard />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/publications"
                    element={
                        <AdminLayout>
                            <AdminPublications />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/projects"
                    element={
                        <AdminLayout>
                            <AdminProjects />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/datasets"
                    element={
                        <AdminLayout>
                            <AdminDatasets />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/resources"
                    element={
                        <AdminLayout>
                            <AdminResources />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/faculty"
                    element={
                        <AdminLayout>
                            <AdminFaculty />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/phd-scholars"
                    element={
                        <AdminLayout>
                            <AdminPhDScholars />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/honors-students"
                    element={
                        <AdminLayout>
                            <AdminHonorsStudents />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/students"
                    element={
                        <AdminLayout>
                            <AdminStudents />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/alumni"
                    element={
                        <AdminLayout>
                            <AdminAlumni />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/news"
                    element={
                        <AdminLayout>
                            <AdminNews />
                        </AdminLayout>
                    }
                />
                <Route
                    path="/admin/settings"
                    element={
                        <AdminLayout>
                            <AdminSettings />
                        </AdminLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
