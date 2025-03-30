
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductForm from '@/components/products/ProductForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { productsAPI } from '@/services/api';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await productsAPI.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch product details",
        });
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (productData: any) => {
    if (!id) return;
    
    try {
      setIsSaving(true);
      await productsAPI.updateProduct(id, productData);
      
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (!product) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold">Product not found</h2>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
          <ProductForm 
            initialProduct={product}
            onSubmit={handleSubmit} 
            isLoading={isSaving} 
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EditProductPage;
