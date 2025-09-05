// components/EditProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DynamicSkills from './DynamicSkills';
import DynamicProjects from './DynamicProjects';
import DynamicWork from './DynamicWork';
import DynamicLinks from './DynamicLinks';
import { getProfile, updateProfile } from '../api';
import { toast } from 'react-toastify';


const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    skills: [],
    projects: [],
    work: [],
    links: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(id);
        const response = await getProfile(id); // axios call
        setFormData(response.data); 
      } catch (error) {
        console.error(error);
        toast.error('Error loading profile');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
  
    try {
      const response = await updateProfile(id, formData); // axios PUT wrapper
      console.log('Updated profile:', response.data);
  
      toast.success('Profile updated successfully!');
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
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
        
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;