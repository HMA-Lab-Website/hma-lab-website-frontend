// src/components/layout/Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-firefly text-iron py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <p className="mt-4">
                            Department of Computer Science
                            <br />
                            University Address
                            <br />
                            Email: lab@university.edu
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="/publications">Publications</a>
                            </li>
                            <li>
                                <a href="/projects">Projects</a>
                            </li>
                            <li>
                                <a href="/resources">Resources</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="mt-4 flex space-x-4">
                            {/* social media icons here */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
