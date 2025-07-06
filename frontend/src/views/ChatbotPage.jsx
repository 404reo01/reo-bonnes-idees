// frontend/src/views/ChatbotPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import moonImage from '../assets/moon.jpg'; // Importe l'image de fond
import Header from '../components/Header'; // Importe le composant Header

function ChatbotPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 font-sans text-gray-light relative" // Supprimez 'justify-center' ici
      style={{
        backgroundImage: `url(${moonImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay pour assombrir l'image de fond et améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black-primary opacity-70"></div>

      {/* Rendu du Header - il sera positionné absolument en haut */}
      <Header />

      {/* Balise <main> qui contient le contenu principal du chatbot
          Elle prend l'espace restant (flex-grow) et est poussée vers le bas
          pour laisser de la place au header (pt-24).
      */}
      <main className="flex flex-col items-center px-4 max-w-2xl w-full z-10 flex-grow pt-24">
        <div className="relative z-10 text-center w-full p-8 rounded-2xl border border-glassy-border
                            bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 shadow-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8
                         bg-clip-text text-transparent bg-gradient-to-r from-sunset-orange to-sunset-gold">
            Bienvenue au Chatbot !
          </h2>
          <p className="text-lg mb-8">
            Préparez-vous à générer votre prochaine grande idée. Je vais vous poser quelques questions.
          </p>

          {/* Ici sera le contenu du chatbot */}
          <div className="bg-gray-dark p-6 rounded-lg text-left mb-8 min-h-[200px] flex items-center justify-center">
            <p className="text-gray-light opacity-80">
              Le chatbot commencera à poser des questions ici...
            </p>
          </div>

          <Link
            to="/"
            className="relative px-8 py-3 rounded-full text-md font-bold inline-block
                       bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border border-glassy-border
                       text-sunset-gold hover:text-gray-light
                       transition-colors duration-300 ease-in-out
                       shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sunset-gold focus:ring-opacity-50"
          >
            <span className="relative z-10">Retour à la page d'accueil</span>
            <span className="absolute inset-0 bg-sunset-gold opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ChatbotPage;