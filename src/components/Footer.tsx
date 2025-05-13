import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Function to handle smooth scrolling when on the home page
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
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

  return (
    <footer className="pt-12 pb-6 px-4 sm:px-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-2xl">👤</span>
              <Link to="/" className="text-xl font-bold">ToonifyMe</Link>
            </div>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">Upgrade Your Profile Picture</p>
            <div className="mt-6">
              <h3 className="font-semibold mb-1 text-sm sm:text-base">Contact</h3>
              <a href="mailto:hello@toonifyme.com" className="text-gray-700 hover:text-black text-sm">hello@toonifyme.com</a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#before-after" 
                  onClick={scrollToSection('before-after')}
                  className="text-gray-700 hover:text-black text-xs sm:text-sm cursor-pointer"
                >
                  Before & After
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  onClick={scrollToSection('how-it-works')}
                  className="text-gray-700 hover:text-black text-xs sm:text-sm cursor-pointer"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  onClick={scrollToSection('pricing')}
                  className="text-gray-700 hover:text-black text-xs sm:text-sm cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/style-selection" className="text-gray-700 hover:text-black text-xs sm:text-sm cursor-pointer">
                  Try Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="#about" 
                  onClick={scrollToSection('about')}
                  className="text-gray-700 hover:text-black text-xs sm:text-sm cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={scrollToSection('contact')}
                  className="text-gray-700 hover:text-black text-xs sm:text-sm cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/terms" className="text-gray-700 hover:text-black text-xs sm:text-sm">Terms</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-700 hover:text-black text-xs sm:text-sm">Privacy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-700 hover:text-black text-xs sm:text-sm">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200 mb-4" />
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs gap-2">
          <div className="mb-2 md:mb-0">© 2025 ToonifyMe. All rights reserved.</div>
          <div>
            Made by <a href="https://kingtroydesign.co" target="_blank" rel="noopener noreferrer" className="hover:text-black">Tristan</a> from <a href="https://kingtroydesign.co" target="_blank" rel="noopener noreferrer" className="hover:text-black">KingTroydesign.co</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
