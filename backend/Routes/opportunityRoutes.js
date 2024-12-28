import { Router } from "express";
import { postOpportunity, getAllOpportunities, getOpportunitiesByRecruiter, getSingleOpportunity, updateOpportunity, deleteOpportunity, getApplicationsForOpportunity, applyToOpportunity } from "../Controllers/opportunityController.js";
import { isAuthenticatedUser, authorizeRecruiter } from "../middlewares/auth.js";

const router = Router();

// Route to post a new opportunity (job or internship)
router.route('/create').post(isAuthenticatedUser, authorizeRecruiter, postOpportunity);

// Route to get all opportunities (jobs and internships)
router.route('/getall').get(getAllOpportunities);
router.route('/recruiter').get(isAuthenticatedUser, authorizeRecruiter, getOpportunitiesByRecruiter);

// Route to get a single opportunity by ID
router.route('/:id').get(getSingleOpportunity);

// Route to update an existing opportunity (job or internship)
router.route('/:id').put(isAuthenticatedUser, authorizeRecruiter, updateOpportunity);

// Route to delete an opportunity (job or internship)
router.route('/:id').delete(isAuthenticatedUser, authorizeRecruiter, deleteOpportunity);

// oute to get all applications for a specific opportunity (job or internship)
router.route('/:id/applications').get(isAuthenticatedUser, getApplicationsForOpportunity);

// Route for a student to apply to an opportunity (job or internship)
router.route('/apply/:id').post(isAuthenticatedUser, applyToOpportunity);

export default router;
