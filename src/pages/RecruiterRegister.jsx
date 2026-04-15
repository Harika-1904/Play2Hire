import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterRegister() {
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!company || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/recruiter/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: company, // 👈 backend lo name use chestham
          email,
          password
        })
      });

      const data = await res.json();

      if (data.message === "Recruiter already exists") {
        alert("Recruiter already exists");
      } else {
        alert("Registration Successful!");

        // ✅ store recruiter
        localStorage.setItem("recruiter", JSON.stringify(data.user));

        navigate("/recruiter-dashboard");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <h2>Recruiter Register</h2>

      <input type="text" placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input type="email" placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password" placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input type="password" placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleRegister}>
        Register
      </button>

      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/recruiter-login")}>
          Login
        </span>
      </p>
    </div>
  );
}

export default RecruiterRegister;