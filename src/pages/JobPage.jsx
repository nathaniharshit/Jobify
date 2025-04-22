import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import './JobPage.css';

const JobPage = () => {
    const job = useLoaderData();
    const [resume, setResume] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");
    const [applicantName, setApplicantName] = useState("");
    const [applicantEmail, setApplicantEmail] = useState("");
    const [applicantExperience, setapplicantExperience] = useState("");

    const navigate = useNavigate();
    const userDataString = localStorage.getItem('auth');
    const user = JSON.parse(userDataString);
    const handleResumeUpload = (event) => {
        setResume(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const jobDetails = {
                jobTitle: job.title,
                jobType: job.type,
                jobLocation: job.location,
                jobDescription: job.description,
                jobSalary: job.salary,
                companyName: job.company ? job.company.name : job.companyName,
                companyDescription: job.company ? job.company.description : job.description,
                contactEmail: (job.company ? job.company.email : job.contactEmail) || 'loremipsum@gmail.com',
                contactPhone: job.company ? job.company.phone : job.contactPhone,
                userEmail: user.user.email,
                applicantName,
                applicantEmail,
                applicantExperience
            };

            // Create FormData to send the file and job details
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('jobDetails', JSON.stringify(jobDetails));
            console.log(formData)
            // Send request to backend API endpoint with FormData
            await axios.post('http://localhost:8080/api/user/apply-job', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadMessage("Job applied successfully!");
            // Navigate to applied jobs page
            navigate('/applied-jobs');
        } catch (error) {
            console.error('Error applying for job:', error);
            setUploadMessage("Failed to apply for job.");
        }
    };

    return (
        job && job.title ? (
            <main className="job-main">
                <div className="container">
                    <div className="job-card">
                        <div className="job-type">{job.type}</div>
                        <h1 className="job-title">{job.title}</h1>
                        <div className="job-location">
                            <FaMapMarkerAlt className="icon" />
                            <p>{job.location}</p>
                        </div>
                        <h3 className="section-title">Job Description</h3>
                        <p>{job.description}</p>
                        <h3 className="section-title">Salary</h3>
                        <p>{job.salary} / Year</p>
                    </div>

                    <aside className="company-card">
                        <h3 className="section-title">Company Info</h3>
                        <h2 className="company-name">{job.company ? job.company.name : job.companyName}</h2>
                        <p className="company-description">{job.company ? job.company.description : job.description}</p>
                        <hr />
                        <div className="company-contact">
                            <h3>Contact Email:</h3>
                            <p className="contact-info">
                                <FaEnvelope className="icon" /> {job.company ? job.company.contactEmail : job.contactEmail}
                            </p>
                            <h3>Contact Phone:</h3>
                            <p className="contact-info">
                                <FaPhone className="icon" /> {job.company ? job.company.contactPhone : job.contactPhone}
                            </p>
                        </div>
                    </aside>

                    <form className="resume-form" onSubmit={handleFormSubmit}>
                        <h3 className="section-title">Apply for this job</h3>
                        {/* <label className="resume-label" htmlFor="name">Your Name:</label> */}
                        <input
                            className='emailName'
                            type="text"
                            id="name"
                            placeholder='Your Name'
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            required
                        />
                        {/* <label className="resume-label" htmlFor="email">Your Email:</label> */}
                        <input
                            className='emailName'
                            type="email"
                            id="email"
                            value={applicantEmail}
                            placeholder='Your Email'
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            required
                        />
                        
                        <input
                            className='emailName'
                            type="text"
                            id="experience"
                            value={applicantExperience}
                            placeholder='Your Experience in years'
                            onChange={(e) => setapplicantExperience(e.target.value)}
                            required
                        />
                        <label className="resume-label" htmlFor="resume">Upload your resume:</label>
                        <input
                            type="file"
                            id="resume"
                            className="resume-input"
                            onChange={handleResumeUpload}
                            required
                        />
                        <button type="submit" className="submit-button">Submit</button>
                        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
                    </form>
                </div>
            </main>
        ) 
        : (
            <div className="error-message">Error occurred while fetching job data!</div>
        )
    );
};

const jobLoader = async ({ params }) => {
    try {
        const res = await fetch(`/api/jobs/${params.id}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        if (!data) {
            throw new Error('No data found');
        }
        return data;
    } catch (error) {
        console.error('Error fetching data', error);
        return { error: 'Failed to load job data' };
    }
};

export { JobPage as default, jobLoader };