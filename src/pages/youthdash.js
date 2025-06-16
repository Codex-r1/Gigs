import React from "react";

import "./style.css";

const Youthdash = () => {
  return (
<div id="webcrumbs"> 
            <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <div className="text-center">
              <div className="relative mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Profile"
                  keywords="professional, headshot, business"
                  className="w-24 h-24 rounded-full mx-auto border-4 border-primary-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <h2 className="text-xl font-bold text-slate-800">John Anderson</h2>
              <p className="text-slate-600 mb-2">Senior Software Engineer</p>
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star_half</span>
                <span className="text-slate-600 ml-1">4.8</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-lg">email</span>
                <span>john.anderson@email.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-lg">phone</span>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">AWS</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Applications</span>
                <span className="font-semibold text-slate-800">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Interviews</span>
                <span className="font-semibold text-slate-800">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Bookmarks</span>
                <span className="font-semibold text-slate-800">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Profile Views</span>
                <span className="font-semibold text-slate-800">127</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  <span className="material-symbols-outlined">work</span>
                  Applications
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">bookmark</span>
                  Bookmarks
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">settings</span>
                  Settings
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">My Applications</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                  <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
                    <span className="material-symbols-outlined">sort</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop"
                        alt="Company Logo"
                        keywords="tech, company, logo"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-800">Senior React Developer</h3>
                        <p className="text-slate-600">TechCorp Inc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Under Review</span>
                      <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-600">
                    <span>Applied 3 days ago</span>
                    <span>$120,000 - $150,000</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                      Withdraw
                    </button>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=50&h=50&fit=crop"
                        alt="Company Logo"
                        keywords="startup, office, business"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-800">Full Stack Engineer</h3>
                        <p className="text-slate-600">StartupXYZ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Interview Scheduled</span>
                      <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-600">
                    <span>Applied 1 week ago</span>
                    <span>$90,000 - $120,000</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                      Interview Info
                    </button>
                  </div>
                </div>
                
                <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=50&h=50&fit=crop"
                        alt="Company Logo"
                        keywords="corporate, building, business"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-800">Software Architect</h3>
                        <p className="text-slate-600">Global Solutions Ltd.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Rejected</span>
                      <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-600">
                    <span>Applied 2 weeks ago</span>
                    <span>$140,000 - $180,000</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                      View Feedback
                    </button>
                    <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Bookmarked Jobs</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-yellow-500">bookmark</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">Frontend Developer</p>
                    <p className="text-sm text-slate-600">DesignStudio</p>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-primary-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-yellow-500">bookmark</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">DevOps Engineer</p>
                    <p className="text-sm text-slate-600">CloudTech</p>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-primary-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-yellow-500">bookmark</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">Product Manager</p>
                    <p className="text-sm text-slate-600">InnovateCorp</p>
                  </div>
                  <button className="p-1 text-slate-400 hover:text-primary-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Profile Settings</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-primary-500">edit</span>
                  <div>
                    <p className="font-medium text-slate-800">Edit Profile</p>
                    <p className="text-sm text-slate-600">Update your information</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-blue-500">security</span>
                  <div>
                    <p className="font-medium text-slate-800">Privacy Settings</p>
                    <p className="text-sm text-slate-600">Manage your privacy</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-green-500">notifications</span>
                  <div>
                    <p className="font-medium text-slate-800">Notifications</p>
                    <p className="text-sm text-slate-600">Email preferences</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                  <span className="material-symbols-outlined">delete</span>
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-red-500">Permanently remove account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Next: "Add job search functionality with filters and sorting options" */}
      {/* Next: "Add notification center for application updates" */}
    </div> 
        </div>
  )
}

export default Youthdash;