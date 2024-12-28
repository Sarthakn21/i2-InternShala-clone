import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOpportunities } from '../actions/opportunityActions';
import { clearError } from '../slice/opportunitySlice';
import TrendingCard from './Cards/TrendingCard';
import JobCard from './Cards/JobCard';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();

  
    const { opportunities, loading, error } = useSelector((state) => state.opp);

    
    useEffect(() => {
        dispatch(fetchOpportunities());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    // Filter jobs and internships
    const internships = opportunities.filter((opportunity) => opportunity.type === 'internship');
    const jobs = opportunities.filter((opportunity) => opportunity.type === 'job');

    const trendingCards = [
        {
            backgroundColor: 'bg-blue-600',
            title: 'Master the in-demand skills!',
            subtitle: 'Get govt.-accredited certification and level-up your resume.',
            buttonText: 'Know more',
            image: 'https://as2.ftcdn.net/v2/jpg/05/26/69/09/1000_F_526690933_gjkesV6RRvBgeVm2S5kLW9lINwnM4QCR.jpg',
        },
        {
            backgroundColor: 'bg-emerald-600',
            title: 'Winter Training Certificate',
            subtitle: 'Get 55+10% OFF on all online trainings',
            buttonText: 'Know more',
            image: 'https://img.freepik.com/free-vector/webinar-banner-template_52683-53456.jpg',
        },
        {
            backgroundColor: 'bg-cyan-600',
            title: 'Java Development',
            subtitle: 'Explore top java opportunities in Pune',
            buttonText: 'Register now',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtC41a23-Dgo6kltMChje9qCG9jRFpTx5MSg&s',
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % trendingCards.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + trendingCards.length) % trendingCards.length);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Trending Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Trending on Internshala 🔥
                </h2>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {trendingCards.map((card, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-2">
                                    <TrendingCard {...card} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Recommended Section */}
            <div>
                <div className="flex items-baseline mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recommended for you</h2>
                </div>

                {loading ? (
                    <p>Loading opportunities...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {internships.slice(0, 3).map((internship) => (
                            <JobCard key={internship._id} {...internship} type="internship" />
                        ))}
                        
                        {jobs.slice(0, 3).map((job) => (
                            <JobCard key={job._id} {...job}  type="jobs"/>
                        ))}
                    </div>
                )}

                {error && <p className="text-red-500">Error: {error}</p>}
            </div>
        </div>
    );
};

export default HomePage;
