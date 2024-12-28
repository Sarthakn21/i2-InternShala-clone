import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOpportunities, applyToOpportunity } from '../../actions/opportunityActions';
import { Search, ChevronDown } from 'lucide-react';
import { JobDetailsModal, ApplicationModal } from '../Cards/Modals';
import InternshipCard from '../Cards/InternshipCard';
import { clearError, clearMessage } from '../../slice/opportunitySlice';
import Loader from '../loader/Loader';
import { useSnackbar } from 'notistack';

export default function InternshipsPage({ type = 'internship' }) {
    const [stipendRange, setStipendRange] = useState([0, 10000]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { opportunities, loading, error } = useSelector((state) => state.opp);

    useEffect(() => {
        dispatch(fetchOpportunities());

    }, [dispatch]);

    const handleViewDetails = (job) => {
        setSelectedJob(job);
        setIsDetailsModalOpen(true);
    };

    const handleApply = () => {
        setIsDetailsModalOpen(false);
        setIsApplicationModalOpen(true);
    };

    const handleCloseApplicationModal = () => {
        setIsApplicationModalOpen(false);
        dispatch(clearError()); 
        dispatch(clearMessage()); 
    };

    const handleSubmitApplication = (formData) => {
        if (!selectedJob?._id) {
            console.error('No opportunity selected.');
            return;
        }
        dispatch(clearError());
        const applicationData = { ...formData };


        try {
            dispatch(applyToOpportunity({ opportunityId: selectedJob._id, applicationData }));
        } catch (error) {
            console.error('Error applying to opportunity:', error.message);

        }
    };

    // Filter opportunities 
    const filteredOpportunities = opportunities.filter((job) => {
        const matchesType = job.type === type;
        const matchesSearchTerm = job.title.toLowerCase().includes(searchTerm.toLowerCase());

        // Stipend Range filter logic: show jobs with stipend >= selected range
        const matchesStipend = job.stipend >= stipendRange[0];

        return matchesType && matchesSearchTerm && matchesStipend;
    });

    // Reset filters 
    const handleClearAllFilters = () => {
        setSearchTerm(""); 
        setStipendRange([0, 10000]);
    };
    useEffect(() => {
        if (error) {
            enqueueSnackbar({ message: error, variant: 'error' });

        }
    }, [dispatch, error]);



    return (
        <>{loading ? <Loader /> : <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    {filteredOpportunities.length} Total {type === 'internship' ? 'Internships' : 'Jobs'}
                </h1>
                <p className="text-gray-500">
                    Latest {type === 'internship' ? 'Summer Internships' : 'Job Openings'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Filters</span>
                            </div>
                            <button
                                className="text-blue-600 text-sm"
                                onClick={handleClearAllFilters} 
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="space-y-6">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g. Marketing"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Desired minimum monthly stipend (₹)
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="1000"
                                    value={stipendRange[0]} // Use stipendRange[0] for the min stipend
                                    onChange={(e) =>
                                        setStipendRange([parseInt(e.target.value), stipendRange[1]])
                                    }
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>₹0</span>
                                    <span>₹10K</span>
                                </div>
                            </div>

                            <button className="text-blue-600 text-sm flex items-center">
                                View more filters
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                
                <div className="lg:col-span-3">
                    {loading ? (
                        <p>Loading {type}s...</p>
                    ) : error ? (
                        <p className="text-red-500">Error loading</p>
                    ) : filteredOpportunities.length > 0 ? (
                        filteredOpportunities.map((job) => (
                            <InternshipCard
                                key={job._id}
                                job={{
                                    title: job.title,
                                    company: job.company,
                                    location: job.location,
                                    duration: job.duration,
                                    stipend: job.stipend,
                                    description: job.description,
                                    skillsRequired: job.skillsRequired,
                                    experience: job.experience,
                                }}
                                onViewDetails={() => handleViewDetails(job)}
                            />
                        ))
                    ) : (
                        <p>No {type}s available.</p>
                    )}
                </div>
            </div>

            {selectedJob && (
                <JobDetailsModal
                    job={selectedJob}
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    onApply={handleApply}
                />
            )}

            <ApplicationModal
                isOpen={isApplicationModalOpen}
                onClose={handleCloseApplicationModal}
                onSubmit={handleSubmitApplication}
                opportunityId={selectedJob?._id}
            />
        </div>}</>

    );
}
