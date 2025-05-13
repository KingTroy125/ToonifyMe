import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const avatarImg = "/avatar-cartoon.png"; // Replace with actual image path
const realImg = "/avatar-real.png"; // Replace with actual image path
const styleImgs = [
  "/avatar-cartoon.png",
  "/avatar-style2.png",
  "/avatar-style3.png",
  "/avatar-style4.png",
];

const HeroSection = () => {
  const [divider, setDivider] = useState(50); // percent
  const [selectedStyle, setSelectedStyle] = useState(0); // track selected style

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white pt-32 pb-10 sm:py-0">
      <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-6">
        {/* Mobile Header - Only visible on mobile */}
        <div className="w-full mb-12 lg:hidden">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900 leading-tight" style={{letterSpacing: '-0.5px'}}>
            Upgrade Your Profile Picture
          </h1>
          <p className="text-base mt-4 text-gray-600 max-w-sm mx-auto text-center leading-relaxed">
            Transform your photo into stunning avatars in a variety of artistic styles. Choose your favorite and download instantly!
          </p>
        </div>

        {/* Desktop Text - Only visible on desktop */}
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0 hidden lg:flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-left text-gray-900" style={{letterSpacing: '-1px'}}>
            Upgrade Your <br />
            Profile Picture
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-xl text-left">
            Transform your photo into stunning avatars in a variety of artistic styles. Choose your favorite and download instantly!
          </p>
          <div className="flex flex-row gap-4 justify-start">
            <Link to="/style-selection" className="w-auto">
              <Button 
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-5 text-xl font-semibold shadow-md w-auto"
              >
                Get Started
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-gray-300 rounded-full px-8 py-5 text-xl font-semibold bg-white w-auto"
              onClick={() => scrollToSection('before-after')}
            >
              Examples
            </Button>
          </div>
        </div>

        {/* Mobile Buttons and Images */}
        <div className="w-full flex flex-col items-center lg:hidden">
          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full mb-6">
            {/* Custom Get Started button to match image exactly */}
            <Link to="/style-selection" className="w-full">
              <div className="bg-black text-white text-center rounded-[2rem] py-3.5 font-medium text-base">
                Get Started
              </div>
            </Link>
            
            {/* Custom Examples button to match image exactly */}
            <div 
              className="border border-gray-200 text-center rounded-[2rem] py-3.5 font-medium text-base bg-white cursor-pointer"
              onClick={() => scrollToSection('before-after')}
            >
              Examples
            </div>
          </div>
          
          {/* Style selector thumbnails in a row */}
          <div className="flex space-x-2 mb-4">
            {styleImgs.map((src, i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-lg bg-gray-100 shadow-sm overflow-hidden border-2 ${i === selectedStyle ? 'border-black' : 'border-transparent'} cursor-pointer transition-all`}
                onClick={() => setSelectedStyle(i)}
              >
                <img src={src} alt={`Style ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Split image with divider */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-sm aspect-square bg-gray-100">
            <div className="absolute inset-0 z-10 flex items-center">
              <div
                className="w-1 bg-white bg-opacity-80 h-full cursor-col-resize transition-all"
                style={{ left: `${divider}%`, position: 'absolute', transform: 'translateX(-50%)' }}
                draggable
                onDrag={e => {
                  if (e.clientX) {
                    const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
                    if (rect) {
                      let percent = ((e.clientX - rect.left) / rect.width) * 100;
                      percent = Math.max(0, Math.min(100, percent));
                      setDivider(percent);
                    }
                  }
                }}
                onDragStart={e => e.dataTransfer.setDragImage(new Image(), 0, 0)}
              >
                <div className="w-6 h-6 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center mx-auto">
                  <svg width="12" height="12" fill="none" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex">
              <div style={{ width: `${divider}%`, overflow: 'hidden' }}>
                <img src={styleImgs[selectedStyle]} alt="AI avatar" className="w-full h-full object-cover" />
              </div>
              <div style={{ width: `${100-divider}%`, overflow: 'hidden' }}>
                <img src={realImg} alt="Original photo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout: Split Image + Styles */}
        <div className="w-full lg:w-1/2 hidden lg:flex justify-center relative min-h-[600px]">
          {/* Style selector */}
          <div className="absolute -left-24 top-1/2 -translate-y-1/2 space-y-6 z-10">
            {styleImgs.map((src, i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-xl bg-gray-100 shadow-md overflow-hidden border-4 ${i === selectedStyle ? 'border-black' : 'border-transparent'} cursor-pointer transition-all`}
                onClick={() => setSelectedStyle(i)}
              >
                <img src={src} alt={`Style ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Split image with draggable divider */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full aspect-square bg-gray-100">
            <div className="absolute inset-0 z-10 flex items-center">
              <div
                className="w-2 bg-white bg-opacity-80 h-full cursor-col-resize transition-all"
                style={{ left: `${divider}%`, position: 'absolute', transform: 'translateX(-50%)' }}
                draggable
                onDrag={e => {
                  if (e.clientX) {
                    const rect = (e.target as HTMLElement).parentElement?.getBoundingClientRect();
                    if (rect) {
                      let percent = ((e.clientX - rect.left) / rect.width) * 100;
                      percent = Math.max(0, Math.min(100, percent));
                      setDivider(percent);
                    }
                  }
                }}
                onDragStart={e => e.dataTransfer.setDragImage(new Image(), 0, 0)}
              >
                <div className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center mx-auto">
                  <svg width="20" height="20" fill="none" viewBox="0 0 16 16"><path d="M6 4l4 4-4 4" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex">
              <div style={{ width: `${divider}%`, overflow: 'hidden' }}>
                <img src={styleImgs[selectedStyle]} alt="AI avatar" className="w-full h-full object-cover" />
              </div>
              <div style={{ width: `${100-divider}%`, overflow: 'hidden' }}>
                <img src={realImg} alt="Original photo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
