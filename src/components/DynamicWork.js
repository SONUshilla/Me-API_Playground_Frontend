// components/DynamicWork.js
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const DynamicWork = ({ work, setFormData }) => {
  const addWork = () => {
    setFormData(prev => ({
      ...prev,
      work: [...prev.work, { role: '', company: '', duration: '', description: '' }]
    }));
  };

  const removeWork = (index) => {
    setFormData(prev => ({
      ...prev,
      work: prev.work.filter((_, i) => i !== index)
    }));
  };

  const updateWork = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      work: prev.work.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      )
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
      <div className="space-y-4">
        {work.map((job, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Job #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeWork(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded-full"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                value={job.role}
                onChange={(e) => updateWork(index, 'role', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Role/Position"
              />
              <input
                type="text"
                value={job.company}
                onChange={(e) => updateWork(index, 'company', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Company"
              />
              <input
                type="text"
                value={job.duration}
                onChange={(e) => updateWork(index, 'duration', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Duration (e.g., Jan 2020 - Present)"
              />
              <textarea
                value={job.description}
                onChange={(e) => updateWork(index, 'description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Job Description"
                rows="3"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addWork}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaPlus className="mr-1" /> Add Work Experience
        </button>
      </div>
    </div>
  );
};

export default DynamicWork;