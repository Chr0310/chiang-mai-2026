/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, ShoppingBag, Camera, 
  Plane, Utensils, Hotel, ArrowUp, Calendar, 
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
      {!isLast && (
        <div className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-[2px] bg-thai-clay/30 group-hover:bg-thai-gold/50 transition-colors"></div>
      )}
      
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

const DaySection: React.FC<{ day: DaySchedule }> = ({ day }) => {
  return (
    <section id={day.id} className="min-h-[50vh] py-12 md:py-24 border-b border-stone-200 last:border-0 relative section-target">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 sticky top-16 md:top-20 z-20 bg-thai-bg/95 backdrop-blur-sm py-4 md:bg-transparent md:backdrop-blur-none pointer-events-none">
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
           <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-40">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 transition-all duration-500 bg-stone-100 relative group">
                    <img 
                      src={day.imageUrl} 
                      alt={day.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = day.fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                        <div className="flex items-center gap-2 text-sm font-medium mb-2 opacity-90">
                            <Calendar size={14}/>
                            {day.date} ({day.dayOfWeek})
                        </div>
                        <h3 className="text-2xl font-serif leading-tight">{day.title}</h3>
                    </div>
                </div>
                {day.transport && (
                   <div className="mt-6 flex justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-medium">
                        <Car size={14}/> 交通: {day.transport}
                      </span>
                   </div>
                )}
              </div>
           </div>

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

const HighlightCard: React.FC<{ item: HighlightItem }> = ({ item }) => (
  <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all border border-stone-100">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('day1');
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.section-target');
    targets.forEach(target => observer.observe(target));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
       const offset = 100;
       const bodyRect = document.body.getBoundingClientRect().top;
       const elementRect = el.getBoundingClientRect().top;
       const elementPosition = elementRect - bodyRect;
       const offsetPosition = elementPosition - offset;

       window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    ...ITINERARY.map(day => ({ id: day.id, label: day.date })),
    { id: 'food', label: '美食' },
    { id: 'markets', label: '市集' },
    { id: 'tips', label: '指南' },
    { id: 'checklist', label: '備忘錄' }
  ];

  return (
    <div className="min-h-screen bg-thai-bg text-thai-dark font-sans selection:bg-thai-gold/20">
      
      {/* Fixed Navigation with Sliding Pill */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div 
            className="flex flex-col cursor-pointer items-center md:items-start" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <span className={`font-serif font-bold text-xl tracking-wide transition-colors ${scrolled ? 'text-thai-dark' : 'text-white'}`}>CHIANG MAI</span>
             <span className="text-[9px] tracking-[0.3em] uppercase text-thai-gold font-bold">Slow Life 2026</span>
          </div>

          <div className="flex items-center gap-1 bg-stone-200/50 p-1 rounded-full backdrop-blur-sm overflow-x-auto max-w-full no-scrollbar">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => scrollTo(item.id)}
                 className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap ${activeTab === item.id ? 'text-white' : 'text-stone-500 hover:text-thai-dark'}`}
               >
                 {activeTab === item.id && (
                   <motion.div 
                     layoutId="activeTabPill"
                     className="absolute inset-0 bg-thai-gold rounded-full -z-10 shadow-sm"
                     transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                 )}
                 {item.label}
               </button>
             ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Using images/banner.jpg and small font size */}
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src="images/banner.jpg" 
            className="w-full h-full object-cover" 
            alt="Chiang Mai Banner" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598935898639-6962f0a99605?q=80&w=2000";
            }}
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-thai-bg"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1 border border-white/50 text-white text-[10px] tracking-[0.4em] uppercase font-bold rounded-full mb-6 backdrop-blur-sm">
             {TRIP_DETAILS.dates}
           </motion.div>
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight drop-shadow-xl">
             {TRIP_DETAILS.title}
           </motion.h1>
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-base md:text-lg text-white/90 font-serif italic mb-12 drop-shadow-md">
             {TRIP_DETAILS.subtitle}
           </motion.p>
        </div>
      </header>

      {/* Content wrapper */}
      <main className="container mx-auto px-4 -mt-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100">
               <div className="flex items-center gap-3 mb-4 text-thai-clay font-bold text-[10px] uppercase tracking-widest">
                  <Plane size={16} /> 航班資訊
               </div>
               {TRIP_DETAILS.flights.map((f, i) => (
                <div key={i} className="flex justify-between items-center border-b border-stone-100 last:border-0 pb-3 last:pb-0 mb-3 last:mb-0">
                    <span className="font-bold text-thai-dark">{f.code}</span>
                    <span className="text-sm text-stone-500">{f.route}</span>
                    <span className="text-[10px] font-mono bg-stone-100 px-2 py-1 rounded">{f.date}</span>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-stone-100">
               <div className="flex items-center gap-3 mb-4 text-thai-clay font-bold text-[10px] uppercase tracking-widest">
                  <Hotel size={16} /> 住宿資訊
               </div>
               <h3 className="text-lg font-serif font-bold text-thai-dark">{TRIP_DETAILS.hotel.name}</h3>
               <p className="text-xs text-stone-500 mt-1 mb-4">{TRIP_DETAILS.hotel.note}</p>
               <a href={TRIP_DETAILS.hotel.url} target="_blank" className="inline-block w-full text-center py-2.5 bg-thai-bg border border-thai-gold text-thai-gold hover:bg-thai-gold hover:text-white rounded-xl transition-all text-xs font-bold">
                 查看飯店地圖
               </a>
            </div>
        </div>

        {ITINERARY.map((day) => <DaySection key={day.id} day={day} />)}

        <div id="food" className="py-24 scroll-mt-24 section-target">
           <div className="flex items-baseline gap-4 mb-12 border-b border-stone-200 pb-4">
              <h3 className="text-3xl font-serif font-bold text-thai-dark">舌尖上的清邁</h3>
              <span className="text-[10px] text-thai-clay font-bold tracking-widest uppercase">Gastronomy</span>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {FOOD_HIGHLIGHTS.map((item) => <HighlightCard key={item.id} item={item} />)}
           </div>
        </div>

        <div id="markets" className="py-24 scroll-mt-24 section-target">
           <div className="flex items-baseline gap-4 mb-12 border-b border-stone-200 pb-4">
              <h3 className="text-3xl font-serif font-bold text-thai-dark">市集迷地圖</h3>
              <span className="text-[10px] text-thai-clay font-bold tracking-widest uppercase">Local Markets</span>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {MARKET_HIGHLIGHTS.map((item) => <HighlightCard key={item.id} item={item} />)}
           </div>
        </div>

        <div id="tips" className="py-24 scroll-mt-24 section-target">
          <div className="bg-stone-50 rounded-3xl p-8 md:p-12 border border-stone-200">
            <div className="flex items-center gap-3 mb-10">
              <BookOpen className="text-thai-gold" size={28} />
              <h3 className="font-serif text-3xl text-thai-dark font-bold">旅遊指南</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TRAVEL_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                  <h4 className="font-serif font-bold text-lg text-thai-dark mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-thai-gold"></span> {tip.category}
                  </h4>
                  <ul className="space-y-2.5">
                    {tip.items.map((item, i) => (
                      <li key={i} className="text-sm text-stone-600 leading-relaxed flex items-start gap-2">
                        <span className="text-thai-gold mt-1 shrink-0">•</span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="checklist" className="py-24 scroll-mt-24 section-target">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-10">
              <CheckSquare className="text-thai-gold" size={28} />
              <h3 className="font-serif text-3xl text-thai-dark font-bold">旅人備忘錄</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-thai-clay border-b border-stone-100 pb-2">行前準備</h4>
                <ul className="space-y-4">
                  {CHECKLIST_DATA.preTrip.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                      <span className="text-stone-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-thai-clay border-b border-stone-100 pb-2">在地任務</h4>
                <ul className="space-y-4">
                  {CHECKLIST_DATA.onSite.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                      <span className="text-stone-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50/50 rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 font-bold text-thai-dark">
                    <CloudSun size={20} className="text-orange-400" /> <span>{CHECKLIST_DATA.weather.title}</span>
                  </div>
                  <span className="text-2xl font-serif font-bold text-orange-500">{CHECKLIST_DATA.weather.temp}</span>
                </div>
                <p className="text-xs text-stone-600 mb-4">{CHECKLIST_DATA.weather.desc}</p>
                <div className="flex gap-2 text-[10px] text-orange-700 bg-white/60 p-3 rounded-xl border border-orange-100">
                  <AlertTriangle size={14} className="shrink-0" /> <span>{CHECKLIST_DATA.weather.warning}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-thai-dark text-stone-500 py-24 text-center mt-24">
        <div className="container mx-auto px-6">
            <h2 className="font-serif text-3xl text-white mb-6">Have a wonderful trip!</h2>
            <p className="text-xs tracking-[0.2em] mb-12 opacity-60 uppercase">Chiang Mai • January 2026</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center gap-2 px-8 py-3 border border-stone-700 rounded-full hover:bg-white hover:text-thai-dark transition-all text-[10px] font-bold uppercase tracking-widest text-white">
              <ArrowUp size={14} /> Back to Top
            </button>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
