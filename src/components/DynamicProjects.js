// components/DynamicProjects.js
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const DynamicProjects = ({ projects, setFormData }) => {
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', link: '' }]
    }));
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Project #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded-full"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateProject(index, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Project Title"
              />
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Project Description"
                rows="2"
              />
              <input
                type="url"
                value={project.link}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Project URL (optional)"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaPlus className="mr-1" /> Add Project
        </button>
      </div>
    </div>
  );
};

export default DynamicProjects;