// frontend/src/views/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import moonImage from '../assets/moon.jpg';
import Header from '../components/Header';
import axios from 'axios';

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isLoadingIdea, setIsLoadingIdea] = useState(false);

  const messagesEndRef = useRef(null);

  // LA SEULE MODIFICATION ICI : Votre URL de backend Render
  const BASE_BACKEND_URL = 'https://reo-bonnes-idees.onrender.com';

  const questions = [
    "Bonjour ! Je suis Mecha-Reo, votre assistant pour la génération d'idées. Pour commencer, quel est le domaine ou le secteur d'activité qui vous intéresse le plus pour votre projet ? (Ex: technologie, environnement, éducation, santé, art, etc.)",
    "Très bien. Quels sont vos centres d'intérêt, vos passions, ou des sujets qui vous tiennent particulièrement à cœur et que vous aimeriez explorer via un projet ? (Ex: jeux vidéo, cuisine, musique, lecture, voyages, fitness, développement personnel, etc.)",
    "Quel est l'objectif principal de votre projet ? Cherchez-vous à résoudre un problème spécifique, à créer quelque chose de ludique, à explorer une nouvelle idée, ou autre ? (Ex: Application utilitaire, jeu, outil éducatif, plateforme artistique, projet expérimental, etc.)",
    "Envisagez-vous d'utiliser des langages de programmation ou des technologies spécifiques pour ce projet ? Si oui, lesquels ? (Ex: Python, JavaScript, React, Node.js, C#, mobile, web, IA, blockchain, etc.)",
    "Quel est le public cible de votre projet ? Qui sont les utilisateurs finaux ? (Ex: étudiants, petites entreprises, personnes âgées, artistes, communautés locales, etc.)",
     "Quel est votre niveau actuel en développement ? (Ex: Débutant, Intermédiaire, Avancé)",
    "Pour vous aider à concrétiser, quel est votre nom d'utilisateur GitHub ? (Si vous en avez un, sinon vous pouvez taper 'aucun')"
  ];

  // --- Effet pour le démarrage du chatbot et la progression ---
  useEffect(() => {
    console.log(`--- useEffect START --- Current step: ${step}, Messages length: ${messages.length}, Generated Idea: ${!!generatedIdea}, IsLoadingIdea: ${isLoadingIdea}`);
    console.log(`Last message sender: ${messages[messages.length - 1]?.sender}, User response for prev step: ${userResponses[`question${step - 1}`]}`);

    // 1. Initialisation du premier message du bot
    if (messages.length === 0 && step === 0) {
      console.log("[useEffect] Condition 1 (Initial): Setting first bot message.");
      setMessages([{ sender: 'bot', text: questions[0] }]);
    }
    // 2. Le bot pose la question suivante (après une réponse utilisateur)
    else if (step > 0 && step < questions.length && messages[messages.length - 1]?.sender === 'user') {
      if (userResponses[`question${step - 1}`] !== undefined) {
          console.log(`[useEffect] Condition 2 (Next Question): Bot asking question ${step}.`);
          setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: questions[step] }]);
          }, 500);
      } else {
          console.log(`[useEffect] Condition 2 (Next Question): Waiting for user response for step ${step-1} to be registered.`);
      }
    }
    // 3. Toutes les questions ont été posées (step === questions.length)
    // C'est le moment d'afficher le message de génération et de déclencher l'appel API.
    else if (step === questions.length && !generatedIdea && !isLoadingIdea) {
      console.log("[useEffect] Condition 3 (Generate Idea): All questions answered. Attempting to trigger generation.");

      const isGeneratingMessageAdded = messages.some(msg => msg.sender === 'bot' && msg.text.includes("Je génère votre idée de projet..."));

      if (!isGeneratingMessageAdded) {
          console.log("[useEffect] Condition 3: Adding 'generating' message and scheduling API call.");
          setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: "Merci pour toutes ces informations ! Je génère votre idée de projet..." }]);
          setIsLoadingIdea(true);

          setTimeout(() => {
            generateProjectIdeaFromAPI();
          }, 1500);
      } else {
          console.log("[useEffect] Condition 3: 'Generating' message already added, waiting for simulation/API call to complete.");
      }
    }
    console.log("--- useEffect END ---");
  }, [step, userResponses, generatedIdea, isLoadingIdea, messages]); // <-- Ajout de 'messages' comme dépendance pour éviter les warnings

  // --- Effet pour faire défiler la conversation ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Logique d'envoi de message ---
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    if (isLoadingIdea) return;

    console.log(`[handleSendMessage] User input: "${input.trim()}" at step ${step}`);

    const newUserMessage = { sender: 'user', text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [`question${step}`]: input.trim(),
    }));

    setInput('');

    setStep((prevStep) => prevStep + 1);
    console.log(`[handleSendMessage] Step incremented to: ${step + 1}`);
  };

  // --- Fonction pour appeler l'API et générer l'idée ---
  const generateProjectIdeaFromAPI = async () => {
    console.log("[generateProjectIdeaFromAPI] Calling backend API for idea generation.");

    const questionnaireResponses = {
      domain: userResponses.question0,
      interests: userResponses.question1,
      projectObjective: userResponses.question2,
      technologies: userResponses.question3,
      targetAudience: userResponses.question4,
      level: userResponses.question5, 
      githubUsername: userResponses.question6,
      timeEstimate: "Quelques semaines" // Valeur par défaut
    };

    let githubData = null;
    if (questionnaireResponses.githubUsername && questionnaireResponses.githubUsername.toLowerCase() !== 'aucun') {
        try {
            console.log(`[generateProjectIdeaFromAPI] Fetching GitHub data for: ${questionnaireResponses.githubUsername}`);
            // UTILISATION DE L'URL DE BACKEND RENDER
            const githubRes = await axios.get(`${BASE_BACKEND_URL}/api/github/${questionnaireResponses.githubUsername}`);
            githubData = githubRes.data;
            console.log("[generateProjectIdeaFromAPI] GitHub data fetched:", githubData);
        } catch (error) {
            console.error("Erreur lors de la récupération des données GitHub:", error);
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: `Désolé, impossible de récupérer les informations GitHub pour "${questionnaireResponses.githubUsername}". Je vais générer l'idée sans ces données.` }]);
        }
    }

    try {
      // UTILISATION DE L'URL DE BACKEND RENDER
      const response = await axios.post(`${BASE_BACKEND_URL}/api/generate-project`, {
        githubData: githubData,
        questionnaireResponses: questionnaireResponses,
      });

      const ideaData = response.data;

      let formattedIdea = `
        **Idée de Projet Générée par REO :**

        **Titre :** ${ideaData.projectTitle || 'Non spécifié'}
        **Description :** ${ideaData.projectDescription || 'Non spécifié'}

        ---
        **Roadmap :**
      `;
      ideaData.roadmap.forEach(stepItem => {
        formattedIdea += `\n**${stepItem.step}**\n${stepItem.description}\n* Ressources: ${stepItem.resources.join(', ')}\n`;
      });
      formattedIdea += `\nReo est à votre disposition pour affiner cette idée et vous accompagner dans sa concrétisation.`;

      setGeneratedIdea(formattedIdea);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: "Voici votre idée de projet :" },
        { sender: 'bot', text: formattedIdea, isIdea: true },
      ]);
      console.log("[generateProjectIdeaFromAPI] Idea generated and displayed successfully.");

    } catch (error) {
      console.error("Erreur lors de l'appel à l'API de génération de projet:", error);
      let errorMessage = "Désolé, une erreur est survenue lors de la génération de l'idée de projet. Veuillez réessayer.";
      if (error.response && error.response.data && error.response.data.message) {
          errorMessage = `Erreur de l'API : ${error.response.data.message}`;
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: errorMessage },
      ]);
    } finally {
      setIsLoadingIdea(false);
    }
  };

  // --- Rendu du composant ---
  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 font-sans text-gray-light relative"
      style={{
        backgroundImage: `url(${moonImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black-primary opacity-70"></div>

      <Header />

      <main className="flex flex-col items-center px-4 max-w-2xl w-full z-10 flex-grow pt-24">
        <div className="relative z-10 text-center w-full p-8 rounded-2xl border border-glassy-border
                            bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 shadow-xl
                            flex flex-col h-[70vh] max-h-[800px]">

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4
                         bg-clip-text text-transparent bg-gradient-to-r from-sunset-orange to-sunset-gold">
            Chatbot REO
          </h2>
          <p className="text-lg mb-6 opacity-80">
            Répondez aux questions pour générer votre idée de projet !
          </p>

          <div className="flex-grow overflow-y-auto p-4 mb-4 rounded-lg bg-gray-dark bg-opacity-70 custom-scrollbar min-h-[350px]"> 
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-sunset-gold text-black-primary ml-auto rounded-br-none'
                    : 'bg-glassy-bg text-gray-light mr-auto rounded-bl-none'
                }`}
              >
                {msg.isIdea ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {isLoadingIdea && (
              <div className="mb-3 p-3 rounded-lg mr-auto rounded-bl-none bg-glassy-bg text-gray-light">
                Reo réfléchit... (Génération de l'idée en cours)
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {generatedIdea === null && (
            <div className="flex mt-auto">
              <input
                type="text"
                className="flex-grow p-3 rounded-l-full border border-glassy-border bg-glassy-bg text-gray-light focus:outline-none focus:ring-2 focus:focus:ring-sunset-orange"
                placeholder="Votre réponse..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                disabled={isLoadingIdea || step === questions.length}
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 rounded-r-full bg-sunset-orange text-black-primary font-bold hover:bg-sunset-gold transition-colors duration-200"
                disabled={isLoadingIdea || step === questions.length}
              >
                Envoyer
              </button>
            </div>
          )}

          {generatedIdea !== null && (
            <Link
              to="/"
              className="mt-6 relative px-8 py-3 rounded-full text-md font-bold inline-block
                         bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 border border-glassy-border
                         text-sunset-gold hover:text-gray-light
                         transition-colors duration-300 ease-in-out
                         shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sunset-gold focus:ring-opacity-50"
            >
              <span className="relative z-10">Retour à la page d'accueil</span>
              <span className="absolute inset-0 bg-sunset-gold opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full"></span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

export default ChatbotPage;