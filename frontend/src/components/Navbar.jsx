import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function Navbar() {
  const { t, i18n } = useTranslation();

  const [invites, setInvites] = useState([]);
  const [show, setShow] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // 🔥 FETCH INVITES
  const loadInvites = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await fetch(
        `http://localhost:5000/api/invites/learner/${user.email}`
      );

      const data = await res.json();
      setInvites(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  // ✅ ACCEPT / REJECT
  const handleStatus = async (id, status) => {
    try {
      await fetch("http://localhost:5000/api/invites/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      loadInvites(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Play2Hire</h2>

      <ul
        className="nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          margin: 0,
          paddingRight: "30px",
          gap: "20px",
        }}
      >
        <li><Link to="/">{t("home")}</Link></li>
        <li><Link to="/learner-dashboard">{t("learn")}</Link></li>
        <li><Link to="/roadmap">{t("roadmap")}</Link></li>
        <li><Link to="/leaderboard">{t("leaderboard")}</Link></li>

        {/* 🔔 NOTIFICATION */}
        <li style={{ position: "relative" }}>
          <span
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => setShow(!show)}
          >
            🔔
          </span>

          {/* COUNT BADGE */}
          {invites.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: "12px",
              }}
            >
              {invites.length}
            </span>
          )}

          {/* DROPDOWN */}
          {show && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "30px",
                background: "white",
                color: "black",
                width: "300px",
                maxHeight: "300px",
                overflowY: "auto",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                zIndex: 999,
              }}
            >
              {invites.length === 0 ? (
                <p>No notifications</p>
              ) : (
                invites.map((inv) => (
                  <div
                    key={inv._id}
                    style={{
                      marginBottom: "10px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "5px",
                    }}
                  >
                    <p><b>{inv.recruiterEmail}</b></p>
                    <p>{inv.message}</p>
                    <p>Status: <b>{inv.status}</b></p>

                    {inv.status === "Pending" && (
                      <div>
                        <button
                          onClick={() =>
                            handleStatus(inv._id, "Accepted")
                          }
                          style={{
                            background: "green",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                          }}
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleStatus(inv._id, "Rejected")
                          }
                          style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </li>

        {/* 🌐 LANGUAGE */}
        <li style={{ display: "flex", alignItems: "center" }}>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#333",
              color: "white",
            }}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिंदी</option>
            <option value="ta">தமிழ்</option>
            <option value="ml">മലയാളം</option>
          </select>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;