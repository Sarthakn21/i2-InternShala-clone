import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    const footerLinks = {
        internshipsByPlaces: {
            title: "Internships by places",
            links: [
                "Internship in India",
                "Internship in Delhi",
                "Internship in Bangalore",
                "Internship in Hyderabad",
                "Internship in Mumbai",
                "Internship in Chennai",
                "Internship in Gurgaon",
                "Internship in Kolkata",
                "Virtual Internship",
                "View all internships"
            ]
        },
        internshipByStream: {
            title: "Internship by Stream",
            links: [
                "Computer Science Internship",
                "Electronics Internship",
                "Mechanical Internship",
                "Civil Internship",
                "Marketing Internship",
                "Chemical Internship",
                "Finance Internship",
                "Summer Research Fellowship",
                "Campus Ambassador Program",
                "View all internships"
            ]
        },
        jobsByPlaces: {
            title: "Jobs by Places",
            links: [
                "Jobs in Delhi",
                "Jobs in Mumbai",
                "Jobs in Bangalore",
                "Jobs in Jaipur",
                "Jobs in Kolkata",
                "Jobs in Hyderabad",
                "Jobs in Pune",
                "Jobs in Chennai",
                "Jobs in Lucknow",
                "View all jobs"
            ]
        },
        jobsByStream: {
            title: "Jobs by Stream",
            links: [
                "Marketing jobs",
                "Content writing jobs",
                "Web development jobs",
                "Sales jobs",
                "Finance jobs",
                "Digital Marketing jobs",
                "Computer Science jobs",
                "Graphic Design jobs",
                "Data Science jobs",
                "View all jobs"
            ]
        },
        placementCourses: {
            title: "Placement Guarantee Courses",
            links: [
                "Full Stack Development",
                "Data Science",
                "Human Resource Management",
                "Digital Marketing",
                "Electric Vehicle",
                "UI/UX Design",
                "Product Management",
                "Financial Modelling",
                "Supply Chain Logistics"
            ]
        }
    };

    const bottomLinks = [
        { title: "About us", href: "#" },
        { title: "We're hiring", href: "#" },
        { title: "Hire interns for your company", href: "#" },
        { title: "Team Diary", href: "#" },
        { title: "Blog", href: "#" },
        { title: "Our Services", href: "#" },
        { title: "Terms & Conditions", href: "#" },
        { title: "Privacy", href: "#" },
        { title: "Contact us", href: "#" },
        { title: "Sitemap", href: "#" },
        { title: "College TPO registration", href: "#" },
        { title: "List of Companies", href: "#" }
    ];

    return (
        <footer className="bg-[#333333] text-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Main Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">

                    <div>
                        <h3 className="font-semibold mb-4">{footerLinks.internshipsByPlaces.title}</h3>
                        <ul className="space-y-2">
                            {footerLinks.internshipsByPlaces.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{footerLinks.internshipByStream.title}</h3>
                        <ul className="space-y-2">
                            {footerLinks.internshipByStream.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">{footerLinks.jobsByPlaces.title}</h3>
                        <ul className="space-y-2">
                            {footerLinks.jobsByPlaces.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">{footerLinks.jobsByStream.title}</h3>
                        <ul className="space-y-2">
                            {footerLinks.jobsByStream.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <h3 className="font-semibold mb-4">
                            {footerLinks.placementCourses.title}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.placementCourses.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-sm text-gray-300 hover:text-white">{link}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <h3 className="font-semibold flex items-center">
                                Certification Courses
                                <span className="ml-2 px-2 py-1 text-xs bg-orange-500 rounded">OFFER</span>
                            </h3>
                        </div>
                    </div>
                </div>


                <div className="border-t border-gray-700 pt-8">

                    <div className="text-center mt-8 text-sm text-gray-400">
                        © Copyright 2024 Sarthak

                    </div>
                </div>
            </div>
        </footer>
    );
}

