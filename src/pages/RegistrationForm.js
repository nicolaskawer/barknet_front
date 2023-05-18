import React, { useState } from "react";
import "./RegistrationForm.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showMessageFirst, setShowMessageFirst] = useState(false);
  const [showMessageLast, setShowMessageLast] = useState(false);
  const [showMessageuser, setShowMessageuser] = useState(false);
  const [showMessagepass, setShowMessagepass] = useState(false);
  const history = useNavigate();

  const handleRegistration = async () => {
    let isValid = true;

    // Validation checks
    if (
      firstName.length === 0 || firstName.length > 15 || !/[A-Za-z]/.test(firstName)
    ) {
      setFirstName("");
      isValid = false;
      document
        .getElementById("first-name-input")
        .classList.add("input-invalid");
    } else {
      document
        .getElementById("first-name-input")
        .classList.remove("input-invalid");
    }

    if (
      lastName.length === 0 || lastName.length > 15 || !/[A-Za-z]/.test(lastName)
    ) {
      setLastName("");
      isValid = false;
      document.getElementById("last-name-input").classList.add("input-invalid");
    } else {
      document
        .getElementById("last-name-input")
        .classList.remove("input-invalid");
    }

    if (password.length !== 8 || !/[A-Z]/.test(password)) {
      setPassword("");
      isValid = false;
      document.getElementById("pass-input").classList.add("input-invalid");
    } else {
      document.getElementById("pass-input").classList.remove("input-invalid");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setEmail("");
      isValid = false;
      document.getElementById("email-input").classList.add("input-invalid");
    } else {
      document.getElementById("email-input").classList.remove("input-invalid");
    }

    // Perform registration logic if all fields are valid
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:8000/RegistrationForm", {
          firstName,
          lastName,
          username,
          email,
          password,
          birthdate,
        });
        if (response.data.status === "OK") {
          // Registration successful, redirect to homepage or perform any necessary actions
          history("./pages/Route__pages");
        } else {
          // Handle registration error
          console.log("Registration error");
        }
      } catch (error) {
        console.log(error);
        // Handle request error
      }
    }
  };

  return (
    <div className="registration-form">
      <h1>Welcome to BarkNet Web</h1>
      <img src="logo1.jpeg" alt=" " />

      <div className="div-icons">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          id="first-name-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onClick={() => setShowMessageFirst(true)}
          onBlur={() => setShowMessageFirst(false)}
        />
        {showMessageFirst && (
          <p className="input-message">
            First name includes up to 15 letters only
          </p>
        )}
        <br />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          placeholder="Last Name"
          id="last-name-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onClick={() => setShowMessageLast(true)}
          onBlur={() => setShowMessageLast(false)}
        />
        {showMessageLast && (
          <p className="input-message">
            Last name includes up to 15 letters only
          </p>
        )}
        <br />
        <label htmlFor="userName">User Name:</label>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onClick={() => setShowMessageuser(true)}
          onBlur={() => setShowMessageuser(false)}
        />
        {showMessageuser && (
          <p className="input-message">
            User name contains up to 20 characters only and must be unique
          </p>
        )}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          id="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="pass">Password:</label>
        <input
          type="password"
          placeholder="Password"
          id="pass-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => setShowMessagepass(true)}
          onBlur={() => setShowMessagepass(false)}
        />
        {showMessagepass && (
          <p className="input-message">
            Password contains only 8 characters and at least one uppercase
            letter
          </p>
        )}
        <br />
        <label htmlFor="b-day">Birthdate:</label>
        <input
          type="date"
          id="start"
          name="birthdate"
          value={birthdate}
          min="1966-01-01"
          max="2020-12-31"
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <button type="button" onClick={handleRegistration}>
          Sign Up
        </button>
        <p>
          Already have an account?
          <a href="./Login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
