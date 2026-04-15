import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LearnerRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const data = await res.json();

    alert(data.message);

    // 👉 register ayyaka login page ki vellali
    navigate("/learner-login");

  } catch (err) {
    console.log(err);
    alert("Error connecting server");
  }
};
  return (
    <div className="login-container">
      <h2>Learner Register</h2>

      <input type="text" placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        <span onClick={() => navigate("/learner-login")}>
          Login
        </span>
      </p>
    </div>
  );
}

export default LearnerRegister;