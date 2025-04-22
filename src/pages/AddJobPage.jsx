import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AddJobpage.css'
import { useAuth } from '../context/auth';

const AddJobPage = ({ addJobSubmit }) => {
    const [auth] = useAuth(); 
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Full-Time');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState('Under $50K');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const userDataString = localStorage.getItem('auth');
        if (!userDataString) {
            // Redirect to login page if not authenticated
            return navigate('/login');
        }

        const user = JSON.parse(userDataString);
        const postedByEmail = user.user.email;
        const postedByName = user.user.name;

        const newJob = {
            title,
            type,
            location,
            description,
            salary,
            companyName,
            companyDescription,
            contactEmail,
            contactPhone,
            postedByEmail,
            postedByName
        };

        try {
            await axios.post('http://localhost:8080/api/v1/auth/jobs', newJob);
            toast.success('Job Added Successfully!');
            addJobSubmit(newJob);
            navigate('/jobs', { replace: true });
        } catch (error) {
            console.error('Error posting job:', error);
            toast.error('Failed to add job. Please try again.');
        }
    };

    return (
      <section className="bg-section flex items-center justify-center">
        <div >
          <div className="container">
            <div className="form-container">
              <form onSubmit={submitForm}>
                <h2 className="form-title">Add Job</h2>
                <div className="form-group">
                  <label htmlFor="type" className="form-label">
                    Job Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="form-input"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Job Listing Name</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-input"
                    placeholder="eg. Beautiful Apartment In Miami"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-input"
                    rows="4"
                    placeholder="Add any job duties, expectations, requirements, etc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="salary" className="form-label">
                    Salary
                  </label>
                  <select
                    id="salary"
                    name="salary"
                    className="form-input"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  >
                    <option value="Under $50K">Under $50K</option>
                    <option value="$50K - 60K">$50K - $60K</option>
                    <option value="$60K - 70K">$60K - $70K</option>
                    <option value="$70K - 80K">$70K - $80K</option>
                    <option value="$80K - 90K">$80K - $90K</option>
                    <option value="$90K - 100K">$90K - $100K</option>
                    <option value="$100K - 125K">$100K - $125K</option>
                    <option value="$125K - 150K">$125K - $150K</option>
                    <option value="$150K - 175K">$150K - $175K</option>
                    <option value="$175K - 200K">$175K - $200K</option>
                    <option value="Over $200K">Over $200K</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-input"
                    placeholder="Company Location"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <h3 className="section-title">Company Info</h3>
                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-input"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company_description" className="form-label">
                    Company Description
                  </label>
                  <textarea
                    id="company_description"
                    name="company_description"
                    className="form-input"
                    rows="4"
                    placeholder="What does your company do?"
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="contact_email" className="form-label">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    className="form-input"
                    placeholder="Email address for applicants"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact_phone" className="form-label">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    className="form-input"
                    placeholder="Optional phone for applicants"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
                <div>
                  <button className="submit-button" type="submit">
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
};

export default AddJobPage;
