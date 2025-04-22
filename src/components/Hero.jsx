import React from "react";

const Hero = ({
  title = "Welcome to JobiFy",
  subtitle = "Find the job that fits your skills and needs",
}) => {
  return (
    <section className="bg-white py-60 mb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-start">
        <div className="text-left">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
            {title}
          </h1>
          <p className="mt-4 text-2xl text-gray-700">{subtitle}</p>
          <button className="mt-8 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
