import { Router } from "express";
import { getSingleApplication, updateApplicationStatus, deleteApplication, getApplicationsForOpportunity, getApplicationsByRecruiter } from "../Controllers/applicationController.js";
import { isAuthenticatedUser, authorizeRecruiter } from "../middlewares/auth.js";

const router = Router();

router.route('/getallapplications').get(isAuthenticatedUser, authorizeRecruiter, getApplicationsByRecruiter);

router.route("/:opportunityId/applications").get(isAuthenticatedUser, getApplicationsForOpportunity);

//Route to get a single application by ID
router.route("/:applicationId").get(isAuthenticatedUser, getSingleApplication);

// Route to update the status of an application (accepted/rejected)
router.route("/:applicationId/status").put(isAuthenticatedUser, updateApplicationStatus);

// Route to delete an application
router.route("/:applicationId").delete(isAuthenticatedUser, deleteApplication);


export default router;
