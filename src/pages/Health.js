import { useState, useEffect } from 'react';
import { getHealth } from '../api';

export default function Health() {
  const [status, setStatus] = useState('Checking...');
  const [isAlive, setIsAlive] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await getHealth();
        setStatus('API is alive and connected!');
        setIsAlive(true);
      } catch (err) {
        setStatus('API connection failed. Backend might be down.');
        setIsAlive(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">API Health Check</h1>
      
      <div className={`p-4 rounded-md ${isAlive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        <div className="flex items-center">
          {isAlive ? (
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
          <span>{status}</span>
        </div>
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">API Endpoints</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><span className="font-mono bg-gray-100 p-1 rounded">GET /profiles/:id</span> - Get profile details</li>
          <li><span className="font-mono bg-gray-100 p-1 rounded">GET /projects?skill=...</span> - Filter projects by skill</li>
          <li><span className="font-mono bg-gray-100 p-1 rounded">GET /skills/top</span> - Get top skills</li>
          <li><span className="font-mono bg-gray-100 p-1 rounded">GET /search?q=...</span> - Generic search</li>
          <li><span className="font-mono bg-gray-100 p-1 rounded">GET /health</span> - Health check</li>
        </ul>
      </div>
    </div>
  );
}