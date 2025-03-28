
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import CropHealth from "@/components/CropHealth";
import WeatherCard from "@/components/WeatherCard";
import CommunityFeed from "@/components/CommunityFeed";
import Footer from "@/components/Footer";
import ResponsiveContainer from "@/components/ResponsiveContainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <ResponsiveContainer className="pb-12">
          <Hero />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
            <div>
              <ChatInterface />
            </div>
            <div>
              <CropHealth />
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8">
            <WeatherCard />
          </div>
          
          <div className="mt-6 sm:mt-8">
            <CommunityFeed />
          </div>
        </ResponsiveContainer>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
