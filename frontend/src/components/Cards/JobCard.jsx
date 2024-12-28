import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ company, position, isHiring, location, stipend, duration,type}) => (
    <div className="bg-slate-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{position}</h3>
                <p className="text-gray-600">{company}</p>
            </div>
            {isHiring && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Actively hiring
                </span>
            )}
        </div>
        <div className="space-y-2">
            <div className="flex items-center text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{stipend}</span>
            </div>
            <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{duration}</span>
            </div>
        </div>
        <Link to={`/${type}`} className="mt-4 w-full text-blue-600 font-medium hover:text-blue-700">
            View details →
        </Link>
    </div>
);

JobCard.propTypes = {
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    isHiring: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
};

export default JobCard;
