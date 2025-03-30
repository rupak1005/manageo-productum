
import React, { useState, useEffect } from 'react';
import { Product, CATEGORIES } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading: boolean;
}

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be positive'),
  rating: z.number().min(0).max(5),
});

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit, isLoading }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    rating: 4,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (initialProduct) {
      setProduct({
        name: initialProduct.name,
        description: initialProduct.description,
        category: initialProduct.category,
        price: initialProduct.price,
        rating: initialProduct.rating,
      });
    }
  }, [initialProduct]);

  const validateForm = () => {
    try {
      productSchema.parse(product);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please check the form for errors",
      });
      return;
    }
    
    try {
      await onSubmit(product);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save product",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={product.category}
                onValueChange={(value) => setProduct(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={product.price}
                onChange={handleChange}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <Slider
                  id="rating"
                  min={0}
                  max={5}
                  step={0.5}
                  value={[product.rating]}
                  onValueChange={([value]) => 
                    setProduct(prev => ({ ...prev, rating: value }))
                  }
                />
              </div>
              <div className="flex items-center w-16 justify-end">
                <span className="text-lg font-medium mr-1">{product.rating.toFixed(1)}</span>
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : (initialProduct ? 'Update Product' : 'Create Product')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductForm;
