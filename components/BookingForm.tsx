import React, { useState, useEffect } from 'react';
import { LawnType, ServiceType, LandCategory, BookingFormData } from '../types';
import { CalendarCheck, Loader2, Users, AlertCircle, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface BookingFormProps {
  initialLawnType: LawnType;
  initialServiceType: ServiceType;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialLawnType, initialServiceType }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    address: '',
    email: '',
    phone: '',
    lawnType: initialLawnType,
    landCategory: 'standard',
    serviceType: initialServiceType,
    isDuoVoisin: false,
    neighborInfo: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update form when props change (from Pricing section selection)
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      lawnType: initialLawnType,
      serviceType: initialServiceType
    }));
  }, [initialLawnType, initialServiceType]);

  const handleNeighborChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      neighborInfo: {
        ...prev.neighborInfo!,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    // Configuration EmailJS - À REMPLACER PAR VOS INFOS
    // Allez sur https://www.emailjs.com/ pour créer un compte gratuit
    const SERVICE_ID = 'VOTRE_SERVICE_ID';
    const TEMPLATE_ID = 'VOTRE_TEMPLATE_ID';
    const PUBLIC_KEY = 'VOTRE_PUBLIC_KEY';

    // Préparation des données pour le template EmailJS
    // Dans votre template email, utilisez les variables : {{client_name}}, {{client_email}}, {{service_type}}, etc.
    const templateParams = {
      to_name: "Admin Altea",
      client_name: formData.name,
      client_email: formData.email,
      client_phone: formData.phone,
      client_address: formData.address,
      lawn_type: formData.lawnType === 'detache' ? 'Maison Détachée' : 'Jumelé / Ville',
      land_category: formData.landCategory === 'standard' ? 'Standard' : 'Grand/Boisé',
      service_type: formData.serviceType,
      is_duo: formData.isDuoVoisin ? 'OUI - Duo Voisin activé' : 'Non',
      neighbor_name: formData.neighborInfo?.name || '-',
      neighbor_address: formData.neighborInfo?.address || '-',
      neighbor_phone: formData.neighborInfo?.phone || '-',
      neighbor_email: formData.neighborInfo?.email || '-',
      client_comment: formData.comment || 'Aucun commentaire'
    };

    try {
      // Si les clés ne sont pas configurées, on simule pour ne pas bloquer l'interface
      if (SERVICE_ID === 'VOTRE_SERVICE_ID') {
        console.warn("EmailJS n'est pas configuré. Simulation de l'envoi.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        return;
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setIsSuccess(true);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setErrorMsg("Une erreur est survenue lors de l'envoi. Veuillez nous appeler directement ou réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="booking" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-altea-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarCheck className="text-white w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Demande Reçue !</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Merci {formData.name}. Notre équipe a bien reçu votre demande et vous contactera sous 24h pour confirmer la disponibilité à votre adresse.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-8 text-altea-green font-medium hover:underline"
          >
            Faire une autre demande
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vérifier la disponibilité
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Les places sont limitées par secteur pour garantir la qualité du service.
            Bloquez la vôtre maintenant.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1A1A1A] p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          
          {/* Main Contact Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nom complet</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green focus:border-transparent outline-none transition-all"
                placeholder="Jean Tremblay"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Téléphone</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green focus:border-transparent outline-none transition-all"
                placeholder="(514) 555-0123"
              />
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Adresse de service</label>
            <input 
              type="text" 
              required
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green focus:border-transparent outline-none transition-all"
              placeholder="123 Rue des Érables, Québec"
            />
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Courriel</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green focus:border-transparent outline-none transition-all"
              placeholder="jean@exemple.com"
            />
          </div>

          {/* Service Configuration */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 bg-gray-50 dark:bg-[#111] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Catégorie de terrain</label>
              <select 
                value={formData.landCategory}
                onChange={e => setFormData({...formData, landCategory: e.target.value as LandCategory})}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green outline-none"
              >
                <option value="standard">Terrain Standard</option>
                <option value="grand_boise">Grand terrain / Boisé (Sur soumission)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type de terrain</label>
              <select 
                value={formData.lawnType}
                onChange={e => setFormData({...formData, lawnType: e.target.value as LawnType})}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green outline-none"
              >
                <option value="jumele">Maison de Ville / Jumelé</option>
                <option value="detache">Maison Détachée</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Service désiré</label>
              <select 
                value={formData.serviceType}
                onChange={e => setFormData({...formData, serviceType: e.target.value as ServiceType})}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green outline-none"
              >
                <option value="tonte">Tonte seulement</option>
                <option value="tonte_feuilles">Tonte + Ramassage de feuilles (Même facture)</option>
                <option value="feuilles_only">Ramassage de feuilles seulement (Paiement fin de saison)</option>
              </select>
            </div>
          </div>

          {/* Duo Voisin Option */}
          <div className="mb-8 border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-2">
              <div className="mt-1">
                <input 
                  type="checkbox"
                  id="duoVoisin"
                  checked={formData.isDuoVoisin}
                  onChange={e => setFormData({...formData, isDuoVoisin: e.target.checked})}
                  className="w-5 h-5 rounded text-altea-green focus:ring-altea-green border-gray-300 dark:border-gray-600 cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="duoVoisin" className="font-bold text-gray-900 dark:text-white cursor-pointer select-none">
                  Duo Voisin – Obtenir le crédit voisinage
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Signez avec un voisin immédiat et recevez chacun <span className="text-blue-500 font-bold">50 $ de crédit</span> appliqué sur votre dernière mensualité.
                </p>
              </div>
            </div>

            {formData.isDuoVoisin && (
              <div className="mt-6 pl-9 grid md:grid-cols-2 gap-4 animate-fade-in-down">
                 <div className="md:col-span-2 text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                   <Users size={16} />
                   Informations du voisin
                 </div>
                 <input 
                  type="text" 
                  placeholder="Nom du voisin"
                  required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.name}
                  onChange={e => handleNeighborChange('name', e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                />
                <input 
                  type="text" 
                  placeholder="Adresse du voisin"
                  required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.address}
                  onChange={e => handleNeighborChange('address', e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                />
                <input 
                  type="tel" 
                  placeholder="Téléphone du voisin"
                  required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.phone}
                  onChange={e => handleNeighborChange('phone', e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                />
                <input 
                  type="email" 
                  placeholder="Courriel du voisin"
                  required={formData.isDuoVoisin}
                  value={formData.neighborInfo?.email}
                  onChange={e => handleNeighborChange('email', e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Comment Section */}
          <div className="space-y-2 mb-8">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              Commentaire (Facultatif)
            </label>
            <textarea
              value={formData.comment}
              onChange={e => setFormData({...formData, comment: e.target.value})}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-altea-green focus:border-transparent outline-none transition-all resize-none h-24"
              placeholder="Détails supplémentaires, code de porte, chien dans la cour, etc."
            />
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-altea-green hover:bg-altea-greenDark text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-altea-green/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" /> Traitement...
              </>
            ) : (
              "BLOQUER MA PLACE"
            )}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            Sans engagement immédiat. Nous confirmons d'abord le territoire.
          </p>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
