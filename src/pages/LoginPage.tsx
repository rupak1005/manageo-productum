import React from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <TopBar />
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
