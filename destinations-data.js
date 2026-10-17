/* Curated starter destination catalogue for RoamPlan.
   Summaries are editorial guides. Where a Wikipedia article exists, place.html also loads its current introduction via the public Wikipedia API. */
window.ROAMPLANDATA = {
  countries: [{ value: "India", label: "India" }],
  states: [{ value: "Karnataka", label: "Karnataka" }],
  cities: [
    { value: "Coorg", label: "Coorg — all areas" },
    { value: "Madikeri", label: "Madikeri & central Coorg" },
    { value: "Kushalnagar", label: "Kushalnagar" },
    { value: "Bylakuppe", label: "Bylakuppe" },
    { value: "Somwarpet", label: "Somwarpet" },
    { value: "Bhagamandala", label: "Bhagamandala & Talakaveri" },
    { value: "Kakkabe / Virajpet", label: "Kakkabe & Virajpet" },
    { value: "Kutta", label: "Kutta & Nagarahole" },
    { value: "Galibeedu", label: "Galibeedu countryside" }
  ],
  places: [
    {
      id:"golden-temple", name:"Namdroling Monastery (Golden Temple)", city:"Bylakuppe", group:"Kushalnagar & Bylakuppe",
      tag:"Famous · Culture", crowd:"Popular", duration:"60–90 min", mapQuery:"Namdroling Monastery Golden Temple Bylakuppe",
      overview:"A major Tibetan Buddhist monastery in Bylakuppe, known for its ornate prayer halls and large gilded Buddha statues. The complex offers a cultural contrast to Coorg's coffee estates and forest scenery.",
      why:"Visit for Tibetan Buddhist art, peaceful courtyards and a different cultural perspective on the region.",
      bestTime:"Morning or early afternoon; avoid prayer-hall disruption and follow visitor notices.",
      notes:"Dress respectfully, keep voices low, and confirm visitor access on festival days. Pair it with Nisargadhama or another Kushalnagar-side stop.",
      wikiTitle:"Namdroling Monastery", nearby:["kaveri-nisargadhama","dubare-elephant-camp","harangi-reservoir"]
    },
    {
      id:"dubare-elephant-camp", name:"Dubare Elephant Camp", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Wildlife · Famous", crowd:"Popular", duration:"2–3 hours", mapQuery:"Dubare Elephant Camp Kodagu",
      overview:"A forest-and-river destination on the Kaveri known for its elephant-care and mahout interpretation experiences. The visit depends on the camp's operating schedule and current access arrangements.",
      why:"Good for families and visitors interested in elephants, conservation interpretation and riverine forest landscapes.",
      bestTime:"Book an available morning session where possible.",
      notes:"Check the operator's current rules, session timings and transport arrangements before leaving. Follow staff directions and do not assume animal contact is permitted.",
      wikiTitle:"Dubare Elephant Camp", nearby:["kaveri-nisargadhama","chiklihole-reservoir","harangi-reservoir"]
    },
    {
      id:"kaveri-nisargadhama", name:"Kaveri Nisargadhama", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Nature · Popular", crowd:"Popular", duration:"60–90 min", mapQuery:"Kaveri Nisargadhama Kushalnagar",
      overview:"A riverine island-like nature park near Kushalnagar, formed by the Kaveri and known for bamboo groves, wooded paths and a hanging rope bridge.",
      why:"A relaxed stop for a short walk, family-friendly nature time and green, shaded scenery.",
      bestTime:"Morning or late afternoon; check local conditions during heavy rain.",
      notes:"Facilities and river access can vary by season. Treat it as a developed nature park rather than a remote wilderness stop.",
      wikiTitle:"Nisargadhama", nearby:["golden-temple","dubare-elephant-camp","harangi-reservoir","chiklihole-reservoir"]
    },
    {
      id:"harangi-reservoir", name:"Harangi Reservoir & Tree Park", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"Nature · Scenic", crowd:"Usually quieter", duration:"45–90 min", mapQuery:"Harangi Reservoir Kodagu",
      overview:"A reservoir and surrounding green landscape on the Harangi, a tributary within the Kaveri basin. A useful alternative to the district's busier headline attractions.",
      why:"A pleasant option for water-and-hills views, a short stretch break and a more open landscape.",
      bestTime:"Daylight hours; views and access can change with reservoir operations and weather.",
      notes:"Don't assume boating, park facilities or unrestricted dam access are available. Follow all reservoir safety notices.",
      wikiTitle:"Harangi Reservoir", nearby:["kaveri-nisargadhama","dubare-elephant-camp","chiklihole-reservoir"]
    },
    {
      id:"chiklihole-reservoir", name:"Chiklihole Reservoir", city:"Kushalnagar", group:"Kushalnagar & Bylakuppe",
      tag:"OFFBEAT · Nature", crowd:"Usually quieter", duration:"45–60 min", mapQuery:"Chiklihole Reservoir Kodagu",
      overview:"A small reservoir surrounded by forest and grassland between the Madikeri and Kushalnagar side of Coorg. It is more of a quiet landscape stop than a fully serviced tourist attraction.",
      why:"Choose it for a slower stop, photography and a break from crowded viewpoints.",
      bestTime:"Clear daylight hours; avoid approaching the water in heavy rain.",
      notes:"Road surfaces and facilities may be limited. Verify the route locally, carry water and leave before dark.",
      wikiTitle:"Chiklihole Reservoir", nearby:["dubare-elephant-camp","kaveri-nisargadhama","harangi-reservoir"]
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
      id:"chelavara-falls", name:"Chelavara Falls", city:"Kakkabe / Virajpet", group:"Kakkabe & Virajpet",
      tag:"OFFBEAT · Waterfall", crowd:"Crowd varies", duration:"45–75 min plus drive", mapQuery:"Chelavara Falls Kodagu",
      overview:"A waterfall near Cheyyandane in Kodagu, surrounded by dense greenery. It is often included in countryside routes around the Kakkabe and Virajpet side.",
      why:"A worthwhile alternative if you prefer a less urbanised, forest-framed waterfall visit.",
      bestTime:"Only when access is open and weather is safe; avoid periods of heavy rain.",
      notes:"The rocks and water can be dangerous. Do not swim or bathe, and confirm access with a local source before travelling specifically for the falls.",
      wikiTitle:"Chelavara Falls", nearby:["nalknad-palace"]
    },
    {
      id:"nalknad-palace", name:"Nalknad Palace", city:"Kakkabe / Virajpet", group:"Kakkabe & Virajpet",
      tag:"OFFBEAT · Heritage", crowd:"Usually quieter", duration:"30–60 min if open", mapQuery:"Nalknad Palace Yevakapadi Kodagu",
      overview:"A small historic palace in the countryside near the Tadiandamol trekking area, associated with the Haleri rulers of Kodagu. It offers a quieter heritage experience than Madikeri's central attractions.",
      why:"A good addition for people interested in local history and rural architecture.",
      bestTime:"Daylight hours; confirm the site's opening and access locally before making the detour.",
      notes:"Access can be inconsistent. Combine with a Kakkabe-area outing rather than treating it as a quick Madikeri add-on.",
      wikiTitle:"Nalknad Palace", nearby:["chelavara-falls"]
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