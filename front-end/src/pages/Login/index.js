import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.scss';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    history.push('/movies');
  };

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <h2>Welcome Back!</h2>
        <p className="mb-5">
          Login to access your EcoVerse Account. You used your email to sign in last time you were here.
        </p>

        <div className="bg-gray radius-16 px-4 py-1 w-100 mb-3">
          <input
            type="email"
            className="form-control bg-transparent border-0"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="bg-gray radius-16 px-4 py-1 w-100 mb-3">
          <input
            type="password"
            className="form-control bg-transparent border-0"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-primary w-50 radius-16 mt-2 p-2"
            disabled={!email || !password}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
