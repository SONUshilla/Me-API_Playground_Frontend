// components/ViewProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaLink, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getProfile } from '../api';

const ViewProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(id);
        const response = await getProfile(id); // axios call
        setProfile(response.data); 
      } catch (error) {
        console.error(error);
        toast.error('Error loading profile');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!profile) return <div className="text-center">Profile not found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">{profile.name}'s Profile</h1>
        <Link
          to={`/profile/edit/${id}`}
          className="flex items-center bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        >
          <FaEdit className="mr-1" /> Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span> {profile.email}
            </p>
            <p>
              <span className="font-medium">Education:</span>{" "}
              {profile.education}
            </p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          <div className="flex gap-3">
            {profile.links.map(
              (link, index) =>
                link.url && (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-gray-700 hover:text-blue-600"
                    title={link.type}
                  >
                    {link.type === "github" && <FaGithub />}
                    {link.type === "linkedin" && <FaLinkedin />}
                    {link.type === "portfolio" && <FaLink />}
                  </a>
                )
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Work Experience</h2>
      <div className="space-y-4">
        {profile.work.map((job, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold">
              {job.role} at {job.company}
            </h3>
            <p className="text-gray-600">{job.duration}</p>
            <p className="mt-2">{job.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="mt-2 text-gray-700">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProfile;