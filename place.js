(()=>{"use strict";
const DB=window.ROAMPLANDATA,$=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const get=(id)=>DB&&DB.places.find(p=>p.id===id);
const params=new URLSearchParams(location.search),place=get(params.get("id"));
function emoji(p){const t=p.tag||"";if(t.includes("Waterfall"))return"💧";if(t.includes("Coffee"))return"☕";if(t.includes("Wildlife"))return"🐾";if(t.includes("Trekking"))return"🥾";if(t.includes("Heritage"))return"🏛";if(t.includes("Spiritual")||t.includes("Culture"))return"🛕";if(t.includes("Lake")||t.includes("Nature"))return"🌿";return"⛰";}
function card(p){
 const off=(p.tag||"").includes("OFFBEAT");
 return '<article class="place-card compact"><div class="place-card-top"><div class="place-glyph">'+emoji(p)+'</div><div class="place-badges">'+(off?'<span class="place-badge offbeat">OFFBEAT</span>':'')+'<span class="place-badge">'+esc(p.crowd)+'</span></div></div><p class="place-area">'+esc(p.group)+'</p><h3><a href="place.html?id='+encodeURIComponent(p.id)+'">'+esc(p.name)+'</a></h3><p class="place-summary">'+esc(p.overview)+'</p><div class="place-facts"><span>◷ '+esc(p.duration)+'</span></div><div class="place-card-actions"><a class="mini-link primary-link" href="place.html?id='+encodeURIComponent(p.id)+'">Read guide ↗</a><a class="mini-link" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.mapQuery||p.name)+'" target="_blank" rel="noopener">Maps ↗</a></div></article>';
}
function renderNotFound(){
 document.title="Place not found — RoamPlan";
 $("placeTitle").textContent="Place not found";
 $("placeDek").textContent="We couldn't find that place in the Coorg guide.";
 $("placeOverview").textContent="Return to the destination library and choose a place to explore.";
 $("wikiHeading").textContent="Explore the destination guide";
 $("wikiSummary").textContent="The page may have an outdated link.";
 $("detailNearby").innerHTML='<a class="btn" href="destinations.html">Browse Coorg places</a>';
}
async function loadWikipedia(p){
 const search="https://en.wikipedia.org/w/index.php?search="+encodeURIComponent(p.name);
 $("wikiSearch").href=search;
 $("wikiArticleLink").href=search;
 if(!p.wikiTitle){
  $("wikiHeading").textContent="No standalone article identified";
  $("wikiSummary").textContent="This smaller or locally listed attraction does not have a confirmed standalone Wikipedia article in this guide. The overview above is a locally written travel summary, and the practical notes are included to help you plan cautiously.";
  $("wikiStatus").textContent="Guide overview";
  $("wikiArticleLink").textContent="Search Wikipedia for this place ↗";
  return;
 }
 $("wikiHeading").textContent="Wikipedia overview";
 $("wikiStatus").textContent="Loading summary";
 try{
  const api="https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=1&explaintext=1&redirects=1&titles="+encodeURIComponent(p.wikiTitle);
  const res=await fetch(api,{headers:{Accept:"application/json"}});
  if(!res.ok)throw new Error("Wikipedia request failed");
  const json=await res.json();
  const page=Object.values(json?.query?.pages||{})[0];
  if(!page||page.missing!==undefined||!page.extract){
    $("wikiHeading").textContent="No matching article found";
    $("wikiSummary").textContent="No introductory Wikipedia extract was available for this title. Use the search link to check for an alternate spelling or a related regional article.";
    $("wikiStatus").textContent="No article match";
    $("wikiArticleLink").textContent="Search Wikipedia ↗";
    return;
  }
  $("wikiHeading").textContent=page.title+" on Wikipedia";
  $("wikiSummary").textContent=page.extract;
  const article="https://en.wikipedia.org/wiki/"+encodeURIComponent(page.title.replace(/ /g,"_"));
  $("wikiArticleLink").href=article;
  $("wikiSearch").href=article;
  $("wikiArticleLink").textContent="Read the full Wikipedia article ↗";
  $("wikiStatus").textContent="Article found";
 }catch(err){
  $("wikiHeading").textContent="Wikipedia summary unavailable";
  $("wikiSummary").textContent="A live Wikipedia introduction could not be loaded right now. The locally written overview remains available above; use the search link to open Wikipedia directly.";
  $("wikiStatus").textContent="Offline fallback";
 }
}
if(!place){renderNotFound();}
else{
 document.title=place.name+" — Coorg field guide | RoamPlan";
 $("crumbPlace").textContent=place.name;
 $("placeTitle").textContent=place.name;
 $("placeArea").textContent=place.group.toUpperCase()+" · KODAGU, KARNATAKA";
 $("placeDek").textContent=place.why;
 $("placeTags").innerHTML='<span>'+esc(place.tag)+'</span><span>'+esc(place.crowd)+' (estimate)</span><span>◷ '+esc(place.duration)+'</span>';
 $("placeOverview").textContent=place.overview;
 $("placeWhy").textContent=place.why;
 $("placeEmoji").textContent=emoji(place);
 $("mapLink").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(place.mapQuery||place.name);
 $("directionsLink").href="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(place.mapQuery||place.name)+"&travelmode=driving";
 $("durationFact").textContent=place.duration;
 $("bestTimeFact").textContent=place.bestTime;
 $("groupFact").textContent=place.group;
 $("crowdFact").textContent=place.crowd+" (planning estimate)";
 $("visitNotes").textContent=place.notes;
 $("quickTitle").textContent=place.name;
 $("quickLocation").textContent=place.city+", Kodagu, Karnataka";
 $("quickDuration").textContent=place.duration;
 $("quickType").textContent=place.tag;
 const near=(place.nearby||[]).map(get).filter(Boolean);
 $("detailNearby").innerHTML=near.length?near.map(card).join(""):'<div class="no-results"><p>No specific nearby match is curated yet. Return to the Coorg explorer to browse by area.</p><a class="text-link" href="destinations.html">Explore all Coorg areas →</a></div>';
 loadWikipedia(place);
}
})();