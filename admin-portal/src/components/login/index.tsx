// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { LoginFields } from '../../types/login-form';
import './index.css'

interface LoginFormProps {
  onSubmit: (form: LoginFields) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({email, password, rememberUser});
  };

  return (
    <div className='outer-div'>
      <div className='inner-div'>
      <img src="logo192.png" alt="Logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <div className='form-item'>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-item'>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-item'>
            <label>
              <input
                type="checkbox"
                checked={rememberUser}
                onChange={(e) => setRememberUser(e.target.checked)}
              />
              Remember me
            </label>
          </div>
          <button className='submit-button' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
