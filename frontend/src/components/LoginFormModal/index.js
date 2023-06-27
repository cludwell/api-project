import React, { useState } from "react";
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


  const validate = () => {
    const err = []
    if (password.length < 6) err.push('Passwords are at least 6 characters')
    else if (!password) err.push('Please enter your password')
    if (credential.length < 4 || !credential) {
      err.push('Credentials are at least 4 characters')
      setDisable(true)
    } else setDisable(true)
    setErrors(err)
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (errors.length) return
    else dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
        }
      );
  };


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

          {errors?.map((error, idx) => (<p className='errors' key={idx}>{error}</p>))}

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
