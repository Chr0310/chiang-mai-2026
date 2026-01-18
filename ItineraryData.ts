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
  mapUrl?: string;
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
    { code: "CI851", route: "07:15 TPE ➝ 10:25 CNX", date: "1/23 (四)" },
    { code: "CI852", route: "11:25 CNX ➝ 16:00 TPE", date: "1/28 (二)" },
    { code: "CI852", route: "回程 11:25 CNX ➝ 16:00 TPE", date: "2/3 (二)" }
  ],
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
    "購買旅平險",
    "預訂 1/23 台北至桃園的機場專車接送",
    "申請泰國數位入境卡 (TDAC)"
  ],
  onSite: [
    "詢問 BED Hotel 是否可代為包車 (1/27 行程)",
    "透過 BED Hotel 預約租機車 (1/24-1/26 行程)",
    "請 BED Hotel 代訂 1/27 13:00 的【Saiyut & Doctor Sai Kitchen】"
  ],
  weather: {
    title: "一月氣溫",
    temp: "18-25°C",
    desc: "乾旱少雨，氣候宜人。",
    warning: "日夜溫差大，早晚清涼，務必攜帶外套備用。山上（如坤昌阡）氣溫會更低。"
  }
};

export const TRAVEL_TIPS: TipItem[] = [
  {
    category: "最佳旅遊季節",
    icon: "weather",
    items: [
      "涼季 (11月-2月)：最舒適，早晚涼爽，平均氣溫 18-25°C。",
      "熱季 (3月-5月)：氣溫可達 40°C，空氣品質較差 (燒山季)。",
      "雨季 (6月-10月)：午後雷陣雨，遊客較少。"
    ]
  },
  {
    category: "當地風俗禁忌",
    icon: "culture",
    items: [
      "進入寺廟請脫鞋，穿著需端莊（不露肩、膝）。",
      "女性不可觸碰僧侶。",
      "不要摸泰國人的頭（被視為神聖部位）。",
      "用腳指人或物是不禮貌的。"
    ]
  },
  {
    category: "交通小撇步",
    icon: "transport",
    items: [
      "雙條車 (Red Truck)：隨招隨停，市區約 30-50 泰銖。",
      "Grab / Bolt：叫車軟體最方便，價格透明。",
      "租機車：需備國際駕照，靠左行駛，注意單行道。"
    ]
  },
  {
    category: "緊急聯絡",
    icon: "emergency",
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
    subtitle: "KUNG YIM",
    description: "新鮮現撈的痛快滋味。",
    imageUrl: "images/food-1.jpg",
    mapUrl: "https://maps.app.goo.gl/g4BvHtQQwzCXbBwLA"
  },
  {
    id: "food-2",
    title: "泰式宮廷菜",
    subtitle: "Saiyut & Doctor Sai",
    description: "米其林推薦的藝術饗宴。",
    imageUrl: "images/food-2.jpg",
    mapUrl: "https://maps.app.goo.gl/KM5MSmLgU1NrifhdA",
    tag: "Michelin"
  },
  {
    id: "food-3",
    title: "泰北咖哩麵",
    subtitle: "Yook Samai",
    description: "隱身藝術村的濃郁美味 (Khao Soi)。",
    imageUrl: "images/food-3.jpg",
    mapUrl: "https://maps.app.goo.gl/pU9Mv8i88D8Z5pS7A"
  },
  {
    id: "food-4",
    title: "德國自助餐",
    subtitle: "Auf der Au Garden",
    description: "提供道地的德國豬腳、香腸與歐式麵包",
    imageUrl: "images/food-4.jpg",
    mapUrl: "https://maps.app.goo.gl/KwuWANbVwbrNH7jz6"
  },
  {
    id: "food-5",
    title: "冠軍拿鐵",
    subtitle: "Akha Ama",
    description: "被譽為清邁最好喝的咖啡。",
    imageUrl: "images/food-5.jpg",
    mapUrl: "https://maps.app.goo.gl/CxRd4GXXKMCkTWyA9"
  },
  {
    id: "food-6",
    title: "香蕉煎餅",
    subtitle: "Guu Fusion Roti",
    description: "尼曼區最邪惡的甜蜜結尾。",
    imageUrl: "images/food-6.jpg",
    mapUrl: "https://maps.app.goo.gl/5kGF2MbipofgZdV97"
  }
];

export const MARKET_HIGHLIGHTS: HighlightItem[] = [
  {
    id: "market-1",
    title: "Coconut Market",
    subtitle: "椰子市集",
    description: "週末限定的椰林夢幻市集。",
    imageUrl: "images/market-1.jpg",
    mapUrl: "https://maps.app.goo.gl/BESR7fGyF3KPbjX38"
  },
  {
    id: "market-2",
    title: "Warorot Market",
    subtitle: "瓦洛洛市場",
    description: "在地人的百年大食堂，伴手禮首選。",
    imageUrl: "images/market-2.jpg",
    mapUrl: "https://maps.app.goo.gl/2jqSmHFUxvzVUL9e6"
  },
  {
    id: "market-3",
    title: "Saturday Night Market",
    subtitle: "週六夜市",
    description: "打銀街上的工藝與傳統。",
    imageUrl: "images/market-3.jpg",
    mapUrl: "https://maps.app.goo.gl/D2Yc8J3X7m7X9"
  },
  {
    id: "market-4",
    title: "Sunday Walking Street",
    subtitle: "週日夜市",
    description: "貫穿古城的世界級不夜城。",
    imageUrl: "images/market-4.jpg",
    mapUrl: "https://maps.app.goo.gl/X9X7X8V7X6X5"
  },
  {
    id: "market-5",
    title: "Jing Jai Market",
    subtitle: "真心市集",
    description: "質感第一的有機農夫與手作市集。",
    imageUrl: "images/market-5.jpg",
    mapUrl: "https://maps.app.goo.gl/drSyE27oe3n6j93t6"
  },
  {
    id: "market-6",
    title: "Khlong Mae Kha",
    subtitle: "運河市集",
    description: "夜晚迷人的日式風情運河市集。",
    imageUrl: "images/market-6.jpg",
    mapUrl: "https://maps.app.goo.gl/KKfs4hq3pxcqexAE9"
  }
];

export const ITINERARY: DaySchedule[] = [
  {
    id: "day1",
    date: "1/23",
    dayOfWeek: "五",
    title: "抵達清邁 & 泰國蝦吃到飽 & 按摩",
    transport: "BOLT 叫車",
    imageUrl: "images/day1.jpg", 
    fallbackImage: "https://images.unsplash.com/photo-1598935898639-6962f0a99605?q=80&w=1000",
    items: [
      {
        time: "10:25",
        title: "抵達清邁機場 (CNX)",
        description: "前往飯店寄放行李，稍作休息。",
        mapUrl: "https://maps.app.goo.gl/P4RYwwuSDFSyt5Ux9",
        icon: "travel"
      },
      {
        time: "11:30",
        title: "Shongcafe Chiang Mai",
        description: "從飯店出發，買一杯酸香的橙汁美式咖啡解渴。",
        mapUrl: "https://maps.app.goo.gl/z1q91bv283t9URrdA",
        icon: "food"
      },
      {
        time: "12:00",
        title: "G Exchange 換匯",
        description: "換完去隔壁按摩。",
        mapUrl: "https://maps.app.goo.gl/qZmoNJrNJzxBB57M7",
        icon: "activity"
      },
      {
        time: "12:00+",
        title: "White Orchid Massage",
        description: "按摩 SPA 1.5 小時。",
        mapUrl: "https://maps.app.goo.gl/sUBiZg3KaJQvneS39",
        icon: "activity"
      },
      {
        time: "14:00",
        title: "KUNG YIM (泰國蝦吃到飽)",
        description: "海鮮控的天堂！主打新鮮現撈泰國蝦炭火燒烤，搭配泰式酸辣沾醬，讓您豪邁地大口吃蝦吃到飽，享受吮指回味的痛快。",
        mapUrl: "https://maps.app.goo.gl/g4BvHtQQwzCXbBwLA",
        icon: "food"
      },
      {
        time: "17:00",
        title: "One Nimman (尼曼一號) + White Market",
        description: "尼曼一號是清邁最時尚的文創地標，紅磚歐式建築彷彿置身義大利。匯集了設計小店、藝廊與美食，每個角落都是街拍大片的背景。",
        mapUrl: "https://maps.app.goo.gl/J6hRt4uTJyaZhpEN9",
        icon: "shop"
      },
      {
        time: "同場加映",
        title: "PLAYWORKS SHOP&CAFE",
        description: "位於尼曼一號附近。",
        mapUrl: "https://maps.app.goo.gl/TVHdvuFUq6Vgp9L38",
        icon: "shop"
      },
      {
        time: "19:00",
        title: "MAYA 瑪雅生活購物中心",
        description: "逛街+晚餐。",
        mapUrl: "https://maps.app.goo.gl/JJUP9UzrvctkZb5Q6",
        icon: "shop"
      },
      {
        time: "21:00",
        title: "Guu Fusion Roti & Tea",
        description: "尼曼區超人氣的排隊名店，這裡的香蕉煎餅（Roti）煎得金黃酥脆，是清邁夜生活最邪惡又滿足的甜蜜結尾。",
        mapUrl: "https://maps.app.goo.gl/5kGF2MbipofgZdV97",
        icon: "food"
      },
      {
        time: "備註",
        title: "待辦事項",
        description: "請飯店幫忙訂 1/27 13:00 的【Saiyut & Doctor Sai Kitchen】午餐。",
        icon: "hotel"
      }
    ]
  },
  {
    id: "day2",
    date: "1/24",
    dayOfWeek: "六",
    title: "椰子市集 & 德式自助餐 & 周六夜市",
    transport: "機車 (Tawan Bike)",
    imageUrl: "images/day2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1596423067757-01046903f69e?q=80&w=1000",
    items: [
      {
        time: "07:30",
        title: "享用 BED HOTEL 早餐",
        description: "享受豐盛早餐。",
        icon: "food"
      },
      {
        time: "09:00",
        title: "Tawan Bike 租機車",
        description: "租借這幾天的交通工具。",
        mapUrl: "https://maps.app.goo.gl/Gmx1qseD52rHFyae8",
        icon: "travel"
      },
      {
        time: "09:30",
        title: "Akha Ama Phrasingh",
        description: "被無數旅人譽為「清邁最好喝」的咖啡名店！店內必點招牌熱拿鐵，奶泡綿密、咖啡香氣濃厚且不酸澀，是咖啡迷來清邁必朝聖的指標。",
        mapUrl: "https://maps.app.goo.gl/CxRd4GXXKMCkTWyA9",
        icon: "food"
      },
      {
        time: "10:00",
        title: "Coconut Market (椰子市集)",
        description: "週末限定的夢幻市集，攤位散落在高聳的椰子樹林間。穿著輕便夏裝，捧著一顆現剖椰子水漫步其中，滿滿的熱帶度假氛圍。",
        mapUrl: "https://maps.app.goo.gl/BESR7fGyF3KPbjX38",
        icon: "activity"
      },
      {
        time: "12:00",
        title: "Auf der Au Garden German Buffet",
        description: "清邁傳奇的高 CP 值餐廳！由德國老闆經營，提供道地的德國豬腳、香腸與歐式麵包，大口吃肉的滿足感無可取代。（午餐時段 10:30-14:00）。",
        mapUrl: "https://maps.app.goo.gl/KwuWANbVwbrNH7jz6",
        icon: "food"
      },
      {
        time: "14:00",
        title: "Warorot Market (瓦洛洛市場)",
        description: "清邁百年歷史的「大食堂」，也是在地人採買年貨之處。這裡的龍眼乾、炸豬皮、泰北香腸最齊全，是採購伴手禮的一級戰區。",
        mapUrl: "https://maps.app.goo.gl/2jqSmHFUxvzVUL9e6",
        icon: "shop"
      },
      {
        time: "16:00",
        title: "Maha-Saan & Nicha Chiangmai",
        description: "逛逛人氣藤品店【Maha-Saan มหา-สาน】、精緻棉麻服飾【Nicha Chiangmai Natural Cotton】。",
        mapUrl: "https://maps.app.goo.gl/SxThZX3jJ4TkEThx7",
        icon: "shop"
      },
      {
        time: "16:00+",
        title: "恐龍造型油條 & 傳統刨冰",
        description: "品嘗恐龍造型油條【ปาท่องโก๋ โกเหน่ง】與傳統刨冰【ขนมหวานช้างม่อย】。",
        mapUrl: "https://maps.app.goo.gl/WQZtyabnyFoVTcJe8",
        icon: "food"
      },
      {
        time: "19:00",
        title: "週六夜市 (Wua Lai Road)",
        description: "位於著名的「打銀街」上，是每週六晚上的重頭戲。擁有更多精緻的銀飾工藝品與傳統手工藝攤位。邊吃著泰北香腸，邊欣賞路邊盲人樂隊的演奏，感受最道地的泰北夜市氛圍。",
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
        time: "07:30",
        title: "BED HOTEL 早餐",
        description: "享受豐盛早餐。",
        icon: "food"
      },
      {
        time: "09:30",
        title: "Jing Jai Market (真心市集)",
        description: "清邁質感第一名的農夫市集，主打有機蔬果與手作工藝。在樹蔭下品嚐在地小吃，感受清邁最純粹的文青慢活氣息。",
        mapUrl: "https://maps.app.goo.gl/drSyE27oe3n6j93t6",
        icon: "shop"
      },
      {
        time: "16:00",
        title: "古城悠閒漫步",
        description: "【帕辛寺 Wat Phra Singh】&【契迪龍寺 Wat Chedi Luang】參拜。【塔佩門 Tha Pae Gate】餵鴿子拍照。漫步在蘭納王朝的信仰中心。「帕辛寺」金碧輝煌，保存著精緻壁畫；「契迪龍寺」則以宏偉的殘缺佛塔展現歷史滄桑之美。",
        icon: "activity"
      },
      {
        time: "19:00",
        title: "週日夜市 (Sunday Walking Street)",
        description: "世界知名的超大型夜市，貫穿整個古城。從手工藝品、街頭畫家到道地小吃，整條街化身為不夜城，是體驗清邁夜生活的最高潮。",
        icon: "activity"
      }
    ]
  },
  {
    id: "day4",
    date: "1/26",
    dayOfWeek: "一",
    title: "文青藝術村 & 蘑菇咖啡廳",
    transport: "機車",
    imageUrl: "images/day4.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1534008897995-27a23e859048?q=80&w=1000",
    items: [
      {
        time: "07:30",
        title: "BED HOTEL 早餐",
        description: "享受豐盛早餐。",
        icon: "food"
      },
      {
        time: "09:30",
        title: "清邁藝文中心 (Kalm Village)",
        description: "คาล์ม วิลเลจ เชียงใหม่ - 感受在地藝文氣息。",
        mapUrl: "https://maps.app.goo.gl/uFjDA9bEieTH2oSJ9",
        icon: "activity"
      },
      {
        time: "11:00",
        title: "Baan Kang Wat 藝術村",
        description: "彷彿從童話中長出來的森林聚落，木造小屋錯落於綠意中。在此逛逛手作雜貨、喝杯手沖咖啡，享受與世隔絕的寧靜時光。",
        mapUrl: "https://maps.app.goo.gl/6mq3gUswPXNxxzKF9",
        icon: "activity"
      },
      {
        time: "午餐",
        title: "Yook Samai",
        description: "隱身於藝術村內的美味，濃郁的泰北咖哩湯頭搭配軟嫩牛肉，是視覺與味覺的雙重享受。",
        icon: "food"
      },
      {
        time: "14:30",
        title: "Much Room Cafe",
        description: "外型像是一朵朵巨大蘑菇的特色咖啡廳，造型奇特可愛，是 IG 打卡的熱門景點，在此享用下午茶療癒身心。",
        mapUrl: "https://maps.app.goo.gl/mj6fqnsfABVAL7Qz7",
        icon: "food"
      },
      {
        time: "17:00",
        title: "Tawan Bike 還機車",
        description: "結束機車行程。",
        icon: "travel"
      },
      {
        time: "17:30",
        title: "Giving Tree Massage",
        description: "享受按摩，晚餐於古城內享用精緻晚餐。",
        mapUrl: "https://maps.app.goo.gl/Yu9rAyB9hzbABLyk7",
        icon: "activity"
      }
    ]
  },
  {
    id: "day5",
    date: "1/27",
    dayOfWeek: "二",
    title: "山中櫻花 & 天使瀑布 & 米其林宮廷菜",
    transport: "包計程車 (09:00-19:30)",
    imageUrl: "images/day5.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000",
    items: [
      {
        time: "06:30",
        title: "BED HOTEL 早餐",
        description: "享受豐盛早餐。",
        icon: "food"
      },
      {
        time: "08:00",
        title: "Khun Chang Khian (坤昌阡)",
        description: "包車去賞櫻。被譽為「泰國櫻花谷」，每年 1 月粉紅色的喜馬拉雅櫻花染紅山頭，漫步於櫻花隧道下，感受屬於熱帶高山的浪漫春意。",
        icon: "activity"
      },
      {
        time: "12:00",
        title: "Saiyut & Doctor Sai Kitchen",
        description: "米其林推薦餐廳，以傳承百年的泰式宮廷料理聞名。精緻如藝術品的果雕與擺盤，讓每一道菜都像是一場視覺饗宴。",
        mapUrl: "https://maps.app.goo.gl/KM5MSmLgU1NrifhdA",
        icon: "food"
      },
      {
        time: "14:30",
        title: "Dantewada Land of Angels Waterfall Park",
        description: "震撼的人造迷霧瀑布園區，巨石、瀑布與飄渺水霧交織出如仙境般的場景，隨手一拍都是仙氣飄飄的大片。",
        mapUrl: "https://maps.app.goo.gl/8K84Gkr1YsFDtS9JA",
        icon: "activity"
      },
      {
        time: "18:00",
        title: "Khlong Mae Kha 運河市集",
        description: "經過整治後的運河煥然一新，兩岸點綴著日式燈籠與小花，有「清邁小樽」之稱，夜晚倒影迷人，適合散步拍照。",
        mapUrl: "https://maps.app.goo.gl/KKfs4hq3pxcqexAE9",
        icon: "shop"
      },
      {
        time: "19:30",
        title: "回到 BED HOTEL",
        description: "結束美好的一天。",
        icon: "hotel"
      }
    ]
  },
  {
    id: "day6",
    date: "1/28",
    dayOfWeek: "三",
    title: "女兒先回家，媽媽繼續逍遙遊",
    transport: "飯店送機",
    imageUrl: "images/day6.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1478860409698-8707f313ee8b?q=80&w=1000",
    items: [
      {
        time: "06:30",
        title: "BED 飯店早餐",
        description: "最後整理行李。",
        icon: "food"
      },
      {
        time: "08:00",
        title: "BED 飯店退房",
        description: "辦理退房手續。",
        icon: "hotel"
      },
      {
        time: "08:30",
        title: "Check-in Anumat Premium Budget Hotel",
        description: "女兒陪媽媽到新飯店 Check in。",
        mapUrl: "https://maps.app.goo.gl/awVY2A9tySuX2Nwg7",
        icon: "hotel"
      },
      {
        time: "09:00",
        title: "前往清邁機場 (CNX)",
        description: "媽媽送女兒去機場。",
        icon: "travel"
      },
      {
        time: "後續",
        title: "尚泰百貨 Central Chiangmai Airport",
        description: "媽媽送機後前往距離機場最近的大型購物中心，匯集各式品牌與美食。",
        mapUrl: "https://maps.app.goo.gl/DNRxK8quCA3MpkDZA",
        icon: "shop"
      },
      {
        time: "11:25",
        title: "CI852 起飛",
        description: "女兒搭乘航班先行返台。",
        icon: "travel"
      }
    ]
  },
    {
    id: "dayn",
    date: "2/3",
    dayOfWeek: "二",
    title: "媽媽回家囉",
    transport: "飯店送機",
    
    items: [
      {
        time: "08:30",
        title: "飯店退房",
        description: "辦理退房手續。",
        icon: "hotel"
      },
      {
        time: "09:00",
        title: "前往清邁機場 (CNX)",
        description: "搭BOLT前往",
        mapUrl: "https://maps.app.goo.gl/1fWWLBKUvCXrMD2A7",
        icon: "travel"
      }
    ]
  }
];
