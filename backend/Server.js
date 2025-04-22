import express  from "express" 
import dotenv  from "dotenv"
import morgan  from "morgan"  
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./Db.js"
import { appliedjobs, getApplicantsByJobId, jobapplicants, jobsController, loginController, myjobsController, registerController } from "./AuthController.js"
import bodyParser from "body-parser"
import path from 'path';
import fs from 'fs';
import multer from "multer";
import AppliedJobModel from "./AppliedJobModel.js"
import JobModel from "./JobModel.js"
import sendEmail from "./emailService.js"
//rest object
const app=express()

dotenv.config()
app.use(cors())
app.use(bodyParser.json());
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Define routes
app.use('/api/v1/auth/login', loginController)
app.use('/api/v1/auth/register',registerController);
app.use('/api/v1/auth/jobs',jobsController);
app.use('/api/user/jobs',myjobsController);
// app.use('/api/user/apply-job',applyjob)
app.use('/api/user/applied-jobs',appliedjobs)
app.use('/:jobId/applicants',getApplicantsByJobId)
app.use('/api/user/job-applicants',jobapplicants)
app.post('/api/user/apply-job', upload.single('resume'), async (req, res) => {
    try {
        const jobDetails = JSON.parse(req.body.jobDetails);

        if (!jobDetails.userEmail) {
            throw new Error('userEmail is missing');
        }

        const appliedJob = new AppliedJobModel({
            ...jobDetails,
            resumePath: req.file.path 
        });
        await appliedJob.save();

        res.status(201).json({ message: 'Job applied successfully' });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ error: 'Failed to apply for job' });
    }
});


app.get('/api/user/view-resume/:applicantEmail', async (req, res) => {
    try {
        const { applicantEmail } = req.params;
        const jobApplication = await AppliedJobModel.findOne({ applicantEmail });
        console.log(jobApplication)
        if (!jobApplication || !jobApplication.resumePath) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const filePath = path.resolve(jobApplication.resumePath);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
});

app.get('/api/v1/jobs', async (req, res) => {

    try {
        const limit = parseInt(req.query.limit) || 0; // Default to no limit
        const jobs = await JobModel.find().limit(limit);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }

}
)

app.get('/view-resume/:applicantEmail', async (req, res) => {
    const { applicantEmail } = req.params;
    const { jobTitle, companyName } = req.query; // Assuming these are passed as query params

    // Logic to handle viewing the resume
    // ...

    // Send email notification
    const subject = 'Your application has been viewed';
    const text = `Hello,

    Your application for ${companyName} for the position of ${jobTitle} has been viewed. We will get back to you shortly.

    Best regards,
    ${companyName}`;

    try {
        await sendEmail(applicantEmail, subject, text);
        res.status(200).send('Resume viewed and email sent');
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).send('Error sending email');
    }
});





// const PORT = process.env.PORT || 5000;

app.listen(8080, () => console.log(`Server started on port 8080`));
