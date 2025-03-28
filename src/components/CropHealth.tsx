
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

const CropHealth = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{
    condition: string;
    confidence: number;
    solution: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        analyzeCropHealth();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCropHealth = () => {
    setAnalyzing(true);
    
    // Simulate analysis with a timeout
    // In a real app, this would be an API call to your AI model
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      
      // Mock analysis result
      setDiagnosis({
        condition: "Early Leaf Blight",
        confidence: 89,
        solution: "Apply copper-based fungicide and ensure proper spacing between plants for better air circulation. Remove affected leaves to prevent spread."
      });
    }, 2000);
  };

  const resetAnalysis = () => {
    setImagePreview(null);
    setAnalyzed(false);
    setDiagnosis(null);
  };

  return (
    <Card className="mt-8 overflow-hidden border-agro-green-100">
      <CardHeader className="bg-agro-green-50 border-b border-agro-green-100">
        <CardTitle className="text-agro-green-800">Crop Health Analyzer</CardTitle>
      </CardHeader>
      
      <CardContent className="p-5">
        {!imagePreview ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-agro-green-200 rounded-xl bg-agro-green-50 text-center">
            <Upload className="h-12 w-12 text-agro-green-400 mb-3" />
            <h3 className="text-lg font-medium text-agro-green-800 mb-2">Upload Crop Image</h3>
            <p className="text-agro-green-600 mb-6 max-w-md">
              Take a clear photo of your plant leaves or stems to analyze for diseases, 
              nutrient deficiencies, or pest damage.
            </p>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="border-agro-green text-agro-green hover:bg-agro-green-50"
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                Upload Photo
              </Button>
              <Button className="bg-agro-green hover:bg-agro-green-dark">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
              <input 
                id="fileInput" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img 
                  src={imagePreview} 
                  alt="Crop Image" 
                  className="w-full h-64 object-cover"
                />
                {analyzing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 border-4 border-t-agro-green border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-white">Analyzing your crop...</p>
                    </div>
                  </div>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={resetAnalysis}
              >
                Upload Different Image
              </Button>
            </div>
            
            <div>
              {analyzed && diagnosis && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-medium">Diagnosis:</h3>
                  </div>
                  
                  <div className="bg-agro-orange-light bg-opacity-10 p-4 rounded-lg">
                    <p className="font-semibold text-agro-orange-dark mb-1">{diagnosis.condition}</p>
                    <div className="bg-gray-200 h-2 rounded-full w-full mt-1 mb-3">
                      <div 
                        className="bg-agro-orange h-2 rounded-full"
                        style={{ width: `${diagnosis.confidence}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">{diagnosis.confidence}% confident</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-agro-green" />
                      <h3 className="text-lg font-medium">Recommended Solution:</h3>
                    </div>
                    <p className="text-gray-700">{diagnosis.solution}</p>
                  </div>
                  
                  <Button className="w-full mt-4 bg-agro-green hover:bg-agro-green-dark">
                    Get Detailed Treatment Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {!analyzed && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-agro-green-600 text-center">
                    {analyzing 
                      ? "Analyzing image..." 
                      : "Upload a crop image to receive health analysis"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropHealth;
