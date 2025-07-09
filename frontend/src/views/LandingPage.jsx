// frontend/src/views/LandingPage.jsx
import React from 'react';
import backgroundImage from '../assets/bg.jpg'; // <-- Chemin correct pour l'image

// Importation des composants depuis le dossier 'components'
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ProjectsSection from '../components/ProjectsSection';
import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const handleGenerateProjectClick = () => {
    navigate('/chatbot');
  };

  const handleLearnMoreClick = () => {
    alert("Redirection vers la page d'explication 'Comment ça marche' !");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 font-sans text-gray-light relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black-primary opacity-70"></div>

      <Header />

      <main className="flex flex-col items-center px-4 max-w-2xl w-full z-10 flex-grow pt-24">
        <HeroSection onGenerateProject={handleGenerateProjectClick} />
        <HowItWorksSection />
        <ProjectsSection />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;