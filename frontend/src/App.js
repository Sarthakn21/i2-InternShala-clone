import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';
import Internships from './components/Pages/Internships';
import AdminDashboard from './components/Pages/AdminDashboard';
import { Routes, Route } from "react-router-dom";
import AllJobsPosted from './components/Pages/AllJobsPosted';
import { useSelector } from "react-redux";
import Footer from './components/Cards/Footer';
import Loader from './components/loader/Loader';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      {user?.role != 'recruiter' ? <Navbar /> : ""}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {user && user.role == "recruiter" ? (<Route path="/admin" element={<AdminDashboard />} />) : (<Route path="/admin" element={<HomePage />} />)}
        {user && user.role == "recruiter" ? (<Route path="/alljobposted" element={<AllJobsPosted />} />) : (<Route path="/alljobposted" element={<HomePage />} />)}

        <Route path="/internship" element={<Internships type="internship" />} />
        <Route path="/jobs" element={<Internships type="job" />} />



      </Routes>
      <Footer />
    </>
  );
}

export default App;
