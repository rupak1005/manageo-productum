
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const { id, name, description, category, price, rating } = product;

  return (
    <Card className="h-full flex flex-col animate-fade-in hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-1">{name}</CardTitle>
          <Badge>{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="text-lg font-bold">${price.toFixed(2)}</div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Link to={`/products/${id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
        <div className="flex space-x-2">
          <Link to={`/products/edit/${id}`}>
            <Button variant="ghost" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
