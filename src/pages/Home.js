import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Developer Portfolio Platform</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/profile/" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Profile</h2>
          <p className="text-gray-600">View developer profiles with details about skills, projects, and experience.</p>
        </Link>
        
        <Link 
          to="/projects" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Projects</h2>
          <p className="text-gray-600">Browse projects filtered by specific skills or technologies.</p>
        </Link>
        
        <Link 
          to="/skills" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Top Skills</h2>
          <p className="text-gray-600">See the most in-demand skills in the developer community.</p>
        </Link>
        
        <Link 
          to="/search" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Search</h2>
          <p className="text-gray-600">Search across profiles, projects, and skills.</p>
        </Link>
        
        <Link 
          to="/health" 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow md:col-span-2"
        >
          <h2 className="text-xl font-semibold text-blue-600 mb-2">API Health</h2>
          <p className="text-gray-600">Check if the backend API is running properly.</p>
        </Link>
      </div>
    </div>
  );
}