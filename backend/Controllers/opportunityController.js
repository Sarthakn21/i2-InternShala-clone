import Opportunity from "../models/opportunityModel.js";
import Application from "../models/applicationModel.js";
import { ApiError } from "../utils/ApiError.js";

// Controller to post an opportunity
export const postOpportunity = async (req, res) => {
    try {
        const { title, company, description, skillsRequired, stipend, location, duration, type, experience } = req.body;
        const recruiter = req.user.id;

        const opportunity = await Opportunity.create({
            title,
            company,
            description,
            skillsRequired,
            stipend,
            location,
            duration,
            type,
            experience,
            recruiter
        });

        res.status(201).json({ success: true, message: "Opportunity posted successfully", opportunity });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller to get all opportunities
export const getAllOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.find();
        res.status(200).json({ success: true, opportunities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to get a single opportunity by ID
export const getSingleOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }
        res.status(200).json({ success: true, opportunity });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller to update an opportunity
export const updateOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!opportunity) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }
        res.status(200).json({ success: true, message: "Opportunity updated successfully", opportunity });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller to delete an opportunity
export const deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findByIdAndDelete(req.params.id);
        if (!opportunity) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }
        res.status(200).json({ success: true, message: "Opportunity deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to get all applications for an opportunity
export const getApplicationsForOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id).populate('applicants');
        if (!opportunity) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }
        res.status(200).json({ success: true, applications: opportunity.applicants });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Controller to apply for an opportunity
export const applyToOpportunity = async (req, res, next) => {
    try {
        console.log("in apply controller")
        const { phone, resume, skills, bio } = req.body; // Student's details for the application
        const opportunityId = req.params.id;
        const studentId = req.user.id;
        console.log(opportunityId)

        const opportunity = await Opportunity.findById(opportunityId);
        if (!opportunity) {
            return res.status(404).json({ success: false, message: "Opportunity not found" });
        }

        // Check if the student has already applied
        const existingApplication = await Application.findOne({ opportunity: opportunityId, student: studentId });
        if (existingApplication) {
            return next(new ApiError(400, "Already applid for this internship"));
        }

        console.log("this is oppid", opportunityId);
        const application = await Application.create({
            opportunity: opportunityId,
            student: studentId,
            studentDetails: { phone, resume, skills, bio }
        });

        // Add the student to the opportunity's applicants list
        opportunity.applicants.push(studentId);
        await opportunity.save();
        console.log("aapplied")

        res.status(201).json({ success: true, message: "Application submitted successfully", application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
// Controller to get all opportunities posted by a specific recruiter
export const getOpportunitiesByRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user.id; // Get recruiter ID from authenticated user
        const opportunities = await Opportunity.find({ recruiter: recruiterId }).populate('applicants');

        if (opportunities.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No opportunities found for this recruiter"
            });
        }

        res.status(200).json({
            success: true,
            opportunities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch opportunities",
            error: error.message
        });
    }
};
