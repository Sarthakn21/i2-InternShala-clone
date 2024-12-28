import React from 'react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import { applyToOpportunity } from '../../actions/opportunityActions';
import { authcustomadd } from '../../slice/authSlice';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';


export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

// export const JobDetailsModal = ({ job, isOpen, onClose, onApply }) => (
//     <Modal isOpen={isOpen} onClose={onClose}>
//         <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
//         <p className="text-gray-600 mb-2">{job.company}</p>
//         <div className="mb-4">
//             <p className="text-sm text-gray-600">Location: {job.location}</p>
//             <p className="text-sm text-gray-600">Duration: {job.duration}</p>
//             <p className="text-sm text-gray-600">Stipend: {job.stipend}</p>
//         </div>
//         <p className="text-gray-800 mb-6">{job.description || "No description available."}</p>
//         <button
//             onClick={onApply}
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//         >
//             Apply Now
//         </button>
//     </Modal>
// );

export const JobDetailsModal = ({ job, isOpen, onClose, onApply }) => {
    const { user } = useSelector((state) => state.auth);
    const { enqueueSnackbar } = useSnackbar();
    const handleApplyClick = () => {
        if (!user) {
            enqueueSnackbar({ message: "Please login to apply", variant: 'error' });

        } else {
            onApply();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <div className="mb-4">
                <p className="text-sm text-gray-600">Location: {job.location}</p>
                <p className="text-sm text-gray-600">Duration: {job.duration}</p>
                <p className="text-sm text-gray-600">Stipend: {job.stipend}</p>
            </div>
            <p className="text-gray-800 mb-6">{job.description || "No description available."}</p>
            <button
                onClick={handleApplyClick}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                n
            >
                Apply Now
            </button>
        </Modal>
    );
};


export const ApplicationModal = ({ isOpen, onClose, onSubmit, opportunityId }) => {
    const [formData, setFormData] = React.useState({
        phone: '',
        resume: '',
        skills: [],
        bio: '',
    });
    const { opportunities, loading, error } = useSelector((state) => state.opp);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSkillsChange = (e) => {
        const skills = e.target.value.split(',').map((skill) => skill.trim());
        setFormData((prev) => ({
            ...prev,
            skills,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!opportunityId) {
            console.error('Opportunity ID is missing.');
            return;
        }
        onSubmit({ ...formData, opportunityId });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-4">Apply for Opportunity</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="resume" className="block text-gray-700 text-sm font-bold mb-2">
                        Resume (Link)
                    </label>
                    <input
                        type="text"
                        id="resume"
                        name="resume"
                        value={formData.resume}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
                        Skills (Comma-separated)
                    </label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={formData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="e.g., HTML, CSS, JavaScript"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="3"
                        required
                    />
                </div>
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Submit Application
                </LoadingButton>
            </form>
        </Modal>
    );
};




export const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated, user } = useSelector((state) => state.auth)



    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email, password }, { withCredentials: true })

            const userData = response.data
            setLoading(false)

            dispatch(authcustomadd(userData.user))
            onClose()

            if (userData.user.role === 'recruiter') {
                enqueueSnackbar('Welcome recruiter', { variant: 'success' })
                navigate('/admin')
            } else {
                navigate('/')
                enqueueSnackbar('Login Successful', { variant: 'success' })
            }
        } catch (err) {
            setLoading(false)
            setError('Login failed. Please try again.')
            enqueueSnackbar('Login failed. Please try again.', { variant: 'error' })
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">

                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                    <X size={24} />
                </button>


                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2.5 px-4 hover:bg-gray-50 transition-colors">
                        <img src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png" alt="Google" className="w-5 h-5" />
                        Login with Google
                    </button>


                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>


                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            minLength={6}
                        />
                    </div>


                    <div className="text-right">
                        <a href="#" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
                    </div>


                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<LoginIcon />}
                        variant="contained"
                        type='submit'
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </LoadingButton>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-600">
                        New to Internshala? Register (
                        <a href="#" className="text-blue-500 hover:underline">Student</a> {' / '}
                        <a href="#" className="text-blue-500 hover:underline">Company</a>)
                    </p>
                </form>
            </div>
        </div>
    )
}


// export const RegisterModal = ({ onClose }) => {
//     const [userType, setUserType] = useState('student');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { loading, error, user } = useSelector((state) => state.auth);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const credentials = {
//             name: userType, 
//             email,
//             password,
//             role: userType,
//         };

//         dispatch(registerUser(credentials));
//     };

//     if (user) {
//         if (user.role === 'recruiter') {
//             navigate('/admin'); 
//         } else {
//             navigate('/');
//         }
//         onClose();
//     }
//     return (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
//                 {/* Close Button */}
//                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
//                     <span className="text-2xl">&times;</span> {/* "X" symbol */}
//                 </button>
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
//                 <div className="flex justify-between mb-4">
//                     <button
//                         onClick={() => setUserType('student')}
//                         className={`px-4 py-2 rounded-md ${userType === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//                     >
//                         Student
//                     </button>
//                     <button
//                         onClick={() => setUserType('recruiter')}
//                         className={`px-4 py-2 rounded-md ${userType === 'recruiter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//                     >
//                         Recruiter
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded-md"
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full px-4 py-2 mb-4 border rounded-md"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//                         disabled={loading}
//                     >
//                         {loading ? 'Registering...' : `Register as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

export const RegisterModal = ({ onClose }) => {
    const [userType, setUserType] = useState('student');
    const [name, setName] = useState(''); // Added state for name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            name,
            email,
            password,
            role: userType,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, credentials, { withCredentials: true });

            const userData = response.data;

            dispatch(authcustomadd(userData.user));
            onClose();

            if (userData.user.role === 'recruiter') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            if (user.role === 'recruiter') {
                navigate('/admin');
            } else {
                navigate('/');
            }
            onClose();
        }
    }, [user, navigate, onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                    <span className="text-2xl">&times;</span> {/* "X" symbol */}
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* User Type Selection */}
                    <div className="flex justify-between mb-4">
                        <button
                            type="button"
                            onClick={() => setUserType('student')}
                            className={`px-4 py-2 rounded-md ${userType === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('recruiter')}
                            className={`px-4 py-2 rounded-md ${userType === 'recruiter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                        >
                            Recruiter
                        </button>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Full Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<LoginIcon />}
                        variant="contained"
                        type="submit"
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        {loading ? 'Registering...' : `Register as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
                    </LoadingButton>
                </form>
            </div>
        </div>
    );
};

