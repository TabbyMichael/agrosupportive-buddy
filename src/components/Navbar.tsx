
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, MessageCircle, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 text-agro-green-600" />
          <span className="text-agro-green-800 font-bold text-xl">AgroConnect</span>
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
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
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
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-3 pt-2 pb-3">
            <Button variant="ghost" className="flex items-center gap-2 justify-start">
              <Sun size={18} />
              <span>Weather</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 justify-start">
              <MessageCircle size={18} />
              <span>Community</span>
            </Button>
            <Button className="bg-agro-green hover:bg-agro-green-dark text-white w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
