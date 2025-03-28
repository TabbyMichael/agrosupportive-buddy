
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, Sprout, Award, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-agro-green-800 mb-4">Our Story</h1>
          <p className="text-agro-green-600 text-lg max-w-3xl mx-auto">
            AgroConnect was born from a simple belief: technology should feel like a supportive friend 
            for Kenyan farmers, not a complicated tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-agro-green-700 mb-4">The Journey Begins</h2>
            <p className="text-gray-700 mb-4">
              Our journey began in the vibrant farmlands of Kenya, where we witnessed firsthand the challenges 
              and triumphs of local farmers. We saw their resilience, their wisdom, and their deep connection to the land.
            </p>
            <p className="text-gray-700 mb-4">
              We also saw how technology often failed to meet them where they were – creating barriers instead of bridges.
            </p>
            <p className="text-gray-700">
              That's when we asked ourselves: What if farming technology could feel as supportive as a neighbor? As wise as an elder? 
              As hopeful as a new season's first rain?
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2374&q=80" 
              alt="Kenyan farmers working together" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-agro-green-900 opacity-20"></div>
            <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
              <p className="text-agro-green-800 font-medium">Farmers in Nakuru County, 2022</p>
            </div>
          </div>
        </div>

        <div className="bg-agro-green-50 rounded-3xl p-8 mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white py-2 px-4 rounded-full mb-4">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="text-agro-green-800 font-medium">Our Mission</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-agro-green-800 mb-4">
              Empowering Kenyan Farmers Through Technology With Heart
            </h2>
            <p className="text-agro-green-700 max-w-3xl mx-auto">
              We're building more than an app – we're creating a supportive digital community that understands 
              the unique challenges and opportunities of Kenyan agriculture.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-agro-green-100">
              <CardContent className="pt-6">
                <div className="bg-agro-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-agro-green" />
                </div>
                <h3 className="font-bold text-agro-green-800 mb-2">Community First</h3>
                <p className="text-gray-600">
                  Building connections between farmers to share knowledge and support each other through challenges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-agro-green-100">
              <CardContent className="pt-6">
                <div className="bg-agro-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Sprout className="h-6 w-6 text-agro-green" />
                </div>
                <h3 className="font-bold text-agro-green-800 mb-2">Sustainable Growth</h3>
                <p className="text-gray-600">
                  Promoting farming practices that protect the land for future generations while improving yields today.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-agro-green-100">
              <CardContent className="pt-6">
                <div className="bg-agro-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-agro-green" />
                </div>
                <h3 className="font-bold text-agro-green-800 mb-2">Local Expertise</h3>
                <p className="text-gray-600">
                  Respecting and elevating indigenous farming knowledge while adding modern insights.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-agro-green-100">
              <CardContent className="pt-6">
                <div className="bg-agro-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-agro-green" />
                </div>
                <h3 className="font-bold text-agro-green-800 mb-2">Accessible to All</h3>
                <p className="text-gray-600">
                  Ensuring our technology works for every farmer, regardless of resources or technical expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-agro-green-800 text-center mb-8">Meet Our Farming Heroes</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Joseph Kamau" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-agro-green-800 mb-1">Joseph Kamau</h3>
              <p className="text-agro-green-600 mb-3">Maize Farmer, Nakuru</p>
              <p className="text-gray-600">
                "AgroConnect helped me increase my yield by 30% through better disease management. Now I'm teaching other farmers in my community."
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Sarah Otieno" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-agro-green-800 mb-1">Sarah Otieno</h3>
              <p className="text-agro-green-600 mb-3">Vegetable Farmer, Kiambu</p>
              <p className="text-gray-600">
                "The market prices feature helped me negotiate better deals and increase my income. I feel more confident in my farming business."
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src="https://randomuser.me/api/portraits/men/62.jpg" 
                  alt="Daniel Mwangi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-agro-green-800 mb-1">Daniel Mwangi</h3>
              <p className="text-agro-green-600 mb-3">Coffee Farmer, Nyeri</p>
              <p className="text-gray-600">
                "The community on AgroConnect connected me with other coffee farmers. We now share resources and knowledge to improve our practices."
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-agro-green-800 to-agro-green-900 text-white rounded-3xl p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join Our Growing Family</h2>
          <p className="text-agro-green-100 max-w-2xl mx-auto mb-8">
            AgroConnect continues to evolve with the wisdom and needs of our farming community. 
            We invite you to be part of this journey as we grow together.
          </p>
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 py-3 px-6 rounded-full">
            <span className="text-white">We're here for you at every step of your farming journey</span>
            <Heart className="h-5 w-5 text-red-300" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
