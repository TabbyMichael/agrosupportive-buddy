
import { Sprout, Heart, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-agro-green-900 text-white mt-12 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-agro-green-300" />
              <span className="text-agro-green-100 font-bold text-xl">AgroConnect</span>
            </Link>
            <p className="text-agro-green-200 mb-6 max-w-md">
              Empowering Kenyan farmers with intelligent, emotionally supportive technology 
              to improve agricultural outcomes and build resilient communities.
            </p>
            <div className="flex items-center gap-1 text-agro-green-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 mx-1" />
              <span>for Kenyan farmers</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-agro-green-100 font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-agro-green-200">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Crop Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Prices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-agro-green-100 font-medium text-lg mb-4">Connect With Us</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex space-x-4">
                  <a href="#" className="text-agro-green-200 hover:text-white">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-agro-green-200 hover:text-white">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-agro-green-200 hover:text-white">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-agro-green-200 hover:text-white">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <p className="text-agro-green-200">Contact Support:</p>
                <a href="mailto:support@agroconnect.co.ke" className="text-agro-green-100 hover:text-white">
                  support@agroconnect.co.ke
                </a>
              </div>
              <div>
                <p className="text-agro-green-200">Helpline:</p>
                <a href="tel:+254712345678" className="text-agro-green-100 hover:text-white">
                  +254 712 345 678
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-agro-green-800 mt-8 pt-6 text-center text-agro-green-300 text-sm">
          <p>© {new Date().getFullYear()} AgroConnect. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
