import { useEffect, useState } from "react";
import RecruiterNavbar from "../components/RecruiterNavbar";
function RecruiterInvites() {
  const [invites, setInvites] = useState([]);
  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return <span style={{ color: "green", fontWeight: "bold" }}>✅ Accepted</span>;
      case "Rejected":
        return <span style={{ color: "red", fontWeight: "bold" }}>❌ Rejected</span>;
      case "Pending":
        return <span style={{ color: "orange", fontWeight: "bold" }}>⏳ Pending</span>;
      default:
        return status;
    }
  };
  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const recruiter = JSON.parse(localStorage.getItem("user"));
        if (!recruiter) return;

        // ✅ FIXED API ROUTE
        const res = await fetch(
          `http://localhost:5000/api/users/recruiter-invites/${recruiter.email}`
        );

        const data = await res.json();

        // ✅ Ensure full data loads (old + new)
        setInvites(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInvites();

    // ✅ Optional: auto refresh (safe)
    const interval = setInterval(fetchInvites, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RecruiterNavbar />

      <div className="dashboard">
        <h1>Recruiter Invites 📧</h1>

        <div
          className="invites-container"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          <table
            className="invites-table"
            style={{
              width: "100%",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ background: "#1e3a8a", color: "white" }}>
                <th style={{ padding: "15px" }}>Name</th>
                <th style={{ padding: "15px" }}>Email</th>
                <th style={{ padding: "15px" }}>Message</th>
                <th style={{ padding: "15px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {invites.length > 0 ? (
                invites.map((inv) => (
                  // ✅ FIXED KEY (important)
                  <tr key={inv._id}>
                    
                    <td style={{ padding: "15px", fontWeight: "bold" }}>
                      {inv.learnerName || "Unknown"}
                    </td>

                    <td style={{ padding: "15px" }}>
                      <span
                        style={{
                          color: "#3b82f6",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => handleEmail(inv.learnerEmail)}
                      >
                        {inv.learnerEmail || "No Email"}
                      </span>
                    </td>

                    <td style={{ padding: "15px" }}>
                      {inv.message}
                    </td>

                    <td style={{ padding: "15px" }}>
                      {getStatusBadge(inv.status)}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: "20px", textAlign: "center" }}>
                    No invites found ❌
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default RecruiterInvites;