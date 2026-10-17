(()=>{"use strict";
const DB=window.ROAMPLANDATA;if(!DB)return;
const $=id=>document.getElementById(id);
const GROUP_ORDER=["Kushalnagar & Bylakuppe","Madikeri & Central Coorg","Galibeedu & countryside","Bhagamandala & Brahmagiri","Somwarpet & Pushpagiri","Kakkabe & Virajpet","Kutta & Nagarahole"];
const GROUP_META={
 "Kushalnagar & Bylakuppe":{hint:"Tibetan culture, riverside forest and reservoirs",icon:"🌿"},
 "Madikeri & Central Coorg":{hint:"Classic viewpoints, waterfalls, heritage and coffee",icon:"⛰"},
 "Galibeedu & countryside":{hint:"Quiet lanes and small local landscape stops",icon:"🌱"},
 "Bhagamandala & Brahmagiri":{hint:"Sacred river sites and high Western Ghats",icon:"🛕"},
 "Somwarpet & Pushpagiri":{hint:"Lakes, countryside and a larger waterfall walk",icon:"💧"},
 "Kakkabe & Virajpet":{hint:"Forest waterfalls and rural heritage",icon:"🌳"},
 "Kutta & Nagarahole":{hint:"Southern Kodagu, forest walks and wildlife",icon:"🐾"}
};
const CITY_TO_GROUP={
 "Madikeri":["Madikeri & Central Coorg"],
 "Kushalnagar":["Kushalnagar & Bylakuppe"],
 "Bylakuppe":["Kushalnagar & Bylakuppe"],
 "Somwarpet":["Somwarpet & Pushpagiri"],
 "Bhagamandala":["Bhagamandala & Brahmagiri"],
 "Kakkabe / Virajpet":["Kakkabe & Virajpet"],
 "Kutta":["Kutta & Nagarahole"],
 "Galibeedu":["Galibeedu & countryside"]
};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const groupPlaces=(items)=>{const result={};items.forEach(p=>(result[p.group]??=[]).push(p));return result;};
function placeCard(p,compact=false){
 const emoji=(p.tag||"").includes("Waterfall")?"💧":(p.tag||"").includes("Coffee")?"☕":(p.tag||"").includes("Wildlife")?"🐾":(p.tag||"").includes("Trekking")?"🥾":(p.tag||"").includes("Heritage")?"🏛":(p.tag||"").includes("Spiritual")|| (p.tag||"").includes("Culture")?"🛕":(p.tag||"").includes("Lake")||(p.tag||"").includes("Nature")?"🌿":"⛰";
 const isOffbeat=(p.tag||"").includes("OFFBEAT");
 return '<article class="place-card '+(compact?"compact":"")+'"><div class="place-card-top"><div class="place-glyph">'+emoji+'</div><div class="place-badges">'+(isOffbeat?'<span class="place-badge offbeat">OFFBEAT</span>':'')+'<span class="place-badge">'+esc(p.crowd||"Crowd varies")+'</span></div></div><p class="place-area">'+esc(p.group)+' · '+esc(p.city)+'</p><h3><a href="place.html?id='+encodeURIComponent(p.id)+'">'+esc(p.name)+'</a></h3><p class="place-summary">'+esc(p.overview)+'</p><div class="place-facts"><span>◷ '+esc(p.duration)+'</span><span>⌖ '+esc(p.tag.split("·")[0].trim())+'</span></div><div class="place-card-actions"><a class="mini-link primary-link" href="place.html?id='+encodeURIComponent(p.id)+'">Explore place ↗</a><a class="mini-link" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.mapQuery||p.name)+'" target="_blank" rel="noopener">Google Maps ↗</a></div></article>';
}
function fillSelect(){
 $("citySelect").innerHTML=DB.cities.map(c=>'<option value="'+esc(c.value)+'">'+esc(c.label)+'</option>').join("");
 $("citySelect").value="Coorg";
 $("countrySelect").onchange=()=>{if($("countrySelect").value!=="India"){ $("countrySelect").value="India"; } render();};
 $("stateSelect").onchange=render;
 $("citySelect").onchange=render;
 $("placeSearch").addEventListener("input",render);
 $("clearFilters").onclick=()=>{$("countrySelect").value="India";$("stateSelect").value="Karnataka";$("citySelect").value="Coorg";$("placeSearch").value="";render();};
}
function render(){
 const city=$("citySelect").value||"Coorg";
 const query=$("placeSearch").value.trim().toLowerCase();
 const all=DB.places;
 const cityPlaces=city==="Coorg"?all:all.filter(p=>p.city===city || (CITY_TO_GROUP[city]||[]).includes(p.group));
 const matches=cityPlaces.filter(p=>!query||[p.name,p.city,p.group,p.tag,p.overview,p.why].join(" ").toLowerCase().includes(query));
 $("destinationTitle").innerHTML=city==="Coorg"?'Coorg <span>(Kodagu)</span>':esc(city);
 $("resultsTitle").textContent=city==="Coorg"?"Explore Coorg by area":"Places in "+city;
 $("resultsSubtitle").textContent=city==="Coorg"?"Browse every place in the guide, grouped into practical sightseeing circuits.":"Places in the selected area, followed by nearby or easy-to-pair stops from the wider Coorg guide.";
 $("resultCount").textContent=matches.length+" "+(matches.length===1?"place":"places");
 const groups=groupPlaces(matches);
 const groupHtml=Object.keys(groups).sort((a,b)=>GROUP_ORDER.indexOf(a)-GROUP_ORDER.indexOf(b)).map(group=>{
   const meta=GROUP_META[group]||{hint:"Explore this area",icon:"⌖"};
   return '<section class="place-group"><div class="group-heading"><div class="group-icon">'+meta.icon+'</div><div><p class="eyebrow green">AREA GUIDE</p><h2>'+esc(group)+'</h2><p>'+esc(meta.hint)+'</p></div><span class="group-count">'+groups[group].length+' places</span></div><div class="place-grid">'+groups[group].map(p=>placeCard(p)).join("")+'</div></section>';
 }).join("");
 $("placeGroups").innerHTML=groupHtml||'<div class="no-results"><h3>No matching places found</h3><p>Try a shorter search or choose “Coorg — all areas”.</p></div>';
 const nearbyIds=new Set();
 matches.forEach(p=>(p.nearby||[]).forEach(id=>nearbyIds.add(id)));
 const nearby=Array.from(nearbyIds).map(id=>all.find(p=>p.id===id)).filter(Boolean).filter(p=>!matches.some(m=>m.id===p.id)).filter(p=>!query||[p.name,p.city,p.group,p.tag,p.overview,p.why].join(" ").toLowerCase().includes(query));
 const showNearby=city!=="Coorg" && nearby.length>0;
 $("nearbySection").classList.toggle("hidden",!showNearby);
 if(showNearby){
  $("nearbyTitle").textContent="Nearby places to combine with "+city;
  $("nearbyCopy").textContent="These are practical pairing ideas from the Coorg guide, based on the attraction's regional circuit—not live distance or traffic calculations.";
  $("nearbyGroups").innerHTML='<div class="place-grid nearby-grid">'+nearby.map(p=>placeCard(p,true)).join("")+'</div>';
 }
}
fillSelect();render();
})();