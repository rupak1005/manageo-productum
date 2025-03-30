
import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default RegisterPage;
