/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  let desc = job.description;
  if (!showFullDescription) {
    desc = desc.substring(0, 90) + "...";
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-700">{job.salary}</p>
      <p className="text-gray-700">
        {truncateDescription(job.description, 100)}
      </p>
      <p className="text-gray-700">{job.type}</p>
      <Link
        to={`/job/${job.id}`}
        className="inline-block mt-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold text-sm"
      >
        View More
      </Link>
    </div>
  );
};

export default JobListing;
