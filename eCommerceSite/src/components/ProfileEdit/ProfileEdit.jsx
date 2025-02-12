import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import './ProfileEdit.css';

export const ProfileEdit = () => {
  const { updateUserProfile } = useContext(ShopContext); 
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ first_name, last_name, email, password });
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Edit Profile</h1>
        <form className="loginsignup-feilds" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

