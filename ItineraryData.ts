
export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  mapUrl?: string;
  icon?: 'food' | 'activity' | 'travel' | 'shop' | 'hotel';
}

export interface DaySchedule {
  id: string;
  date: string;
  dayOfWeek: string;
  title: string;
  transport?: string;
  items: ItineraryItem[];
  imageUrl: string; 
  fallbackImage: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  mapUrl?: string; // Added to fix error in App.tsx
  tag?: string;
}

export interface TipItem {
  category: string;
  icon: string;
  items: string[];
}

export const TRIP_DETAILS = {
  title: "清邁古城的慢活時光",
  subtitle: "與櫻花、市集、美食的溫暖相遇",
  dates: "2026/1/23 - 1/28",
  flights: [
    { code: "CI851", route: "去程 07:15 TPE ➝ 10:25 CNX", date: "1/23 (四)" },
    { code: "CI852", route: "回程 11:25 CNX ➝ 16:00 TPE", date: "1/28 (二)" },
    { code: "CI852", route: "回程 11:25 CNX ➝ 16:00 TPE", date: "2/3 (二)" }
  ],
  // Changed to an array of hotels to resolve the error in App.tsx
  hotels: [
    {
      name: "BED Phrasingh Hotel",
      url: "https://maps.app.goo.gl/rVrjy1fR62LYM79K9",
      note: "1/1 Rachamakkha Soi 8, Phrasingh • Tel: 053 271009",
    },
    {
      name: "Anumat Premium Budget Hotel",
      url: "https://maps.app.goo.gl/HQBza9doowUewwg56",
      note: "2 Sam Lan 3 Alley, Tambon PhraSing • Tel: 053 903913",
    }
  ]
};

export const CHECKLIST_DATA = {
  preTrip: [
    "申請泰國入境TDAC",
    "預訂 1/23 桃園機場接送",
    "確認護照效期超過 6 個月",
    "預訂1/27包車8:00-18:00",
    "購買旅平險"
  ],
  onSite: [
    "詢問飯店代訂 1/27 午餐 (Saiyut & Doctor Sai)",
    "飯店預約租借機車 (1/24-1/26)",
    "準備小額泰銖與 Grab 綁定卡片"
  ],
  weather: {
    title: "涼季氣候",
    temp: "18-25°C",
    desc: "乾旱少雨，氣候宜人。",
    warning: "日夜溫差大，清晨與山上氣溫較低。"
  }
};

export const TRAVEL_TIPS: TipItem[] = [
  {
    category: "文化禁忌",
    icon: "culture",
    items: [
      "進入寺廟穿著需過肩過膝，需脫鞋。",
      "不可觸碰僧侶或其衣物。",
      "不要觸摸泰國人的頭部。",
      "皇室在泰國極受尊重，請避免評論。"
    ]
  },
  {
    category: "交通建議",
    icon: "transport",
    items: [
      "Grab/Bolt：最推薦，價格透明。",
      "紅雙條車：市區招手即停，約 30-50 銖。",
      "機車：需備國際駕照，且泰國為左側通行。"
    ]
  },
  {
    category: "生活資訊",
    icon: "tips",
    items: [
      "電壓：220V，插座與台灣通用（不需轉接頭）。",
      "水：不可生飲，飯店通常每日提供兩瓶水。",
      "小費：按摩通常給 50-100 銖小費。"
    ]
  },
  {
    category: "緊急聯絡",
    icon: "phone",
    items: [
      "旅遊警察：1155 (有英文服務)",
      "救護車：1669",
      "報警：191",
      "駐泰辦事處：+66-2-119-3555"
    ]
  }
];

export const FOOD_HIGHLIGHTS: HighlightItem[] = [
  {
    id: "food-1",
    title: "泰國蝦燒烤",
    subtitle: "KUNG YIM Buffet",
    description: "新鮮現撈的泰國大頭蝦，炭火直烤最過癮。",
    imageUrl: "images/food-1.jpg",
    mapUrl: "https://maps.app.goo.gl/g4BvHtQQwzCXbBwLA"
  },
  {
    id: "food-2",
    title: "泰式宮廷菜",
    subtitle: "Saiyut & Doctor Sai",
    description: "米其林推薦，如藝術品般的果雕與宮廷饗宴。",
    imageUrl: "images/food-2.jpg",
    tag: "Michelin",
    mapUrl: "https://maps.app.goo.gl/KM5MSmLgU1NrifhdA"
  },
  {
    id: "food-3",
    title: "泰北咖哩麵",
    subtitle: "Khao Soi Yook Samai",
    description: "濃郁椰漿咖哩湯底配上酥脆炸麵條。",
    imageUrl: "images/food-3.jpg",
    mapUrl: "https://maps.app.goo.gl/pU9Mv8i88D8Z5pS7A"
  },
  {
    id: "food-4",
    title: "德國自助餐",
    subtitle: "Auf der Au Garden",
    description: "超人氣德式豬腳與手工肉丸吃到飽。",
    imageUrl: "images/food-4.jpg",
    mapUrl: "https://maps.app.goo.gl/KwuWANbVwbrNH7jz6"
  },
  {
    id: "food-5",
    title: "冠軍拿鐵",
    subtitle: "Akha Ama Coffee",
    description: "在地咖啡品牌，綿密奶泡與濃育豆香。",
    imageUrl: "images/food-5.jpg",
    mapUrl: "https://maps.app.goo.gl/CxRd4GXXKMCkTWyA9"
  },
  {
    id: "food-6",
    title: "香蕉煎餅",
    subtitle: "Guu Fusion Roti",
    description: "尼曼區必吃甜點，外酥內軟的邪惡美味。",
    imageUrl: "images/food-6.jpg",
    mapUrl: "https://maps.app.goo.gl/5kGF2MbipofgZdV97"
  }
];

export const MARKET_HIGHLIGHTS: HighlightItem[] = [
  {
    id: "market-1",
    title: "椰子市集",
    subtitle: "Coconut Market",
    description: "椰林間的夢幻市集，週末限定造訪。",
    imageUrl: "images/market-1.jpg",
    mapUrl: "https://maps.app.goo.gl/BESR7fGyF3KPbjX38"
  },
  {
    id: "market-2",
    title: "真心市集",
    subtitle: "Jing Jai Market",
    description: "最有質感的有機農夫與手作工藝市集。",
    imageUrl: "images/market-2.jpg",
    tag: "High Quality",
    mapUrl: "https://maps.app.goo.gl/drSyE27oe3n6j93t6"
  },
  {
    id: "market-3",
    title: "週日夜市",
    subtitle: "Sunday Walking Street",
    description: "橫跨整條古城主幹道，世界級的夜市體驗。",
    imageUrl: "images/market-3.jpg",
    mapUrl: "https://maps.app.goo.gl/X9X7X8V7X6X5"
  },
  {
    id: "market-4",
    title: "週六夜市",
    subtitle: "Saturday Night Market",
    description: "位於打銀街，有許多精緻手工銀飾與美食。",
    imageUrl: "images/market-4.jpg",
    mapUrl: "https://maps.app.goo.gl/D2Yc8J3X7m7X9"
  },
  {
    id: "market-5",
    title: "瓦洛洛市場",
    subtitle: "Warorot Market",
    description: "在地人的百年大食堂，採購伴手禮首選。",
    imageUrl: "images/market-5.jpg",
    mapUrl: "https://maps.app.goo.gl/2jqSmHFUxvzVUL9e6"
  },
  {
    id: "market-6",
    title: "運河市集",
    subtitle: "Khlong Mae Kha",
    description: "清邁版「小樽」，充滿日系氛圍的河畔小店。",
    imageUrl: "images/market-6.jpg",
    mapUrl: "https://maps.app.goo.gl/KKfs4hq3pxcqexAE9"
  }
];

export const ITINERARY: DaySchedule[] = [
  {
    id: "day1",
    date: "1/23",
    dayOfWeek: "五",
    title: "抵達清邁 & 泰國蝦吃到飽",
    transport: "Grab/Bolt 叫車",
    imageUrl: "images/day1.jpg", 
    fallbackImage: "https://images.unsplash.com/photo-1598935898639-6962f0a99605?q=80&w=1000",
    items: [
      {
        time: "10:25",
        title: "抵達清邁 (CNX)",
        description: "前往飯店寄放行李，稍作休息。",
        icon: "travel"
      },
      {
        time: "14:00",
        title: "KUNG YIM (泰國蝦吃到飽)",
        description: "痛風指數爆表的現撈泰國蝦燒烤。",
        mapUrl: "https://maps.app.goo.gl/g4BvHtQQwzCXbBwLA",
        icon: "food"
      },
      {
        time: "17:00",
        title: "One Nimman (尼曼一號)",
        description: "清邁最時髦的文創園區，逛逛白市 (White Market)。",
        icon: "shop"
      },
      {
        time: "21:00",
        title: "Guu Fusion Roti",
        description: "甜點控不能錯過的香蕉煎餅。",
        icon: "food"
      }
    ]
  },
  {
    id: "day2",
    date: "1/24",
    dayOfWeek: "六",
    title: "椰林市集 & 百年市場 & 周六夜市",
    transport: "租借機車",
    imageUrl: "images/day2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1596423067757-01046903f69e?q=80&w=1000",
    items: [
      {
        time: "09:30",
        title: "Coconut Market (椰子市集)",
        description: "漫步在椰子樹影下的夢幻市集。",
        icon: "activity"
      },
      {
        time: "12:00",
        title: "Auf der Au Garden",
        description: "超高 CP 值的德式午餐自助餐。",
        icon: "food"
      },
      {
        time: "14:00",
        title: "Warorot Market (瓦洛洛市場)",
        description: "採買果乾、炸豬皮等在地特產。",
        icon: "shop"
      },
      {
        time: "19:00",
        title: "週六夜市",
        description: "感受打銀街的熱鬧夜晚。",
        icon: "activity"
      }
    ]
  },
  {
    id: "day3",
    date: "1/25",
    dayOfWeek: "日",
    title: "真心市集 & 古城漫步 & 周日夜市",
    transport: "機車",
    imageUrl: "images/day3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000",
    items: [
      {
        time: "09:00",
        title: "Jing Jai Market (真心市集)",
        description: "清邁質感最高的農夫與創意市集。",
        icon: "shop"
      },
      {
        time: "16:00",
        title: "塔佩門 Tha Pae Gate",
        description: "古城地標拍照，餵餵鴿子。",
        icon: "activity"
      },
      {
        time: "19:00",
        title: "週日夜市 (Sunday Walking Street)",
        description: "全清邁規模最大的夜市。",
        icon: "activity"
      }
    ]
  },
  {
    id: "day4",
    date: "1/26",
    dayOfWeek: "一",
    title: "文青藝術村 & 特色咖啡廳",
    transport: "機車",
    imageUrl: "images/day4.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1000",
    items: [
      {
        time: "10:30",
        title: "Kalm Village",
        description: "極具美感的工藝文化中心。",
        icon: "activity"
      },
      {
        time: "12:00",
        title: "Baan Kang Wat 藝術村",
        description: "森林系的藝術聚落，享受慢活氛圍。",
        icon: "activity"
      },
      {
        time: "15:00",
        title: "Much Room Cafe",
        description: "造型奇特的蘑菇咖啡廳，拍大片首選。",
        icon: "food"
      }
    ]
  },
  {
    id: "day5",
    date: "1/27",
    dayOfWeek: "二",
    title: "高山櫻花 & 仙境瀑布公園",
    transport: "包車 (預計 08:00-19:30)",
    imageUrl: "images/day5.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000",
    items: [
      {
        time: "08:00",
        title: "Khun Chang Khian (坤昌阡)",
        description: "高山上尋找泰國櫻花的蹤跡。",
        icon: "activity"
      },
      {
        time: "13:00",
        title: "Saiyut & Doctor Sai Kitchen",
        description: "米其林宮廷菜，建議提前預約。",
        icon: "food"
      },
      {
        time: "15:30",
        title: "Dantewada 瀑布公園",
        description: "仙氣飄飄的瀑布花園。",
        icon: "activity"
      },
      {
        time: "18:00",
        title: "運河市集 (Khlong Mae Kha)",
        description: "清邁版小樽，散步的好去處。",
        icon: "shop"
      }
    ]
  },
  {
    id: "day6",
    date: "1/28",
    dayOfWeek: "三",
    title: "最後採買 & 依依不捨返台",
    transport: "送機服務",
    imageUrl: "images/day6.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=80&w=1000",
    items: [
      {
        time: "09:00",
        title: "Central Chiangmai Airport",
        description: "機場旁的最後採買時光。",
        icon: "shop"
      },
      {
        time: "11:25",
        title: "起飛返台 (CI852)",
        description: "結束美好的清邁之旅。",
        icon: "travel"
      }
    ]
  }
];
