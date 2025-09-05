import { useState, useEffect } from 'react';
import { getTopSkills } from '../api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getTopSkills();
        console.log(response)
        setSkills(response.data);
      } catch (err) {
        console.error('Failed to fetch skills', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Top Skills</h1>
      
      {loading ? (
        <div className="text-center">Loading skills...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="space-y-3">
            {skills.map((skill, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <span className="font-medium text-gray-800">{skill.skill}</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill.count} {skill.count === '1' ? 'developer' : 'developers'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}