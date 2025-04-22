import { useEffect, useState } from 'react';
import axios from 'axios';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                if (data.length) {
                    setJobs(data);
                    setFilteredJobs(data);
                }
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const results = jobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredJobs(results);
    }, [searchQuery, jobs]);

    return (
      <section className="bg-gray-200 px-4 py-10">
        <div className="container-xl lg:container m-auto flex items-center flex-col">
          <div >
            <h2 className="text-3xl font-bold text-black mb-6 ml-10 text-center">
              {isHome ? "Recent Jobs" : "Browse Jobs"}
            </h2>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="w-[1000PX] ml-10 p-2 border border-gray-300 rounded-lg outline-indigo-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {loading ? (
            <div>
              <Spinner loading={loading} />
              <div className="text-3xl text-center">Loading...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobListing key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
};

export default JobListings;
