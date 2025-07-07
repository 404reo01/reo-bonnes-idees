// frontend/src/components/HowItWorksSection.jsx
import React from 'react';

function HowItWorksSection({ onLearnMore }) {
  return (
    <section className="mt-20 p-8 w-full rounded-2xl border border-glassy-border
                        bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-light mb-6">
        Comment ça marche ?
      </h3>
      <div className="text-left text-gray-light opacity-80 space-y-4 max-w-lg mx-auto">
        <p>
          <span className="text-sunset-orange font-bold">1. Dis nous qui tu es :</span> Tu mets ton pseudo github, tu reponds aux questions, et on te trouve un projet adapté à TON profil.
        </p>
        <p>
          <span className="text-sunset-orange font-bold">2. L'IA génère des idées originales :</span> Ici pas de projets bateau (comme le titanic mdrrrrr!), on te propose des idées uniques et adaptées à tes compétences et intérêts.
        </p>
        <p>
          <span className="text-sunset-orange font-bold">3. Affinez et concrétisez :</span> Tu peux affiner les idées, poser des questions, et même demander des conseils pour te lancer. On est là pour t'aider à chaque étape.
        </p>
      </div>
      <button
        className="mt-8 relative px-8 py-3 rounded-full text-md font-bold
                   bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border border-glassy-border
                   text-sunset-gold hover:text-gray-light
                   transition-colors duration-300 ease-in-out
                   shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sunset-gold focus:ring-opacity-50"
        onClick={onLearnMore} // Utilisation de la prop
      >
        <span className="relative z-10">En savoir plus sur la méthode</span>
        <span className="absolute inset-0 bg-sunset-gold opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
      </button>
    </section>
  );
}

export default HowItWorksSection;