import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LearnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  if (!email || !password) {
    alert("Enter email & password");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message) {  // wrong email/password
      alert(data.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data)); // save logged in user
    alert("Login Successful ✅");
    navigate("/learner-dashboard");
  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="login-container">
      <h2>Learner Login</h2>
      <input type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="login-btn" onClick={handleLogin}>Login</button>
      <p>Don't have an account? <span onClick={() => navigate("/learner-register")}>Register</span></p>
    </div>
  );
}

export default LearnerLogin;