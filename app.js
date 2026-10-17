(()=>{"use strict";
const $=id=>document.getElementById(id),KEY="roamplan.itineraries.v1",catalog=window.ROAMPLANDATA||{places:[]};let trips=[],activeId=null,activeDay=0,toastTimer;const pickedPlaceIds=new Set();let pickedPlaceOrder=[];
const types={famous:"Famous place","hidden-gem":"Hidden gem",offbeat:"Offbeat",local:"Local favourite",food:"Food / meal",break:"Rest / buffer"};
const crowdLabels={low:"Less crowded",medium:"Moderate crowd",high:"Crowded",unknown:"Crowd unknown"};
const uid=()=>Math.random().toString(36).slice(2,10)+Date.now().toString(36);
function starter(){return[
["07:30","Breakfast / coffee","food",45,"medium","Ease into the day before driving."],
["08:30","Travel to first stop","break",30,"low","Add a realistic travel buffer."],
["09:00","Main attraction","famous",90,"high","Confirm opening hours and tickets."],
["10:45","Hidden gem nearby","hidden-gem",45,"low","Leave space for a spontaneous discovery."],
["12:00","Lunch break","food",60,"medium","Try a local speciality."],
["13:15","Explore at an easy pace","local",75,"medium","Keep this slot flexible."],
["14:45","Rest / travel buffer","break",30,"low","Hydrate and allow time for traffic."],
["15:30","Offbeat stop","offbeat",60,"low","Choose a quieter alternative if the area is busy."],
["17:00","Sunset / scenic stop","famous",45,"medium","Check sunset time for your travel date."],
["19:00","Dinner","food",60,"medium","Pick somewhere convenient for the return."]
].map((x,i)=>({id:uid(),time:x[0],name:x[1],location:"",duration:x[3],type:x[2],crowd:x[4],notes:x[5],done:false,order:i}));}
function makeTrip(data={}){let days=Number(data.days)||1;return{id:uid(),name:data.name||"My new adventure",destination:data.destination||"",origin:data.origin||"",startDate:data.startDate||"",days:Array.from({length:days},(_,i)=>({stops:data.template===false?[]:starter().map(s=>({...s,id:uid()}))})),created:Date.now()};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(trips));$("saveStatus").textContent="● All changes saved";}catch(e){$("saveStatus").textContent="Could not save locally";}render();}
function catalogPlaceForStop(stop){
 if(stop.placeId)return placeById(stop.placeId);
 const clean=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
 const name=clean(stop.name);
 const aliases={"harangi dam":"harangi-dam","harangi reservoir":"harangi-dam","harangi reservoir kodagu":"harangi-dam","harangi backwaters":"harangi-dam","harangi backwater road herur":"harangi-dam","chelavara falls":"chelavara-falls","chelavara waterfall":"chelavara-falls","chelavara waterfalls":"chelavara-falls"};
 if(aliases[name])return placeById(aliases[name]);
 return (catalog.places||[]).find(p=>clean(p.name)===name)||null;
}
function normalizeSavedPlaceStops(){
 let changed=false;
 for(const trip of trips){
  const seen=new Map();
  for(const day of (trip.days||[])){
   const kept=[];
   for(const stop of (day.stops||[])){
    const place=catalogPlaceForStop(stop);
    if(!place){kept.push(stop);continue;}
    if(stop.placeId!==place.id){stop.placeId=place.id;changed=true;}
    if(stop.name!==place.name){stop.name=place.name;changed=true;}
    if(!stop.location||stop.location==="Harangi Dam Hudgur Kodagu"||place.id==="harangi-dam"){
     const location=place.mapQuery||place.name;
     if(stop.location!==location){stop.location=location;changed=true;}
    }
    if(place.mapUrl&&(stop.mapUrl!==place.mapUrl)){stop.mapUrl=place.mapUrl;changed=true;}
    if(!seen.has(place.id)){
     seen.set(place.id,stop);
     kept.push(stop);
    }else{
     const first=seen.get(place.id);
     if(stop.done&&!first.done){first.done=true;changed=true;}
     if(!first.notes&&stop.notes){first.notes=stop.notes;changed=true;}
     if(!first.location&&stop.location){first.location=stop.location;changed=true;}
     // A repeated curated place is shown only once per trip.
     changed=true;
    }
   }
   day.stops=kept;
  }
 }
 if(changed){try{localStorage.setItem(KEY,JSON.stringify(trips));}catch(e){}}
}
function load(){try{trips=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(trips))trips=[];}catch{trips=[];}if(!trips.length){const t=makeTrip({name:"A slow weekend in Coorg",destination:"Coorg, Karnataka",origin:"Bengaluru",days:1});trips.push(t);activeId=t.id;}else activeId=trips[0].id;
const hash=location.hash.slice(1);if(hash.startsWith("trip=")){try{const shared=JSON.parse(decodeURIComponent(escape(atob(hash.slice(5)))));if(shared&&shared.name&&Array.isArray(shared.days)){shared.id=uid();trips.unshift(shared);activeId=shared.id;history.replaceState(null,"",location.pathname+location.search);save();toast("Shared itinerary imported as a new copy");}}catch{toast("This share link could not be imported");}}normalizeSavedPlaceStops();render();}
function active(){return trips.find(t=>t.id===activeId)||trips[0];}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function formatDate(date,offset){if(!date)return"";const d=new Date(date+"T12:00:00");d.setDate(d.getDate()+offset);return d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});}
function setVal(id,v){$(id).value=v??""}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2400);}
function progress(t){const all=t.days.flatMap(d=>d.stops);return{done:all.filter(s=>s.done).length,total:all.length,pct:all.length?Math.round(100*all.filter(s=>s.done).length/all.length):0};}
function render(){const t=active();$("tripCount").textContent=trips.length;$("tripList").innerHTML=trips.map(x=>'<button class="trip-link '+(x.id===activeId?'active':'')+'" data-trip="'+x.id+'">⌁ &nbsp;'+escapeHtml(x.name||x.destination||"Untitled trip")+'</button>').join("");$("workspace").classList.toggle("hidden",!t);$("emptyState").classList.toggle("hidden",!!t);if(!t){$("pageTitle").textContent="Plan a trip worth remembering.";return;}
const p=progress(t);$("crumb").textContent=t.name||"My itinerary";$("pageTitle").textContent=t.name||"Plan a trip worth remembering.";$("statDestination").textContent=t.destination||"Add destination";$("statDays").textContent=t.days.length+" "+(t.days.length===1?"day":"days");$("statVisited").textContent=p.done+" / "+p.total;$("statProgress").textContent=p.pct+"%";$("progressBar").style.width=p.pct+"%";setVal("tripName",t.name);setVal("destination",t.destination);setVal("origin",t.origin);setVal("startDate",t.startDate);setVal("dayCount",t.days.length);activeDay=Math.min(activeDay,t.days.length-1);$("dayTabs").innerHTML=t.days.map((d,i)=>'<button class="day-tab '+(i===activeDay?'active':'')+'" data-day="'+i+'">Day '+(i+1)+'</button>').join("");const day=t.days[activeDay];$("dayTitle").textContent="Day "+(activeDay+1);$("dayDate").textContent=formatDate(t.startDate,activeDay);const done=day.stops.filter(s=>s.done).length;$("dayProgress").textContent=done+" / "+day.stops.length+" done";const currentRoute=routeForDay(day);const routeLabel=$("dayRouteLabel");if(currentRoute){routeLabel.textContent="Route · "+currentRoute.title;routeLabel.classList.remove("hidden","route-warning");}else if(day.stops.some(s=>s.placeId)){routeLabel.textContent="Multiple groups · check route in Maps";routeLabel.classList.remove("hidden");routeLabel.classList.add("route-warning");}else{routeLabel.textContent="";routeLabel.classList.add("hidden");routeLabel.classList.remove("route-warning");}$("stopList").innerHTML=day.stops.length?day.stops.map((s,i)=>renderStop(s,i)).join(""):'<div class="empty"><h2>A day with possibilities.</h2><p>Add the first place, meal or activity to start planning.</p><button class="primary" data-add="destination">＋ Add a stop</button></div>'; }
function renderStop(s,i){
 const loc=s.location||s.name;
 const map=s.mapUrl||"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(loc);
 const crowd=s.crowd||"unknown";
 const stateTag=s.done?'<span class="visit-state">✓ Already visited</span>':'<span class="planned-state">Planned</span>';
 const detailLink=s.placeId?'<a class="mini" href="place.html?id='+encodeURIComponent(s.placeId)+'" target="_blank" rel="noopener">↗ Place guide</a>':"";
 const region=s.placeGroup?'<span>⌖ '+escapeHtml(s.placeGroup)+(s.placeState?', '+escapeHtml(s.placeState):"")+'</span>':"";
 return '<article class="stop-card '+(s.done?'done':'')+'" data-stop="'+s.id+'"><button class="stop-check" data-action="toggle" data-id="'+s.id+'" aria-label="'+(s.done?"Mark not visited":"Mark visited")+'" aria-pressed="'+(s.done?'true':'false')+'">'+(s.done?"✓":"")+'</button><div class="time-rail">'+escapeHtml(s.time||"Anytime")+'<br><span style="font-weight:500;color:#92988f">'+(Number(s.duration)||0)+' min</span></div><div class="stop-main"><div class="stop-title-row"><h4 class="stop-title">'+escapeHtml(s.name)+'</h4><span class="tag '+escapeHtml(s.type)+'">'+escapeHtml(types[s.type]||"Activity")+'</span>'+stateTag+'</div><div class="stop-meta"><span class="crowd '+escapeHtml(crowd)+'">● '+escapeHtml(crowdLabels[crowd]||crowdLabels.unknown)+'</span>'+(s.location?'<span>⌖ '+escapeHtml(s.location)+'</span>':"")+region+'</div>'+(s.notes?'<p class="stop-notes">'+escapeHtml(s.notes)+'</p>':"")+'</div><div class="stop-actions"><a class="mini" href="'+map+'" target="_blank" rel="noopener">↗ Maps</a>'+detailLink+'<button class="mini" data-action="edit" data-id="'+s.id+'">Edit</button><button class="mini" data-action="move" data-id="'+s.id+'" title="Move stop later in the day">↓</button></div></article>';
}
function syncFields(){const t=active();if(!t)return;t.name=$("tripName").value;t.destination=$("destination").value;t.origin=$("origin").value;t.startDate=$("startDate").value;const n=Number($("dayCount").value);while(t.days.length<n)t.days.push({stops:[]});if(t.days.length>n)t.days=t.days.slice(0,n);activeDay=Math.min(activeDay,t.days.length-1);save();}
function openCreate(){ $("tripForm").reset();$("newDate").value="";$("tripDialog").showModal();}
function createTrip(){const t=makeTrip({name:$("newName").value.trim(),destination:$("newDestination").value.trim(),origin:$("newOrigin").value.trim(),startDate:$("newDate").value,days:$("newDays").value,template:$("starterTemplate").checked});trips.unshift(t);activeId=t.id;activeDay=0;$("tripDialog").close();save();toast("Your itinerary is ready");}
function editStop(id){const t=active(),s=id?t.days[activeDay].stops.find(x=>x.id===id):null;$("stopForm").reset();setVal("stopId",s?s.id:"");setVal("stopName",s?s.name:"");setVal("stopLocation",s?s.location:"");setVal("stopTime",s?s.time:"09:00");setVal("stopDuration",s?s.duration:60);setVal("stopType",s?s.type:"famous");setVal("stopCrowd",s?s.crowd:"medium");setVal("stopNotes",s?s.notes:"");$("stopModalTitle").textContent=s?"Edit stop":"Add a stop";$("deleteStop").classList.toggle("hidden",!s);$("stopDialog").showModal();}
function saveStop(){const t=active(),list=t.days[activeDay].stops,id=$("stopId").value;let s=list.find(x=>x.id===id);if(!s){s={id:uid(),done:false};list.push(s);}Object.assign(s,{name:$("stopName").value.trim(),location:$("stopLocation").value.trim(),time:$("stopTime").value,duration:Number($("stopDuration").value)||60,type:$("stopType").value,crowd:$("stopCrowd").value,notes:$("stopNotes").value.trim()});list.sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99"));$("stopDialog").close();save();toast("Stop saved");}
function removeStop(){const t=active(),id=$("stopId").value;t.days[activeDay].stops=t.days[activeDay].stops.filter(s=>s.id!==id);$("stopDialog").close();save();toast("Stop deleted");}
function mapDay(){
 const t=active(),stops=t.days[activeDay].stops.filter(s=>s.location||s.name);
 if(!stops.length){toast("Add a destination first");return;}
 const places=stops.map(s=>s.location||s.name),origin=places.shift(),destination=places.pop()||origin;
 let url="https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&travelmode=driving";
 if(places.length)url+="&waypoints="+encodeURIComponent(places.join("|"));
 window.open(url,"_blank","noopener");
}
function share(){const t=active();if(!t)return;try{const payload=btoa(unescape(encodeURIComponent(JSON.stringify(t))));const url=location.origin+location.pathname+"#trip="+payload;navigator.clipboard.writeText(url).then(()=>toast("Share link copied")).catch(()=>prompt("Copy this itinerary link",url));}catch{toast("Could not create share link");}}
function exportTrip(){const t=active();const blob=new Blob([JSON.stringify(t,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(t.name||"itinerary").toLowerCase().replace(/[^a-z0-9]+/g,"-")+".json";a.click();URL.revokeObjectURL(a.href);toast("Itinerary exported");}
function addSimple(type){editStop();setVal("stopType",type);if(type==="food")setVal("stopName","Meal / break");else setVal("stopName","New destination");}
const starterSlotNames=new Set(["Breakfast / coffee","Travel to first stop","Main attraction","Hidden gem nearby","Lunch break","Explore at an easy pace","Rest / travel buffer","Offbeat stop","Sunset / scenic stop","Dinner"]);
const replaceableSightseeingSlots=new Set(["Main attraction","Hidden gem nearby","Explore at an easy pace","Offbeat stop","Sunset / scenic stop"]);
const ROUTE_CIRCUITS=[
 {id:"virajpet-east-corridor",category:"East · Dubare & Harangi",title:"Dubare & Harangi Reservoir circuit",direction:"Dubare → Harangi Reservoir",defaultDuration:90,description:"A curated grouping of Dubare Elephant Camp, Harangi Elephant Camp & Tree Park and Harangi Reservoir. Choose these places only if they fit your plans; RoamPlan does not calculate the best road route or travel time.",placeIds:["dubare-elephant-camp","harangi-elephant-camp-tree-park","harangi-dam"]},
 {id:"kushalnagar-river-adventure",category:"East · Kushalnagar activities",title:"Kushalnagar River & Adventure Stops",direction:"Greenway / 7th Hosakote → Nisargadhama → Basavanahalli / Baichanahalli",defaultDuration:75,description:"A regional coffee, river and family-activity circuit around the Kushalnagar side. This is a curated grouping, not live road-time optimization; verify order and current attraction access in Maps.",placeIds:["greenway-coffee-island","kaveri-nisargadhama","coorg-hanging-bridge","coorg-adventure-park"]},
 {id:"kaapi-nele-experience",category:"South-west · Ammathi / Bilugunda",title:"Kaapi Nele Plantation & Adventure Walk",direction:"Ammathi / Bilugunda",defaultDuration:120,description:"A booking-led guided plantation walk and nature-adventure experience. Confirm which activity/package you are booking and its meeting point before travelling.",placeIds:["kaapi-nele-adventure-trek"]},
 {id:"bylakuppe-nisargadhama",category:"East · Bylakuppe / Kushalnagar",title:"Golden Temple & Nisargadhama",direction:"Bylakuppe → Nisargadhama",defaultDuration:60,description:"A compact culture-and-river stop on the eastern approach. Harangi and Dubare are separate circuits to avoid adding opposite-side detours.",placeIds:["golden-temple","kaveri-nisargadhama"]},
 {id:"harangi-backwaters",category:"East · Harangi",title:"Harangi Reservoir & Elephant Camp",direction:"Harangi reservoir / backwaters",defaultDuration:60,description:"A small regional grouping of the reservoir and adjacent tree park / elephant camp. Choose either or both, and confirm the actual road route in Maps.",placeIds:["harangi-dam","harangi-elephant-camp-tree-park"]},
 {id:"dubare-camp",category:"East · Dubare",title:"Dubare Elephant Camp",direction:"Dubare / Kaveri river",defaultDuration:150,description:"Treat Dubare as its own scheduled visit because the camp activity and river access can take several hours.",placeIds:["dubare-elephant-camp"]},
 {id:"chiklihole-reservoir",category:"East · Reservoirs",title:"Chiklihole Reservoir",direction:"Chiklihole countryside",defaultDuration:60,description:"A standalone offbeat reservoir stop. Keep it separate unless you have checked the exact road route from your stay.",placeIds:["chiklihole-reservoir"]},
 {id:"madikeri-town",category:"Central · Madikeri",title:"Madikeri town heritage loop",direction:"Madikeri town centre",defaultDuration:45,description:"Town-side heritage sights grouped together so you can park once and minimise driving between stops.",placeIds:["madikeri-fort","omkareshwara-temple","rajas-tomb","rajas-seat"]},
 {id:"abbey-falls",category:"Central · Waterfalls",title:"Abbey Falls",direction:"Abbey Falls plantation road",defaultDuration:75,description:"Keep this as a separate short outing from town sights; access includes a walk and can be weather-dependent.",placeIds:["abbey-falls"]},
 {id:"mandalpatti",category:"North-west · Mountain viewpoint",title:"Mandalpatti viewpoint",direction:"Mandalpatti jeep / hill road",defaultDuration:180,description:"Make this the main activity for the day. The final stretch usually needs a local 4×4 jeep; avoid squeezing several far-apart sights around it.",placeIds:["mandalpatti-viewpoint"]},
 {id:"coffee-estate",category:"Central · Coffee country",title:"Coffee estate experience",direction:"Mercara Gold Estate",defaultDuration:90,description:"A pre-booked coffee and spice estate experience. Keep the tour as the focus and verify the time slot before building the rest of the day.",placeIds:["mercara-gold-estate"]},
 {id:"kote-abbe",category:"Central · Remote waterfall",title:"Kote Abbe Falls (verify access)",direction:"Local waterfall approach",defaultDuration:60,description:"A less-documented local pin. Confirm the exact approach and legal access locally before travelling; skip if the route is unclear.",placeIds:["kote-abbe-falls"]},
 {id:"galibeedu-lake",category:"Central · Countryside",title:"Galibeedu Chapandi Kere",direction:"Galibeedu countryside",defaultDuration:45,description:"A small rural landscape stop with limited facilities. Confirm the exact pin and road locally; visit in daylight.",placeIds:["galibeedu-chapandi-kere"]},
 {id:"bhagamandala-talakaveri",category:"West · River source & temples",title:"Bhagamandala & Talakaveri circuit",direction:"Madikeri → Bhagamandala → Talakaveri",defaultDuration:75,description:"These pilgrimage sites are on the same western Coorg outing. Start early for the winding hill road and mountain weather.",placeIds:["bhagamandala","talakaveri"]},
 {id:"nishani-motte-trek",category:"West · Full-day trek",title:"Nishani Motte trek",direction:"Trek trailhead / forest route",defaultDuration:360,description:"A dedicated trekking day requiring current forest permission and a designated guide. Do not combine with town sightseeing.",placeIds:["nishani-motte"]},
 {id:"somwarpet-pushpagiri",category:"North · Somwarpet",title:"Somwarpet & Pushpagiri nature route",direction:"Somwarpet → Pushpagiri foothills",defaultDuration:75,description:"A northern countryside route for the lake and waterfall side of Coorg. It needs a substantial half-day window from Madikeri.",placeIds:["honnamana-kere","mallalli-falls"]},
 {id:"kakkabe-countryside",category:"West / south-west · Kakkabe",title:"Kakkabe, Kabbe & Chelavara loop",direction:"Kakkabe → Kabbe Betta → Chelavara",defaultDuration:60,description:"Keeps the palace, hill viewpoint and forest waterfall in the same rural Kakkabe/Chelavara zone. Verify waterfall and estate-road access locally.",placeIds:["nalknad-palace","kabbe-betta-view","chelavara-falls"]},
 {id:"thadiyandamol-trek",category:"West / south-west · Full-day trek",title:"Thadiyandamol trek",direction:"Yevakapadi / Nalknad trailhead",defaultDuration:360,description:"A full-day mountain trek, not a quick sightseeing stop. Confirm booking, guide, check-post time and weather; keep the rest of the day free.",placeIds:["thadiyandamol-peak"]},
 {id:"brahmagiri-sanctuary",category:"South · Kutta / Brahmagiri",title:"Brahmagiri Wildlife Sanctuary (verify entry)",direction:"Brahmagiri range / entry gate to be verified",defaultDuration:360,description:"A forest and wildlife outing that requires confirmation of the correct sanctuary entry point, current access permissions and any guide/permit requirements. The supplied Vellad / PIN 670571 details may not be the usual Kodagu-side entrance.",placeIds:["brahmagiri-wildlife-sanctuary"]},
 {id:"iruppu-falls",category:"South · Kutta",title:"Iruppu Falls",direction:"Kutta / Brahmagiri foothills",defaultDuration:120,description:"A forest waterfall outing far from central Madikeri. Plan this when staying on the southern Coorg side, rather than returning across the district.",placeIds:["iruppu-falls"]},
 {id:"nagarahole-safari",category:"South · Wildlife",title:"Nagarahole safari",direction:"Booked park gate / safari route",defaultDuration:180,description:"Build the day around a confirmed safari gate and time slot. It is a southern extension; don't combine it casually with central Coorg stops.",placeIds:["nagarahole-national-park"]},
 {id:"kerala-kalanki",category:"Kerala border · Kannur hills",title:"Kalanki — Queen of Hills",direction:"Ullikkal / Kalanki hill road",defaultDuration:60,description:"A separate Kannur-district, Kerala viewpoint. It is not inside Coorg and may require a long cross-border drive, depending on your stay.",placeIds:["kalanki-queen-of-hills"]},
 {id:"kerala-areekamala",category:"Kerala border · Kannur hills",title:"Areekamala viewpoint",direction:"Valiya Areekamala highlands",defaultDuration:60,description:"A Kerala-side viewpoint with limited verified public access information. Keep it as a separate outing until the local route is confirmed.",placeIds:["areekamala-viewpoint"]},
 {id:"kerala-alakapuri",category:"Kerala border · Waterfalls",title:"Alakapuri Waterfalls",direction:"Kanjirakolly / Alakapuri",defaultDuration:90,description:"A waterfall in Kannur district, Kerala, not Kodagu. Local tourism information places Sasipara viewpoint nearby; check opening and weather before leaving.",placeIds:["alakapuri-waterfalls"]},
 {id:"kerala-ezharakund",category:"Kerala border · Waterfalls",title:"Ezharakund Waterfalls",direction:"Kudianmala / Vellad approach",defaultDuration:120,description:"A multi-level waterfall in Kannur district, Kerala. Allow time for the approach walk and keep to designated paths; don't combine it with other border pins unless route distance is verified.",placeIds:["ezharakund-waterfalls"]}
];
const routeById=id=>ROUTE_CIRCUITS.find(r=>r.id===id)||null;
const placeById=id=>(catalog.places||[]).find(p=>p.id===id)||null;
function routeForDay(day){
 if(!day)return null;
 const ids=(day.stops||[]).filter(s=>s.placeId).map(s=>s.placeId);
 // Clear a leftover route assignment when all curated destinations have been removed.
 if(!ids.length){delete day.routeId;return null;}
 const stored=routeById(day.routeId);
 if(stored&&ids.every(id=>stored.placeIds.includes(id))){
  (day.stops||[]).filter(s=>s.placeId).forEach(s=>s.routeId=stored.id);
  return stored;
 }
 const candidates=ROUTE_CIRCUITS.filter(r=>ids.every(id=>r.placeIds.includes(id))).sort((a,b)=>a.placeIds.length-b.placeIds.length);
 if(!candidates.length){delete day.routeId;return null;}
 day.routeId=candidates[0].id;
 (day.stops||[]).filter(s=>s.placeId).forEach(s=>s.routeId=day.routeId);
 return candidates[0];
}
function currentTripLabel(t){return (t.name||"Untitled itinerary")+" · "+(t.destination||"no destination set");}
function toMinutes(clock){const parts=String(clock||"09:00").split(":").map(Number);return (parts[0]||0)*60+(parts[1]||0);}
function fromMinutes(value){const n=Math.max(0,value)%1440;return String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");}
function suggestedStartTime(t,dayIndex){const stops=(t.days[dayIndex]&&t.days[dayIndex].stops)||[];const real=stops.filter(s=>!starterSlotNames.has(s.name));if(!real.length)return "09:00";let last=0;real.forEach(s=>{if(/^\d{2}:\d{2}$/.test(s.time||""))last=Math.max(last,toMinutes(s.time)+(Number(s.duration)||60));});const suggested=last?last+15:540;return fromMinutes(suggested>1320?540:suggested);}
function populatePickerAreas(){
 const select=$("pickerArea"),categories=[...new Set(ROUTE_CIRCUITS.map(r=>r.category))];
 select.innerHTML='<option value="">Choose a route / area…</option>'+categories.map(category=>'<optgroup label="'+escapeHtml(category)+'">'+ROUTE_CIRCUITS.filter(r=>r.category===category).map(r=>'<option value="'+escapeHtml(r.id)+'">'+escapeHtml(r.title)+'</option>').join("")+'</optgroup>').join("");
}
function pickerDay(){
 const t=active();if(!t)return null;
 const idx=Math.max(0,Math.min(t.days.length-1,Number($("pickerDay").value)||0));
 return {trip:t,index:idx,day:t.days[idx]};
}
function currentPickerRoute(){return routeById($("pickerArea").value);}
function updatePickerRouteSummary(){
 const route=currentPickerRoute(),selected=pickerDay(),panel=$("pickerRouteSummary");
 if(!selected){panel.innerHTML='<p class="route-empty">Select an itinerary day first.</p>';return;}
 const existing=(selected.day.stops||[]).filter(s=>s.placeId);
 if(!route){
  panel.innerHTML='<div class="route-summary-empty"><span class="route-summary-icon">↗</span><div><b>Choose an area or circuit</b><p>Select one of the listed regional groups, then choose the destinations you want to add. No starting location is required.</p></div></div>';
  return;
 }
 const incompatible=existing.filter(s=>!route.placeIds.includes(s.placeId));
 const conflictMessage=incompatible.length?'<div class="route-conflict"><b>Destinations from other groups are already on this day</b><p>'+escapeHtml(incompatible.map(s=>s.name).join(", "))+' '+(incompatible.length===1?"is":"are")+' outside this selected group. You can still combine groups; check the combined route and travel time in Google Maps.</p></div>':"";
 const chips=route.placeIds.map((id,i)=>{const p=placeById(id);return p?'<span class="route-stop-chip"><i>'+(i+1)+'</i>'+escapeHtml(p.name)+'</span>':"";}).join("");
 const lock=(selected.day.routeId===route.id)?'<span class="route-locked-pill">Day '+(selected.index+1)+' · current group</span>':"";
 const routeNote='<p class="route-source-note">This is a manual area grouping, not an optimized driving route. Choose the places you want, then confirm roads, order and travel times in Google Maps.</p>';
 panel.innerHTML='<div class="route-summary-top"><div><p class="route-summary-kicker">SELECTED AREA / CIRCUIT</p><h3>'+escapeHtml(route.title)+'</h3><p class="route-direction">'+escapeHtml(route.direction)+'</p></div>'+lock+'</div><p class="route-summary-description">'+escapeHtml(route.description)+'</p>'+routeNote+'<div class="route-stop-sequence"><span class="route-sequence-label">PLACES IN THIS GROUP</span><div class="route-stop-chips">'+chips+'</div></div>'+conflictMessage;
}
function configurePickerForDay(){
 const selected=pickerDay();if(!selected)return;
 const day=selected.day;
 const route=routeById(day.routeId)||routeForDay(day);
 const routeId=route?route.id:"";
 $("pickerArea").value=routeId;
 $("pickerArea").disabled=false;
 $("pickerStartTime").value=suggestedStartTime(selected.trip,selected.index);
 $("pickerDuration").value=String(route?route.defaultDuration:60);
 updatePickerRouteSummary();
}
function pickerFilteredPlaces(){
 const q=$("pickerSearch").value.trim().toLowerCase(),route=currentPickerRoute();
 if(!route)return [];
 return route.placeIds.map(id=>placeById(id)).filter(Boolean).filter(p=>!q||[p.name,...(p.aliases||[]),p.city,p.group,p.tag,p.overview,p.why,p.state||"Karnataka"].join(" ").toLowerCase().includes(q));
}
function updatePickerSelectionUI(){
 const count=pickedPlaceIds.size,route=currentPickerRoute();
 $("pickerSelectionCount").textContent=count+" selected";
 $("addSelectedPlaces").disabled=count===0||!route;
 $("addSelectedPlaces").textContent=count?"＋ Add "+count+" selected place"+(count===1?"":"s"):"＋ Add selected places";
 const selected=pickerDay();
 if(!route)$("pickerHint").textContent="Choose a circuit or area, select the destinations you want, and add them to the day. You can repeat this with another group.";
 else if(selected&&selected.day.stops.some(s=>s.placeId&&!route.placeIds.includes(s.placeId)))$("pickerHint").textContent="This day already includes places from another group. You can still add these selections; check the full route and travel time in Maps.";
 else $("pickerHint").textContent="Check destinations in your intended visit order. You can add more from another group later; RoamPlan does not optimize driving routes.";
}
function renderPickerPlaces(){
 const route=currentPickerRoute(),places=pickerFilteredPlaces();
 const html=places.map(p=>{
  const selected=pickedPlaceIds.has(p.id),state=p.state||"Karnataka",tag=(p.tag||"").toUpperCase(),offbeat=tag.includes("OFFBEAT");
  const stopNumber=route.placeIds.indexOf(p.id)+1;
  return '<article class="picker-place '+(selected?'selected':'')+'"><label class="picker-choice-label"><input class="picker-choice" type="checkbox" value="'+escapeHtml(p.id)+'" '+(selected?'checked':'')+'><span class="picker-checkmark" aria-hidden="true"></span></label><div class="picker-place-copy"><div class="picker-place-heading"><span class="picker-stop-number">'+String(stopNumber).padStart(2,"0")+'</span><b>'+escapeHtml(p.name)+'</b>'+(offbeat?'<span class="place-badge offbeat">OFFBEAT</span>':'')+(p.region==="kerala-border"?'<span class="place-badge border-badge">KERALA</span>':"")+'</div><p>'+escapeHtml(p.city)+', '+escapeHtml(state)+' · '+escapeHtml(p.tag||"Place")+'</p><small>'+escapeHtml(p.overview||"Explore this destination.")+'</small></div><a class="picker-details-link" href="place.html?id='+encodeURIComponent(p.id)+'" target="_blank" rel="noopener">Details ↗</a></article>';
 }).join("");
 $("pickerPlaceList").innerHTML=html||'<div class="picker-no-results"><b>'+(route?"No places match your search":"Choose a route to see destinations")+'</b><p>'+(route?"Try a different keyword within this route circuit.":"Choose a route group to browse its destinations.")+'</p></div>';
 updatePickerRouteSummary();
 updatePickerSelectionUI();
}
function handlePickerCircuitChange(){
 pickedPlaceIds.clear();pickedPlaceOrder=[];
 const route=currentPickerRoute();
 if(route)$("pickerDuration").value=String(route.defaultDuration);
 renderPickerPlaces();
}
function openPlacePicker(){
 const t=active();if(!t){toast("Create an itinerary first");return;}
 pickedPlaceIds.clear();pickedPlaceOrder=[];
 $("pickerTripName").textContent="Choose an area or circuit, then check destinations in the order you want to visit them. Add them to your day and use Google Maps to review driving directions.";
 $("pickerDay").innerHTML=t.days.map((d,i)=>'<option value="'+i+'">Day '+(i+1)+(t.startDate?' · '+escapeHtml(formatDate(t.startDate,i)):"")+'</option>').join("");
 $("pickerDay").value=String(Math.min(activeDay,t.days.length-1));
 $("pickerSearch").value="";
 populatePickerAreas();
 configurePickerForDay();
 renderPickerPlaces();
 $("placePickerDialog").showModal();
}
function addPickedPlaces(){
 const t=active();if(!t){toast("Create an itinerary first");return;}
 const selected=pickerDay(),route=currentPickerRoute();
 if(!selected||!route){toast("Choose a route circuit first.");return;}
 const dayIndex=selected.index,day=selected.day;if(!day.stops)day.stops=[];
 // Add places in the exact order the user checked them. The user can combine groups if desired.
 const ids=pickedPlaceOrder.filter(id=>route.placeIds.includes(id));
 if(!ids.length){toast("Select at least one destination from this route.");return;}
 const seen=new Set(t.days.flatMap(d=>d.stops||[]).flatMap(s=>[s.placeId?"place:"+s.placeId:"","name:"+String(s.name||"").trim().toLowerCase()]).filter(Boolean));
 const duration=Math.max(15,Math.min(600,Number($("pickerDuration").value)||route.defaultDuration||60));
 const candidates=[];let duplicates=0;
 ids.forEach(id=>{const p=placeById(id);if(!p)return;const nameKey="name:"+String(p.name||"").trim().toLowerCase(),idKey="place:"+p.id;if(seen.has(idKey)||seen.has(nameKey)){duplicates++;return;}seen.add(idKey);seen.add(nameKey);candidates.push(p);});
 if(!candidates.length){toast(duplicates?"Those places are already in this itinerary.":"No destinations were selected.");return;}
 // Replace untouched generic sightseeing slots, but keep meal times, travel buffers and custom stops.
 day.stops=day.stops.filter(s=>!(replaceableSightseeingSlots.has(s.name)&&!s.placeId));
 let clock=toMinutes($("pickerStartTime").value||suggestedStartTime(t,dayIndex)),added=0,tooLate=0;
 candidates.forEach(p=>{
  const tag=(p.tag||"").toLowerCase();
  const type=tag.includes("offbeat")?"offbeat":tag.includes("famous")?"famous":tag.includes("food")?"food":tag.includes("local")?"local":"hidden-gem";
  const crowdText=(p.crowd||"").toLowerCase();
  const crowd=crowdText.includes("quiet")||crowdText.includes("less crowded")?"low":crowdText.includes("popular")||crowdText.includes("crowded")?"high":crowdText.includes("unknown")?"unknown":"medium";
  // Move the time forward if it overlaps a meal, buffer or already planned stop.
  let guard=0,conflict=true;
  while(conflict&&clock<=1320&&guard<40){
   conflict=false;guard++;
   for(const existing of day.stops){
    if(!/^\d{2}:\d{2}$/.test(existing.time||""))continue;
    const existingStart=toMinutes(existing.time),existingEnd=existingStart+(Number(existing.duration)||60);
    if(clock<existingEnd&&clock+duration>existingStart){clock=existingEnd+15;conflict=true;break;}
   }
  }
  if(clock>1320||conflict){tooLate++;return;}
  const state=p.state||"Karnataka",routeOrder=route.placeIds.indexOf(p.id);
  const notes=(p.overview||"")+(p.bestTime?"\\nBest time: "+p.bestTime:"");
  const stop={id:uid(),placeId:p.id,routeId:route.id,routeOrder,name:p.name,location:p.mapQuery||p.name,mapUrl:p.mapUrl||"",time:fromMinutes(clock),duration,type,crowd,notes,done:false,order:day.stops.length,placeGroup:p.group||"",placeState:state};
  day.stops.push(stop);added++;clock+=duration+15;
 });
 if(!added){toast(duplicates?"Those places are already in this itinerary.":tooLate?"These places won't fit before 10 PM. Choose an earlier start time or another day.":"No destinations were added.");return;}
 day.routeId=route.id;
 day.stops.sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99"));
 activeDay=dayIndex;
 $("placePickerDialog").close();pickedPlaceIds.clear();pickedPlaceOrder=[];
 save();
 toast("Added "+added+" place"+(added===1?"":"s")+" on "+route.title+" to Day "+(dayIndex+1)+(duplicates?" · "+duplicates+" duplicate"+(duplicates===1?"":"s")+" skipped":"")+(tooLate?" · "+tooLate+" didn't fit before 10 PM":""));
}

$("pickPlacesBtn").onclick=openPlacePicker;
$("closePicker").onclick=$("cancelPlacePicker").onclick=()=>$("placePickerDialog").close();
$("pickerSearch").addEventListener("input",renderPickerPlaces);
$("pickerArea").addEventListener("change",handlePickerCircuitChange);
$("pickerDay").addEventListener("change",()=>{pickedPlaceIds.clear();pickedPlaceOrder=[];configurePickerForDay();renderPickerPlaces();});
$("pickerPlaceList").addEventListener("change",e=>{const input=e.target.closest(".picker-choice");if(!input)return;const id=input.value;if(input.checked){if(!pickedPlaceIds.has(id)){pickedPlaceIds.add(id);pickedPlaceOrder.push(id);}}else{pickedPlaceIds.delete(id);pickedPlaceOrder=pickedPlaceOrder.filter(x=>x!==id);}const row=input.closest(".picker-place");if(row)row.classList.toggle("selected",input.checked);updatePickerSelectionUI();});
$("addSelectedPlaces").onclick=addPickedPlaces;
$("newTrip").onclick=$("newTrip2").onclick=$("emptyCreate").onclick=openCreate;$("cancelCreate").onclick=()=>$("tripDialog").close();$("createTripSubmit").onclick=e=>{e.preventDefault();if($("newName").value.trim()&&$("newDestination").value.trim())createTrip();};$("tripForm").addEventListener("submit",e=>{e.preventDefault();createTrip();});$("stopForm").addEventListener("submit",e=>{e.preventDefault();saveStop();});
["tripName","destination","origin","startDate"].forEach(id=>$(id).addEventListener("change",syncFields));$("dayCount").onchange=syncFields;$("dayMap").onclick=mapDay;$("shareBtn").onclick=share;$("exportBtn").onclick=exportTrip;$("addStop").onclick=()=>editStop();$("addDayStop").onclick=()=>addSimple("famous");$("addMeal").onclick=()=>addSimple("food");$("deleteStop").onclick=removeStop;
$("allTrips").onclick=()=>{const t=active();if(t){$("pageTitle").textContent=t.name||"My itineraries";$("workspace").classList.remove("hidden");}};
$("dayTabs").addEventListener("click",e=>{const b=e.target.closest("[data-day]");if(b){activeDay=Number(b.dataset.day);render();}});
$("stopList").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.add){addSimple("famous");return;}const id=b.dataset.id,action=b.dataset.action;if(!action)return;const t=active(),list=t.days[activeDay].stops,s=list.find(x=>x.id===id);if(!s)return;if(action==="toggle"){s.done=!s.done;save();}else if(action==="edit")editStop(id);else if(action==="move"){const i=list.indexOf(s);if(i<list.length-1){[list[i],list[i+1]]=[list[i+1],list[i]];save();}}});
$("tripList").addEventListener("click",e=>{const b=e.target.closest("[data-trip]");if(b){activeId=b.dataset.trip;activeDay=0;render();}});window.addEventListener("hashchange",()=>{if(location.hash.startsWith("#trip=")){const was=activeId;try{const shared=JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(6)))));if(shared.name&&Array.isArray(shared.days)){shared.id=uid();trips.unshift(shared);activeId=shared.id;activeDay=0;history.replaceState(null,"",location.pathname+location.search);save();toast("Shared trip opened as your own copy");}}catch{activeId=was;}}});
load();
})();