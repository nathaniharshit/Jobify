// models/Job.js
import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: String, required: true },
    
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: false },

    postedByEmail: { type: String, required: true },
    postedByName: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('jobs',jobSchema)

