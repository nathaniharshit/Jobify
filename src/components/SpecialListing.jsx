import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import './SpecialListing.css';

const SpecialListing = ({ job }) => {
    const [applicants, setApplicants] = useState([]);
    const [loadingApplicants, setLoadingApplicants] = useState(false);
    const [showApplicants, setShowApplicants] = useState(false);

    const handleViewApplicants = async () => {
        setLoadingApplicants(true);
        try {
            const res = await axios.post('http://localhost:8080/api/user/job-applicants', {
                contactEmail: job.contactEmail,
                description: job.description
            });
            setApplicants(res.data);
            console.log(res);
            setShowApplicants(true);
        } catch (error) {
            console.error('Error fetching applicants', error);
            toast.error('Error fetching applicants');
        } finally {
            setLoadingApplicants(false);
        }
    };

    const handleViewResume =async (applicantEmail) => {
        window.open(`http://localhost:8080/api/user/view-resume/${applicantEmail}`, '_blank');
        try {
            await axios.get(`http://localhost:8080/view-resume/${applicantEmail}`, {
                params: {
                    jobTitle: job.title,
                    companyName: job.companyName // Replace with actual company name
                }
            });
            toast.success('Applicant has been notified');
        } catch (error) {
            console.error('Error notifying applicant', error);
            toast.error('Error notifying applicant');
        }




    };

    return (
        <div className="job-listings-container">
            <div className="job-card">
                <h3>{job.title}</h3>
                <p>{job.type}</p>
                <p>{job.location}</p>
                <p><FaEnvelope /> {job.contactEmail}</p>
                <p><FaPhone /> {job.contactPhone}</p>
                <button onClick={handleViewApplicants}>View Applicants</button>
                {loadingApplicants && <p>Loading...</p>}
                {showApplicants && (
                    <div className="applicants-list">
                        <h4>Applicants:</h4>
                        {applicants.length > 0 ? (
                            <ul>
                                {applicants.map((applicant, index) => (
                                    <li key={index}>
                                        <span>{applicant.applicantName}</span>
                                        <button onClick={() => handleViewResume(applicant.applicantEmail)}>View Resume</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No applicants yet</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecialListing;
