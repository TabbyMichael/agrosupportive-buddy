
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mic, User, Bot, Leaf } from "lucide-react";
import AIService from "@/services/ai";

type Message = {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

const ChatInterface = () => {
  const [aiService] = useState(() => new AIService(import.meta.env.VITE_OPENWEATHER_API_KEY));
  const [location, setLocation] = useState({ latitude: -1.2921, longitude: 36.8219 }); // Default to Nairobi
  
  useEffect(() => {
    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AgroConnect assistant. How can I support your farming today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Function to handle user message submission
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate assistant typing
    setIsTyping(true);
    
    // Get AI response based on user message and location
    aiService.generateResponse(input, location.latitude, location.longitude)
      .then(response => {
        const assistantMessage: Message = {
          id: messages.length + 2,
          text: response.text,
          sender: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      })
      .catch(error => {
        console.error('Error getting AI response:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "I apologize, but I'm having trouble processing your request at the moment. Please try again.",
          sender: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        setIsTyping(false);
      });
  };

  // Handle sending message when Enter key is pressed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className="mt-8 border border-agro-green-100 shadow-md">
      <CardHeader className="bg-agro-green-50 border-b border-agro-green-100">
        <CardTitle className="flex items-center gap-2 text-agro-green-800">
          <Leaf className="h-5 w-5 text-agro-green" />
          <span>Farming Assistant</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-agro-green text-white rounded-tr-none"
                    : "bg-agro-green-50 text-agro-green-900 rounded-tl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {message.sender === "user" ? "You" : "AgroConnect"}
                  </span>
                </div>
                <p>{message.text}</p>
                <div className="text-right text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-agro-green-50 text-agro-green-900 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-agro-green-300 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-agro-green-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 bg-agro-green-700 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t border-agro-green-100">
        <div className="flex w-full items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-agro-green-200 text-agro-green-600 hover:bg-agro-green-50 hover:text-agro-green-700"
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Input
            placeholder="Ask about your crops, weather, or farming techniques..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-full border-agro-green-200 focus-visible:ring-agro-green-300"
          />
          
          <Button
            onClick={handleSendMessage}
            className="rounded-full bg-agro-green hover:bg-agro-green-dark"
            size="icon"
            disabled={input.trim() === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
