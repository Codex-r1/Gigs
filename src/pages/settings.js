import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/set.css";

 const Settings = () => {
  const [profile, setProfile] = useState({
  bio: "",
  skills: "",
  location: ""
});

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, [token]);

  // Handle profile input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/auth/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Update password
  const handleUpdatePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.put(
        "http://localhost:5000/api/auth/update-pass",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert("Failed to update password");
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await axios.delete("http://localhost:5000/api/auth/delete-acc", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      alert("Account deleted");
      navigate("/");
    } catch (err) {
      alert("Failed to delete account");
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your profile information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            {/* PROFILE INFO */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <span className="material-symbols-outlined text-gray-400">person</span>
              </div>

              <form className="space-y-6" onSubmit={handleUpdateProfile}>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
    <textarea
      name="bio"
      value={profile.bio}
      onChange={handleChange}
      rows="4"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
    <input
      type="text"
      name="skills"
      value={profile.skills}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
    <input
      type="text"
      name="location"
      value={profile.location}
      onChange={handleChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2"
    />
  </div>

  <div className="flex gap-4">
    <button
      type="submit"
      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
    >
      Save Changes
    </button>
  </div>
</form>

            </div>

            {/* PASSWORD SECTION */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>

              <div className="space-y-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* DELETE ACCOUNT */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>
              <p className="text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Avatar + Preferences (Optional) */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900">{profile.firstName} {profile.lastName}</h3>
              <p className="text-gray-500 text-sm">{profile.email}</p>
              <img
  src={profile.photo || "https://via.placeholder.com/100"}
  alt="Profile"
  className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
/>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;