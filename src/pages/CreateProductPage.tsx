
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductForm from '@/components/products/ProductForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { productsAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const CreateProductPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (productData: any) => {
    try {
      setIsLoading(true);
      await productsAPI.createProduct(productData);
      
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
          <ProductForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateProductPage;
