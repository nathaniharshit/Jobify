import { useEffect, useState } from "react";
import axios from "axios";

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userEmail = JSON.parse(localStorage.getItem("auth")).user.email;
        const res = await axios.get(
          "http://localhost:8080/api/user/applied-jobs",
          {
            params: { email: userEmail },
          }
        );
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching applied jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <section className="py-8 bg-gray-100 h-screen">
      <div className="container mx-auto px-4 flex justify-center  ">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            Jobs You've Applied For
          </h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="py-2 px-4">Job Title</th>
                    <th className="py-2 px-4">Company Name</th>
                    <th className="py-2 px-4">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <tr key={job._id} className="border-b">
                        <td className="py-2 px-4 text-center">
                          {job.jobTitle}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {job.companyName}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {job.jobSalary}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="py-2 px-4 text-center">
                        No jobs applied yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppliedJobsList;
