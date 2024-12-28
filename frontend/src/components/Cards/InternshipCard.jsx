import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';

const InternshipCard = ({ job, onViewDetails }) => (
    <div className="bg-slate-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all mb-4  ">
        <div className="flex justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-600">{job.company}</span>
                    {job.isActivelyHiring && (
                        <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded">Actively hiring</span>
                    )}
                </div>
            </div>
            <img src={job.logo || "https://upload.wikimedia.org/wikipedia/en/8/8b/Internshala_company_logo.png"} alt={job.company} className="h-12 w-12 object-contain" />
        </div>

        <div className="flex items-center gap-6 mt-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
            </div>
            <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.duration}
            </div>
            <div className="flex items-center gap-1">
                <FaRupeeSign className="h-4 w-4" />
                {job.stipend}
            </div>
        </div>


        <button
            onClick={() => onViewDetails(job)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
            View Details
        </button>
    </div>
);

export default InternshipCard;

