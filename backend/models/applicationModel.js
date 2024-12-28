import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    opportunity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'accepted', 'rejected'],
        default: 'applied'
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    studentDetails: {
        phone: { type: String },
        resume: { type: String },
        skills: [{ type: String }],
        bio: { type: String }
    }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;
