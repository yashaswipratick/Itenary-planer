/* Curated starter destination catalogue for RoamPlan.
   Summaries are editorial guides. Where a Wikipedia article exists, place.html also loads its current introduction via the public Wikipedia API. */
window.ROAMPLANDATA = {
  countries: [{ value: "India", label: "India" }],
  states: [{ value: "Karnataka", label: "Karnataka" }, { value: "Kerala", label: "Kerala" }],
  cities: [
    { value: "Coorg", label: "Coorg — all areas" },
    { value: "Madikeri", label: "Madikeri & central Coorg" },
    { value: "Kushalnagar", label: "Kushalnagar" },
    { value: "Bylakuppe", label: "Bylakuppe" },
    { value: "Somwarpet", label: "Somwarpet" },
    { value: "Bhagamandala", label: "Bhagamandala & Talakaveri" },
    { value: "Kakkabe / Virajpet", label: "Kakkabe & Virajpet" },
    { value: "Kutta", label: "Kutta & Nagarahole" },
    { value: "Galibeedu", label: "Galibeedu countryside" },
    { value: "Ammathi / Bilugunda", label: "Ammathi & Bilugunda" },
    { value: "Suntikoppa / 7th Hosakote", label: "Suntikoppa & 7th Hosakote" },
    { value: "Kerala Border", label: "Kerala border escapes — all" },
    { value: "Ullikkal", label: "Ullikkal — Kalanki" },
    { value: "Kanjirakolly", label: "Kanjirakolly — Alakapuri Falls" },
    { value: "Valiya Areekamala", label: "Valiya Areekamala — viewpoint" },
    { value: "Vellad / Kudianmala", label: "Vellad / Kudianmala — Ezharakund" }
  ],
  places: [
    {
      id:"golden-temple", name:"Namdroling Monastery (Golden Temple)", city:"Bylakuppe", group:"Kushalnagar & Bylakuppe",
      tag:"Famous · Culture", crowd:"Popular", duration:"60–90 min", mapQuery:"Namdroling Monastery Golden Temple Bylakuppe",
      overview:"A major Tibetan Buddhist monastery in Bylakuppe, known for its ornate prayer halls and large gilded Buddha statues. The complex offers a cultural contrast to Coorg's coffee estates and forest scenery.",
      why:"Visit for Tibetan Buddhist art, peaceful courtyards and a different cultural perspective on the region.",
      bestTime:"Morning or early afternoon; avoid prayer-hall disruption and follow visitor notices.",
      notes:"Dress respectfully, keep voices low, and confirm visitor access on festival days. Pair it with Nisargadhama or another Kushalnagar-side stop.",
      wikiTitle:"Namdroling Monastery", nearby:["kaveri-nisargadhama","dubare-elephant-camp","harangi-dam"]
    },
    {
      id:"dubare-elephant-camp", name:"Dubare Elephant Camp", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Wildlife · Famous", crowd:"Popular", duration:"2–3 hours", mapQuery:"Dubare Elephant Camp Kodagu",
      overview:"A forest-and-river destination on the Kaveri known for its elephant-care and mahout interpretation experiences. The visit depends on the camp's operating schedule and current access arrangements.",
      why:"Good for families and visitors interested in elephants, conservation interpretation and riverine forest landscapes.",
      bestTime:"Book an available morning session where possible.",
      notes:"Check the operator's current rules, session timings and transport arrangements before leaving. Follow staff directions and do not assume animal contact is permitted.",
      wikiTitle:"Dubare Elephant Camp", nearby:["kaveri-nisargadhama","harangi-dam","harangi-elephant-camp-tree-park","chiklihole-reservoir"]
    },
    {
      id:"kaveri-nisargadhama", name:"Kaveri Nisargadhama", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Nature · Popular", crowd:"Popular", duration:"60–90 min", mapQuery:"Kaveri Nisargadhama Kushalnagar",
      overview:"A riverine island-like nature park near Kushalnagar, formed by the Kaveri and known for bamboo groves, wooded paths and a hanging rope bridge.",
      why:"A relaxed stop for a short walk, family-friendly nature time and green, shaded scenery.",
      bestTime:"Morning or late afternoon; check local conditions during heavy rain.",
      notes:"Facilities and river access can vary by season. Treat it as a developed nature park rather than a remote wilderness stop.",
      wikiTitle:"Nisargadhama", nearby:["golden-temple","dubare-elephant-camp","harangi-dam","chiklihole-reservoir"]
    },
    {
      id:"coorg-hanging-bridge", name:"Coorg Hanging Bridge", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Scenic · River bridge", crowd:"Crowd varies", duration:"15–30 min", mapQuery:"Coorg Hanging Bridge, CWPF+RWR, Basavanahalli, Karnataka 571234",
      overview:"A local hanging bridge across the Cauvery around Basavanahalli, near Kushalnagar. Treat it as a short riverside stop when access is open.",
      why:"A brief stop for river scenery around the Nisargadhama and Kushalnagar area.",
      bestTime:"Daylight hours; avoid heavy rain and high-water conditions.",
      notes:"Confirm the precise pin, public access and whether crossing is currently allowed before visiting. Do not assume the bridge is always open or safe to cross.",
      wikiTitle:"", nearby:["kaveri-nisargadhama","coorg-adventure-park","greenway-coffee-island"]
    },
    {
      id:"coorg-adventure-park", name:"Coorg Adventure Park", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Adventure · Family activity", crowd:"Crowd varies", duration:"60–120 min", mapQuery:"Coorg Adventure Park, BM Road near Nisargadhama, Baichanahalli, Karnataka 571234",
      overview:"An adventure-activity stop near the Nisargadhama tourist zone on BM Road at Baichanahalli. Available activities may vary by operator and season.",
      why:"Useful for travellers looking to add an activity-focused stop near Kushalnagar rather than another long-distance sightseeing drive.",
      bestTime:"Check opening hours and activity slots before setting out.",
      notes:"Confirm current operating status, prices, age/height restrictions and safety requirements directly with the operator before planning around it.",
      wikiTitle:"", nearby:["kaveri-nisargadhama","coorg-hanging-bridge","greenway-coffee-island"]
    },
    {
      id:"harangi-dam", name:"Harangi Reservoir, Kodagu", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Scenic · Reservoir", crowd:"Crowd varies by season", duration:"45–75 min", mapQuery:"Harangi Reservoir, Kodagu", mapUrl:"https://maps.app.goo.gl/s8oovQGBpjW2TNbL7", aliases:["Harangi Backwaters","Harangi Backwater Road Herur"],
      overview:"Harangi Reservoir is formed by the Harangi Dam across the Harangi River, a tributary of the Kaveri, near Hudgur in Kodagu. The reservoir and backwaters sit amid the green landscape east of Madikeri and are commonly visited as a short nature stop near Kushalnagar.",
      why:"Visit for the reservoir scenery and to understand the water landscape around the Kaveri basin. It pairs naturally with the nearby Harangi Elephant Camp & Tree Park.",
      bestTime:"Daylight hours. The surrounding views and safe access can change with reservoir operations, rain and water levels.",
      notes:"Public access may be limited to designated visitor areas. Do not enter dam structures or restricted areas, and follow all safety notices. The Kodagu district page lists it close to Kushalnagar and roughly 33 km from Madikeri; route distance depends on your start point.",
      wikiTitle:"Harangi Reservoir", officialUrl:"https://kodagu.nic.in/en/tourist-place/harangi-dam/", nearby:["harangi-elephant-camp-tree-park","kaveri-nisargadhama","dubare-elephant-camp","chiklihole-reservoir"]
    },
    {
      id:"harangi-elephant-camp-tree-park", name:"Harangi Elephant Camp & Tree Park", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Wildlife · Nature", crowd:"Crowd varies by season", duration:"60–120 min", mapQuery:"Harangi Tree Park and Elephant Camp Kodagu",
      overview:"A forest-department elephant camp and tree park on the right side of Harangi reservoir's backwater area, adjacent to the tree park. The Kodagu district tourism website says the camp was inaugurated in 2022 and describes a sunset viewpoint and benches beside the backwaters.",
      why:"A useful alternative to the better-known Dubare stop if you are exploring the Harangi reservoir area. The setting combines an elephant-camp visit with views of the backwaters and surrounding greenery.",
      bestTime:"Check current visitor hours and activity availability before travelling; morning or late afternoon can work well for an unhurried visit.",
      notes:"The official tourism page mentions pedal boats in the backwaters, but availability and visitor rules can change. Confirm activities, any elephant-viewing restrictions, and access locally; do not assume close contact with elephants is allowed.",
      wikiTitle:"Harangi Reservoir", wikiLabel:"Harangi Reservoir and backwaters (regional context)", officialUrl:"https://kodagu.nic.in/en/tourist-place/harangi-tree-park-and-elephant-camp/", nearby:["harangi-dam","dubare-elephant-camp","kaveri-nisargadhama","chiklihole-reservoir"]
    },
    {
      id:"chiklihole-reservoir", name:"Chiklihole Reservoir", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"OFFBEAT · Nature", crowd:"Usually quieter", duration:"45–60 min", mapQuery:"Chiklihole Reservoir Kodagu",
      overview:"A small reservoir surrounded by forest and grassland between the Madikeri and Kushalnagar side of Coorg. It is more of a quiet landscape stop than a fully serviced tourist attraction.",
      why:"Choose it for a slower stop, photography and a break from crowded viewpoints.",
      bestTime:"Clear daylight hours; avoid approaching the water in heavy rain.",
      notes:"Road surfaces and facilities may be limited. Verify the route locally, carry water and leave before dark.",
      wikiTitle:"Chiklihole Reservoir", nearby:["dubare-elephant-camp","kaveri-nisargadhama","harangi-dam"]
    },
    {
      id:"greenway-coffee-island", name:"Greenway Coffee Island Plantation Tour", city:"Suntikoppa / 7th Hosakote", group:"Suntikoppa & Coffee Country",
      tag:"Coffee · Plantation walk", crowd:"Popular; confirm booking", duration:"60–120 min", mapQuery:"Greenway Coffee Island plantation tour, Green way coffee island Nature walk, 7th Hosakote, Mysore Bangalore Road, Karnataka 571237",
      overview:"A guided coffee-plantation and nature-walk experience in the 7th Hosakote / Suntikoppa area along the Mysore–Bangalore road. Tours may include an introduction to coffee and the plantation landscape.",
      why:"A good activity stop for learning about Coorg's coffee-growing landscape rather than visiting only viewpoints and waterfalls.",
      bestTime:"Book or confirm the tour time in advance; allow extra time for the guided walk.",
      notes:"Confirm availability, start time, tour inclusions and current meeting point directly with Greenway Coffee Island before travelling.",
      wikiTitle:"", nearby:["coorg-hanging-bridge","coorg-adventure-park","kaveri-nisargadhama"]
    },
    {
      id:"mandalpatti-viewpoint", name:"Mandalpatti Viewpoint", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Famous · Viewpoint", crowd:"Popular", duration:"2.5–3.5 hours incl. transfer", mapQuery:"Mandalpatti Viewpoint Madikeri",
      overview:"A high Western Ghats viewpoint north of Madikeri, sought out for rolling ridgelines, cloud-filled valleys and expansive hill scenery.",
      why:"One of Coorg's best-known mountain-view experiences, particularly when the weather is clear enough to see the ridges.",
      bestTime:"Early morning for softer light and a better chance of misty landscapes.",
      notes:"The final stretch commonly uses an authorised local 4×4 jeep. Confirm the day's access, road conditions and booking point; don't assume a regular car can reach the top.",
      wikiTitle:"Mandalpatti", nearby:["abbey-falls","rajas-seat","mercara-gold-estate"]
    },
    {
      id:"abbey-falls", name:"Abbey Falls", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Famous · Waterfall", crowd:"Popular", duration:"45–60 min", mapQuery:"Abbey Falls Madikeri",
      overview:"A waterfall near Madikeri set among coffee and spice plantations and thick greenery. The approach includes a walk to a designated viewing area.",
      why:"A classic Coorg stop for waterfall scenery, forest atmosphere and monsoon-season drama.",
      bestTime:"After the monsoon the flow can be impressive; check access and conditions after heavy rain.",
      notes:"Viewing access may be restricted when conditions are unsafe. Stay behind barriers and do not enter the waterfall pool or climb wet rocks.",
      wikiTitle:"Abbey Falls", nearby:["mandalpatti-viewpoint","mercara-gold-estate","rajas-seat"]
    },
    {
      id:"rajas-seat", name:"Raja's Seat", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Famous · Viewpoint", crowd:"Popular", duration:"30–60 min", mapQuery:"Raja's Seat Madikeri",
      overview:"A historic garden and pavilion overlooking the western valleys of Madikeri. The site is traditionally associated with the rulers of Kodagu, who are said to have enjoyed the view.",
      why:"An easy town-side stop for sunset light and a broad valley panorama.",
      bestTime:"Late afternoon or sunset, weather permitting.",
      notes:"Crowds can build around sunset and on weekends. Pair with Madikeri Fort, Omkareshwara Temple and Raja's Tomb in the town area.",
      wikiTitle:"Raja's Seat", nearby:["madikeri-fort","omkareshwara-temple","rajas-tomb"]
    },
    {
      id:"madikeri-fort", name:"Madikeri Fort", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Heritage · Famous", crowd:"Moderate", duration:"30–60 min", mapQuery:"Madikeri Fort Karnataka",
      overview:"A historic fort in the heart of Madikeri. Its origins are associated with the Kodagu ruler Mudduraja in the 17th century; it was subsequently altered and rebuilt under later rulers.",
      why:"A compact heritage stop that fits easily into a walking or short-drive circuit around Madikeri.",
      bestTime:"Morning or early afternoon; verify current access to individual buildings.",
      notes:"Parts of the complex may have restricted access or be undergoing work. Combine with Omkareshwara Temple and Raja's Tomb rather than crossing town repeatedly.",
      wikiTitle:"Madikeri Fort", nearby:["omkareshwara-temple","rajas-seat","rajas-tomb"]
    },
    {
      id:"omkareshwara-temple", name:"Omkareshwara Temple", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Heritage · Spiritual", crowd:"Moderate", duration:"30–45 min", mapQuery:"Omkareshwara Temple Madikeri",
      overview:"A historic Shiva temple in Madikeri, associated with Linga Rajendra II and noted for an architectural style that blends Indian and Indo-Islamic visual elements.",
      why:"A distinctive architectural and cultural stop close to Madikeri's other central attractions.",
      bestTime:"During visitor hours, outside major worship periods if you prefer a quieter visit.",
      notes:"Dress modestly and respect temple practices. Confirm current opening times locally.",
      wikiTitle:"Omkareshwara Temple, Madikeri", nearby:["madikeri-fort","rajas-seat","rajas-tomb"]
    },
    {
      id:"mercara-gold-estate", name:"Mercara Gold Estate", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Coffee · Plantation", crowd:"Usually quieter", duration:"60–90 min", mapQuery:"Mercara Gold Estate Coffee Plantation Coorg",
      overview:"A coffee-and-spice estate experience near Madikeri where visitors may be able to join a guided walk and learn how coffee is cultivated and processed.",
      why:"A strong choice if you want more than a viewpoint: it gives context to Coorg's plantation economy and local coffee culture.",
      bestTime:"Book a daytime tour in advance, especially during weekends and holidays.",
      notes:"This is a privately operated experience, not a public park. Confirm tour availability, duration, fees and what is included directly before visiting.",
      wikiTitle:"", nearby:["abbey-falls","mandalpatti-viewpoint","galibeedu-chapandi-kere"]
    },
    {
      id:"rajas-tomb", name:"Raja's Tomb (Gaddige)", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"Heritage · Less visited", crowd:"Usually quieter", duration:"30–45 min", mapQuery:"Raja's Tomb Gaddige Madikeri",
      overview:"A historic tomb complex on the edge of Madikeri associated with Kodagu's former royal family. Its domed structures make it a useful stop for architecture and regional history.",
      why:"Adds a different historical perspective to the more familiar fort and sunset viewpoint.",
      bestTime:"Daylight hours; check local access before visiting.",
      notes:"A relatively short visit. Pair with Madikeri Fort and Raja's Seat to keep driving to a minimum.",
      wikiTitle:"", nearby:["madikeri-fort","rajas-seat","omkareshwara-temple"]
    },
    {
      id:"kote-abbe-falls", name:"Kote Abbe Falls (local waterfall listing)", city:"Madikeri", group:"Madikeri & Central Coorg",
      tag:"OFFBEAT · Waterfall", crowd:"Crowd unknown", duration:"45–60 min plus drive", mapQuery:"Kote Abbe Falls Kodagu",
      overview:"A lesser-documented local waterfall listing around Kodagu. Unlike the better-known Abbey Falls, visitor information and access details are not consistently published.",
      why:"Only consider it if you specifically want to investigate a quieter, less-developed waterfall stop.",
      bestTime:"Only after local confirmation of access and safe conditions.",
      notes:"Treat the map pin as a lead, not a guarantee. Ask a local host about the exact approach, avoid private land, and never enter the water or climb wet rocks. Skip it if access is uncertain.",
      wikiTitle:"", nearby:["abbey-falls","mandalpatti-viewpoint"]
    },
    {
      id:"galibeedu-chapandi-kere", name:"Galibeedu Chapandi Kere", city:"Galibeedu", group:"Galibeedu & countryside",
      tag:"OFFBEAT · Lakeside", crowd:"Crowd unknown", duration:"20–40 min if accessible", mapQuery:"Galibeedu Chapandi Kere Coorg",
      overview:"A small countryside lake or kere listing near Galibeedu. This is better approached as a rural scenery stop than as a managed attraction with guaranteed visitor facilities.",
      why:"For travellers who enjoy quiet village roads and low-key landscapes rather than a checklist of ticketed sights.",
      bestTime:"Daylight only, in suitable weather.",
      notes:"The exact local name and approach can vary in map listings. Confirm the place with a local host, respect private property and do not expect facilities.",
      wikiTitle:"", nearby:["mercara-gold-estate","rajas-seat"]
    },
    {
      id:"bhagamandala", name:"Bhagamandala & Triveni Sangama", city:"Bhagamandala", group:"Bhagamandala & Brahmagiri",
      tag:"Famous · Spiritual", crowd:"Moderate; festival peaks", duration:"45–75 min", mapQuery:"Bhagamandala Triveni Sangama Kodagu",
      overview:"A pilgrimage town in Kodagu known for the Bhagandeshwara Temple and Triveni Sangama, the sacred confluence traditionally associated with the Kaveri and its tributaries.",
      why:"An important cultural stop and a natural pairing with Talakaveri on a western Coorg circuit.",
      bestTime:"Morning is comfortable for the temple and riverside visit; expect larger crowds around religious festivals.",
      notes:"Dress respectfully and follow local rules at the temple and bathing areas. The approach can be slow in rain or during festival traffic.",
      wikiTitle:"Bhagamandala", nearby:["talakaveri","nishani-motte"]
    },
    {
      id:"talakaveri", name:"Talakaveri (Talacauvery)", city:"Bhagamandala", group:"Bhagamandala & Brahmagiri",
      tag:"Famous · Pilgrimage · Hills", crowd:"Moderate; festival peaks", duration:"60–90 min", mapQuery:"Talakaveri Temple Kodagu",
      overview:"A temple site in the Brahmagiri Hills traditionally regarded as the source of the Kaveri River. It is an important pilgrimage destination with views of the surrounding mountain landscape.",
      why:"Combines cultural significance with a scenic mountain setting and a sense of the Kaveri's importance to southern India.",
      bestTime:"Clear mornings for hill views; conditions can change quickly with cloud and rain.",
      notes:"The drive involves winding hill roads. Check weather, visibility and local access before setting off, especially during heavy rain or festival periods.",
      wikiTitle:"Talakaveri", nearby:["bhagamandala","nishani-motte"]
    },
    {
      id:"nishani-motte", name:"Nishani Motte Trek", city:"Bhagamandala", group:"Bhagamandala & Brahmagiri",
      tag:"OFFBEAT · Trekking", crowd:"Usually quieter; permit limits", duration:"Full day", mapQuery:"Nishani Motte Trek Kodagu",
      overview:"A guided trekking route through forest and grassland landscapes in the Western Ghats near the Bhagamandala side of Kodagu. Conditions and permissions determine whether the trail can be accessed.",
      why:"A better fit for hikers looking for a full-day outdoor objective rather than a quick roadside viewpoint.",
      bestTime:"Use an approved trek date with a reliable forecast and current permission confirmation.",
      notes:"Not a casual sightseeing stop. Arrange required forest permissions and a designated guide, carry adequate water and suitable shoes, and do not attempt the route in poor weather.",
      wikiTitle:"", nearby:["talakaveri","bhagamandala"]
    },
    {
      id:"honnamana-kere", name:"Honnamana Kere", city:"Somwarpet", group:"Somwarpet & Pushpagiri",
      tag:"OFFBEAT · Lake", crowd:"Usually quieter", duration:"45–75 min", mapQuery:"Honnamana Kere Somwarpet",
      overview:"A lake near Somwarpet with a temple and countryside setting. The atmosphere is calmer than the busiest viewpoints, with the lake itself being the main reason to stop.",
      why:"Good for a slower landscape break and a different side of Coorg beyond Madikeri.",
      bestTime:"Daylight hours in clear weather.",
      notes:"This is a separate northern circuit and adds driving from central Madikeri. Facilities are limited; be careful near the water's edge.",
      wikiTitle:"", nearby:["mallalli-falls"]
    },
    {
      id:"mallalli-falls", name:"Mallalli Falls", city:"Somwarpet", group:"Somwarpet & Pushpagiri",
      tag:"Nature · Waterfall", crowd:"Moderate; seasonal", duration:"2–3 hours or more", mapQuery:"Mallalli Falls Somwarpet Kodagu",
      overview:"A major waterfall near the foothills of Pushpagiri in the Somwarpet region, where water drops into a forested valley. The walk and steps make the visit more physical than a roadside viewpoint.",
      why:"Choose it for a substantial nature outing and a dramatic waterfall landscape.",
      bestTime:"After the monsoon the water can be impressive, but access may be restricted or slippery during and after heavy rain.",
      notes:"Allow time for the walk and return climb. Wear shoes with grip, keep away from unsafe edges, and verify current access and road conditions.",
      wikiTitle:"Mallalli Falls", nearby:["honnamana-kere"]
    },
    {
      id:"chelavara-falls", name:"Chelavara Waterfalls", city:"Kakkabe / Virajpet", group:"Kakkabe & Virajpet",
      tag:"OFFBEAT · Waterfall", crowd:"Crowd varies", duration:"45–75 min plus drive", mapQuery:"Chelavara Waterfalls, 6M4F+F9X, Cheyyandane village, Chelavara, Karnataka 571212", aliases:["Chelavara Falls"],
      overview:"A waterfall near Cheyyandane village in Kodagu, surrounded by dense greenery. This entry uses the plus code and address supplied by the user; access can vary with rainfall and local conditions.",
      why:"A worthwhile alternative if you prefer a less urbanised, forest-framed waterfall visit.",
      bestTime:"Only when access is open and weather is safe; avoid periods of heavy rain.",
      notes:"The rocks and water can be dangerous. Do not swim or bathe, and confirm access with a local source before travelling specifically for the falls.",
      wikiTitle:"Chelavara Falls", nearby:["nalknad-palace","kabbe-betta-view","thadiyandamol-peak"]
    },
    {
      id:"kaapi-nele-adventure-trek", name:"Kaapi Nele - Adventure Trek Coorg", city:"Ammathi / Bilugunda", group:"Kakkabe & Virajpet",
      tag:"Coffee · Guided adventure walk", crowd:"Booking-dependent", duration:"90–180 min", mapQuery:"Kaapi Nele - Adventure Trek Coorg, Iynanda Mane, Billugunda Village, Ammathi, Bilugunda, Karnataka 571211",
      overview:"A hosted coffee-country experience offering plantation walks, coffee tasting and nature-adventure options in the Ammathi / Bilugunda area of Kodagu.",
      why:"An experience-led stop for walking through the plantation landscape and learning about local coffee and Kodava country.",
      bestTime:"Reserve a session and confirm the current meeting point before travelling.",
      notes:"Experiences and trail options depend on the chosen package, weather and host availability. Confirm duration, difficulty, inclusions and safety guidance before booking.",
      wikiTitle:"", officialUrl:"https://kaapinele.co.in/", nearby:["chelavara-falls","nalknad-palace","greenway-coffee-island"]
    },
    {
      id:"nalknad-palace", name:"Nalknad Palace", city:"Kakkabe / Virajpet", group:"Kakkabe & Virajpet",
      tag:"OFFBEAT · Heritage", crowd:"Usually quieter", duration:"30–60 min if open", mapQuery:"Nalknad Palace Yevakapadi Kodagu",
      overview:"A protected historic palace near Yevakapadi in Kodagu, built between 1792 and 1794 by Haleri ruler Dodda Veerarajendra. Its timber architecture, paintings and carvings connect the site to the region's royal history.",
      why:"A good heritage stop to pair with the Thadiyandamol trek or Kabbe Betta View, rather than a quick add-on to central Madikeri.",
      bestTime:"Daylight hours; Karnataka Tourism generally lists daytime access, but confirm current opening and entry arrangements locally.",
      notes:"The palace is maintained as a protected monument and facilities are limited. Treat it as a short heritage visit; do not assume all rooms are open. The district tourism page says it is about 41 km from Madikeri and near Thadiyandamol.",
      wikiTitle:"Nalknad Palace", officialUrl:"https://kodagu.nic.in/en/tourist-place/nalknad-palace/", nearby:["thadiyandamol-peak","kabbe-betta-view","chelavara-falls"]
    },
    {
      id:"kabbe-betta-view", name:"Kabbe Betta View", city:"Kakkabe / Virajpet", group:"Kakkabe & Virajpet",
      tag:"OFFBEAT · Viewpoint · Hills", crowd:"Usually quieter", duration:"60–120 min plus approach", mapQuery:"Kabbe Betta View Chelavara Karnataka",
      overview:"Kabbe Betta View is a hill-and-ridge viewpoint in the Chelavara/Yevakapadi side of Kodagu. The surrounding Kabbe Hills are known for grassy ridgelines, forested slopes and wide Western Ghats views.",
      why:"A quieter alternative to the busiest Coorg viewpoints, especially for travellers who enjoy open ridges, misty hills and a more rural approach.",
      bestTime:"Choose a clear morning or a period when the forecast gives good visibility; mist can hide the views.",
      notes:"Road access and the final approach can be rural and uneven. Confirm the exact pin and whether private-estate access or a local jeep is needed. Visit in daylight, don't cross fences or enter restricted forest areas, and avoid exposed slopes in rain or strong wind.",
      wikiTitle:"", officialUrl:"https://jlrexplore.com/explore/unexplored-areas/the-hills-of-kabbe", nearby:["nalknad-palace","thadiyandamol-peak","chelavara-falls"]
    },
    {
      id:"thadiyandamol-peak", name:"Thadiyandamol (Tadiandamol)", city:"Kakkabe / Virajpet", group:"Kakkabe & Virajpet",
      tag:"OFFBEAT · Trekking · Peak", crowd:"Moderate on weekends", duration:"Half day to full day", mapQuery:"Thadiyandamol Trek Base Camp Yevakapadi Kodagu",
      overview:"Thadiyandamol is the highest mountain in Kodagu, rising to about 1,748 metres in the Western Ghats. Its hike passes through forest, shola patches and open grassland slopes, with wide views near the summit.",
      why:"A top pick for a dedicated hiking day if you prefer a mountain trail over roadside viewpoints. Nalknad Palace sits nearby at the foothills and can be paired only if time and access allow.",
      bestTime:"The Kodagu district's adventure guidance recommends December to May for trekking; weather and trail conditions still need checking.",
      notes:"Plan this as the main activity for the day. The official eco-tourism portal lists a forest-check-post base camp and a guided/booking process; confirm permits, reporting time and current trail status before travelling. Carry grippy footwear, water and rain protection. Leeches can be common in wet periods; don't attempt the trail near closing time.",
      wikiTitle:"Tadiandamol", officialUrl:"https://trek.kodaguecotourism.com/trailDetail/26/Forest%20Check%20Post%20Base%20Camp%20-%20Thadiyandamol", nearby:["nalknad-palace","kabbe-betta-view","chelavara-falls"]
    },
    {
      id:"kalanki-queen-of-hills", name:"Kalanki — The Queen of Hills", city:"Ullikkal", state:"Kerala", region:"kerala-border", district:"Kannur", group:"Kerala Border Hills & Viewpoints",
      tag:"OFFBEAT · Hill Viewpoint", crowd:"Crowd varies", duration:"45–90 min", mapQuery:"Kalanki The Queen Of Hills Ullikkal Kannur Kerala",
      overview:"Kalanki is a hill viewpoint near Mattara in Ullikkal/Vayathur, Kannur district, Kerala, close to the Kerala–Karnataka boundary. The draw is the hilly landscape, green ridges and views toward the Karnataka countryside.",
      why:"A good border-region extension for a Coorg trip if you want to explore the lesser-known hill country on the Kerala side rather than treat every nearby hill as part of Coorg.",
      bestTime:"Clear mornings for long views or late afternoon if local access and weather are favourable.",
      notes:"This is in Kerala, not Kodagu district. The approach may use narrow local roads; verify the exact pin and road condition, go in daylight and don't assume there are public facilities at the viewpoint. Kalanki is also listed by Kerala's Vayathur Village Office.",
      wikiTitle:"Ulikkal", wikiLabel:"Ulikkal, Kannur — Wikipedia context", officialUrl:"https://landrevenue.kerala.gov.in/core/Office_websites/contactus.php?nm=10131013Vayathurvillageoffice", nearby:["kabbe-betta-view","thadiyandamol-peak","alakapuri-waterfalls","areekamala-viewpoint"]
    },
    {
      id:"alakapuri-waterfalls", name:"Alakapuri Waterfalls", city:"Kanjirakolly", state:"Kerala", region:"kerala-border", district:"Kannur", group:"Kerala Border Waterfalls",
      tag:"OFFBEAT · Waterfall", crowd:"Crowd varies by season", duration:"60–90 min", mapQuery:"Alakapuri Waterfalls Kanjirakolly Kannur Kerala",
      overview:"Alakapuri Waterfalls is a multi-stage cascade in the Kanjirakolly area of Kannur district, near the Kerala–Karnataka border. Kerala's District Tourism Promotion Council describes a roughly 200-foot cascade set among Western Ghats hills and valleys, with the waterfall's stream originating in forested Karnataka.",
      why:"A compelling border-side waterfall stop, with nearby hills and the Sasipara viewpoint making it possible to build a fuller nature outing.",
      bestTime:"The flow can be strongest during the monsoon, but heavy rain can also make the approach unsafe. Check local conditions before setting out.",
      notes:"The DTPC Kannur page lists a road-and-parking approach followed by about a 10-minute walk, and published visitor hours of 9 AM–5 PM; verify current opening, fee, trail condition and safety rules before visiting. Avoid entering the water or climbing wet rocks.",
      wikiTitle:"", officialUrl:"https://www.dtpckannur.com/destination/alakapuri-waterfalls", nearby:["kalanki-queen-of-hills","areekamala-viewpoint","ezharakund-waterfalls"]
    },
    {
      id:"areekamala-viewpoint", name:"Areekamala Viewpoint (Valiya Areekamala)", city:"Valiya Areekamala", state:"Kerala", region:"kerala-border", district:"Kannur", group:"Kerala Border Hills & Viewpoints",
      tag:"OFFBEAT · Hill Views", crowd:"Usually quieter", duration:"45–90 min", mapQuery:"Areekamala View Point Valiya Areekamala Kannur Kerala",
      overview:"Valiya Areekamala is a highland area in Eruvessi Panchayat, Kannur district, Kerala. Local listings and the Kerala Tourism location directory identify Areekamala near Kudiyanmala; the viewpoint experience is primarily about the surrounding countryside, ridges and sunset or sunrise views.",
      why:"A slower border-country stop for scenic hill views and a quieter rural atmosphere. It can be paired with other Kannur-side highland locations, but exact access matters.",
      bestTime:"Visit in daylight when visibility is good; confirm a safe viewpoint and route with a local host before timing a sunrise or sunset visit.",
      notes:"Reliable public details for a formal, managed viewpoint and its facilities are limited. Do not assume viewpoint signage, parking, toilets or unrestricted land access. Confirm the exact pin locally and respect private property.",
      wikiTitle:"", officialUrl:"https://www.keralatourism.org/routes-locations/areekkamala/id/947", nearby:["kalanki-queen-of-hills","alakapuri-waterfalls","ezharakund-waterfalls"]
    },
    {
      id:"ezharakund-waterfalls", name:"Ezharakund Waterfalls", city:"Vellad / Kudianmala", state:"Kerala", region:"kerala-border", district:"Kannur", group:"Kerala Border Waterfalls",
      tag:"OFFBEAT · Waterfall", crowd:"Moderate; seasonal", duration:"60–120 min", mapQuery:"Ezharakund Waterfalls Pottenplave Vellad Kannur Kerala",
      overview:"Ezharakund (also written Ezharakundu) is a group of seven waterfalls in the Kudianmala area of Kannur district. Kerala Tourism explains that the name refers to 'seven and a half pits' in Malayalam and describes it as a lush, multi-cascade attraction maintained by the District Tourism Promotion Council.",
      why:"An interesting waterfall outing for travellers exploring the rural highlands north of Coorg, especially if they want to combine it with Alakapuri Falls or Areekamala.",
      bestTime:"Visit in daylight when access is open. Avoid heavy-rain periods, when water levels and rocks can be dangerous.",
      notes:"Kerala Tourism places Ezharakund in Kudianmala and lists it about 50 km from Kannur town; your supplied pin is around Pottenplave/Vellad. Follow posted rules, stay on approved paths and do not assume swimming is allowed.",
      wikiTitle:"", officialUrl:"https://www.keralatourism.org/malabar/video-gallery/ezharakund-waterfalls/1078", nearby:["alakapuri-waterfalls","areekamala-viewpoint","kalanki-queen-of-hills"]
    },
    {
      id:"brahmagiri-wildlife-sanctuary", name:"Brahmagiri Wildlife Sanctuary", city:"Kutta", group:"Kutta & Nagarahole",
      tag:"Wildlife · Forest", crowd:"Access and permits vary", duration:"Half day to full day", mapQuery:"Brahmagiri Wildlife Sanctuary, Karnataka",
      overview:"A protected Western Ghats forest landscape associated with the Brahmagiri range near the Kodagu–Kerala border. This listing preserves the location details supplied for the Kappimala–Paithalmala Road pin.",
      why:"A nature-focused option for travellers interested in Western Ghats forest, wildlife and biodiversity.",
      bestTime:"Confirm current forest access, permissions and weather before planning; do not assume casual entry into the sanctuary is allowed.",
      notes:"Address supplied: 5JFV+3J4, Kappimala - Paithalmala Road, Vellad, Karnataka 670571. Location warning: India Post lists Vellad / PIN 670571 under Kannur, Kerala, so this address may not be the usual Kodagu-side sanctuary entrance. The Maps button searches for the sanctuary by name instead of sending you to this potentially mismatched address. Verify the exact pin and permitted entry gate with Forest Department/local authorities before driving or booking a trek.",
      wikiTitle:"Brahmagiri Wildlife Sanctuary", officialUrl:"https://kodagu.nic.in/en/tourism/adventures/", nearby:["iruppu-falls","nagarahole-national-park","nishani-motte"]
    },
    {
      id:"iruppu-falls", name:"Iruppu Falls", city:"Kutta", group:"Kutta & Nagarahole",
      tag:"Nature · Waterfall", crowd:"Moderate; seasonal", duration:"1.5–2.5 hours", mapQuery:"Iruppu Falls Kutta Kodagu",
      overview:"A forest waterfall near Kutta in southern Kodagu, on the Brahmagiri range. The walk passes through a green forest setting; a temple is also located nearby.",
      why:"A strong option for a waterfall and forest walk if you are already exploring the southern Coorg side.",
      bestTime:"Choose a day with safe trail conditions; heavy rain can affect access.",
      notes:"It is a long drive from Madikeri compared with central attractions. Wear grippy footwear and stay on marked paths.",
      wikiTitle:"Iruppu Falls", nearby:["nagarahole-national-park"]
    },
    {
      id:"nagarahole-national-park", name:"Nagarahole National Park", city:"Kutta", group:"Kutta & Nagarahole",
      tag:"Wildlife · Safari", crowd:"Booking-dependent", duration:"Plan around a safari slot", mapQuery:"Nagarahole National Park safari Kutta",
      overview:"A protected forest landscape spanning parts of Kodagu and Mysuru districts, forming part of the wider Nilgiri landscape and known for its wildlife and tiger habitat.",
      why:"Best for travellers whose priority is wildlife rather than a list of viewpoints and waterfalls.",
      bestTime:"Book a confirmed safari slot and check the operating gate, season and current rules.",
      notes:"Different gates serve different routes; do not assume a booking at one gate is valid at another. Follow park rules and never leave designated visitor areas.",
      wikiTitle:"Nagarhole National Park", nearby:["iruppu-falls"]
    }
  ]
};