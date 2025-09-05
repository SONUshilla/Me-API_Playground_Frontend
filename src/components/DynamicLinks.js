// components/DynamicLinks.js
import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const DynamicLinks = ({ links, setFormData }) => {
  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { type: 'github', url: '' }]
    }));
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Links</label>
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Link #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="p-1 text-red-600 hover:bg-red-100 rounded-full"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <select
                value={link.type}
                onChange={(e) => updateLink(index, 'type', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="portfolio">Portfolio</option>
                <option value="other">Other</option>
              </select>
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                placeholder="URL"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addLink}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <FaPlus className="mr-1" /> Add Link
        </button>
      </div>
    </div>
  );
};

export default DynamicLinks;