// frontend/src/components/ProjectsSection.jsx
import React from 'react';

function ProjectsSection() {
  return (
    <section className="mt-8 p-8 w-full rounded-2xl border border-glassy-border
                        bg-glassy-bg backdrop-filter backdrop-blur-lg backdrop-saturate-150 shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-light mb-4 text-center">
        Vos Projets
      </h3>
      <div className="text-gray-light text-center text-lg italic py-10 opacity-75">
        <p className="mb-4">Pas encore de projets. Générez votre première idée lumineuse !</p>
        <svg className="w-16 h-16 mx-auto text-sunset-orange opacity-70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
    </section>
  );
}

export default ProjectsSection;