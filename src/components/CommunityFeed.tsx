
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2, Users, HelpCircle, Image } from "lucide-react";

type Post = {
  id: number;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
};

const CommunityFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "David Mwangi",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "Nakuru County",
      },
      content: "My tomato plants have been showing great results after applying the organic fertilizer recommended by fellow farmers here. Thank you for the support!",
      image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      likes: 24,
      comments: 7,
      timeAgo: "2 hours ago",
      liked: false,
    },
    {
      id: 2,
      author: {
        name: "Sarah Otieno",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        location: "Kiambu County",
      },
      content: "Does anyone have experience with drought-resistant maize varieties? I'm looking to plant next season and need recommendations that work well in our region.",
      likes: 15,
      comments: 12,
      timeAgo: "5 hours ago",
      liked: true,
    },
    {
      id: 3,
      author: {
        name: "James Kimani",
        avatar: "https://randomuser.me/api/portraits/men/62.jpg",
        location: "Machakos County",
      },
      content: "Just attended a fantastic workshop on soil health management. Would highly recommend it to all farmers in the eastern region. I've learned so much about micronutrient balance!",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
      likes: 32,
      comments: 4,
      timeAgo: "1 day ago",
      liked: false,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleShare = (postId: number) => {
    console.log(`Sharing post ${postId}`);
    // In a real app, this would open a share dialog
    alert("Sharing feature will be available in the next update!");
  };

  return (
    <Card className="mt-8 border-agro-green-100">
      <CardHeader className="bg-agro-green-50 border-b border-agro-green-100">
        <CardTitle className="text-agro-green-800 flex items-center gap-2">
          <Users className="h-5 w-5 text-agro-green" />
          <span>Farmer Community</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5">
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex gap-3 mb-3">
            <Avatar className="h-10 w-10 bg-agro-green">
              <div className="text-white">You</div>
            </Avatar>
            <div className="flex-1 bg-gray-50 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100">
              <p className="text-gray-500">Share your farming experience or ask a question...</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex gap-1 items-center">
              <Image className="h-4 w-4" />
              <span>Photo</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1 items-center">
              <HelpCircle className="h-4 w-4" />
              <span>Ask Question</span>
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <img src={post.author.avatar} alt={post.author.name} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{post.author.name}</h4>
                    <p className="text-sm text-gray-500">{post.author.location} • {post.timeAgo}</p>
                  </div>
                </div>
                
                <p className="mb-3">{post.content}</p>
                
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex text-sm text-gray-500 mb-3">
                  <span>{post.likes} likes</span>
                  <span className="mx-2">•</span>
                  <span>{post.comments} comments</span>
                </div>
                
                <div className="flex border-t border-gray-100 pt-3">
                  <Button 
                    variant="ghost" 
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      post.liked ? "text-agro-green font-medium" : ""
                    }`}
                    onClick={() => handleLike(post.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Comment</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <Button variant="outline" className="text-agro-green border-agro-green hover:bg-agro-green-50">
              Load More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityFeed;
