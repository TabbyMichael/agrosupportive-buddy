
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, MessageCircle, Sun, Menu, X, Users, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const NavLink = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
    const active = isActive(to);
    return (
      <Link to={to}>
        <Button 
          variant={active ? "secondary" : "ghost"} 
          className={`flex items-center gap-2 ${active ? 'bg-agro-green-50 text-agro-green-800' : ''}`}
        >
          {icon}
          <span>{label}</span>
        </Button>
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm py-3 sm:py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/" className="flex items-center gap-1 sm:gap-2">
            <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-agro-green-600" />
            <span className="text-agro-green-800 font-bold text-lg sm:text-xl">AgroConnect</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <NavLink 
            to="/about" 
            icon={<Users size={18} />} 
            label="About Us" 
          />
          
          <NavLink 
            to="/crops" 
            icon={<Leaf size={18} />} 
            label="Crop Guide" 
          />
          
          <Button variant="ghost" className="flex items-center gap-2">
            <Sun size={18} />
            <span>Weather</span>
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>Community</span>
          </Button>
          
          <Button className="bg-agro-green hover:bg-agro-green-dark text-white">Get Started</Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 pb-3">
          <div className="flex flex-col space-y-2 pt-2 pb-2">
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant={isActive('/about') ? "secondary" : "ghost"} 
                className={`flex items-center gap-2 justify-start w-full ${isActive('/about') ? 'bg-agro-green-50 text-agro-green-800' : ''}`}
              >
                <Users size={18} />
                <span>About Us</span>
              </Button>
            </Link>
            
            <Link to="/crops" onClick={() => setIsMenuOpen(false)}>
              <Button 
                variant={isActive('/crops') ? "secondary" : "ghost"} 
                className={`flex items-center gap-2 justify-start w-full ${isActive('/crops') ? 'bg-agro-green-50 text-agro-green-800' : ''}`}
              >
                <Leaf size={18} />
                <span>Crop Guide</span>
              </Button>
            </Link>
            
            <Button variant="ghost" className="flex items-center gap-2 justify-start">
              <Sun size={18} />
              <span>Weather</span>
            </Button>
            
            <Button variant="ghost" className="flex items-center gap-2 justify-start">
              <MessageCircle size={18} />
              <span>Community</span>
            </Button>
            
            <Button className="bg-agro-green hover:bg-agro-green-dark text-white w-full mt-2">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
