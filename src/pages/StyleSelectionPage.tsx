import { useState, useRef, ChangeEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as api from "@/lib/api";

const styleOptions = [
  {
    id: "simpsons",
    name: "Simpsons",
    description: "Yellow-skinned cartoon style inspired by The Simpsons",
    emoji: "👨‍👩‍👧‍👦"
  },
  {
    id: "familyguy",
    name: "Family Guy",
    description: "Rounded shapes and bold lines in Family Guy style",
    emoji: "👨‍👨‍👦"
  },
  {
    id: "southpark",
    name: "South Park",
    description: "Simple and colorful South Park inspired characters",
    emoji: "👦"
  },
  {
    id: "disney",
    name: "Disney",
    description: "Classic Disney animation inspired character style",
    emoji: "🧚"
  }
];

const StyleSelectionPage = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>("simpsons");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cartoonImage, setCartoonImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [processedImageData, setProcessedImageData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStyleSelect = (value: string) => {
    setSelectedStyle(value);
    if (uploadedImage) {
      processImage(uploadedImage, value);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setUploadedImage(imageDataUrl);
        processImage(imageDataUrl, selectedStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setUploadedImage(imageDataUrl);
        processImage(imageDataUrl, selectedStyle);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const processImage = async (imageUrl: string, style: string) => {
    setIsProcessing(true);
    setCartoonImage(null);
    
    try {
      const result = await api.processImage({
        image: imageUrl,
        style: style,
        settings: {
          enhanceDetails: true,
          preserveColors: false
        }
      });
      
      setCartoonImage(result.cartoonImage);
      setProcessedImageData(result);
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle error state
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImageData) {
      api.downloadProcessedImage(processedImageData);
    }
  };

  // Get the selected style object
  const selectedStyleObj = styleOptions.find(style => style.id === selectedStyle) || styleOptions[0];

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Header />
      <main className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mt-20 sm:mt-16 bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-gray-100">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-6 text-center">Create Your Avatar</h1>
          <p className="text-gray-500 mb-6 sm:mb-10 text-center text-sm sm:text-base">Upload your photo and select a style to transform it</p>

          {/* Mobile Style Selection */}
          <div className="mb-6 block sm:hidden">
            <p className="text-sm font-medium text-gray-700 mb-3">Select Cartoon Style</p>
            <div className="flex justify-between gap-2 mb-4 overflow-x-auto pb-2">
              {styleOptions.map((style) => (
                <div 
                  key={style.id}
                  onClick={() => handleStyleSelect(style.id)}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden p-2 min-w-[4.5rem] flex flex-col items-center transition-all ${selectedStyle === style.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-md mb-1 flex items-center justify-center text-2xl">
                    {style.emoji}
                  </div>
                  <div className="text-xs font-medium text-center">{style.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {/* Upload and preview section */}
            <div className="bg-[#faf9f6] rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Left: Original Photo */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="font-medium text-sm sm:text-base">Original Photo</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`border-2 border-dashed rounded-lg h-52 sm:h-72 flex flex-col items-center justify-center cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${uploadedImage ? 'p-0' : 'p-4 sm:p-6'}`}
                    onClick={handleClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    
                    {uploadedImage ? (
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3 sm:mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <p className="font-medium text-gray-700 mb-1 text-sm sm:text-base">Drop your photo</p>
                        <p className="text-gray-500 text-xs sm:text-sm">or click to upload</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow for Desktop */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Arrow for Mobile */}
                <div className="md:hidden flex justify-center my-2">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
                
                {/* Right: Cartoon Version */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <span className="font-medium text-sm sm:text-base">
                        <span className="md:hidden">{selectedStyleObj.name} </span>
                        Cartoon Version
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed rounded-lg h-52 sm:h-72 flex flex-col items-center justify-center bg-gray-50 border-gray-300">
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-t-amber-500 border-amber-200 animate-spin mb-3 sm:mb-4"></div>
                        <p className="text-gray-600 text-sm sm:text-base">Processing your image...</p>
                      </div>
                    ) : cartoonImage ? (
                      <img 
                        src={cartoonImage} 
                        alt="Cartoon" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 sm:mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <p className="font-medium text-gray-700 mb-1 text-sm sm:text-base">Cartoon result</p>
                        <p className="text-gray-500 text-xs sm:text-sm">Your slick cartoon will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Style Selector for Desktop */}
              <div className="mt-6 sm:mt-8 hidden sm:block">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Cartoon Style</label>
                
                {/* Visual style selection for desktop */}
                <div className="flex gap-4 mb-4 flex-wrap">
                  {styleOptions.map((style) => (
                    <div 
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      className={`cursor-pointer border-2 rounded-lg overflow-hidden p-2 hover:shadow-md transition-all ${selectedStyle === style.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-md mb-2 flex items-center justify-center text-2xl">
                        {style.emoji}
                      </div>
                      <div className="text-xs font-medium">{style.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
                <Link to="/" className="order-2 sm:order-1 text-center">
                  <Button variant="outline" className="rounded-full px-6 w-full sm:w-auto">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  className="rounded-full px-6 bg-black text-white order-1 sm:order-2 w-full sm:w-auto"
                  disabled={!cartoonImage || isProcessing}
                  onClick={handleDownload}
                >
                  {isProcessing ? 'Processing...' : 'Download Avatar'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StyleSelectionPage; 