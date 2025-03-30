
import React from 'react';
import { SortOption } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface ProductSortProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
        <ArrowUpDown className="h-4 w-4 mr-2" />
        Sort By:
      </Button>
      <Select value={sortOption} onValueChange={(value) => onSortChange(value as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name (A-Z)</SelectItem>
          <SelectItem value="price-asc">Price (Low to High)</SelectItem>
          <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSort;
