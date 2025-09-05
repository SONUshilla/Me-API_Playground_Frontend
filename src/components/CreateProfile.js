// components/CreateProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicSkills from './DynamicSkills';
import DynamicProjects from './DynamicProjects';
import DynamicWork from './DynamicWork';
import DynamicLinks from './DynamicLinks';
import { createProfile } from '../api';
import { toast } from 'react-toastify';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    skills: [],
    projects: [],
    work: [],
    links: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { data } = await createProfile(formData);
      toast.success("Profile created successfully!");
      navigate(`/profile/${data.id}`);
    } catch (error) {
      console.error(error);
      toast.error("Error creating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <DynamicSkills skills={formData.skills} setFormData={setFormData} />
        <DynamicProjects projects={formData.projects} setFormData={setFormData} />
        <DynamicWork work={formData.work} setFormData={setFormData} />
        <DynamicLinks links={formData.links} setFormData={setFormData} />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;