import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Package, UserCircle, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-background border-b border-border p-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <Link to="/" className="flex items-center gap-2 mb-2 md:mb-0">
          <Package className="w-6 h-6 text-brand-600" />
          <span className="text-xl font-semibold text-foreground">ProductManager</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/products">
                <Button variant="ghost">Products</Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="flex items-center">
                  <UserCircle className="w-5 h-5 text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <ThemeToggle />
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
