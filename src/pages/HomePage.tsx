
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Search, BarChart3 } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col gap-12 py-8">
        <section className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Product Management Made Simple
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Effortlessly manage your product catalog with our powerful and intuitive product management system.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Package className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Product Management</h3>
            <p className="text-gray-600">
              Easily create, update, and manage your entire product catalog in one place.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Search className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Advanced Filtering</h3>
            <p className="text-gray-600">
              Find exactly what you're looking for with powerful search and filtering capabilities.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <ShieldCheck className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600">
              Control who has access to your product data with our secure authentication system.
            </p>
          </div>
        </section>

        <section className="py-12 bg-gray-50 rounded-xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to streamline your product management?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Sign up now and start managing your product catalog with ease.
            </p>
            <Button size="lg" onClick={() => navigate('/register')}>
              Create Free Account
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
