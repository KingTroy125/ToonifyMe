const steps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2563eb" viewBox="0 0 16 16" style={{ display: 'block' }}>
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
      </svg>
    ),
    title: "Upload Your Photo",
    description:
      "Start by uploading a clear photo of yourself. Our AI works best with well-lit, front-facing portraits.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2563eb" viewBox="0 0 16 16" style={{ display: 'block' }}>
        <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
      </svg>
    ),
    title: "Choose Your Style",
    description:
      "Select from our curated collection of artistic styles - from 3D renders to anime, cartoons, and sketches.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2563eb" viewBox="0 0 16 16" style={{ display: 'block' }}>
        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
      </svg>
    ),
    title: "AI Transformation",
    description:
      "Our advanced AI instantly transforms your photo into a stunning avatar while preserving your unique features.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#2563eb" viewBox="0 0 16 16" style={{ display: 'block' }}>
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
      </svg>
    ),
    title: "Download & Share",
    description:
      "Download your new profile picture in high resolution and share it across your social media platforms.",
  },
];

const Arrow = () => (
  <svg width="60" height="24" fill="none" viewBox="0 0 60 24" className="mx-2"><line x1="0" y1="12" x2="54" y2="12" stroke="#e5e7eb" strokeWidth="2"/><polygon points="54,6 60,12 54,18" fill="#e5e7eb"/></svg>
);

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-lg">Simple Process</span>
          <h2 className="text-5xl font-extrabold mb-4 mt-2 text-gray-900">How It Works</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-normal">
            Create a beautiful profile picture in just a few simple steps:
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0 relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center flex-1 min-w-[220px] max-w-xs px-4 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="w-28 h-28 rounded-full flex items-center justify-center bg-white border-4 border-blue-200 shadow-sm">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
              <p className="text-gray-500 text-base font-normal leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                  <Arrow />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
