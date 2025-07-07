# Reo Bonnes Idées

Bienvenue dans Reo Bonnes Idées, votre assistant personnel pour générer des idées de projets de développement !

---

## 🚀 Application en ligne

Découvrez Reo Bonnes Idées en action directement sur Netlify :
👉 [**Lancer le Chatbot Reo**](https://reobonneidees.netlify.app/) 👈

---

## ✨ Fonctionnalités

* **Génération d'idées personnalisées :** Répondez à quelques questions simples sur vos intérêts, vos compétences et vos objectifs pour obtenir une idée de projet unique.
* **Roadmap détaillée :** Chaque idée générée est accompagnée d'une feuille de route pour vous aider à démarrer.
* **Intégration GitHub (optionnel) :** Indiquez votre nom d'utilisateur GitHub pour une touche de personnalisation.

## 🛠️ Technologies Utilisées

**Frontend :**
* React
* Vite
* Tailwind CSS
* Axios (pour les requêtes API)
* React Router DOM

**Backend :**
* Node.js
* Express.js
* OpenAI API
* Axios (pour les requêtes API)

## ☁️ Déploiement

* **Frontend :** Déployé sur [Netlify](https://www.netlify.com/)
* **Backend :** Déployé sur [Render](https://render.com/)

## 📝 Démarrage en local (pour les développeurs)

### Prérequis

Assurez-vous d'avoir Node.js et npm (ou Yarn) installés.

### Backend

1.  Clonez le dépôt :
    ```bash
    git clone [https://github.com/404reo01/reo-bonnes-idees.git](https://github.com/404reo01/reo-bonnes-idees.git)
    cd reo-bonnes-idees
    ```
2.  Naviguez vers le dossier `backend` :
    ```bash
    cd backend
    ```
3.  Installez les dépendances :
    ```bash
    npm install
    ```
4.  Créez un fichier `.env` à la racine du dossier `backend` et ajoutez votre clé API OpenAI :
    ```
    OPENAI_API_KEY=votre_cle_api_openai
    GITHUB_TOKEN=votre_cle_github_si_necessaire # Si vous avez des problèmes de taux limite API GitHub
    PORT=5000 # ou le port de votre choix
    ```
5.  Démarrez le serveur backend :
    ```bash
    npm start
    ```
    Le backend devrait tourner sur `http://localhost:5000`.

### Frontend

1.  Naviguez vers le dossier `frontend` :
    ```bash
    cd ../frontend
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Démarrez l'application frontend :
    ```bash
    npm run dev
    ```
    L'application frontend devrait être accessible via `http://localhost:5173` (ou un autre port Vite).



---
