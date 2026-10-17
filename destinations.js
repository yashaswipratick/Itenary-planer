(()=>{"use strict";
const DB=window.ROAMPLANDATA;if(!DB)return;
const $=id=>document.getElementById(id);
const GROUP_ORDER=["Kushalnagar & Bylakuppe","Suntikoppa & Coffee Country","Madikeri & Central Coorg","Galibeedu & countryside","Bhagamandala & Brahmagiri","Somwarpet & Pushpagiri","Kakkabe & Virajpet","Kutta & Nagarahole","Kerala Border Hills & Viewpoints","Kerala Border Waterfalls"];
const GROUP_META={
 "Kushalnagar & Bylakuppe":{hint:"Tibetan culture, riverside forest and reservoirs",icon:"🌿"},
 "Suntikoppa & Coffee Country":{hint:"Coffee walks and plantation experiences near the Mysore–Madikeri road",icon:"☕"},
 "Madikeri & Central Coorg":{hint:"Classic viewpoints, waterfalls, heritage and coffee",icon:"⛰"},
 "Galibeedu & countryside":{hint:"Quiet lanes and small local landscape stops",icon:"🌱"},
 "Bhagamandala & Brahmagiri":{hint:"Sacred river sites and high Western Ghats",icon:"🛕"},
 "Somwarpet & Pushpagiri":{hint:"Lakes, countryside and a larger waterfall walk",icon:"💧"},
 "Kakkabe & Virajpet":{hint:"Offbeat ridges, a historic palace and a full-day mountain trek",icon:"🌳"},
 "Kutta & Nagarahole":{hint:"Southern Kodagu, forest walks and wildlife",icon:"🐾"},
 "Kerala Border Hills & Viewpoints":{hint:"North Kerala highlands and hill-view stops, separate from Coorg",icon:"🌄"},
 "Kerala Border Waterfalls":{hint:"Waterfalls in Kannur district, Kerala—not inside Kodagu",icon:"💧"}
};
const KERALA_CITIES=[
 {value:"Kerala Border",label:"All nearby Kerala border places"},
 {value:"Ullikkal",label:"Ullikkal — Kalanki"},
 {value:"Kanjirakolly",label:"Kanjirakolly — Alakapuri Falls"},
 {value:"Valiya Areekamala",label:"Valiya Areekamala — viewpoint"},
 {value:"Vellad / Kudianmala",label:"Vellad / Kudianmala — Ezharakund"}
];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const countryOf=p=>p.country||"India";
const stateOf=p=>p.state||"Karnataka";
const groupPlaces=items=>{const result={};items.forEach(p=>(result[p.group]??=[]).push(p));return result;};
function placeCard(p,compact=false){
 const tag=p.tag||"";
 const emoji=tag.includes("Waterfall")?"💧":tag.includes("Coffee")?"☕":tag.includes("Wildlife")?"🐾":tag.includes("Trekking")||tag.includes("Peak")?"🥾":tag.includes("Heritage")?"🏛":tag.includes("Spiritual")||tag.includes("Culture")?"🛕":tag.includes("Lake")||tag.includes("Nature")?"🌿":"⛰";
 const isOffbeat=tag.toUpperCase().includes("OFFBEAT");
 const regionBadge=p.region==="kerala-border"?'<span class="place-badge border-badge">KERALA · BORDER REGION</span>':"";
 return '<article class="place-card '+(compact?"compact":"")+'"><div class="place-card-top"><div class="place-glyph">'+emoji+'</div><div class="place-badges">'+(isOffbeat?'<span class="place-badge offbeat">OFFBEAT</span>':'')+regionBadge+'<span class="place-badge">'+esc(p.crowd||"Crowd varies")+'</span></div></div><p class="place-area">'+esc(p.group)+' · '+esc(p.city)+', '+esc(p.state||"Karnataka")+'</p><h3><a href="place.html?id='+encodeURIComponent(p.id)+'">'+esc(p.name)+'</a></h3><p class="place-summary">'+esc(p.overview)+'</p><div class="place-facts"><span>◷ '+esc(p.duration)+'</span><span>⌖ '+esc(tag.split("·")[0].trim())+'</span></div><div class="place-card-actions"><a class="mini-link primary-link" href="place.html?id='+encodeURIComponent(p.id)+'">Explore place ↗</a><a class="mini-link" href="'+esc(p.mapUrl||("https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.mapQuery||p.name)))+'" target="_blank" rel="noopener">Google Maps ↗</a></div></article>';
}
function optionsForState(state){
 if(state==="Kerala")return KERALA_CITIES;
 return DB.cities.filter(c=>!["Kerala Border","Ullikkal","Kanjirakolly","Valiya Areekamala","Vellad / Kudianmala"].includes(c.value));
}
function fillCities(state,preferred){
 const select=$("citySelect"),opts=optionsForState(state);
 select.innerHTML=opts.map(c=>'<option value="'+esc(c.value)+'">'+esc(c.label)+'</option>').join("");
 const wanted=preferred&&opts.some(o=>o.value===preferred)?preferred:(state==="Kerala"?"Kerala Border":"Coorg");
 select.value=wanted;
}
function fillSelect(){
 $("stateSelect").innerHTML=DB.states.map(s=>'<option value="'+esc(s.value)+'">'+esc(s.label)+'</option>').join("");
 $("countrySelect").value="India";
 $("stateSelect").value="Karnataka";
 fillCities("Karnataka","Coorg");
 $("countrySelect").onchange=()=>{if($("countrySelect").value!=="India")$("countrySelect").value="India";render();};
 $("stateSelect").onchange=()=>{fillCities($("stateSelect").value);render();};
 $("citySelect").onchange=render;
 $("placeSearch").addEventListener("input",render);
 $("clearFilters").onclick=()=>{$("countrySelect").value="India";$("stateSelect").value="Karnataka";fillCities("Karnataka","Coorg");$("placeSearch").value="";render();};
}
function matchesQuery(p,query){return !query||[p.name,...(p.aliases||[]),p.city,p.group,p.tag,p.overview,p.why,p.state,p.district].join(" ").toLowerCase().includes(query);}
function render(){
 const state=$("stateSelect").value||"Karnataka";
 const city=$("citySelect").value||(state==="Kerala"?"Kerala Border":"Coorg");
 const query=$("placeSearch").value.trim().toLowerCase();
 const all=DB.places.filter(p=>countryOf(p)==="India");
 const inState=all.filter(p=>stateOf(p)===state);
 const cityPlaces=city==="Coorg"||city==="Kerala Border"?inState:inState.filter(p=>p.city===city);
 const matches=cityPlaces.filter(p=>matchesQuery(p,query));
 const isCoorg=state==="Karnataka";
 const allCoorg=city==="Coorg";
 const allKerala=state==="Kerala"&&city==="Kerala Border";
 if(isCoorg){
  $("destinationTitle").innerHTML=city==="Coorg"?'Coorg <span>(Kodagu)</span>':esc(city);
  const kicker=document.querySelector(".destination-hero .hero-kicker");if(kicker)kicker.textContent="WESTERN GHATS · KARNATAKA";
  const stamp=document.querySelector(".hero-stamp");if(stamp)stamp.innerHTML="<span>ROAM</span><b>COORG</b><span>KARNATAKA · INDIA</span>";
  $("regionHeading").textContent="Coorg, in brief";
  $("regionDescription").textContent="Kodagu (also called Coorg) is a hilly district in southwestern Karnataka on the eastern slopes of the Western Ghats. It is known for coffee and pepper plantations, forested hills and the Kaveri River's source at Talakaveri. Madikeri is the district headquarters.";
  $("regionWikiLink").href="https://en.wikipedia.org/wiki/Kodagu_district";
  $("regionWikiLink").textContent="Read Kodagu on Wikipedia ↗";
  $("resultsTitle").textContent=city==="Coorg"?"Explore Coorg by area":"Places in "+city;
  $("resultsSubtitle").textContent=city==="Coorg"?"Explore Kodagu's places, grouped into practical regional sightseeing circuits. Kerala's nearby border escapes are shown separately below.":"Places in the selected Coorg area, grouped locally. Nearby Kerala border escapes remain separate from Coorg.";
 }else{
  $("destinationTitle").innerHTML=allKerala?'Kerala <span>border escapes</span>':esc(city);
  const kicker=document.querySelector(".destination-hero .hero-kicker");if(kicker)kicker.textContent="NORTH KERALA · KANNUR DISTRICT";
  const stamp=document.querySelector(".hero-stamp");if(stamp)stamp.innerHTML="<span>BEYOND</span><b>COORG</b><span>KERALA · INDIA</span>";
  $("regionHeading").textContent="Across the Kerala–Karnataka border";
  $("regionDescription").textContent="These hill viewpoints and waterfalls are in Kannur district, Kerala—not within Coorg/Kodagu. They can be considered as separate border-region extensions from a Coorg road trip, but drive time depends on where you stay and the chosen route; some can require a substantial detour. Verify road access and local conditions before setting out.";
  $("regionWikiLink").href="https://en.wikipedia.org/wiki/Kannur_district";
  $("regionWikiLink").textContent="Read Kannur district on Wikipedia ↗";
  $("resultsTitle").textContent=allKerala?"Nearby Kerala border escapes":"Places around "+city;
  $("resultsSubtitle").textContent=allKerala?"A separate collection of border-region hills and waterfalls in Kerala. These places are not part of Coorg.":"Places mapped to the selected Kerala border area, with related places shown separately when available.";
 }
 $("resultCount").textContent=matches.length+" "+(matches.length===1?"place":"places");
 const groups=groupPlaces(matches);
 const groupHtml=Object.keys(groups).sort((a,b)=>GROUP_ORDER.indexOf(a)-GROUP_ORDER.indexOf(b)).map(group=>{
   const meta=GROUP_META[group]||{hint:"Explore this area",icon:"⌖"};
   return '<section class="place-group"><div class="group-heading"><div class="group-icon">'+meta.icon+'</div><div><p class="eyebrow green">AREA GUIDE</p><h2>'+esc(group)+'</h2><p>'+esc(meta.hint)+'</p></div><span class="group-count">'+groups[group].length+' places</span></div><div class="place-grid">'+groups[group].map(p=>placeCard(p)).join("")+'</div></section>';
 }).join("");
 $("placeGroups").innerHTML=groupHtml||'<div class="no-results"><h3>No matching places found</h3><p>Try another search or select the all-areas option.</p></div>';
 // Keep the Kerala places in a separate card collection, not mixed into Coorg's area groups.
 const borderPlaces=all.filter(p=>p.region==="kerala-border").filter(p=>matchesQuery(p,query));
 const borderSection=$("borderEscapesSection");
 const showBorder=isCoorg&&borderPlaces.length>0;
 borderSection.classList.toggle("hidden",!showBorder);
 if(showBorder){
   $("borderEscapesTitle").textContent="Beyond Coorg: Kerala border escapes";
   $("borderEscapesCopy").textContent="A separate mini-guide to hill viewpoints and waterfalls across the state line in Kannur, Kerala. Browse these as optional road-trip extensions; check your route from the exact stay before adding them.";
   $("borderEscapeCards").innerHTML=borderPlaces.map(p=>placeCard(p,true)).join("");
 }
 const nearbyIds=new Set();
 matches.forEach(p=>(p.nearby||[]).forEach(id=>nearbyIds.add(id)));
 const nearby=Array.from(nearbyIds).map(id=>all.find(p=>p.id===id)).filter(Boolean).filter(p=>stateOf(p)===state).filter(p=>!matches.some(m=>m.id===p.id)).filter(p=>matchesQuery(p,query));
 const showNearby=city!=="Coorg"&&city!=="Kerala Border"&&nearby.length>0;
 $("nearbySection").classList.toggle("hidden",!showNearby);
 if(showNearby){
  $("nearbyTitle").textContent="Nearby places to combine with "+city;
  $("nearbyCopy").textContent="Curated pairing ideas from the same state and regional circuit, not live distance or traffic estimates.";
  $("nearbyGroups").innerHTML=nearby.map(p=>placeCard(p,true)).join("");
 }
}
fillSelect();render();
})();