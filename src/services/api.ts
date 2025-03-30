
import { Product, User, FilterOptions } from '@/types';

// For development purposes - would use an actual API endpoint in production
const API_URL = 'https://api.example.com';

// Mock data for development
const MOCK_USERS = [
  { id: '1', email: 'admin@example.com', password: 'password123' }
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    category: 'Electronics',
    price: 199.99,
    rating: 4.5,
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    category: 'Clothing',
    price: 24.99,
    rating: 4.2,
    createdAt: '2023-01-20T00:00:00.000Z',
    updatedAt: '2023-01-20T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with built-in grinder',
    category: 'Home & Kitchen',
    price: 149.99,
    rating: 4.7,
    createdAt: '2023-02-05T00:00:00.000Z',
    updatedAt: '2023-02-05T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Smartphone',
    description: 'Latest smartphone with high-resolution camera',
    category: 'Electronics',
    price: 799.99,
    rating: 4.8,
    createdAt: '2023-02-10T00:00:00.000Z',
    updatedAt: '2023-02-10T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned sole',
    category: 'Sports',
    price: 89.99,
    rating: 4.3,
    createdAt: '2023-02-15T00:00:00.000Z',
    updatedAt: '2023-02-15T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Novel - The Great Adventure',
    description: 'Bestselling novel about an epic adventure',
    category: 'Books',
    price: 14.99,
    rating: 4.6,
    createdAt: '2023-03-01T00:00:00.000Z',
    updatedAt: '2023-03-01T00:00:00.000Z'
  },
  {
    id: '7',
    name: 'Blender',
    description: 'High-powered blender for smoothies and more',
    category: 'Home & Kitchen',
    price: 79.99,
    rating: 4.4,
    createdAt: '2023-03-10T00:00:00.000Z',
    updatedAt: '2023-03-10T00:00:00.000Z'
  },
  {
    id: '8',
    name: 'Laptop',
    description: 'Powerful laptop for work and gaming',
    category: 'Electronics',
    price: 1299.99,
    rating: 4.9,
    createdAt: '2023-03-15T00:00:00.000Z',
    updatedAt: '2023-03-15T00:00:00.000Z'
  }
];

// Mock localStorage persistence
const getLocalProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : [...MOCK_PRODUCTS];
};

const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (user) {
          const token = `mock-jwt-token-${Date.now()}`;
          const authenticatedUser: User = {
            id: user.id,
            email: user.email,
            token
          };
          localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
          resolve(authenticatedUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MOCK_USERS.some(u => u.email === email)) {
          reject(new Error('User already exists'));
          return;
        }
        
        const newUser = {
          id: `${MOCK_USERS.length + 1}`,
          email,
          password
        };
        
        MOCK_USERS.push(newUser);
        
        const token = `mock-jwt-token-${Date.now()}`;
        const authenticatedUser: User = {
          id: newUser.id,
          email: newUser.email,
          token
        };
        
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        resolve(authenticatedUser);
      }, 500);
    });
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('currentUser');
    return Promise.resolve();
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;
    return JSON.parse(userJson);
  }
};

// Products API
export const productsAPI = {
  getProducts: async (filters?: FilterOptions): Promise<Product[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let products = getLocalProducts();
        
        if (filters) {
          if (filters.category) {
            products = products.filter(p => p.category === filters.category);
          }
          
          if (filters.minPrice !== undefined) {
            products = products.filter(p => p.price >= filters.minPrice!);
          }
          
          if (filters.maxPrice !== undefined) {
            products = products.filter(p => p.price <= filters.maxPrice!);
          }
          
          if (filters.minRating !== undefined) {
            products = products.filter(p => p.rating >= filters.minRating!);
          }
          
          if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            products = products.filter(p => 
              p.name.toLowerCase().includes(searchLower) || 
              p.description.toLowerCase().includes(searchLower)
            );
          }
        }
        
        resolve(products);
      }, 300);
    });
  },

  getProduct: async (id: string): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = getLocalProducts();
        const product = products.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },

  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getLocalProducts();
        const newProduct: Product = {
          ...product,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const updatedProducts = [...products, newProduct];
        saveLocalProducts(updatedProducts);
        
        resolve(newProduct);
      }, 300);
    });
  },

  updateProduct: async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = getLocalProducts();
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) {
          reject(new Error('Product not found'));
          return;
        }
        
        const updatedProduct: Product = {
          ...products[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        products[index] = updatedProduct;
        saveLocalProducts(products);
        
        resolve(updatedProduct);
      }, 300);
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = getLocalProducts();
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) {
          reject(new Error('Product not found'));
          return;
        }
        
        products.splice(index, 1);
        saveLocalProducts(products);
        
        resolve();
      }, 300);
    });
  }
};
