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
} from './ItineraryData';
import type { DaySchedule, ItineraryItem, HighlightItem } from './ItineraryData';

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
    <div className="relative pl-8 md:pl-10 py-3 group">
      {!isLast && (
        <div className="absolute left-[11px] md:left-[13px] top-6 bottom-0 w-[1px] bg-thai-clay/20 group-hover:bg-thai-gold/40 transition-colors"></div>
      )}
      
      <div className="absolute left-0 md:left-0.5 top-4 w-6 h-6 rounded-full bg-thai-bg border border-thai-clay/40 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-thai-gold transition-all shadow-sm">
        <Icon size={12} className="text-thai-clay group-hover:text-thai-gold" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
        <div className="min-w-[50px] pt-1">
          <span className="font-sans font-bold text-thai-gold text-base">{item.time}</span>
        </div>
        
        <div className="flex-1 bg-white p-3 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-serif font-bold text-base text-thai-dark">{item.title}</h4>
          <p className="text-stone-500 text-xs leading-relaxed mt-1">{item.description}</p>
          
          {item.mapUrl && (
            <a 
              href={item.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-thai-clay hover:text-thai-gold transition-colors uppercase tracking-wider"
            >
              <MapPin size={10} />
              Map
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const DaySection: React.FC<{ day: DaySchedule }> = ({ day }) => {
  return (
    <section id={day.id} className="py-8 md:py-12 border-b border-stone-100 last:border-0 relative section-target">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-baseline gap-2 mb-6 sticky top-14 z-20 bg-thai-bg/95 backdrop-blur-sm py-2 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
             <div className="text-4xl md:text-5xl font-serif font-bold text-thai-gold">{day.date.split('/')[1]}</div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">January</span>
                <span className="text-sm font-serif text-stone-600">Day {day.id.replace('day', '')} — {day.dayOfWeek}</span>
             </div>
          </div>
          <div className="h-px bg-stone-200 flex-1 hidden md:block opacity-50"></div>
          <div className="text-base md:text-xl font-serif text-thai-dark italic pointer-events-auto">{day.title}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-32">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-stone-50 relative group">
                    <img 
                      src={day.imageUrl} 
                      alt={day.title}
                      className="w-full h-auto object-cover max-h-[500px]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = day.fallbackImage;
                      }}
                    />
                </div>
                {day.transport && (
                   <div className="mt-4 flex justify-start">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <Car size={12}/> 交通: {day.transport}
                      </span>
                   </div>
                )}
              </div>
           </div>

           <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white/30 rounded-2xl p-2 md:p-4">
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
  <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all border border-stone-100">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img 
        src={item.imageUrl} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=500"}
      />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-serif font-bold text-base text-thai-dark">{item.title}</h4>
        {item.tag && (
          <span className="px-1.5 py-0.5 bg-thai-gold/10 text-thai-gold text-[8px] uppercase tracking-widest font-bold rounded">
            {item.tag}
          </span>
        )}
      </div>
      <div className="text-[10px] font-bold text-thai-clay uppercase tracking-widest mb-2">{item.subtitle}</div>
      <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">{item.description}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('day1');
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
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
       const offset = 80;
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
    <div className="min-h-screen bg-thai-bg text-thai-dark font-sans selection:bg-thai-gold/10">
      
      {/* Sticky Capsule Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <div 
            className="flex flex-col cursor-pointer items-center md:items-start" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <span className={`font-serif font-bold text-lg md:text-xl tracking-tight transition-colors ${scrolled ? 'text-thai-dark' : 'text-thai-dark md:text-white'}`}>
               {TRIP_DETAILS.title}
             </span>
          </div>

          <div className="flex items-center gap-0.5 bg-stone-200/30 p-1 rounded-full backdrop-blur-sm overflow-x-auto max-w-full no-scrollbar border border-white/10">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => scrollTo(item.id)}
                 className={`relative z-10 px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 whitespace-nowrap ${activeTab === item.id ? 'text-white' : 'text-stone-500 hover:text-thai-dark'}`}
               >
                 {activeTab === item.id && (
                   <motion.div 
                     layoutId="navActivePill"
                     className="absolute inset-0 bg-thai-gold rounded-full -z-10"
                     transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                   />
                 )}
                 {item.label}
               </button>
             ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Reduced height and simplified */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src="images/banner.jpg" 
            className="w-full h-full object-cover" 
            alt="Chiang Mai" 
            onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598935898639-6962f0a99605?q=80&w=2000"}
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-thai-bg"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-12">
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-3 py-0.5 border border-white/40 text-white text-[8px] tracking-[0.4em] uppercase font-bold rounded-full mb-4 backdrop-blur-sm">
             {TRIP_DETAILS.dates}
           </motion.div>
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm md:text-lg text-white/90 font-serif italic drop-shadow-md">
             {TRIP_DETAILS.subtitle}
           </motion.p>
        </div>
      </header>

      {/* Info Cards - Compact */}
      <main className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/50">
               <div className="flex items-center gap-2 mb-3 text-thai-clay font-bold text-[9px] uppercase tracking-widest">
                  <Plane size={14} /> 航班
               </div>
               {TRIP_DETAILS.flights.map((f, i) => (
                <div key={i} className="flex justify-between items-center border-b border-stone-50 last:border-0 pb-2 last:pb-0 mb-2 last:mb-0">
                    <span className="font-bold text-sm text-thai-dark">{f.code}</span>
                    <span className="text-[11px] text-stone-500">{f.route}</span>
                    <span className="text-[9px] font-mono bg-stone-100 px-1.5 py-0.5 rounded">{f.date}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/50">
               <div className="flex items-center gap-2 mb-3 text-thai-clay font-bold text-[9px] uppercase tracking-widest">
                  <Hotel size={14} /> 住宿
               </div>
               <h3 className="text-base font-serif font-bold text-thai-dark">{TRIP_DETAILS.hotel.name}</h3>
               <p className="text-[11px] text-stone-500 mt-1 mb-3">{TRIP_DETAILS.hotel.note}</p>
               <a href={TRIP_DETAILS.hotel.url} target="_blank" className="inline-block w-full text-center py-2 bg-thai-bg border border-thai-gold/30 text-thai-gold hover:bg-thai-gold hover:text-white rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest">
                 開啟地圖
               </a>
            </div>
        </div>

        {ITINERARY.map((day) => <DaySection key={day.id} day={day} />)}

        {/* Categories - Tight Spacing */}
        <div id="food" className="py-12 scroll-mt-16 section-target">
           <div className="flex items-baseline gap-3 mb-6 border-b border-stone-100 pb-3">
              <h3 className="text-2xl font-serif font-bold text-thai-dark">舌尖上的清邁</h3>
              <span className="text-[9px] text-thai-clay font-bold tracking-[0.1em] uppercase">Gastronomy</span>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {FOOD_HIGHLIGHTS.map((item) => <HighlightCard key={item.id} item={item} />)}
           </div>
        </div>

        <div id="markets" className="py-12 scroll-mt-16 section-target">
           <div className="flex items-baseline gap-3 mb-6 border-b border-stone-100 pb-3">
              <h3 className="text-2xl font-serif font-bold text-thai-dark">市集迷地圖</h3>
              <span className="text-[9px] text-thai-clay font-bold tracking-[0.1em] uppercase">Markets</span>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {MARKET_HIGHLIGHTS.map((item) => <HighlightCard key={item.id} item={item} />)}
           </div>
        </div>

        {/* Tips & Checklist - Compact */}
        <div id="tips" className="py-12 scroll-mt-16 section-target">
          <div className="bg-stone-50 rounded-2xl p-6 md:p-10 border border-stone-100">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="text-thai-gold" size={24} />
              <h3 className="font-serif text-2xl text-thai-dark font-bold">旅遊指南</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRAVEL_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-stone-100">
                  <h4 className="font-serif font-bold text-base text-thai-dark mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-thai-gold"></span> {tip.category}
                  </h4>
                  <ul className="space-y-2">
                    {tip.items.map((item, i) => (
                      <li key={i} className="text-[11px] text-stone-500 leading-relaxed flex items-start gap-2">
                        <span className="text-thai-gold mt-1 shrink-0 block w-1 h-1 rounded-full bg-thai-gold/40"></span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="checklist" className="py-12 scroll-mt-16 section-target">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <CheckSquare className="text-thai-gold" size={24} />
              <h3 className="font-serif text-2xl text-thai-dark font-bold">旅人備忘錄</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-thai-clay border-b border-stone-50 pb-2">行前準備</h4>
                <ul className="space-y-3">
                  {CHECKLIST_DATA.preTrip.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                      <span className="text-stone-600 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-thai-clay border-b border-stone-50 pb-2">在地任務</h4>
                <ul className="space-y-3">
                  {CHECKLIST_DATA.onSite.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                      <span className="text-stone-600 text-xs">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-50 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-bold text-thai-dark">
                    <CloudSun size={18} className="text-orange-400" /> <span className="text-xs">一月氣溫</span>
                  </div>
                  <span className="text-xl font-serif font-bold text-orange-500">18-25°C</span>
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed mb-3">乾旱少雨，氣候宜人。日夜溫差大，務必攜帶外套。</p>
                <div className="flex gap-2 text-[9px] text-orange-700 bg-orange-50 p-2 rounded-lg border border-orange-100">
                  <AlertTriangle size={12} className="shrink-0" /> <span>山上氣溫較低，請準備保暖衣物。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-thai-dark text-stone-500 py-16 text-center mt-12">
        <div className="container mx-auto px-6">
            <h2 className="font-serif text-2xl text-white mb-4">Have a wonderful trip!</h2>
            <p className="text-[9px] tracking-[0.3em] mb-10 opacity-40 uppercase">Chiang Mai • Thailand • 2026</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-700 rounded-full hover:bg-white hover:text-thai-dark transition-all text-[9px] font-bold uppercase tracking-widest text-white"
            >
              <ArrowUp size={12} /> Top
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
