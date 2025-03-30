import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <TopBar />
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="max-w-md w-full">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
