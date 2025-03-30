
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Package, ShieldCheck, Search } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col gap-12 py-8">
        <section className="text-center space-y-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Product Management Made Simple
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Effortlessly manage your product catalog with our powerful and intuitive
            product management system.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/products')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Browse Products
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-border text-foreground bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Get Started
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 py-12">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Product Management</h3>
            <p className="text-muted-foreground">
              Easily create, update, and manage your entire product catalog in one place.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Advanced Filtering</h3>
            <p className="text-muted-foreground">
              Find exactly what you're looking for with powerful search and filtering capabilities.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Secure Access</h3>
            <p className="text-muted-foreground">
              Control who has access to your product data with our secure authentication system.
            </p>
          </div>
        </section>

        <section className="py-12 bg-card rounded-xl p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Sign up now and start managing your product catalog with ease.</h2>
            <Button 
              size="lg" 
              onClick={() => navigate('/register')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Create Free Account
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
