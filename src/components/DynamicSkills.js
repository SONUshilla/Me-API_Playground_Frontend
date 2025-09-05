// components/DynamicSkills.js
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const DynamicSkills = ({ skills, setFormData }) => {
  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index, value) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateSkill(index, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
              placeholder="Enter a skill"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-full"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSkill}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaPlus className="mr-1" /> Add Skill
        </button>
      </div>
    </div>
  );
};

export default DynamicSkills;