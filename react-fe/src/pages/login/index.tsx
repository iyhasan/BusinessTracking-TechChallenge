// src/pages/Login.tsx
import React from 'react';
import LoginForm from '../../components/login';
import { LoginFields } from '../../types/login-form';
import { POSTLogin } from '../../apis/login'

const Login: React.FC = () => {
  const handleLogin = (form: LoginFields) => {
    
    POSTLogin(form)
    .then((resp: any) => {
      console.log(resp)
    }).catch(
      (err: any) => {
        console.log(err)
      }
    )

  };

  return (
    <div style={{height: '100vh', backgroundColor: 'red'}}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
