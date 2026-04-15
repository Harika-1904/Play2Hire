import { Link } from "react-router-dom";
export default function RecruiterNavbar() {
  return (
    <nav className="navbar">
      <div className="logo">Recruiter Panel</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recruiter-dashboard">Dashboard</Link></li>
        <li><Link to="/recruiter-invites">Invites</Link></li>
      </ul>
    </nav>
  );
}