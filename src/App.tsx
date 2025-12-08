/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, ShoppingBag, Camera, 
  Plane, Utensils, Hotel, ArrowUp, Calendar, Upload, 
  CheckSquare, Sun, CloudSun, AlertTriangle,
  Phone, BookOpen, Car
} from 'lucide-react';
import { 
  ITINERARY, TRIP_DETAILS, CHECKLIST_DATA, FOOD_HIGHLIGHTS, MARKET_HIGHLIGHTS, TRAVEL_TIPS
} from './components/ItineraryData';
import type { DaySchedule, ItineraryItem, HighlightItem } from './components/ItineraryData';

const IconMap = {
  food: Utensils,
  activity: Camera,
  travel: Plane,
  shop: ShoppingBag,
  hotel: Hotel
};

const ItineraryItemCard: React.FC<{ item: ItineraryItem; isLast: boolean }> = ({ item, isLast }) => {
  const Icon = IconMap[item.icon || 'activity'];
  
  return (
    <div className="relative pl-8 md:pl-12 py-4 group">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-[2px] bg-thai-clay/30 group-hover:bg-thai-gold/50 transition-colors"></div>
      )}
      
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1 top-5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-thai-bg border-2 border-thai-clay flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-thai-gold transition-all shadow-sm">
        <Icon size={12} className="text-thai-clay group-hover:text-thai-gold md:w-4 md:h-4" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
        <div className="min-w-[60px] pt-1">
          <span className="font-sans font-bold text-thai-gold text-lg">{item.time}</span>
        </div>
        
        <div className="flex-1 bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-serif font-bold text-lg text-thai-dark mb-1">{item.title}</h4>
          <p className="text-stone-500 text-sm leading-relaxed mb-3">{item.description}</p>
          
          {item.mapUrl && (
            <a 
              href={item.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-thai-clay hover:text-thai-gold transition-colors uppercase tracking-wider px-3 py-1.5 bg-stone-50 rounded-full hover:bg-yellow-50"
            >
              <MapPin size={12} />
              Open Map
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface DaySectionProps {
  day: DaySchedule;
  customImage?: string;
  onImageUpload: (id: string, file: File) => void;
}

const DaySection: React.FC<DaySectionProps> = ({ day, customImage, onImageUpload }) => {
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(day.id, file);
    }
  };

  return (
    <section id={day.id} className="min-h-screen py-12 md:py-24 border-b border-stone-200 last:border-0 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Date Header */}
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 sticky top-20 z-20 bg-thai-bg/95 backdrop-blur-sm py-4 md:bg-transparent md:backdrop-blur-none pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
             <div className="text-5xl md:text-7xl font-serif font-bold text-thai-gold opacity-90">{day.date.split('/')[1]}</div>
             <div className="flex flex-col">
                <span className="text-sm font-bold tracking-widest text-stone-400 uppercase">January</span>
                <span className="text-xl font-serif text-stone-600">Day {day.id.replace('day', '')}</span>
             </div>
          </div>
          <div className="h-px bg-stone-300 flex-1 hidden md:block opacity-50"></div>
          <div className="text-lg md:text-2xl font-serif text-thai-dark italic pointer-events-auto">{day.title}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Illustration / Visual Column */}
           <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-40">
                <div 
                  className="rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-all duration-500 cursor-pointer group relative bg-stone-100"
                  onClick={handleImageClick}
                  title="Click to replace image"
                >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    
                    <div className="relative w-full">
                        <img 
                          src={customImage || (imgError ? day.fallbackImage : day.imageUrl)} 
                          alt={`Itinerary for ${day.title}`}
                          onError={() => setImgError(true)}
                          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Overlay for Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                        
                        {/* Upload Overlay (Visible on Hover) */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                           <div className="bg-white/90 text-thai-dark px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                              <Upload size={16} />
                              <span>更換照片</span>
                           </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                            <div className="flex items-center gap-2 text-sm font-medium mb-2 opacity-90">
                                <Calendar size={14}/>
                                {day.date} ({day.dayOfWeek})
                            </div>
                            <h3 className="text-2xl font-serif leading-tight">{day.title}</h3>
                        </div>
                    </div>
                </div>
                {day.transport && (
                   <div className="mt-6 flex justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-medium">
                        <Plane size={14} className="rotate-45"/> 交通: {day.transport}
                      </span>
                   </div>
                )}
              </div>
           </div>

           {/* Timeline Column */}
           <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white/50 rounded-3xl p-2 md:p-8">
                {day.items.map((item, idx) => (
                  <ItineraryItemCard 
                    key={idx} 
                    item={item} 
                    isLast={idx === day.items.length - 1} 
                  />
                ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

const TipsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'weather': return <Sun size={24} className="text-orange-400" />;
      case 'culture': return <BookOpen size={24} className="text-purple-400" />;
      case 'transport': return <Car size={24} className="text-blue-400" />;
      case 'emergency': return <Phone size={24} className="text-red-400" />;
      default: return <CheckSquare size={24} />;
    }
  };

  return (
    <div className="bg-stone-50 rounded-2xl p-6 md:p-8 mb-16 border border-stone-200">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-thai-gold" size={24} />
        <h3 className="font-serif text-2xl text-thai-dark font-bold">旅遊指南 (Travel Tips)</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRAVEL_TIPS.map((tip, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-stone-50 p-2 rounded-lg">
                {getIcon(tip.icon)}
              </div>
              <h4 className="font-serif font-bold text-lg text-thai-dark">{tip.category}</h4>
            </div>
            <ul className="space-y-2">
              {tip.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-stone-600 leading-relaxed">
                  <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-thai-gold/50 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChecklistSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 mb-16">
      <div className="flex items-center gap-3 mb-6">
        <CheckSquare className="text-thai-gold" size={24} />
        <h3 className="font-serif text-2xl text-thai-dark font-bold">旅人備忘錄 (Checklist)</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pre-Trip */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-thai-clay border-b border-stone-100 pb-2">行前準備</h4>
          <ul className="space-y-3">
            {CHECKLIST_DATA.preTrip.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                <span className="text-stone-600 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* On-Site */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-thai-clay border-b border-stone-100 pb-2">在地任務</h4>
          <ul className="space-y-3">
            {CHECKLIST_DATA.onSite.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                <span className="text-stone-600 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weather Card */}
        <div className="bg-orange-50/50 rounded-xl p-6 border border-orange-100">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-thai-dark font-bold">
                 <CloudSun size={20} className="text-orange-400" />
                 <span>{CHECKLIST_DATA.weather.title}</span>
              </div>
              <span className="text-2xl font-serif font-bold text-orange-500">{CHECKLIST_DATA.weather.temp}</span>
           </div>
           <p className="text-sm text-stone-600 mb-3">{CHECKLIST_DATA.weather.desc}</p>
           <div className="flex gap-2 items-start text-xs text-orange-700 bg-white/60 p-3 rounded-lg">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>{CHECKLIST_DATA.weather.warning}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const HighlightCard: React.FC<{ 
  item: HighlightItem;
  customImage?: string;
  onImageUpload: (id: string, file: File) => void;
}> = ({ item, customImage, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(item.id, file);
    }
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all border border-stone-100 cursor-pointer"
      onClick={handleImageClick}
      title="點擊更換照片"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={customImage || item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-white/90 text-thai-dark px-3 py-1.5 rounded-full flex items-center gap-2 font-bold shadow text-xs">
            <Upload size={12} />
            <span>更換照片</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        {item.tag && (
          <span className="inline-block px-2 py-0.5 bg-thai-gold text-white text-[10px] uppercase tracking-wider font-bold rounded mb-2">
            {item.tag}
          </span>
        )}
        <h4 className="font-serif font-bold text-lg text-thai-dark">{item.title}</h4>
        <div className="text-xs font-bold text-thai-clay uppercase tracking-wide mb-2">{item.subtitle}</div>
        <p className="text-sm text-stone-500 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('day1');
  const [scrolled, setScrolled] = useState(false);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1598935898639-6962f0a99605?q=80&w=2000&auto=format&fit=crop");
  
  const heroInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageUpload = (id: string, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setCustomImages(prev => ({
      ...prev,
      [id]: objectUrl
    }));
  };

  const handleHeroUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHeroImage(URL.createObjectURL(file));
    }
  };

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
       const offset = 80;
       const bodyRect = document.body.getBoundingClientRect().top;
       const elementRect = el.getBoundingClientRect().top;
       const elementPosition = elementRect - bodyRect;
       const offsetPosition = elementPosition - offset;

       window.scrollTo({
         top: offsetPosition,
         behavior: 'smooth'
       });
    }
  };

  return (
    <div className="min-h-screen bg-thai-bg text-thai-dark selection:bg-thai-pink selection:text-white font-sans">
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            className="flex flex-col cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <span className={`font-serif font-bold text-xl tracking-wide ${scrolled ? 'text-thai-dark' : 'text-white'}`}>CHIANG MAI</span>
             <span className="text-[10px] tracking-[0.2em] uppercase text-thai-gold font-bold">Slow Life 2026</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-full backdrop-blur-sm">
             {ITINERARY.map((day) => (
               <button
                 key={day.id}
                 onClick={() => scrollTo(day.id)}
                 className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === day.id ? 'bg-thai-gold text-white shadow-sm' : 'text-stone-500 hover:text-thai-dark hover:bg-white'}`}
               >
                 {day.date}
               </button>
             ))}
             <div className="w-px h-4 bg-stone-300 mx-1"></div>
             <button onClick={() => scrollTo('food')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'food' ? 'bg-thai-gold text-white shadow-sm' : 'text-stone-500 hover:text-thai-dark hover:bg-white'}`}>美食</button>
             <button onClick={() => scrollTo('markets')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'markets' ? 'bg-thai-gold text-white shadow-sm' : 'text-stone-500 hover:text-thai-dark hover:bg-white'}`}>市集</button>
             <button onClick={() => scrollTo('tips')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'tips' ? 'bg-thai-gold text-white shadow-sm' : 'text-stone-500 hover:text-thai-dark hover:bg-white'}`}>指南</button>
             <button onClick={() => scrollTo('checklist')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${activeTab === 'checklist' ? 'bg-thai-gold text-white shadow-sm' : 'text-stone-500 hover:text-thai-dark hover:bg-white'}`}>備忘錄</button>
          </div>

          <a href={TRIP_DETAILS.hotel.url} target="_blank" className={`hidden md:flex items-center gap-2 text-xs font-bold transition-colors ${scrolled ? 'text-thai-dark hover:text-thai-gold' : 'text-white hover:text-thai-gold'}`}>
            <Hotel size={16} />
            <span>Booked Hotel</span>
          </a>
        </div>
        
        {/* Mobile Nav */}
        <div className="lg:hidden w-full flex flex-wrap justify-center gap-2 px-4 pb-4 mt-2">
           {ITINERARY.map((day) => (
               <button
                 key={day.id}
                 onClick={() => scrollTo(day.id)}
                 className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === day.id ? 'bg-thai-gold text-white border-thai-gold' : 'bg-white border-stone-200 text-stone-600'}`}
               >
                 Day {day.id.replace('day','')}
               </button>
             ))}
            <button onClick={() => scrollTo('food')} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === 'food' ? 'bg-thai-gold text-white border-thai-gold' : 'bg-white border-stone-200 text-stone-600'}`}>美食</button>
            <button onClick={() => scrollTo('markets')} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === 'markets' ? 'bg-thai-gold text-white border-thai-gold' : 'bg-white border-stone-200 text-stone-600'}`}>市集</button>
            <button onClick={() => scrollTo('tips')} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === 'tips' ? 'bg-thai-gold text-white border-thai-gold' : 'bg-white border-stone-200 text-stone-600'}`}>指南</button>
            <button onClick={() => scrollTo('checklist')} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === 'checklist' ? 'bg-thai-gold text-white border-thai-gold' : 'bg-white border-stone-200 text-stone-600'}`}>備忘錄</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden group">
        {/* Background Image */}
        <div 
           className="absolute inset-0 z-0 cursor-pointer"
           onClick={() => heroInputRef.current?.click()}
        >
           <input 
             type="file" 
             ref={heroInputRef} 
             className="hidden" 
             accept="image/*"
             onChange={handleHeroUpload}
           />
           <img 
            src={heroImage} 
            className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-105"
            alt="Chiang Mai"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-thai-bg"></div>
           
           {/* Upload Hint */}
           <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity border border-white/30">
              <Upload size={12} /> Change Cover
           </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20 pointer-events-none">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="inline-block px-4 py-1 border border-white/50 text-white text-xs tracking-[0.3em] uppercase font-bold rounded-full mb-6 backdrop-blur-sm"
           >
             {TRIP_DETAILS.dates}
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg"
           >
             {TRIP_DETAILS.title}
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-lg md:text-2xl text-white/90 font-serif italic mb-12 drop-shadow-md"
           >
             {TRIP_DETAILS.subtitle}
           </motion.p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 relative z-20 -mt-24">
        
        {/* Info Cards (Flight & Hotel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white p-6 rounded-xl shadow-lg border border-stone-100"
            >
               <div className="flex items-center gap-3 mb-4 text-thai-clay">
                  <Plane size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Flight Info</span>
               </div>
               <div className="space-y-3">
                  {TRIP_DETAILS.flights.map((f, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-stone-100 last:border-0 pb-2 last:pb-0">
                        <span className="font-bold text-thai-dark">{f.code}</span>
                        <span className="text-sm text-stone-500">{f.route}</span>
                        <span className="text-xs font-mono bg-stone-100 px-2 py-1 rounded">{f.date}</span>
                    </div>
                  ))}
               </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-white p-6 rounded-xl shadow-lg border border-stone-100"
            >
               <div className="flex items-center gap-3 mb-4 text-thai-clay">
                  <Hotel size={20} />
                  <span className="text-xs font-bold uppercase tracking-widest">Accommodation</span>
               </div>
               <h3 className="text-xl font-serif font-bold text-thai-dark mb-2">{TRIP_DETAILS.hotel.name}</h3>
               <p className="text-sm text-stone-500 mb-4">{TRIP_DETAILS.hotel.note}</p>
               <a 
                 href={TRIP_DETAILS.hotel.url} 
                 target="_blank"
                 className="block w-full text-center py-2 border border-thai-gold text-thai-gold hover:bg-thai-gold hover:text-white rounded-lg transition-colors text-sm font-bold"
               >
                 View Location
               </a>
            </motion.div>
        </div>

      </div>

      <main>
        {ITINERARY.map((day) => (
          <DaySection 
            key={day.id} 
            day={day} 
            customImage={customImages[day.id]}
            onImageUpload={handleImageUpload}
          />
        ))}

        {/* Highlights Section: Food & Markets - Moved to Bottom */}
        <section className="container mx-auto px-4 pt-12 pb-24 space-y-24">
            {/* Food */}
            <div id="food" className="scroll-mt-24">
               <div className="flex items-baseline gap-4 mb-8 border-b border-stone-200 pb-4">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-thai-dark">舌尖上的清邁</h3>
                  <span className="text-sm text-thai-clay font-bold tracking-widest uppercase">Gastronomy</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {FOOD_HIGHLIGHTS.map((item) => (
                    <HighlightCard 
                      key={item.id} 
                      item={item} 
                      customImage={customImages[item.id]}
                      onImageUpload={handleImageUpload}
                    />
                 ))}
               </div>
            </div>

            {/* Markets */}
            <div id="markets" className="scroll-mt-24">
               <div className="flex items-baseline gap-4 mb-8 border-b border-stone-200 pb-4">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-thai-dark">市集迷的地圖</h3>
                  <span className="text-sm text-thai-clay font-bold tracking-widest uppercase">Local Markets</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {MARKET_HIGHLIGHTS.map((item) => (
                    <HighlightCard 
                      key={item.id} 
                      item={item} 
                      customImage={customImages[item.id]}
                      onImageUpload={handleImageUpload}
                    />
                 ))}
               </div>
            </div>
        </section>

        {/* Tips & Checklist Section */}
        <div className="container mx-auto px-4">
           <div id="tips" className="scroll-mt-24">
              <TipsSection />
           </div>
           
           <div id="checklist" className="scroll-mt-24">
              <ChecklistSection />
           </div>
        </div>
      </main>

      <footer className="bg-thai-dark text-stone-400 py-16 text-center">
        <div className="container mx-auto px-6">
            <h2 className="font-serif text-2xl text-white mb-4">Have a wonderful trip!</h2>
            <p className="text-sm mb-8 opacity-60">Chiang Mai, Thailand • January 2026</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-600 rounded-full hover:bg-white hover:text-thai-dark transition-all text-xs font-bold uppercase tracking-widest"
            >
              <ArrowUp size={14} /> Back to Top
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;