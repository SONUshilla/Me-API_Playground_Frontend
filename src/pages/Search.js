import { useState } from 'react';
import { Link } from 'react-router-dom';
import { search } from '../api';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await search(query);
      setResults(response.data);
    } catch (err) {
      console.error('Failed to search', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for profiles, projects, skills..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      <div className="space-y-4">
        {results.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-500 text-sm mb-2">{profile.education}</p>

            {profile.skills?.length > 0 && (
              <div className="mb-2">
                <strong>Skills:</strong> {profile.skills.join(', ')}
              </div>
            )}

            {profile.projects?.length > 0 && (
              <div className="mb-2">
                <strong>Projects:</strong>
                <ul className="list-disc ml-5">
                  {profile.projects.map((p, i) => (
                    <li key={i}>
                      {p.title} – {p.description} (<a href={p.link} className="text-blue-600" target="_blank" rel="noreferrer">Link</a>)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.links?.length > 0 && (
              <div className="mb-2">
                <strong>Links:</strong>
                <ul className="list-disc ml-5">
                  {profile.links.map((l, i) => (
                    <li key={i}>
                      {l.type}: <a href={l.url} target="_blank" rel="noreferrer" className="text-blue-600">{l.url}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Link 
              to={`/profile/${profile.id}`}
              className="inline-block mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              View Full Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
