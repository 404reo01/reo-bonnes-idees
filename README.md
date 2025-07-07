# REO Bonnes Idées

## Introduction

REO Bonnes Idées est un chatbot propulsé par l'intelligence artificielle (Google Gemini) conçu pour aider les étudiants et les développeurs à **générer des idées de projets de développement personnalisées et originales**. L'objectif est de s'éloigner des projets standards pour proposer des concepts uniques et adaptés. REO prend en compte vos compétences, vos centres d'intérêt, votre temps disponible et même votre profil GitHub pour vous proposer une roadmap détaillée et des ressources d'apprentissage adaptées.

Que vous cherchiez un projet pour étoffer votre portfolio, explorer une nouvelle technologie, ou simplement vous amuser avec une idée unique, REO est là pour vous guider.

### État Actuel du Projet

**Veuillez noter :** Ce projet est actuellement en cours de développement actif. Bien que le code soit disponible et fonctionnel localement, **l'application n'est pas encore hébergée publiquement.**

Pour le moment, ce dépôt est destiné à :
* Permettre aux développeurs de consulter le code source.
* Offrir la possibilité de tester et de contribuer au projet en local.
* Présenter les fonctionnalités clés déjà implémentées.

L'hébergement public est prévu pour une phase ultérieure du développement.

## Fonctionnalités Clés (Fonctionnelles en local)

* **Génération d'Idées Personnalisées :** Répondez à un court questionnaire pour obtenir une idée de projet unique, adaptée à votre profil.
* **Analyse de Profil GitHub :** Intégration avec l'API GitHub pour analyser vos langages de programmation les plus utilisés et les thèmes de vos projets précédents, afin d'affiner les suggestions.
* **Roadmap Détaillée :** Chaque idée générée est accompagnée d'une roadmap structurée, décomposant le projet en étapes réalisables.
* **Suggestions de Ressources :** Pour chaque étape de la roadmap, REO suggère des types de ressources (documentation, tutoriels, articles) pour vous aider à démarrer.
* **Architecture Modulaire :** Séparation claire entre le frontend (React/Vite) et le backend (Node.js/Express) pour une meilleure maintenabilité et évolutivité.
* **Base de Données Scalable :** Utilisation de Supabase pour la gestion des données (potentiellement pour sauvegarder les idées générées, les profils utilisateurs, etc. - *Fonctionnalités de persistance à développer davantage*).
* **API d'IA Puissante :** Intégration de l'API Google Gemini (modèle `gemini-1.5-flash`) pour une génération d'idées créative et pertinente.

## Technologies Utilisées

### Frontend
* **React** : Bibliothèque JavaScript pour la construction d'interfaces utilisateur interactives.
* **Vite** : Outil de build rapide pour les projets frontend modernes.
* **Tailwind CSS** : Framework CSS utilitaire pour un stylisme rapide et réactif.
* **Axios** : Client HTTP basé sur les promesses pour le navigateur et Node.js, utilisé pour les requêtes API.
* **React Router DOM** : Pour la navigation au sein de l'application.

### Backend
* **Node.js** : Environnement d'exécution JavaScript côté serveur.
* **Express.js** : Framework web minimaliste et flexible pour Node.js.
* **`@google/generative-ai`** : SDK officiel de Google pour interagir avec l'API Gemini.
* **Axios** : Pour les requêtes HTTP (notamment vers l'API GitHub).
* **`@supabase/supabase-js`** : SDK client pour interagir avec Supabase.
* **`cors`** : Middleware Node.js pour gérer les requêtes Cross-Origin Resource Sharing.
* **`dotenv`** : Charge les variables d'environnement depuis un fichier `.env`.

### Base de Données
* **Supabase** : Alternative open-source à Firebase, fournissant une base de données PostgreSQL, authentification, stockage, etc.

## Prérequis

Avant de pouvoir lancer le projet en local, assurez-vous d'avoir les éléments suivants installés sur votre machine :

* [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gestionnaire de paquets)
* Un compte [GitHub](https://github.com/) (optionnel, mais améliore la personnalisation de l'idée)
* Une [clé API pour Google Gemini](https://ai.google.dev/gemini-api/docs/get-started/node#setup_your_api_key) (nécessite un compte Google Cloud).
* Un projet [Supabase](https://supabase.com/) avec votre URL de projet et votre clé `anon` (publiable).

## Installation et Lancement (Local)

Suivez ces étapes pour installer les dépendances et lancer le projet sur votre machine locale.

1.  **Clonez le dépôt :**
    ```bash
    git clone [https://github.com/votre-utilisateur/reo-bonnes-idees.git](https://github.com/votre-utilisateur/reo-bonnes-idees.git)
    cd reo-bonnes-idees
    ```

2.  **Configuration des variables d'environnement :**
    Créez un fichier `.env` à la **racine de votre projet** (au même niveau que le dossier `frontend` et `server.js`) et ajoutez-y vos clés API et URL Supabase. **Ceci est crucial pour que le backend fonctionne.**

    ```env
    # Variables requises pour le Backend
    SUPABASE_URL=https://<your-supabase-project-id>.supabase.co
    SUPABASE_ANON_KEY=eyJ...votre_supabase_anon_key...
    GEMINI_API_KEY=AIzaSy...votre_gemini_api_key...

    # Optionnel: Si votre backend écoute sur un port différent du 5000 par défaut
    # PORT=8080
    ```
    **ATTENTION : Assurez-vous que votre fichier `.env` est bien ignoré par Git ! Ajoutez `.env` à votre `.gitignore`.**

3.  **Installation des dépendances du Backend :**
    Naviguez vers le dossier où se trouve votre `server.js` (si `server.js` est à la racine, vous êtes déjà au bon endroit).
    ```bash
    npm install
    # OU
    yarn install
    ```

4.  **Installation des dépendances du Frontend :**
    Naviguez vers le dossier `frontend` :
    ```bash
    cd frontend
    npm install
    # OU
    yarn install
    ```

5.  **Lancement du Backend :**
    Ouvrez un **premier terminal**. Naviguez vers le dossier où se trouve votre `server.js` (par exemple, la racine de votre projet).
    ```bash
    node server.js
    # OU (pour le développement avec rechargement automatique)
    # nodemon server.js
    ```
    Vous devriez voir un message `Serveur démarré sur le port 5000` (ou le port que vous avez configuré).

6.  **Lancement du Frontend :**
    Ouvrez un **deuxième terminal**. Naviguez vers le dossier `frontend`.
    ```bash
    npm run dev
    # OU
    yarn dev
    ```
    Le serveur de développement Vite démarrera et ouvrira l'application dans votre navigateur (généralement à `http://localhost:5173`).

Votre application devrait maintenant être fonctionnelle en local.

## Utilisation du Chatbot (Local)

1.  **Répondez aux questions :** Le chatbot vous posera une série de questions pour comprendre vos besoins et préférences.
2.  **Profil GitHub :** Entrez votre nom d'utilisateur GitHub pour une personnalisation accrue.
3.  **Génération de l'idée :** Une fois toutes les questions répondues, REO générera une idée de projet détaillée avec une roadmap.
4.  **Affinage (En cours de développement) :** La capacité à interagir avec l'IA pour affiner l'idée générée est en cours d'implémentation.

## Contribution

Les contributions sont les bienvenues ! Si vous avez des idées d'amélioration, des rapports de bugs ou des fonctionnalités à ajouter, n'hésitez pas à ouvrir une [issue](https://github.com/votre-utilisateur/reo-bonnes-idees/issues) ou à soumettre une [Pull Request](https://github.com/votre-utilisateur/reo-bonnes-idees/pulls).

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. *(Optionnel : Créez un fichier `LICENSE.md` à la racine de votre projet avec le texte de la licence MIT.)*

---

**Points à vérifier avant de rendre public :**
* **Remplacez `votre-utilisateur`** dans les URLs GitHub du `README`.
* **Ajoutez une image attrayante** à la place du placeholder.
* **Créez le fichier `.gitignore`** si ce n'est pas déjà fait et assurez-vous qu'il contient au moins :
    ```
    node_modules/
    .env
    dist/
    ```
    (Si vous avez un dossier `backend` et `frontend`, ajoutez `node_modules/` dans chacun d'eux, et `.env` à la racine).
* **Créez un fichier `LICENSE.md`** à la racine de votre projet.

Ce `README` est beaucoup plus clair pour quiconque découvrirait votre projet sur GitHub !
