import React from "react"

import "./admin.css"

export const Admin = () => {
    return (
        <div id="webcrumbs">
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="w-36 bg-indigo-800 text-white flex flex-col">
                    <div className="p-5 flex items-center">
                        <span className="text-xl font-semibold">Jiijenge HustleApp</span>
                    </div>

                    <div className="flex-1">
                        <div className="px-4 py-3 flex items-center space-x-3 border-l-4 border-white bg-indigo-700">
                            <i className="material-symbols-outlined">home</i>
                            <span className="text-sm">Dashboard</span>
                        </div>

                        <div className="px-4 py-3 flex items-center space-x-3">
                            <i className="material-symbols-outlined">search</i>
                            <span className="text-sm">Search Job</span>
                        </div>

                        <div className="px-4 py-3 flex items-center space-x-3">
                            <i className="material-symbols-outlined">description</i>
                            <span className="text-sm">Applications</span>
                        </div>

                        <div className="px-4 py-3 flex items-center space-x-3">
                            <i className="material-symbols-outlined">mail</i>
                            <span className="text-sm">Message</span>
                        </div>

                        <div className="px-4 py-3 flex items-center space-x-3">
                            <i className="material-symbols-outlined">bar_chart</i>
                            <span className="text-sm">Statistics</span>
                        </div>

                        <div className="px-4 py-3 flex items-center space-x-3">
                            <i className="material-symbols-outlined">feed</i>
                            <span className="text-sm">News</span>
                        </div>
                    </div>

                    <div className="p-4 text-xs text-gray-300 mt-auto">
                        <div>Jobie Job Portal Admin Dashboard</div>
                        <div>© 2022 All Rights Reserved</div>
                        <div className="mt-2 flex items-center">
                            <span>Made with</span>
                            <i className="material-symbols-outlined text-red-500 mx-1 text-sm">favorite</i>
                            <span>by DexignZone</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="bg-white p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center">
                            <button className="p-2 mr-2">
                                <i className="material-symbols-outlined">menu</i>
                            </button>
                            <h1 className="font-semibold">Dashboard</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search something here..."
                                    className="bg-gray-100 rounded-full px-4 py-1 w-56 text-sm"
                                />
                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <i className="material-symbols-outlined text-gray-400">search</i>
                                </button>
                            </div>

                            <div className="relative">
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full text-white text-xs flex items-center justify-center">
                                    2
                                </span>
                                <button className="p-2">
                                    <i className="material-symbols-outlined">notifications</i>
                                </button>
                            </div>

                            <div className="relative">
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full text-white text-xs flex items-center justify-center">
                                    5
                                </span>
                                <button className="p-2">
                                    <i className="material-symbols-outlined">mail</i>
                                </button>
                            </div>

                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                    <img
                                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlfGVufDB8fHx8MTc0OTQzNzk3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">Oda Dink</div>
                                    <div className="text-xs text-gray-400">Super Admin</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="p-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-indigo-600 text-white p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <div className="text-sm mb-1">Interviews Schedule</div>
                                    <div className="text-3xl font-bold">86</div>
                                </div>
                                <div className="bg-indigo-500 p-3 rounded-lg">
                                    <i className="material-symbols-outlined">calendar_month</i>
                                </div>
                            </div>

                            <div className="bg-blue-400 text-white p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <div className="text-sm mb-1">Application Sent</div>
                                    <div className="text-3xl font-bold">75</div>
                                </div>
                                <div className="bg-blue-300 p-3 rounded-lg">
                                    <i className="material-symbols-outlined">work</i>
                                </div>
                            </div>

                            <div className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <div className="text-sm mb-1">Profile Viewed</div>
                                    <div className="text-3xl font-bold">45,673</div>
                                </div>
                                <div className="bg-green-400 p-3 rounded-lg">
                                    <i className="material-symbols-outlined">person</i>
                                </div>
                            </div>

                            <div className="bg-green-400 text-white p-4 rounded-lg flex items-center justify-between">
                                <div>
                                    <div className="text-sm mb-1">Unread Message</div>
                                    <div className="text-3xl font-bold">93</div>
                                </div>
                                <div className="bg-green-300 p-3 rounded-lg">
                                    <i className="material-symbols-outlined">mail</i>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section */}
                        <div className="grid grid-cols-12 gap-6 mb-6">
                            {/* Profile Card */}
                            <div className="col-span-3 bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex flex-col items-center mb-4">
                                    <div className="w-20 h-20 rounded-full border-4 border-indigo-600 p-1 mb-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwyfHxwcm9maWxlfGVufDB8fHx8MTc0OTQzNzk3OXww&ixlib=rb-4.1.0&q=80&w=1080"
                                            className="w-full h-full rounded-full"
                                            alt="Profile"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-lg">Oda Dink</h3>
                                    <p className="text-sm text-gray-500">Programmer</p>
                                </div>

                                <div className="flex justify-around mb-4">
                                    <div className="text-center">
                                        <div className="inline-block relative">
                                            <svg className="w-14 h-14" viewBox="0 0 36 36">
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="16"
                                                    fill="none"
                                                    stroke="#e0e0e0"
                                                    strokeWidth="2"
                                                ></circle>
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="16"
                                                    fill="none"
                                                    stroke="#f97316"
                                                    strokeWidth="2"
                                                    strokeDasharray="100"
                                                    strokeDashoffset="35"
                                                    transform="rotate(-90 18 18)"
                                                ></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                                                65%
                                            </div>
                                        </div>
                                        <div className="text-sm">PHP</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="inline-block relative">
                                            <svg className="w-14 h-14" viewBox="0 0 36 36">
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="16"
                                                    fill="none"
                                                    stroke="#e0e0e0"
                                                    strokeWidth="2"
                                                ></circle>
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="16"
                                                    fill="none"
                                                    stroke="#10b981"
                                                    strokeWidth="2"
                                                    strokeDasharray="100"
                                                    strokeDashoffset="65"
                                                    transform="rotate(-90 18 18)"
                                                ></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                                                35%
                                            </div>
                                        </div>
                                        <div className="text-sm">Rails</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="inline-block relative">
                                            <svg className="w-14 h-14" viewBox="0 0 36 36">
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="16"
                                                    fill="none"
                                                    stroke="#e0e0e0"
                                                    strokeWidth="2"
                                                ></circle>
                                                <circle
                                                    cx="18"
                                                    cy="18"
                                                    r="16"
                                                    fill="none"
                                                    stroke="#10b981"
                                                    strokeWidth="2"
                                                    strokeDasharray="100"
                                                    strokeDashoffset="35"
                                                    transform="rotate(-90 18 18)"
                                                ></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-sm">
                                                65%
                                            </div>
                                        </div>
                                        <div className="text-sm">Laravel</div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">Recent Activities</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                                                <i className="material-symbols-outlined text-indigo-600">work</i>
                                            </div>
                                            <div className="text-sm">
                                                <p>Your application has been sent to 3 vacancy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                                                <i className="material-symbols-outlined text-indigo-600">work</i>
                                            </div>
                                            <div className="text-sm">
                                                <p>Your application has been sent to 3 vacancy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                                                <i className="material-symbols-outlined text-indigo-600">work</i>
                                            </div>
                                            <div className="text-sm">
                                                <p>Your application has been sent to 3 vacancy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                                                <i className="material-symbols-outlined text-indigo-600">work</i>
                                            </div>
                                            <div className="text-sm">
                                                <p>Your application has been sent to 3 vacancy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="col-span-9 bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold">Vacancy Stats</h3>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            <span className="inline-block w-3 h-3 rounded-full bg-indigo-600"></span>
                                            <span className="text-xs">Application Sent</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className="inline-block w-3 h-3 rounded-full bg-indigo-800"></span>
                                            <span className="text-xs">Interviews</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
                                            <span className="text-xs">Rejected</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <span className="text-xs">This Month</span>
                                            <i className="material-symbols-outlined text-xs">expand_more</i>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-2 flex flex-col justify-between h-48">
                                        <div className="text-xs text-gray-500">80</div>
                                        <div className="text-xs text-gray-500">60</div>
                                        <div className="text-xs text-gray-500">40</div>
                                        <div className="text-xs text-gray-500">20</div>
                                        <div className="text-xs text-gray-500">0</div>
                                    </div>

                                    <div className="col-span-10">
                                        <div className="h-48 relative">
                                            {/* Chart would be implemented here - using simple SVG to represent */}
                                            <svg className="w-full h-full">
                                                <path
                                                    d="M0,40 Q50,-10 100,60 T200,30 T300,70 T400,10 T500,60"
                                                    fill="none"
                                                    stroke="#6366f1"
                                                    strokeWidth="3"
                                                />
                                                <path
                                                    d="M0,100 Q50,130 100,80 T200,110 T300,90 T400,120 T500,80"
                                                    fill="none"
                                                    stroke="#10b981"
                                                    strokeWidth="3"
                                                />

                                                <circle cx="100" cy="60" r="4" fill="#6366f1" />
                                                <circle cx="200" cy="30" r="4" fill="#6366f1" />
                                                <circle cx="300" cy="70" r="4" fill="#6366f1" />
                                                <circle cx="400" cy="10" r="4" fill="#6366f1" />
                                                <circle cx="500" cy="60" r="4" fill="#6366f1" />

                                                <circle cx="100" cy="80" r="4" fill="#10b981" />
                                                <circle cx="200" cy="110" r="4" fill="#10b981" />
                                                <circle cx="300" cy="90" r="4" fill="#10b981" />
                                                <circle cx="400" cy="120" r="4" fill="#10b981" />
                                                <circle cx="500" cy="80" r="4" fill="#10b981" />
                                            </svg>

                                            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                                                <div>Week 01</div>
                                                <div>Week 02</div>
                                                <div>Week 03</div>
                                                <div>Week 04</div>
                                                <div>Week 05</div>
                                                <div>Week 06</div>
                                                <div>Week 07</div>
                                                <div>Week 08</div>
                                                <div>Week 09</div>
                                                <div>Week 10</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-4 text-sm">
                                    <div className="text-gray-500">July 23, 2020</div>
                                    <div className="flex space-x-6">
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-block w-3 h-3 rounded-full bg-indigo-600"></span>
                                            <span>37</span>
                                            <span className="text-xs text-gray-500">Application Sent</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                            <span>2</span>
                                            <span className="text-xs text-gray-500">Interviews</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Jobs Section */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="font-semibold mb-4">Recommended Jobs</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border rounded-lg p-4">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Maximoz Team</p>
                                            <h4 className="font-semibold">Database Programmer</h4>
                                        </div>
                                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                            <i className="material-symbols-outlined text-white">code</i>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 mb-2">
                                        <span className="text-indigo-600 font-semibold">$14,000</span>
                                        <span className="text-gray-500">-</span>
                                        <span className="text-indigo-600 font-semibold">$25,000</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="inline-block px-3 py-1 text-xs bg-gray-200 rounded-full mr-2">
                                                REMOTE
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">London, England</div>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Kleon in Cola Studios</p>
                                            <h4 className="font-semibold">Senior Programmer</h4>
                                        </div>
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                            <i className="material-symbols-outlined text-white">code</i>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 mb-2">
                                        <span className="text-indigo-600 font-semibold">$14,000</span>
                                        <span className="text-gray-500">-</span>
                                        <span className="text-indigo-600 font-semibold">$25,000</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="inline-block px-3 py-1 text-xs bg-pink-200 text-pink-700 rounded-full mr-2">
                                                PART TIME
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">Manchester, England</div>
                                    </div>
                                </div>

                                <div className="border rounded-lg p-4">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            <p className="text-xs text-gray-500">Maximoz Team</p>
                                            <h4 className="font-semibold">Intern UX Designer</h4>
                                        </div>
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                            <i className="material-symbols-outlined text-white">brush</i>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 mb-2">
                                        <span className="text-indigo-600 font-semibold">$14,000</span>
                                        <span className="text-gray-500">-</span>
                                        <span className="text-indigo-600 font-semibold">$25,000</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="inline-block px-3 py-1 text-xs bg-purple-200 text-purple-700 rounded-full mr-2">
                                                FULLTIME
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">Manchester, England</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Next: "Add a job filtering section with checkboxes for job types and skill requirements" */}
        </div>
    )
}
export default Admin;