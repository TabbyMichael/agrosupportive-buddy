
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import CropHealth from "@/components/CropHealth";
import WeatherCard from "@/components/WeatherCard";
import CommunityFeed from "@/components/CommunityFeed";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Hero />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <ChatInterface />
          </div>
          <div>
            <CropHealth />
          </div>
        </div>
        
        <div className="mt-8">
          <WeatherCard />
        </div>
        
        <div className="mt-8">
          <CommunityFeed />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
