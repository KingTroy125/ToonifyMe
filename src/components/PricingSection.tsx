import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-24 px-6 bg-[#f5f6fa]" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-lg">Simple, Affordable Pricing</span>
          <h2 className="text-5xl font-extrabold mb-4 mt-2 text-gray-900">
            Generate Your Perfect<br />Profile Picture
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Each generation takes about 60 seconds. Purchase as many as you'd like.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto items-stretch justify-center">
          {/* Single Generation Plan */}
          <div className="relative flex-1 bg-white border border-blue-300 rounded-3xl shadow-xl p-10 flex flex-col items-center transition-all hover:shadow-2xl">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
              <span className="bg-black text-white text-xs font-semibold px-4 py-1 rounded-full shadow">Popular</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 mt-4">Single Generation</h3>
            <div className="mb-4 flex items-end justify-center">
              <span className="text-5xl font-extrabold text-gray-900">$1</span>
              <span className="text-gray-500 text-lg ml-1">/generation</span>
            </div>
            <p className="text-gray-600 mb-8">Generate one profile picture</p>
            <Button className="w-full bg-black text-white hover:bg-gray-800 text-base font-semibold rounded-full py-3 mb-8 transition-all">
              Generate Now
            </Button>
            <ul className="space-y-3 w-full">
              {[
                "One profile picture generation",
                "~60 second generation time",
                "High quality output",
                "Instant download",
                "Transparent backgrounds"
              ].map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bundle Pack */}
          <div className="flex-1 bg-white border border-gray-200 rounded-3xl shadow-xl p-10 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4 mt-4">Bundle Pack</h3>
            <div className="mb-4 flex items-end justify-center">
              <span className="text-5xl font-extrabold text-gray-900">$3</span>
              <span className="text-gray-500 text-lg ml-1">/bundle</span>
            </div>
            <p className="text-gray-600 mb-8">5 profile pictures for the price of 3</p>
            <Button disabled className="w-full bg-gray-100 text-gray-400 text-base font-semibold rounded-full py-3 mb-8 cursor-not-allowed">
              Coming Soon
            </Button>
            <ul className="space-y-3 w-full">
              {[
                "5 profile picture generations",
                "~60 second generation time each",
                "High quality output",
                "Instant download",
                "Transparent backgrounds",
                "Save 40%"
              ].map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
