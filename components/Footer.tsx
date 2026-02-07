import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* Custom SVG Logo matching the Altea Hexagon Brand */}
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <defs>
                  <pattern id="stripes-footer" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect x="0" y="0" width="10" height="20" fill="#4ADE80" /> {/* Light Green */}
                    <rect x="10" y="0" width="10" height="20" fill="#166534" /> {/* Dark Green */}
                  </pattern>
                </defs>
                {/* Hexagon Background with Stripes */}
                <path d="M50 2L91.569 26V74L50 98L8.43076 74V26L50 2Z" fill="url(#stripes-footer)" stroke="#166534" strokeWidth="2"/>
                {/* The 'A' Shape */}
                <path d="M50 22L78 82H64L50 52L36 82H22L50 22Z" fill="white"/>
              </svg>
              <span className="text-2xl font-bold tracking-tight">ALTEA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Service d’entretien de pelouse rapide, fiable, professionnel. 
              Nous prenons soin de votre terrain pour que vous puissiez profiter de votre été.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">Liens Rapides</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#hero" className="hover:text-altea-green transition-colors">Accueil</a></li>
              <li><a href="#pricing" className="hover:text-altea-green transition-colors">Nos Forfaits</a></li>
              <li><a href="#promos" className="hover:text-altea-green transition-colors">Promotions</a></li>
              <li><a href="#booking" className="hover:text-altea-green transition-colors">Réserver</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">Légal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-altea-green transition-colors">Conditions de service</a></li>
              <li><a href="#" className="hover:text-altea-green transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-altea-green transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-altea-green" />
                <span>{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-altea-green" />
                <span>{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-altea-green" />
                <span>{CONTACT_INFO.address}</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20}/></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20}/></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} ALTEA Entretien de pelouse. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
