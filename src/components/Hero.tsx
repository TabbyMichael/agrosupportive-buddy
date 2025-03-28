
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sprout, ArrowRight } from "lucide-react";

const Hero = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("Farmer");
  
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    
    if (hour < 12) {
      greetingText = "Good morning";
    } else if (hour < 18) {
      greetingText = "Good afternoon";
    } else {
      greetingText = "Good evening";
    }
    
    setGreeting(greetingText);
    
    // In a real app, we would fetch the user's name from an API or local storage
    const storedName = localStorage.getItem("farmerName") || "Farmer";
    setName(storedName);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-agro-green-50 to-agro-green-100 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mt-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-agro-green-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-agro-green-200 rounded-full opacity-40"></div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-70 py-2 px-4 rounded-full mb-6">
              <Sprout className="h-5 w-5 text-agro-green" />
              <span className="text-agro-green-dark font-medium">Your farming companion</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-agro-green-900 mb-4">
              {greeting}, <span className="text-agro-green">{name}!</span>
            </h1>
            
            <p className="text-agro-green-800 text-lg md:text-xl mb-8 max-w-2xl">
              We're here to support your farming journey with personalized guidance, 
              community wisdom, and smart insights for a bountiful harvest.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-agro-green hover:bg-agro-green-dark text-white px-6 py-6 h-auto text-lg rounded-xl">
                Talk to Assistant
              </Button>
              <Button variant="outline" className="border-agro-green text-agro-green hover:bg-agro-green-50 px-6 py-6 h-auto text-lg rounded-xl">
                <span>Explore Crops</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-full max-w-xs md:max-w-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-agro-green rounded-full opacity-10 animate-pulse-gentle"></div>
              <img 
                src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Kenyan farmer with crops" 
                className="relative z-10 object-cover w-full h-64 rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 z-20 animate-grow-shrink">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-agro-green-800">Crops are thriving!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
