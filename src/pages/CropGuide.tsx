
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Calendar, Droplet, Sun, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonCard from "@/components/SkeletonCard";

// Mock data - in a real app this would come from an API
const crops = [
  {
    id: 1,
    name: "Maize",
    image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=800",
    category: "grains",
    season: "long-rains",
    description: "Kenya's staple crop, maize is grown across various regions and is essential to food security.",
    growingTime: "90-120 days",
    waterNeeds: "Medium",
    sunExposure: "Full sun",
    soilType: "Well-drained loamy soil",
    tips: "Plant at the onset of rains. Space plants 75cm between rows and 30cm within rows."
  },
  {
    id: 2,
    name: "Beans",
    image: "https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=800",
    category: "legumes",
    season: "short-rains",
    description: "A key protein source, beans are often intercropped with maize in Kenyan farming systems.",
    growingTime: "60-90 days",
    waterNeeds: "Medium",
    sunExposure: "Full sun",
    soilType: "Well-drained soil",
    tips: "Avoid waterlogging. Can be intercropped with maize for better yields."
  },
  {
    id: 3,
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=800",
    category: "vegetables",
    season: "year-round",
    description: "Popular vegetable crop grown in many parts of Kenya, especially in greenhouse systems.",
    growingTime: "90-100 days",
    waterNeeds: "High",
    sunExposure: "Full sun",
    soilType: "Rich, well-drained soil",
    tips: "Stake plants for support. Water regularly but avoid wetting the leaves."
  },
  {
    id: 4,
    name: "Tea",
    image: "https://images.unsplash.com/photo-1597820289987-050bb9789d8a?q=80&w=800",
    category: "cash-crops",
    season: "year-round",
    description: "Kenya is one of the world's largest tea exporters, grown mainly in the highlands.",
    growingTime: "3-5 years to maturity",
    waterNeeds: "High",
    sunExposure: "Partial shade",
    soilType: "Acidic soil",
    tips: "Needs regular pruning. Harvest the top two leaves and bud for best quality."
  }
];

const CropGuide = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredCrops, setFilteredCrops] = useState(crops);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredCrops(crops);
    } else {
      setFilteredCrops(crops.filter(crop => crop.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-6 md:py-10">
        <ResponsiveContainer>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-agro-green-900 mb-3">
              Crop Guide
            </h1>
            <p className="text-agro-green-700 max-w-3xl">
              Explore different crops suitable for Kenyan farming conditions. 
              Learn about growing requirements, best practices, and seasonal recommendations.
            </p>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="mb-6 bg-agro-green-50">
              <TabsTrigger value="all">All Crops</TabsTrigger>
              <TabsTrigger value="grains">Grains</TabsTrigger>
              <TabsTrigger value="legumes">Legumes</TabsTrigger>
              <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
              <TabsTrigger value="cash-crops">Cash Crops</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <SkeletonCard key={i} withImage rows={3} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCrops.map((crop) => (
                    <CropCard key={crop.id} crop={crop} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            {["grains", "legumes", "vegetables", "cash-crops"].map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2].map((i) => (
                      <SkeletonCard key={i} withImage rows={3} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCrops.map((crop) => (
                      <CropCard key={crop.id} crop={crop} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </ResponsiveContainer>
      </main>
      
      <Footer />
    </div>
  );
};

const CropCard = ({ crop }: { crop: any }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={crop.image} 
          alt={crop.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-agro-green-800">{crop.name}</CardTitle>
            <CardDescription className="capitalize">{crop.category}</CardDescription>
          </div>
          <div className="bg-agro-green-50 p-1.5 rounded-full">
            <Leaf className="h-5 w-5 text-agro-green" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-4">
        <p className="text-gray-700 text-sm line-clamp-2">{crop.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-agro-green-600" />
            <span>{crop.growingTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplet className="h-4 w-4 text-agro-blue" />
            <span>{crop.waterNeeds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sun className="h-4 w-4 text-yellow-500" />
            <span>{crop.sunExposure}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full bg-agro-green hover:bg-agro-green-dark">
          View Growing Guide
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CropGuide;
