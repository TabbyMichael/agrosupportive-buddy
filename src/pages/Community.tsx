
import React from "react";
import CommunityFeed from "@/components/CommunityFeed";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <ResponsiveContainer className="flex-1 py-6">
        <h1 className="text-3xl font-bold text-agro-green-800 mb-2">Farmer Community</h1>
        <p className="text-gray-600 mb-6">
          Connect with fellow farmers, share experiences, and learn from each other.
        </p>
        <CommunityFeed />
      </ResponsiveContainer>
      <Footer />
    </div>
  );
};

export default Community;
