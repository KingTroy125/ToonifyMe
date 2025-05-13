import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, UserCircle, X } from "lucide-react";

// Simple type for user info
interface UserInfo {
  email: string;
  name: string;
}

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check authentication status on component mount and when location changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("toonifyMe_userToken");
      setIsLoggedIn(!!token);
      
      if (token) {
        try {
          const userInfoStr = localStorage.getItem("toonifyMe_userInfo");
          if (userInfoStr) {
            setUserInfo(JSON.parse(userInfoStr));
          }
        } catch (error) {
          console.error("Error parsing user info:", error);
        }
      } else {
        setUserInfo(null);
      }
    };
    
    checkAuth();
  }, [location]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("toonifyMe_userToken");
    localStorage.removeItem("toonifyMe_userInfo");
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Function to handle smooth scrolling when on the home page
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 100, // Offset to account for fixed header
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page with section hash
      window.location.href = `/#${sectionId}`;
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-5xl mx-auto bg-white border border-gray-200 rounded-full shadow-lg py-2 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-xl">ToonifyMe</Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <a 
            href="#before-after" 
            onClick={scrollToSection('before-after')}
            className="text-gray-600 hover:text-black transition-colors font-medium cursor-pointer"
          >
            Before & After
          </a>
          <a 
            href="#how-it-works" 
            onClick={scrollToSection('how-it-works')}
            className="text-gray-600 hover:text-black transition-colors font-medium cursor-pointer"
          >
            How It Works
          </a>
          <a 
            href="#pricing" 
            onClick={scrollToSection('pricing')}
            className="text-gray-600 hover:text-black transition-colors font-medium cursor-pointer"
          >
            Pricing
          </a>
        </nav>
        
        <div className="flex items-center gap-2">
          {/* User Profile/Login (Desktop) */}
          <div className="hidden sm:block">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    <span className="max-w-[100px] truncate">{userInfo?.name || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-default">
                    <div className="flex flex-col">
                      <span className="font-medium">{userInfo?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {userInfo?.email}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/style-selection" className="cursor-pointer">My Avatars</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer">Account Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-500 focus:text-red-500 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-black transition-colors font-medium px-3 py-1 rounded-full">
                Sign In
              </Link>
            )}
          </div>
          
          {/* Get Started Button (Desktop) */}
          <div className="hidden sm:block">
            {isHomePage ? (
              <a 
                href="#cta"
                onClick={scrollToSection('cta')}
              >
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2 text-base shadow-none font-semibold">
                  Get Started
                </Button>
              </a>
            ) : (
              <Link to="/style-selection">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2 text-base shadow-none font-semibold">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-bold text-xl">ToonifyMe</Link>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-6 mb-8">
              <a 
                href="#before-after" 
                onClick={scrollToSection('before-after')}
                className="text-gray-800 hover:text-black transition-colors font-medium cursor-pointer text-lg"
              >
                Before & After
              </a>
              <a 
                href="#how-it-works" 
                onClick={scrollToSection('how-it-works')}
                className="text-gray-800 hover:text-black transition-colors font-medium cursor-pointer text-lg"
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                onClick={scrollToSection('pricing')}
                className="text-gray-800 hover:text-black transition-colors font-medium cursor-pointer text-lg"
              >
                Pricing
              </a>
            </nav>
            
            <div className="mt-auto">
              {/* User Profile/Login (Mobile) */}
              {isLoggedIn ? (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4 p-3 border border-gray-200 rounded-lg">
                    <UserCircle className="h-10 w-10" />
                    <div>
                      <p className="font-medium">{userInfo?.name}</p>
                      <p className="text-sm text-gray-500">{userInfo?.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link 
                      to="/style-selection" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-black"
                    >
                      My Avatars
                    </Link>
                    <Link 
                      to="/account" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 hover:text-black"
                    >
                      Account Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-left text-red-500 hover:text-red-600 mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center mb-4 border border-gray-300 rounded-full py-2 text-gray-700 hover:border-gray-500 transition-colors"
                >
                  Sign In
                </Link>
              )}
              
              {/* Get Started Button (Mobile) */}
              {isHomePage ? (
                <a 
                  href="#cta"
                  onClick={scrollToSection('cta')}
                  className="block w-full text-center"
                >
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-2 text-base shadow-none font-semibold">
                    Get Started
                  </Button>
                </a>
              ) : (
                <Link 
                  to="/style-selection" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center"
                >
                  <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-2 text-base shadow-none font-semibold">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
