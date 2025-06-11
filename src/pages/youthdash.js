import React from "react"

import "./style.css"

export const Youth = () => {
    return (
        <div id="webcrumbs">
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <div className="container mx-auto max-w-7xl">
                    <header className="flex justify-end gap-3 mb-8">
                        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 transition duration-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">search</span>
                            Job Searches
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 transition duration-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">settings</span>
                            Profile Settings
                        </button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-8 lg:col-span-9">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Applications</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary-600">
                                                business_center
                                            </span>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                            Active
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">Tech Innovations</h3>
                                    <p className="text-sm text-gray-600 mt-1">Software Developer</p>
                                    <p className="text-xs text-gray-500 mt-1">Status: Interview Scheduled</p>
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition duration-200">
                                            View Details
                                        </button>
                                    </div>
                                    {/* Next: "Add application timeline" */}
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-purple-600">palette</span>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                            New
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">Creative Solutions</h3>
                                    <p className="text-sm text-gray-600 mt-1">Graphic Designer</p>
                                    <p className="text-xs text-gray-500 mt-1">Status: Portfolio Review</p>
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition duration-200">
                                            View Details
                                        </button>
                                    </div>
                                    {/* Next: "Add application progress bar" */}
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-green-600">landscape</span>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                            Pending
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800">GreenTech</h3>
                                    <p className="text-sm text-gray-600 mt-1">Environmental Engineer</p>
                                    <p className="text-xs text-gray-500 mt-1">Status: Evaluation Submitted</p>
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <button className="text-primary-600 text-sm font-medium hover:text-primary-700 transition duration-200">
                                            View Details
                                        </button>
                                    </div>
                                    {/* Next: "Add application deadline countdown" */}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-4 lg:col-span-3">
                            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>

                                <div className="space-y-4">
                                    <div className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                                        <p className="text-sm text-gray-700">
                                            Your application for Software Developer at Tech Innovations has been updated
                                            to Interview Scheduled.
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                    </div>

                                    <div className="p-3 bg-green-50 rounded-md border-l-4 border-green-400">
                                        <p className="text-sm text-gray-700">
                                            New job alert: Graphic Designer at Creative Solutions.
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                    </div>

                                    <div className="p-3 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
                                        <p className="text-sm text-gray-700">
                                            Reminder: update your profile to increase visibility.
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                                    </div>
                                </div>

                                <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 transition duration-200">
                                    View all notifications
                                </button>
                                {/* Next: "Add notification preferences section" */}
                            </div>
                        </div>
                    </div>

                    <footer className="mt-12 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <div className="md:col-span-6">
                                <p className="text-gray-600 text-sm">Contact us:</p>
                                <p className="text-gray-800 font-medium">Phone: +123-456-7890</p>
                                <p className="text-gray-800 font-medium">Email: support@jobtracker.com</p>
                                {/* Next: "Add contact form link" */}
                            </div>

                            <div className="md:col-span-6 flex justify-end">
                                <p className="text-gray-600 text-sm mr-4">Follow Us:</p>
                                <div className="flex space-x-3">
                                    <a
                                        href=" https://www.facebook.com"
                                        className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
                                    >
                                        <i className="fa-brands fa-facebook text-gray-700"></i>
                                    </a>
                                    <a
                                        href=" https://www.twitter.com"
                                        className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
                                    >
                                        <i className="fa-brands fa-twitter text-gray-700"></i>
                                    </a>
                                    <a
                                        href=" https://www.linkedin.com"
                                        className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200"
                                    >
                                        <i className="fa-brands fa-linkedin text-gray-700"></i>
                                    </a>
                                </div>
                                {/* Next: "Add newsletter subscription" */}
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Youth