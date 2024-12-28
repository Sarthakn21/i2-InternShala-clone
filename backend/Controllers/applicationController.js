import Application from "../models/applicationModel.js";
import Opportunity from "../models/opportunityModel.js";
import User from "../models/userModel.js";

export const getSingleApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        // Fetch the application by ID
        const application = await Application.findById(applicationId)
            .populate("student", "name email")
            .populate("opportunity", "title company");

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        res.status(200).json({ success: true, application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getApplicationsForOpportunity = async (req, res) => {
    const { opportunityId } = req.params;

    try {
        // Fetch all applications for the given opportunity
        const applications = await Application.find({ opportunity: opportunityId })
            .populate("student", "name email")
            .populate("opportunity", "title company");

        if (!applications.length) {
            return res.status(404).json({ success: false, message: "No applications found for this opportunity" });
        }

        res.status(200).json({ success: true, applications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    try {
        // Validate status
        if (!["applied", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        // Update the application status
        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        res.status(200).json({ success: true, message: "Application status updated successfully", application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteApplication = async (req, res) => {
    const { applicationId } = req.params;

    try {
        // Delete the application
        const application = await Application.findByIdAndDelete(applicationId);

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        res.status(200).json({ success: true, message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



export const getApplicationsByRecruiter = async (req, res, next) => {
    try {
        const recruiterId = req.user._id;

        const opportunities = await Opportunity.find({ recruiter: recruiterId });

        if (opportunities.length === 0) {
            return res.status(404).json({ success: false, message: 'No opportunities found for this recruiter.' });
        }

        // Fetch all applications for these opportunities
        const applications = await Application.find({
            opportunity: { $in: opportunities.map((opp) => opp._id) },
        })
            .populate('opportunity', 'title company type location') // Populate opportunity details
            .populate('student', 'name email') // Populate student details
            .exec();

        // Format response
        const response = applications.map((application) => ({
            applicationId: application._id,
            opportunity: application.opportunity,
            student: application.student,
            status: application.status,
            appliedAt: application.appliedAt,
            studentDetails: application.studentDetails,
        }));

        res.status(200).json({ success: true, applications: response });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch applications', error: error.message });
    }
};
