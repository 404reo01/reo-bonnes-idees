// frontend/src/components/HeroSection.jsx
import React from 'react';

function HeroSection({ onGenerateProject }) {
  return (
   
    <div className="flex flex-col items-center justify-center text-center px-4 w-full"> {/* w-full ici fait référence à la largeur du conteneur parent qui sera limité par max-w-2xl */}
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight
                     bg-clip-text text-transparent bg-gradient-to-r from-sunset-orange to-sunset-gold">
        Manque d'inspiration ? Reo s'occupe de vous.
      </h2>

      <p className="text-lg md:text-xl mb-10 text-gray-light opacity-85 max-w-xl">
        L'outil intelligent qui t'aide à trouver des idées de projets et à les concrétiser. T'auras plus d'excuse pour pas te lancer.
      </p>

      <button
        className="relative px-10 py-4 rounded-full text-lg md:text-xl font-bold
                   bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border border-glassy-border
                   text-sunset-orange hover:text-gray-light
                   transition-colors duration-300 ease-in-out
                   shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sunset-orange focus:ring-opacity-50"
        onClick={onGenerateProject}
      >
        <span className="relative z-10">Inspire moi ! (pas de titanic ici tqt) </span>
        <span className="absolute inset-0 bg-sunset-orange opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
      </button>
    </div>
  );
}

export default HeroSection;