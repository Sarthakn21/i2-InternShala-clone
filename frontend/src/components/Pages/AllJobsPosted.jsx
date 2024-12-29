import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpportunities, deleteOpportunity, fetchOppToRecruiter } from '../../actions/opportunityActions'; // Replace with your slice location
import { useSnackbar } from 'notistack';
import Loader from '../loader/Loader';

export default function AllJobsPosted() {
    const dispatch = useDispatch();
    const { opportunities, loading, error } = useSelector((state) => state.opp); // Adjust state path if needed
    const [selectedJob, setSelectedJob] = useState(null); // For viewing job details
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(fetchOppToRecruiter());
    }, [dispatch]);

    const handleViewJob = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    const handleDeleteJob = (jobId) => {
        dispatch(deleteOpportunity(jobId))
            .unwrap()
            .then(() => {
                enqueueSnackbar("Job deleted successfully!", { variant: 'success' });
            })
            .catch(() => {
                enqueueSnackbar("Failed to delete job.", { variant: 'error' });
            });
    };


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="min-h-screen bg-gray-50 p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">All Posted Jobs</h1>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                Post New Job
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                {error && (
                                    <p className="text-red-500 text-sm">
                                        Error loading jobs: {error}
                                    </p>
                                )}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Job Title
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Company
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Location
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Experience
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Applicants
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {opportunities.map((job) => (
                                                <tr key={job._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{job.company}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{job.location}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{job.experience}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{job.applicants.length}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button
                                                            className="text-blue-500 hover:text-blue-700 mx-2"
                                                            onClick={() => handleViewJob(job)}
                                                        >
                                                            <Eye className="h-5 w-5 inline-block" /> View
                                                        </button>
                                                        <button
                                                            className="text-red-500 hover:text-red-700 mx-2"
                                                            onClick={() => handleDeleteJob(job._id)}
                                                        >
                                                            <Trash2 className="h-5 w-5 inline-block" /> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal for viewing job details */}
                        {showModal && selectedJob && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
                                    <div className="flex justify-between items-center border-b pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800">
                                            {selectedJob.title}
                                        </h2>
                                        <button
                                            className="text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowModal(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <p className="text-gray-600">
                                            <strong>Company:</strong> {selectedJob.company}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Location:</strong> {selectedJob.location}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Experience:</strong> {selectedJob.experience}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Type:</strong> {selectedJob.type}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Applicants:</strong> {selectedJob.applicants.length}
                                        </p>
                                        <p className="text-gray-600">
                                            <strong>Description:</strong> {selectedJob.description || 'No description available.'}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            )}
        </>
    );
}
