
import JWT from "jsonwebtoken";
import Usermodel from "./Usermodel.js";
import Job from "./JobModel.js";
import AppliedJobModel from "./AppliedJobModel.js";

export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
  
      // Validations
      if (!name) {
        return res.status(400).send({ message: "Name is required" });
      }
      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).send({ message: "Password is required" });
      }
      if (!phone) {
        return res.status(400).send({ message: "Phone is required" });
      }
      if (!address) {
        return res.status(400).send({ message: "Address is required" });
      }
  
      // Check if user already exists
      const existingUser = await Usermodel.findOne({ email });
      console.log("in register controller");
  
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "Already registered. Please login",
        });
      }
  
      // Register user
      const user = await new Usermodel({
        name,
        email,
        password,
        phone,
        address,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "Successfully registered",
        user,
      });
    } catch (error) {

      console.error(error);
      res.status(500).send({
        success: req.body.email,
        message: "Error in registration",
        error: error.message,
      });
    }
  };

 export const loginController = async (req, res) => {
  try {
    // Taking parameters
    const { email, password } = req.body;
    //  giving error if email or password is not given by user
    if (!email) {
      return res.send({ message: "Please provide email" });
    }
    if (!password) {
      return res.send({ message: "Please provide password" });
    }
    // check: has the user already been registered ?
    const user = await Usermodel.findOne({ email });
    if (!user) {
     return( res.send({
        success:false,
        message: "Please Register first" }));
    }
    console.log(user.password)
    // const match = await comparePassword(password, user.password);
    if (user.password!=password) {
    return res.status(200).send({ 
        success:false,
        message: "Invalid password" });
    }
    // localStorage.setItem('userData', JSON.stringify(user.name));

  
    //token
    // const token =  JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"20d"})
    // if login successfully done
    res
      .status(200)
      .send({
        success: true,
        message: "Successfully login",
        user: { name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
        },
      });
    // res.status(200).json({
    //   token : token
    // })
      
  } catch (error) {
    console.error(error);
    // if unexpected error occurs
    res.send({
      error: true,
      message: "Error while login",
      error
    });
  }
};



export const jobsController = async (req, res) => {
  try {
    const { 
      title, type, location, description, salary, 
      companyName, companyDescription, contactEmail, 
      contactPhone, postedByEmail, postedByName 
    } = req.body;

    const newJob = new Job({
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
    });

    await newJob.save();
    res.status(201).json({ success: true, message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const myjobsController = async (req, res) => {
//     try {

//     const email = req.body.email1;
//     console.log(email)
//     const jobs = await Job.find({ postedByEmail: email });
//     console.log(jobs)
//     res.json(jobs);
// } catch (error) {
//     console.error('Error fetching user jobs:', error);
//     res.status(500).json({ error: 'Failed to fetch user jobs' });
// }
const { email1 } = req.body;
    try {
        const jobs = await Job.find({ postedByEmail: email1 }).exec();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching user jobs', error);
        res.status(500).json({ message: 'Error fetching user jobs' });
    }
}

// export const applyjob = async (req, res) => {
//   try {
//     const { jobDetails } = req.body;

//     // Decode base64 string to binary data and save it as a file
//     const resumeBuffer = Buffer.from(jobDetails.resume, 'base64');
//     const resumePath = path.join(__dirname, 'uploads', `${Date.now()}-${jobDetails.applicantName}.pdf`);
//     fs.writeFileSync(resumePath, resumeBuffer);

//     // Save job application details to the database
//     const appliedJob = new AppliedJobModel({
//         ...jobDetails,
//         resumePath // Save the file path
//     });
//     await appliedJob.save();

//     res.status(201).json({ message: 'Job applied successfully' });
// } catch (error) {
//     console.error('Error applying for job:', error);
//     res.status(500).json({ error: 'Failed to apply for job' });
// }                          
// }


export const appliedjobs = async (req, res) => {
  try {
    const userEmail = req.query.email;
    const appliedJobs = await AppliedJobModel.find({ userEmail });
    res.json(appliedJobs);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ error: 'Failed to fetch applied jobs' });
  }
}



export const getApplicantsByJobId  = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applicants = await AppliedJobModel.find({ jobId }).select('userEmail');
    res.json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }

}


export const jobapplicants  = async (req, res) => {
  const { contactEmail, description } = req.body;

  try {
      const applicants = await AppliedJobModel.find({
          contactEmail: contactEmail,
          jobDescription: description
      }); // Only return the userEmail field

      res.json(applicants);
  } catch (error) {
      console.error('Error fetching applicants:', error);
      res.status(500).send('Server error');
  }

}
