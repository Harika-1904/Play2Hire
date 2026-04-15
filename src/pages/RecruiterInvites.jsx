import { useEffect, useState } from "react";
import RecruiterNavbar from "../components/RecruiterNavbar";
import axios from "axios";

function RecruiterInvites() {
  const [invites, setInvites] = useState([]);

  const recruiterEmail = "recruiter@gmail.com"; // replace with logged in recruiter email

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invites/recruiter/${recruiterEmail}`);
        setInvites(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInvites();
  }, []);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "responded":
        return <span style={{ color: "green", fontWeight: "bold" }}>✅ Responded</span>;
      case "pending":
        return <span style={{ color: "orange", fontWeight: "bold" }}>⏳ Pending</span>;
      case "invited":
        return <span style={{ color: "blue", fontWeight: "bold" }}>📧 Invited</span>;
      default:
        return status;
    }
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}?subject=Follow up on Job Invite&body=Hi, checking on your response.`;
  };

  return (
    <>
      <RecruiterNavbar />
      <div className="dashboard">
        <h1>Recruiter Invites 📧</h1>
        <div className="invites-container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <table className="invites-table" style={{ width: "100%", background: "white", borderRadius: "12px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#1e3a8a", color: "white" }}>
                <th style={{ padding: "15px" }}>Learner Name</th>
                <th style={{ padding: "15px" }}>Learner Email</th>
                <th style={{ padding: "15px" }}>Message</th>
                <th style={{ padding: "15px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {invites.map((invite) => (
                <tr key={invite._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "15px", fontWeight: "bold" }}>{invite.learnerName}</td>
                  <td style={{ padding: "15px" }}>
                    <span style={{ color: "#3b82f6", cursor: "pointer", textDecoration: "underline" }} onClick={() => handleEmail(invite.learnerEmail)}>
                      {invite.learnerEmail}
                    </span>
                  </td>
                  <td style={{ padding: "15px" }}>{invite.message}</td>
                  <td style={{ padding: "15px" }}>{getStatusBadge(invite.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RecruiterInvites;