import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LoginModal, RegisterModal } from './Cards/Modals';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions'; 

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            
            dispatch(logoutUser());
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error.message);
            alert('Error logging out');
        }
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={"/"} className="flex-shrink-0">
                        <img className="h-12 w-auto" src="https://internshala.com//static/images/internshala_og_image.jpg" alt="Internshala" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/internship"
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Internships
                            </Link>
                            <Link
                                to="/jobs"
                                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Jobs
                            </Link>
                            <div className="relative group">
                                <button className="text-gray-600 group-hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                                    Courses
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Java Courses</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Fullstack courses</a>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group">
                                <button className="text-gray-600 group-hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center">
                                    More
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <Link to={"/"} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">About us</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="hidden md:block">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => setIsLoginModalOpen(true)}  // Open Login Modal
                                    className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 mr-2">
                                    Login
                                </button>
                                <button
                                    onClick={() => setIsRegisterModalOpen(true)}  // Open Register Modal
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                    Register
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}  // Logout the user
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    {/* Mobile menu items */}
                </div>
            )}

            {/* Login Modal */}
            {isLoginModalOpen && (
                <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            )}

            {/* Register Modal */}
            {isRegisterModalOpen && (
                <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />
            )}
        </nav>
    );
};

export default Navbar;
