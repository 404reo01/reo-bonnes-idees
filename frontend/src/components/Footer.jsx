// frontend/src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    // Retire 'absolute bottom-0 w-full'
    <footer className="p-4 text-center text-gray-medium text-sm z-10 w-full">
      © {new Date().getFullYear()} REO Bonnes Idées. Tous droits réservés.
    </footer>
  );
}

export default Footer;