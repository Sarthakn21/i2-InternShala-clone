import React from 'react';
import PropTypes from 'prop-types';

const TrendingCard = ({ title, subtitle, buttonText, image, backgroundColor }) => {
    return (
        <div
            className={`relative bg-cover bg-center h-80 rounded-lg shadow-lg`}
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Optional overlay for text contrast */}
            <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-white text-xl font-semibold">{title}</h3>
                    <p className="text-white text-sm">{subtitle}</p>
                </div>
                <div className="mt-auto">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium w-auto">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

TrendingCard.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    image: PropTypes.string,
};

export default TrendingCard;
