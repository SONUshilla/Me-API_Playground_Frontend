import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProfiles } from '../api';

function Profile() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch all profiles from backend
    getAllProfiles()
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error("Error fetching profiles:", err));
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Profile Manager</Link>
          <div>
            <Link to="/profile/create" className="mr-4 hover:underline">Create Profile</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile Management</h1>

        <Link 
          to="/profile/create" 
          className="block w-full bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 mb-4"
        >
          Create New Profile
        </Link>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">View Existing Profiles</h2>
          <ul className="space-y-2">
            {profiles.map((p) => (
              <li key={p.id} className="flex justify-between items-center border p-2 rounded">
                <span>{p.name} ({p.email})</span>
                <Link 
                  to={`/profile/${p.id}`}
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Profile;
