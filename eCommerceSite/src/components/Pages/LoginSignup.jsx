import React, { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";

export const LoginSignup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { signup, login } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          navigate("/"); 
        }
      } else {
        const success = await signup(first_name, last_name, email, password);
        if (success) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(isLogin ? "Login error:" : "Signup error:", error);
    }
  };
  
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form className="loginsignup-feilds" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Continue"}</button>
          <p className="loginsignup-login" >
            {isLogin ? "Don't have an account? " : "Already Have an Account? "}
            <span className="highlight-text" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup Here!" : "Login Here!"}
            </span>
          </p>
          <p className="loginsignup-login">
            Are you an admin?{" "}
            <span className="highlight-text" onClick={() => navigate("/AdminLogin")}>Login Here!</span>
          </p>
        </form>
      </div>
    </div>
  );
};
