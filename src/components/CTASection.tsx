import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="cta" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-black to-gray-800 rounded-3xl text-center px-4 sm:px-8 py-12 sm:py-20 text-white shadow-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Ready to transform your profile pic?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300 max-w-lg mx-auto">Create your unique avatar in seconds.</p>
          
          <Link to="/style-selection">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-6 sm:px-10 py-3 sm:py-6 text-sm sm:text-base font-semibold shadow-sm w-full sm:w-auto max-w-xs mx-auto">
              Create Your Avatar
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
