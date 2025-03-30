
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { productsAPI } from '@/services/api';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Edit, ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
            <h2 className="text-xl font-semibold mb-4">Product not found</h2>
            <Link to="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <Badge className="mb-3">{product.category}</Badge>
                <h1 className="text-3xl font-bold">{product.name}</h1>
              </div>
              <Link to={`/products/edit/${product.id}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Product
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="font-semibold mb-2 text-lg">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-lg font-semibold">Price</div>
                      <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-semibold">Rating</div>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold mr-2">{product.rating.toFixed(1)}</span>
                        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-gray-500 text-sm space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Created: {format(new Date(product.createdAt), 'PPP')}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Last Updated: {format(new Date(product.updatedAt), 'PPP')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProductDetailPage;
