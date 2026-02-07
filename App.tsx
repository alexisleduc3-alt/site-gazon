import React, { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import NavBar from './components/NavBar';
import Pricing from './components/Pricing';
import Promos from './components/Promos';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { LawnType, ServiceType } from './types';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [selectedLawnType, setSelectedLawnType] = useState<LawnType>('detache');
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>('tonte');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handlePlanSelection = (type: LawnType, service: ServiceType) => {
    setSelectedLawnType(type);
    setSelectedServiceType(service);
    const promosSection = document.getElementById('promos');
    if (promosSection) {
      promosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300 font-sans selection:bg-altea-green selection:text-white">
      
      {/* Alert Banner */}
      <div className="bg-emerald-900 text-white text-center py-2 px-4 text-xs md:text-sm font-medium tracking-wide">
        PROMO LÈVE-TÔT : Obtenez <span className="text-altea-green font-bold">10% de rabais</span> sur votre abonnement en réservant avant le 15 avril.
      </div>

      <NavBar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section corrigée avec ton image fond-herbe.jpg */}
      <section id="hero" className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background - Utilisation de ton fichier fond-herbe.jpg */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/fond-herbe.jpg" 
            alt="Pelouse résidentielle Altea" 
            className="w-full h-full object-cover"
          />
          {/* Superposition pour la lisibilité du texte */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 mt-16">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-altea-green fill-altea-green" />)}
            <span className="text-gray-200 text-xs font-semibold ml-2 tracking-widest uppercase">Service 5 Étoiles</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-xl">
            Tonte de gazon. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Simplifiée.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Rapide, fiable, professionnel. Nous prenons soin de votre terrain pour que vous puissiez profiter de votre été.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-altea-green hover:bg-altea-greenDark text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-altea-green/40 flex items-center gap-2"
            >
              VOIR LES PRIX & RÉSERVER
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Pricing onSelectPlan={handlePlanSelection} />
      <Promos />
      <BookingForm 
        initialLawnType={selectedLawnType} 
        initialServiceType={selectedServiceType} 
      />
      <Footer />
    </div>
  );
};

export default App;
