import mongoose from 'mongoose';

const opportnitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    type: { type: String, required: true, enum: ['job', 'internship'] },
    description: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    skillsRequired: [{ type: String }],
    stipend: { type: String },
    duration: { type: String },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Students who applied
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recruiter who posted
    createdAt: { type: Date, default: Date.now },
});

const Opportnity = mongoose.model('Opportunity', opportnitySchema);
export default Opportnity;
