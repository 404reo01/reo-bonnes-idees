// frontend/tailwind.config.js - Mise à jour des couleurs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NOUVELLE PALETTE : Noir plus profond, Orange Sunset, Gris plus discrets
        'black-primary': '#000000',       // Vrai noir pour le fond principal
        'gray-dark': '#121212',           // Gris très foncé pour les éléments secondaires
        'gray-medium': '#2A2A2A',         // Gris pour bordures ou texte moins accentué
        'gray-light': '#F0F0F0',          // Texte très clair sur fond sombre
        'sunset-orange': '#FF6B6B',       // Orange corail (couleur d'accent principale)
        'sunset-gold': '#FFC47B',         // Jaune doré (accent secondaire/boutons)
        'sunset-red': '#E04040',          // Rouge profond (accent ou alerte)
        'glassy-border': 'rgba(255, 255, 255, 0.05)', // Bordure encore plus subtile pour l'effet glassy
        'glassy-bg': 'rgba(255, 255, 255, 0.02)',   // Fond encore plus transparent pour l'effet glassy
      },
    },
  },
  plugins: [],
}