import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecruiterLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/recruiter/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (data.message === "Invalid Credentials") {
        alert("Invalid email or password");
      } else {
        alert("Login Successful!");

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
      <h2>Recruiter Login</h2>

      <input type="email" placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input type="password" placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>

      <p>
        New user?{" "}
        <span onClick={() => navigate("/recruiter-register")}>
          Register
        </span>
      </p>
    </div>
  );
}

export default RecruiterLogin;