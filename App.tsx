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
    <div className="relative pl-7 md:pl-9 py-2 group">
      {!isLast && (
        <div className="absolute left-[11px] md:left-[13px] top-6 bottom-0 w-[1px] bg-thai-clay/10 group-hover:bg-thai-gold/30 transition-colors"></div>
      )}
      
      <div className="absolute left-0 md:left-0.5 top-3.5 w-5 h-5 rounded-full bg-thai-bg border border-thai-clay/30 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-thai-gold transition-all shadow-sm">
        <Icon size={10} className="text-thai-clay group-hover:text-thai-gold" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
        <div className="min-w-[45px] pt-1">
          <span className="font-sans font-bold text-thai-gold text-sm">{item.time}</span>
        </div>
        
        <div className="flex-1 bg-white p-2.5 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="font-serif font-bold text-sm text-thai-dark leading-snug">{item.title}</h4>
          <p className="text-stone-500 text-[11px] leading-relaxed mt-0.5">{item.description}</p>
          
          {item.mapUrl && (
            <a 
              href={item.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold text-thai-clay hover:text-thai-gold transition-colors uppercase tracking-wider"
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
    <section id={day.id} className="py-4 md:py-6 border-b border-stone-100 last:border-0 relative section-target">
      <div className="container mx-auto px-4">
        
        {/* Day Header - More Compact */}
        <div className="flex flex-col md:flex-row items-baseline gap-2 mb-3 sticky top-12 z-20 bg-thai-bg/95 backdrop-blur-sm py-1.5 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
             <div className="text-3xl md:text-4xl font-serif font-bold text-thai-gold">{day.date.split('/')[1]}</div>
             <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase">January</span>
                <span className="text-xs font-serif text-stone-600">Day {day.id.replace('day', '')} — {day.dayOfWeek}</span>
             </div>
          </div>
          <div className="h-px bg-stone-100 flex-1 hidden md:block opacity-50"></div>
          <div className="text-sm md:text-lg font-serif text-thai-dark italic font-medium pointer-events-auto">{day.title}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Image Column - Clean, No Text Overlays */}
           <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="sticky top-28">
                <div className="rounded-xl overflow-hidden shadow-md border border-stone-100 bg-stone-50">
                    <img 
                      src={day.imageUrl} 
                      alt={day.title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = day.fallbackImage;
                      }}
                    />
                </div>
                {day.transport && (
                   <div className="mt-2 flex justify-start">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        <Car size={10}/> 交通: {day.transport}
                      </span>
                   </div>
                )}
              </div>
           </div>

           {/* Itinerary Items Column */}
           <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="bg-white/20 rounded-xl p-1 md:p-2">
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
    <div className="p-3">
      <div className="flex justify-between items-start mb-0.5">
        <h4 className="font-serif font-bold text-sm text-thai-dark">{item.title}</h4>
        {item.tag && (
          <span className="px-1 py-0.5 bg-thai-gold/10 text-thai-gold text-[7px] uppercase tracking-widest font-bold rounded">
            {item.tag}
          </span>
        )}
      </div>
      <div className="text-[9px] font-bold text-thai-clay uppercase tracking-widest mb-1.5">{item.subtitle}</div>
      <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed mb-3">{item.description}</p>
      
      {item.mapUrl && (
        <a 
          href={item.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-1.5 py-1.5 bg-thai-bg border border-thai-gold/20 text-thai-gold hover:bg-thai-gold hover:text-white rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest"
        >
          <MapPin size={10} />
          Google Maps
        </a>
      )}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('day1');
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
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
       const offset = 70;
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
      
      {/* Sticky Capsule Navigation - With Main Title */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-1.5' : 'bg-transparent py-3'}`}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div 
            className="flex flex-col cursor-pointer items-center md:items-start" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
             <span className={`font-serif font-bold text-base md:text-lg tracking-tight transition-colors ${scrolled ? 'text-thai-dark' : 'text-thai-dark md:text-white'}`}>
               {TRIP_DETAILS.title}
             </span>
          </div>

          <div className="flex items-center gap-0.5 bg-stone-200/20 p-1 rounded-full backdrop-blur-sm overflow-x-auto max-w-full no-scrollbar border border-white/5">
             {navItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => scrollTo(item.id)}
                 className={`relative z-10 px-3 py-1 rounded-full text-[9px] font-bold transition-all duration-300 whitespace-nowrap ${activeTab === item.id ? 'text-white' : 'text-stone-500 hover:text-thai-dark'}`}
               >
                 {activeTab === item.id && (
                   <motion.div 
                     layoutId="navActivePill"
                     className="absolute inset-0 bg-thai-gold rounded-full -z-10"
                     transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                   />
                 )}
                 {item.label}
               </button>
             ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Banner Image only */}
      <header className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src="images/banner.jpg" 
            className="w-full h-full object-cover" 
            alt="Chiang Mai" 
            onError={(e) => (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598935898639-6962f0a99605?q=80&w=2000"}
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-thai-bg"></div>
        </div>
      </header>

      {/* Hero Info - Large Black Text */}
      <div className="container mx-auto px-4 text-center py-6 md:py-10">
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-black font-sans font-bold text-xl md:text-3xl tracking-widest mb-4">
           {TRIP_DETAILS.dates}
         </motion.div>
         <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-black font-serif text-lg md:text-2xl font-bold italic">
           {TRIP_DETAILS.subtitle}
         </motion.h2>
      </div>

      {/* Info Cards - Extra Compact */}
      <main className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow border border-white/50">
               <div className="flex items-center gap-2 mb-2 text-thai-clay font-bold text-[8px] uppercase tracking-widest">
                  <Plane size={12} /> 航班資訊
               </div>
               {TRIP_DETAILS.flights.map((f, i) => (
                <div key={i} className="flex justify-between items-center border-b border-stone-50 last:border-0 pb-1.5 last:pb-0 mb-1.5 last:mb-0">
                    <span className="font-bold text-xs text-thai-dark">{f.code}</span>
                    <span className="text-[10px] text-stone-500">{f.route}</span>
                    <span className="text-[8px] font-mono bg-stone-100 px-1 py-0.5 rounded">{f.date}</span>
                </div>
              ))}
            </div>
            
            {/* Multiple Hotels Display */}
            <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow border border-white/50">
               <div className="flex items-center gap-2 mb-3 text-thai-clay font-bold text-[8px] uppercase tracking-widest">
                  <Hotel size={12} /> 住宿預訂
               </div>
               <div className="space-y-4">
                  {TRIP_DETAILS.hotels.map((hotel, idx) => (
                    <div key={idx} className={idx !== 0 ? "pt-3 border-t border-stone-100" : ""}>
                      <h3 className="text-sm font-serif font-bold text-thai-dark">{hotel.name}</h3>
                      <p className="text-[10px] text-stone-500 mt-0.5 mb-2">{hotel.note}</p>
                      <a href={hotel.url} target="_blank" className="inline-block w-full text-center py-1.5 bg-thai-bg border border-thai-gold/20 text-thai-gold hover:bg-thai-gold hover:text-white rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest">
                        地圖導航
                      </a>
                    </div>
                  ))}
               </div>
            </div>
        </div>

        {ITINERARY.map((day) => <DaySection key={day.id} day={day} />)}

        {/* Categories - Compact Spacing */}
        <div id="food" className="py-8 scroll-mt-14 section-target">
           <div className="flex items-baseline gap-2 mb-4 border-b border-stone-100 pb-2">
              <h3 className="text-xl font-serif font-bold text-thai-dark">舌尖上的清邁</h3>
              <span className="text-[8px] text-thai-clay font-bold tracking-widest uppercase">Gastronomy</span>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {FOOD_HIGHLIGHTS.map((item) => <HighlightCard key={item.id} item={item} />)}
           </div>
        </div>

        <div id="markets" className="py-8 scroll-mt-14 section-target">
           <div className="flex items-baseline gap-2 mb-4 border-b border-stone-100 pb-2">
              <h3 className="text-xl font-serif font-bold text-thai-dark">市集迷地圖</h3>
              <span className="text-[8px] text-thai-clay font-bold tracking-widest uppercase">Markets</span>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {MARKET_HIGHLIGHTS.map((item) => <HighlightCard key={item.id} item={item} />)}
           </div>
        </div>

        {/* Guides & Checklist - Tightened */}
        <div id="tips" className="py-8 scroll-mt-14 section-target">
          <div className="bg-stone-50 rounded-xl p-5 md:p-8 border border-stone-100">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-thai-gold" size={20} />
              <h3 className="font-serif text-xl text-thai-dark font-bold">旅遊指南</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRAVEL_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100">
                  <h4 className="font-serif font-bold text-sm text-thai-dark mb-2 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-thai-gold"></span> {tip.category}
                  </h4>
                  <ul className="space-y-1.5">
                    {tip.items.map((item, i) => (
                      <li key={i} className="text-[10px] text-stone-500 leading-relaxed flex items-start gap-1.5">
                        <span className="text-thai-gold mt-1 shrink-0 block w-0.5 h-0.5 rounded-full bg-thai-gold/50"></span> <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="checklist" className="py-8 scroll-mt-14 section-target">
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-5 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <CheckSquare className="text-thai-gold" size={20} />
              <h3 className="font-serif text-xl text-thai-dark font-bold">旅人備忘錄</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="text-[8px] font-bold uppercase tracking-widest text-thai-clay border-b border-stone-50 pb-1.5">行前準備</h4>
                <ul className="space-y-2">
                  {CHECKLIST_DATA.preTrip.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                      <span className="text-stone-600 text-[11px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-[8px] font-bold uppercase tracking-widest text-thai-clay border-b border-stone-50 pb-1.5">在地任務</h4>
                <ul className="space-y-2">
                  {CHECKLIST_DATA.onSite.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded border-stone-300 text-thai-gold focus:ring-thai-gold" />
                      <span className="text-stone-600 text-[11px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-thai-dark">
                    <CloudSun size={16} className="text-orange-400" /> <span className="text-[10px]">一月氣溫</span>
                  </div>
                  <span className="text-lg font-serif font-bold text-orange-500">18-25°C</span>
                </div>
                <p className="text-[9px] text-stone-500 leading-relaxed mb-2">乾旱少雨，氣候宜人。日夜溫差大。</p>
                <div className="flex gap-1.5 text-[8px] text-orange-700 bg-orange-50 p-1.5 rounded-lg border border-orange-100">
                  <AlertTriangle size={10} className="shrink-0" /> <span>山上氣溫較低，務必攜帶外套。</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="bg-thai-dark text-stone-500 py-10 text-center mt-8">
        <div className="container mx-auto px-6">
            <h2 className="font-serif text-xl text-white mb-2">Have a wonderful trip!</h2>
            <p className="text-[8px] tracking-widest mb-6 opacity-40 uppercase">Chiang Mai • Thailand • 2026</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-700 rounded-full hover:bg-white hover:text-thai-dark transition-all text-[8px] font-bold uppercase tracking-widest text-white"
            >
              <ArrowUp size={10} /> Top
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
