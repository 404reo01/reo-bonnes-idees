require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai'); 

const app = express();
const port = process.env.PORT || 5000; 

// Configuration Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configuration Gemini
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    console.error("Erreur: GEMINI_API_KEY n'est pas défini dans le fichier .env");
    process.exit(1); 
}
const genAI = new GoogleGenerativeAI(geminiApiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur REO Bonnes Idées API !');
});

// Exemple de route pour tester la connexion Supabase
app.get('/api/users', async (req, res) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
});

// Route pour récupérer les infos GitHub
app.get('/api/github/:username', async (req, res) => {
    const { username } = req.params;
    try {
        // Récupérer les infos de l'utilisateur
        const userRes = await axios.get(`https://api.github.com/users/${username}`);
        const userData = userRes.data;

        // Récupérer les dépôts de l'utilisateur (limité pour ne pas surcharger)
        const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = reposRes.data;

        // Analyser les langages et thèmes (simple pour l'instant)
        const languages = {};
        const topics = new Set(); 

        reposData.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
            if (repo.topics && repo.topics.length > 0) {
                repo.topics.forEach(topic => topics.add(topic));
            }
        });

        res.status(200).json({
            username: userData.login,
            avatar_url: userData.avatar_url,
            public_repos: userData.public_repos,
            most_used_languages: Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 5), // Top 5
            project_topics: Array.from(topics).slice(0, 10), // Top 10 topics
        });

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'Utilisateur GitHub non trouvé.' });
        }
        console.error('Erreur lors de la récupération des données GitHub :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des données GitHub.' });
    }
});


// Nouvelle route pour le chatbot et la génération de projets
app.post('/api/generate-project', async (req, res) => {
    const { githubData, questionnaireResponses } = req.body;

    // Validation basique des entrées
    if (!questionnaireResponses) {
        return res.status(400).json({ message: "Veuillez fournir des réponses au questionnaire." });
    }

    try {
        // prompt (J'ai demandé à une IA de me le générer)
        let prompt = `Tu es un expert en développement et un générateur d'idées de projets innovants. Ton but est d'aider les étudiants à trouver et à structurer des projets personnalisés, loin des clichés habituels (pas de Titanic, de liste de tâches basique, etc.).

        Voici le profil de l'utilisateur (via GitHub) :
        - Langages les plus utilisés : ${githubData && githubData.most_used_languages ? githubData.most_used_languages.map(l => l[0]).join(', ') : 'Non renseigné'}
        - Thèmes de projets habituels : ${githubData && githubData.project_topics ? githubData.project_topics.join(', ') : 'Non renseigné'}

        Voici les préférences de l'utilisateur (via le questionnaire) :
        - Langage souhaité (à utiliser ou apprendre) : ${questionnaireResponses.languagePreference || 'Pas de préférence'}
        - Centres d'intérêt : ${questionnaireResponses.interests || 'Non spécifié'}
        - Type de projet : ${questionnaireResponses.projectType || 'Utile ou fun'} (utile pour le CV ou fun pour le loisir)
        - Niveau actuel : ${questionnaireResponses.level || 'Débutant'}
        - Temps de réalisation estimé : ${questionnaireResponses.timeEstimate || 'Quelques jours'}

        Consignes pour la génération du projet :
        1. Propose UN SEUL projet.
        2. Le projet doit être original et adapté au profil et aux préférences.
        3. Le projet doit être réalisable par un étudiant au niveau indiqué.
        4. **Si les préférences sont contradictoires (ex: "expert" et "2 jours pour apprendre nouveau langage"), communique la contradiction et demande de reformuler. La réponse doit commencer par "Contradiction détectée : ".**
        5. Fournis une **description du projet** en 3-4 phrases.
        6. Propose une **roadmap détaillée**, avec des étapes claires pour la réalisation. Les étapes doivent être comme "Mettre en place le serveur Node.js", "Créer les routes API", "Développer les composants React".
        7. Pour chaque étape de la roadmap, suggère des **types de ressources** (ex: "Documentation officielle de [technologie]", "Tutoriel vidéo sur [concept]", "Article de blog sur [sujet]"). NE DONNE PAS DE LIENS URL SPÉCIFIQUES.
        8. Le tout doit être structuré au format JSON strict pour être facilement parsé.

        Exemple de format de réponse JSON attendu pour un projet (si pas de contradiction) :
        \`\`\`json
        {
          "projectTitle": "Nom du Projet Original",
          "projectDescription": "Ceci est une description en 3-4 phrases du projet proposé, expliquant son concept et ses fonctionnalités principales.",
          "roadmap": [
            {
              "step": "Étape 1 : Initialisation du backend",
              "description": "Mettre en place le serveur Node.js avec Express, configurer la base de données Supabase.",
              "resources": [
                "Documentation officielle de Node.js",
                "Tutoriel vidéo sur Express.js",
                "Article de blog sur la configuration de Supabase avec Node.js"
              ]
            },
            {
              "step": "Étape 2 : Création de l'API REST",
              "description": "Définir les routes API pour gérer les entités principales du projet (ex: utilisateurs, données spécifiques au projet).",
              "resources": [
                "Documentation Express pour les routes",
                "Exemples de design d'API REST",
                "Tutoriel sur l'intégration de Supabase avec Express"
              ]
            }
            // ... plus d'étapes ...
          ]
        }
        \`\`\`
        Maintenant, propose un projet basé sur ces informations.`

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text(); 

        // Tenter de parser le JSON
        if (text.includes('```json')) { // Vérifier si le JSON est bien encadré
            const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
            try {
                const parsedData = JSON.parse(jsonString);
                // Sauvegarder le projet dans Supabase (cette partie sera développée plus tard dans l'implémentation de la Phase 3/4)
                // const { data, error } = await supabase.from('projects').insert([{ user_id: req.body.userId, ...parsedData }]);
                // if (error) console.error("Erreur lors de la sauvegarde du projet dans Supabase:", error);

                res.status(200).json(parsedData);
            } catch (jsonError) {
                // Si l'IA a essayé de générer du JSON mais c'est invalide
                console.error("Erreur de parsing JSON de l'IA :", jsonError);
                res.status(500).json({ message: "L'IA a généré une réponse invalide ou non-parsable. Veuillez réessayer.", raw: text });
            }
        } else if (text.startsWith('Contradiction détectée :')) {
            // Si l'IA a identifié une contradiction et l'a signalée explicitement
            res.status(400).json({ message: text });
        } else {
            // Si la réponse de l'IA n'est ni JSON ni une contradiction explicite
            res.status(500).json({ message: "L'IA n'a pas pu générer un projet structuré ou clair. Veuillez réessayer.", raw: text });
        }

    } catch (error) {
        console.error('Erreur lors de la génération du projet par l\'IA :', error);
        // Gérer les erreurs spécifiques de l'API Gemini (ex: quota dépassé, erreur de clé)
        if (error.response && error.response.status) {
            return res.status(error.response.status).json({
                message: `Erreur de l'API Gemini: ${error.message || 'Problème inconnu'}`,
                details: error.response.data || error.response.statusText
            });
        }
        res.status(500).json({ message: 'Erreur interne du serveur lors de la génération du projet.' });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});