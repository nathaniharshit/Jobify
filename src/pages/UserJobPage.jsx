import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JobListing from '../components/JobListing';
import Spinner from '../components/Spinner';
import axios from 'axios';
import SpecialListing from '../components/SpecialListing';
import './UserJobPage.css';

const UserJobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userDataString = localStorage.getItem('auth');
        if (!userDataString) {
            // Redirect to login page if not authenticated
            return navigate('/login');
        }

        const user = JSON.parse(userDataString);
        const email1 = user.user.email;

        const fetchUserJobs = async () => {
            try {
                const res = await axios.post('http://localhost:8080/api/user/jobs', { email1 });
                setJobs(res.data);
            } catch (error) {
                console.log('Error fetching user jobs', error);
                toast.error('Error fetching your jobs');
            } finally {
                setLoading(false);
            }
        };
        fetchUserJobs();
    }, [navigate]);

    return (
        <section className="bg-blue-50">
            <div className="container-xl lg:container mydiv">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Your Jobs</h2>
                {loading ? (
                    <div>
                        <Spinner loading={loading} />
                        <div className='text-3xl text-center'>Loading...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {jobs.length ? jobs.map((job) => (
                            <SpecialListing key={job._id} job={job} />
                        )) : <div className='text-2xl text-center'>No jobs posted yet</div>}
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserJobsPage;
