import { Link } from "react-router-dom";

const beforeAfterExamples = [
  {
    original: "/before-after-original.jpg", // Replace with actual image path
    cartoon: "/before-after-familyguy.jpg", // Replace with actual image path
    cartoonLabel: "Family Guy",
    cartoonLabelColor: "bg-[#000000] text-white",
    title: "Family Guy Style",
    description: "Iconic and distinctive Family Guy art style",
  },
  {
    original: "/before-after-original.jpg", // Replace with actual image path
    cartoon: "/before-after-simpsons.jpg", // Replace with actual image path
    cartoonLabel: "Simpsons",
    cartoonLabelColor: "bg-[#000000] text-white",
    title: "Simpsons Style",
    description: "Iconic and distinctive Simpsons art style",
  },
];

const BeforeAfterSection = () => {
  return (
    <section className="py-16 px-6 bg-[#f5f6fa]" id="before-after">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
        <span className="text-blue-600 font-semibold text-lg">See it in Action</span>
          <h2 className="text-4xl font-bold mb-2">Before & After Showcases</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            See how our AI transforms regular photos into stunning cartoon styles.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {beforeAfterExamples.map((ex, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm overflow-hidden w-full max-w-md">
              <div className="flex h-72 relative">
                {/* Original photo */}
                <div className="w-1/2 h-full relative">
                  <img src={ex.original} alt="Original" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded shadow">Original</span>
                </div>
                {/* Cartoon photo */}
                <div className="w-1/2 h-full relative">
                  <img src={ex.cartoon} alt={ex.cartoonLabel} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 ${ex.cartoonLabelColor} text-xs font-semibold px-3 py-1 rounded shadow`}>{ex.cartoonLabel}</span>
                </div>
              </div>
              <div className="p-5 border-t border-gray-100">
                <div className="font-semibold text-lg mb-1">{ex.title}</div>
                <div className="text-gray-500 text-sm">{ex.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <span className="text-sm text-gray-400">More styles are coming soon!</span>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
