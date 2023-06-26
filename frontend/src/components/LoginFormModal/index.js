import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [ disable, setDisable] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
  };

  useEffect(() => {
    if (credential.length >= 4 &&  password.length >= 6) setDisable(false)
    else setDisable(true)
  }, [credential, password])

  const demoUser = (e) => {
    setCredential('demo')
    setPassword('password')
    handleSubmit()
  }

  return (
    <div className="log-in-modal">
      <h1 className="log-in">Log In</h1>
      <form onSubmit={handleSubmit}
      className='login-form'>

          {errors?.map((error, idx) => (
            <p className='errors'
            key={idx}>{error}</p>
          ))}

          <input
          className="login-input"
            type="text"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
          className="login-input"
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button
        className="login-button"
        type="submit"
        disabled={disable}>Log In</button>
        <button
        className="demo-user"
        onClick={demoUser}
        type='submit'>Login as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
