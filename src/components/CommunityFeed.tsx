
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ThumbsUp, MessageCircle, Share2, Users, HelpCircle, Image, 
  Send, Filter, Award, Tag, Book, MapPin, PenSquare
} from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

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
  category?: string;
};

type CategoryType = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const CommunityFeed = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedPostToShare, setSelectedPostToShare] = useState<number | null>(null);

  const categories: CategoryType[] = [
    { name: "Question", icon: <HelpCircle className="h-4 w-4" />, color: "text-amber-500" },
    { name: "Success Story", icon: <Award className="h-4 w-4" />, color: "text-green-500" },
    { name: "Knowledge", icon: <Book className="h-4 w-4" />, color: "text-blue-500" },
    { name: "Local Event", icon: <MapPin className="h-4 w-4" />, color: "text-purple-500" },
  ];

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
      category: "Success Story",
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
      category: "Question",
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
      category: "Knowledge",
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
    setSelectedPostToShare(postId);
    setShowShareDialog(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleSubmitPost = () => {
    if (!newPostContent.trim()) return;
    
    setIsPosting(true);
    setTimeout(() => {
      const newPost: Post = {
        id: posts.length + 1,
        author: {
          name: "You",
          avatar: "",
          location: "Your Location",
        },
        content: newPostContent,
        likes: 0,
        comments: 0,
        timeAgo: "Just now",
        liked: false,
        category: selectedCategory || undefined,
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setSelectedCategory(null);
      setIsPosting(false);
    }, 1000);
  };

  const filteredPosts = activeFilter 
    ? posts.filter(post => post.category === activeFilter)
    : posts;

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
              <AvatarFallback className="text-white">You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-gray-50 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100 w-full text-left">
                    <p className="text-gray-500">Share your farming experience or ask a question...</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create Post</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Textarea 
                      placeholder="What's on your mind?" 
                      className="min-h-[100px]"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    
                    <div className="mt-4 mb-2">
                      <p className="text-sm text-gray-500 mb-2">Select category (optional):</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <Button 
                            key={category.name}
                            size="sm"
                            variant={selectedCategory === category.name ? "default" : "outline"}
                            className={`flex gap-1 items-center ${selectedCategory === category.name ? "bg-agro-green text-white" : category.color}`}
                            onClick={() => handleCategorySelect(category.name)}
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" size="sm" className="flex gap-1 items-center">
                        <Image className="h-4 w-4" />
                        <span>Add Photo</span>
                      </Button>
                      <Button 
                        onClick={handleSubmitPost}
                        disabled={isPosting || !newPostContent.trim()}
                        className="bg-agro-green hover:bg-agro-green-600"
                      >
                        {isPosting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-1" />
                            <span>Post</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
            <Button variant="outline" size="sm" className="flex gap-1 items-center ml-auto">
              <PenSquare className="h-4 w-4" />
              <span>Create Post</span>
            </Button>
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex gap-1 items-center ${activeFilter === null ? "bg-agro-green-50 border-agro-green-200" : ""}`}
            onClick={() => handleFilterSelect("")}
          >
            <Filter className="h-4 w-4" />
            <span>All Posts</span>
          </Button>
          
          {categories.map(category => (
            <Button 
              key={category.name}
              variant="outline" 
              size="sm" 
              className={`flex gap-1 items-center ${category.color} ${activeFilter === category.name ? "bg-gray-100" : ""}`}
              onClick={() => handleFilterSelect(category.name)}
            >
              {category.icon}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    {post.author.avatar ? (
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    ) : (
                      <AvatarFallback className="bg-agro-green text-white">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{post.author.name}</h4>
                    <p className="text-sm text-gray-500">{post.author.location} • {post.timeAgo}</p>
                  </div>
                  {post.category && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      post.category === "Question" ? "bg-amber-100 text-amber-800" :
                      post.category === "Success Story" ? "bg-green-100 text-green-800" :
                      post.category === "Knowledge" ? "bg-blue-100 text-blue-800" :
                      "bg-purple-100 text-purple-800"
                    }`}>
                      {post.category}
                    </span>
                  )}
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
      
      <AlertDialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <AlertDialogContent className="max-w-md">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Share this post</h3>
            <p className="text-sm text-gray-500 mb-4">Choose how you'd like to share this farming insight</p>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowShareDialog(false)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>Send as message</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowShareDialog(false)}>
                <Users className="h-4 w-4 mr-2" />
                <span>Share to your community</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowShareDialog(false)}>
                <Tag className="h-4 w-4 mr-2" />
                <span>Copy link</span>
              </Button>
            </div>
            
            <Button className="w-full mt-4 bg-agro-green hover:bg-agro-green-600" onClick={() => setShowShareDialog(false)}>
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default CommunityFeed;
