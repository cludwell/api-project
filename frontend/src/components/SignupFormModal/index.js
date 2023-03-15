import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("Valid Email Please");
  const [username, setUsername] = useState("At least 4 Characters");
  const [firstName, setFirstName] = useState("Your name");
  const [lastName, setLastName] = useState("Your surname");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [ disable, setDisable] = useState(true)
  const { closeModal } = useModal();

  const validate = () => {
    const err = []
    if (password.length < 6 || !password) err.push('Passwords must be at least 6 characters')
    if (username.length < 4) err.push('Usernames must be at least 4 characters')
    if (confirmPassword !== password || confirmPassword.length < 6) err.push('ConfirmPassword must be 6 characters and match password')
    setErrors(err)
  }

  useEffect(() =>{
    if (!email || !username || !firstName || !lastName || !password || !confirmPassword || password.length < 6 || username.length < 4 || confirmPassword !== password) setDisable(true)
    else setDisable(false)
  }, [disable, email, password, confirmPassword, username, firstName, lastName])

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    // console.log('VALIDATION', errors)
    if (!errors.length) {
      // setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          // console.log('BACKEND', data)
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return errors;
  };



  return (
    <div className="signup-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit"
        disabled={disable}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
