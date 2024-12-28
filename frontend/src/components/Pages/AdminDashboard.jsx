import { useState, useEffect } from 'react';
import { Briefcase, Users, Calendar, Search, ChevronDown, MoreHorizontal, Filter, ImageOff } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Loader from '../loader/Loader';
export default function AdminDashboard() {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [jobFormData, setJobFormData] = useState({
        title: '',
        company: '',
        description: '',
        skillsRequired: '',
        stipend: '',
        location: '',
        duration: '',
        type: '',
        experience: '',
    });

    const [applications, setApplications] = useState([]);
    const [totalOpportunities, setTotalOpportunities] = useState(0); // State to store the total job count
    const { isAuthenticated, user } = useSelector((state) => state.opp);
    const activeListingsCount = applications.filter(app => app.status === "applied").length;

    const stats = [
        {
            title: "Total Jobs Posted",
            value: totalOpportunities,
            icon: Briefcase,
        },
        {
            title: "Total Applications",
            value: applications.length.toString(), // This can be dynamically updated as well
            icon: Users,
        },
        {
            title: "Active Listings",
            value: activeListingsCount.toString(), // This can be dynamically updated as well
            icon: Calendar,
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            Pending: "bg-yellow-100 text-yellow-800",
            Interviewed: "bg-blue-100 text-blue-800",
            Rejected: "bg-red-100 text-red-800",
            Accepted: "bg-green-100 text-green-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/users/logout', { withCredentials: true });

    //         if (response.data.success) {
    //             console.log('Logout successful');
    //             navigate('/'); // Navigate to the home page
    //         } else {
    //             console.log('Logout failed:', response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error logging out:', error.response ? error.response.data : error.message);
    //     }
    //     // try {
    //     //     dispatch(logoutUser());
    //     //     if (!user) {
    //     //         navigate('/');
    //     //     }
    //     // } catch (error) {
    //     //     alert("error in logging out");
    //     // }

    // };
    const handleLogout = () => {
        try {
            // Dispatch the logout action

            dispatch(logoutUser());
            enqueueSnackbar("Logout successfull", { variant: "success" });
            navigate('/');

        } catch (error) {
            console.error('Error logging out:', error.message);
            enqueueSnackbar("Logout unsucessfull", { variant: "error" });
        }
    };


    const handlePostJob = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/opportunity/create`,
                jobFormData,
                { withCredentials: true }
            );

            if (response.data.success) {
                // console.log('Job posted successfully:', response.data.opportunity);
                setTotalOpportunities((prevCount) => prevCount + 1);
                // alert("job posted");// Update total opportunities
                enqueueSnackbar("Job posted successfully", { variant: "success" });
                setIsPostJobModalOpen(false);
            } else {
                console.log('Failed to post job:', response.data.message);
                enqueueSnackbar("Failed to post job", { variant: "error" });
            }
        } catch (error) {
            console.error('Error posting job:', error.response ? error.response.data : error.message);
            enqueueSnackbar("Error posting job", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fetch applications from the API
    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/application/getallapplications`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setApplications(response.data.applications);
                }
            } catch (error) {
                console.error("Error fetching applications:", error.response ? error.response.data : error.message);
                enqueueSnackbar("Error fetching applications", { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        const fetchOpportunities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/opportunity/recruiter`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setTotalOpportunities(response.data.opportunities.length); // Set total opportunities count
                }
            } catch (error) {
                console.error("Error fetching opportunities:", error.response ? error.response.data : error.message);
                enqueueSnackbar("Error fetching opportunities", { variant: "error " });
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
        fetchOpportunities();
    }, []);

    return (
        <>

            {loading ? (<Loader />) : (<div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <div className="flex space-x-2"> {/* Adjust space between the buttons */}
                            <LoadingButton

                                loadingPosition="start"
                                startIcon={<LogoutOutlinedIcon />}
                                variant="outlined"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-50 transition-colors"
                                onClick={handleLogout}
                            >
                                Logout
                            </LoadingButton>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                onClick={() => setIsPostJobModalOpen(true)}
                            >
                                Post New Job
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        {stats.map((stat) => (
                            <Link to={"/alljobposted"} key={stat.title} className="bg-white p-6 rounded-lg shadow">
                                <div className="flex items-center justify-between pb-2">
                                    <h2 className="text-sm font-medium text-gray-500">{stat.title}</h2>
                                    <stat.icon className="h-4 w-4 text-gray-500" />
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </Link>
                        ))}
                    </div>

                    {/* Applications Table Section */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                                <div className="flex items-center gap-4">
                                    {/* Search */}
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search applications..."
                                            className="pl-8 pr-4 py-2 border rounded-md w-[250px]"
                                        />
                                    </div>

                                    <div className="relative">
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
                                            onClick={() => document.getElementById('filterDropdown').classList.toggle('hidden')}
                                        >
                                            <Filter className="h-4 w-4" />
                                            Filter
                                            <ChevronDown className="h-4 w-4" />
                                        </button>
                                        <div id="filterDropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden">
                                            <div className="py-1">
                                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setSelectedFilter('all')}>All Applications</button>
                                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setSelectedFilter('pending')}>Pending</button>
                                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setSelectedFilter('interviewed')}>Interviewed</button>
                                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setSelectedFilter('accepted')}>Accepted</button>
                                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setSelectedFilter('rejected')}>Rejected</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {applications.map((application) => (
                                        <tr key={application.applicationId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{application.opportunity.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{application.student.name}</div>
                                                <div className="text-sm text-gray-500">{application.student.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(application.appliedAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.studentDetails.skills.join(', ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                                                    {application.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {isPostJobModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 w-full h-full">
                            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Post a New Job</h3>
                                <form onSubmit={(e) => { e.preventDefault(); handlePostJob(); }}>
                                    <div className="max-h-[70vh] overflow-y-auto mb-4 custom-scrollbar p-2 ">
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={jobFormData.title}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={jobFormData.company}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={jobFormData.description}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700">Skills Required</label>
                                            <input
                                                type="text"
                                                id="skillsRequired"
                                                name="skillsRequired"
                                                value={jobFormData.skillsRequired}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Comma separated (e.g. Node.js, MongoDB, AWS)"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">Stipend</label>
                                            <input
                                                type="text"
                                                id="stipend"
                                                name="stipend"
                                                value={jobFormData.stipend}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1  block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={jobFormData.location}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                                            <input
                                                type="text"
                                                id="duration"
                                                name="duration"
                                                value={jobFormData.duration}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
                                            <input
                                                type="text"
                                                id="type"
                                                name="type"
                                                value={jobFormData.type}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                                            <input
                                                type="text"
                                                id="experience"
                                                name="experience"
                                                value={jobFormData.experience}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsPostJobModalOpen(false)}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Post Job
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    )}
                </div>
            </div>)
            }
        </>

    );
}
