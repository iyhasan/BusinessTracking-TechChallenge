// src/pages/Login.tsx
import React from 'react';
import LoginForm from '../../components/login';
import { LoginFields } from '../../types/login-form';
import { POSTLogin } from '../../apis/login';
import { authStore, userStore } from '../../store';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

  let navigate = useNavigate();

  const handleLogin = async (form: LoginFields) => {    
    const resp = await POSTLogin(form)
    const { data } = resp;
    const { access_token, user } = data;

    userStore.setState({user: user})
    authStore.setState({token: access_token})
    authStore.getState().login()
    return navigate('/');

  };

  return (
    <div style={{height: '100vh', backgroundColor: 'red'}}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
