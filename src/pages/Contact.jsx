// src/pages/Contact.jsx
import React, { useState } from "react";
import { SectionHeader, Button } from "../components/common";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState({
        submitted: false,
        success: false,
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({
            submitted: true,
            success: false,
            message: "Sending message...",
        });

        // This is a placeholder for actual form submission
        // Replace with actual API call when backend is ready -- when ???

        setTimeout(() => {
            setStatus({
                submitted: true,
                success: true,
                message: "Thank you! Your message has been received.",
            });
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Contact Us"
                subtitle="Get in touch with our research team"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-md p-8 order-2 md:order-1">
                    <h3 className="text-2xl font-semibold text-firefly mb-6">
                        Lab Location
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-lg font-medium text-casal mb-2">
                                Address
                            </h4>
                            <p className="text-nevada">
                                HMA Lab, Room 214
                                <br />
                                Department of Computer Science
                                <br />
                                IIIT Sri City
                                <br />
                                Sri City, Andhra Pradesh
                                <br />
                                India - 517646
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-casal mb-2">
                                Contact Information
                            </h4>
                            <p className="text-nevada">
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:hmadata@iiits.in"
                                    className="text-casal hover:text-gothic transition-colors"
                                >
                                    hmadata@iiits.in
                                </a>
                                <br />
                                <strong>Phone:</strong> +91 1234 567890
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-casal mb-2">
                                Office Hours
                            </h4>
                            <p className="text-nevada">
                                Monday - Friday: 9:00 AM - 5:00 PM
                                <br />
                                Saturday & Sunday: Closed
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-lg font-medium text-casal mb-4">
                            Connect With Us
                        </h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-iron/10 p-3 rounded-full text-nevada hover:text-casal transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="bg-iron/10 p-3 rounded-full text-nevada hover:text-casal transition-colors"
                                aria-label="Twitter"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="bg-iron/10 p-3 rounded-full text-nevada hover:text-casal transition-colors"
                                aria-label="GitHub"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-md p-8 order-1 md:order-2">
                    <h3 className="text-2xl font-semibold text-firefly mb-6">
                        Send Us a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-nevada mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-iron rounded-lg focus:outline-none focus:ring-2 focus:ring-casal/50"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-nevada mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-iron rounded-lg focus:outline-none focus:ring-2 focus:ring-casal/50"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-nevada mb-1"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-iron rounded-lg focus:outline-none focus:ring-2 focus:ring-casal/50"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-nevada mb-1"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-2 border border-iron rounded-lg focus:outline-none focus:ring-2 focus:ring-casal/50"
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                variant="secondary"
                                className="w-full"
                                disabled={status.submitted && !status.success}
                            >
                                {status.submitted && !status.success
                                    ? "Sending..."
                                    : "Send Message"}
                            </Button>
                        </div>
                    </form>

                    {status.submitted && (
                        <div
                            className={`mt-4 p-4 rounded-lg ${
                                status.success
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                            {status.message}
                        </div>
                    )}
                </div>
            </div>

            {/* Map */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-2">
                <h3 className="text-2xl font-semibold text-firefly mb-4 px-6 pt-6">
                    Find Us
                </h3>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.089057397898!2d79.9711089748946!3d13.52584268790472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d73ee76be5b27%3A0x9c469a7814b36424!2sIndian%20Institute%20of%20Information%20Technology%20Sri%20City!5e0!3m2!1sen!2sin!4v1710845580906!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lab Location Map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
