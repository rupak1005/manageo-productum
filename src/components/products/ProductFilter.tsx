
import React, { useState } from 'react';
import { FilterOptions, CATEGORIES } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';

interface ProductFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  const [category, setCategory] = useState(filters.category || '');
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 1500]);
  const [rating, setRating] = useState(filters.minRating || 0);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      // Clear search immediately when field is emptied
      onFilterChange({ ...filters, searchTerm: '' });
    }
  };

  const handleSearch = () => {
    onFilterChange({ ...filters, searchTerm });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const applyFilters = () => {
    onFilterChange({
      ...filters,
      category: category || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating: rating
    });
  };

  const resetFilters = () => {
    setCategory('');
    setPriceRange([0, 1500]);
    setRating(0);
    onFilterChange({
      searchTerm: filters.searchTerm
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {searchTerm && (
            <button 
              onClick={() => {
                setSearchTerm('');
                onFilterChange({ ...filters, searchTerm: '' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button onClick={handleSearch} className="w-full md:w-auto">
          Search
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:ml-2 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Narrow down products by category, price or rating
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="pt-4">
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={1500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <div className="pt-4">
                  <Slider
                    defaultValue={[rating]}
                    min={0}
                    max={5}
                    step={0.5}
                    value={[rating]}
                    onValueChange={([value]) => setRating(value)}
                  />
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>and above</span>
                </div>
              </div>
            </div>
            
            <SheetFooter>
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
                <SheetClose asChild>
                  <Button 
                    className="flex-1" 
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {(filters.category || (filters.minPrice && filters.minPrice > 0) || 
       (filters.maxPrice && filters.maxPrice < 1500) || 
       (filters.minRating && filters.minRating > 0)) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.category && (
            <Badge variant="outline" className="bg-gray-100">
              Category: {filters.category}
              <button
                className="ml-1 hover:text-destructive"
                onClick={() => {
                  setCategory('');
                  onFilterChange({ ...filters, category: undefined });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {(filters.minPrice && filters.minPrice > 0) || 
           (filters.maxPrice && filters.maxPrice < 1500) ? (
            <Badge variant="outline" className="bg-gray-100">
              Price: ${filters.minPrice || 0} - ${filters.maxPrice || '1500+'}
              <button
                className="ml-1 hover:text-destructive"
                onClick={() => {
                  setPriceRange([0, 1500]);
                  onFilterChange({ ...filters, minPrice: undefined, maxPrice: undefined });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ) : null}
          
          {filters.minRating && filters.minRating > 0 && (
            <Badge variant="outline" className="bg-gray-100">
              Rating: {filters.minRating}+ <Star className="h-3 w-3 inline fill-yellow-400 text-yellow-400" />
              <button
                className="ml-1 hover:text-destructive"
                onClick={() => {
                  setRating(0);
                  onFilterChange({ ...filters, minRating: undefined });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-7 px-2 text-xs"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
