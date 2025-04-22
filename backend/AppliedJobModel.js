import mongoose from 'mongoose';

const appliedJobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobType: { type: String, required: true },
    jobLocation: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobSalary: { type: String, required: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: false },
    userEmail: { type: String, required: true },
    applicantEmail:{type:String,required:true},
    applicantName:{type:String,required:true},
    applicantExperience:{type:String,required:true},
    resumePath: { type: String, required: true }, // Store the file path
}, { timestamps: true });

export default mongoose.model('appliedjobs', appliedJobSchema);
