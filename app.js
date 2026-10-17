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
function load(){try{trips=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(trips))trips=[];}catch{trips=[];}if(!trips.length){const t=makeTrip({name:"A slow weekend in Coorg",destination:"Coorg, Karnataka",origin:"Bengaluru",days:1});trips.push(t);activeId=t.id;}else activeId=trips[0].id;
const hash=location.hash.slice(1);if(hash.startsWith("trip=")){try{const shared=JSON.parse(decodeURIComponent(escape(atob(hash.slice(5)))));if(shared&&shared.name&&Array.isArray(shared.days)){shared.id=uid();trips.unshift(shared);activeId=shared.id;history.replaceState(null,"",location.pathname+location.search);save();toast("Shared itinerary imported as a new copy");}}catch{toast("This share link could not be imported");}}render();}
function active(){return trips.find(t=>t.id===activeId)||trips[0];}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function formatDate(date,offset){if(!date)return"";const d=new Date(date+"T12:00:00");d.setDate(d.getDate()+offset);return d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"});}
function setVal(id,v){$(id).value=v??""}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2400);}
function progress(t){const all=t.days.flatMap(d=>d.stops);return{done:all.filter(s=>s.done).length,total:all.length,pct:all.length?Math.round(100*all.filter(s=>s.done).length/all.length):0};}
function render(){const t=active();$("tripCount").textContent=trips.length;$("tripList").innerHTML=trips.map(x=>'<button class="trip-link '+(x.id===activeId?'active':'')+'" data-trip="'+x.id+'">⌁ &nbsp;'+escapeHtml(x.name||x.destination||"Untitled trip")+'</button>').join("");$("workspace").classList.toggle("hidden",!t);$("emptyState").classList.toggle("hidden",!!t);if(!t){$("pageTitle").textContent="Plan a trip worth remembering.";return;}
const p=progress(t);$("crumb").textContent=t.name||"My itinerary";$("pageTitle").textContent=t.name||"Plan a trip worth remembering.";$("statDestination").textContent=t.destination||"Add destination";$("statDays").textContent=t.days.length+" "+(t.days.length===1?"day":"days");$("statVisited").textContent=p.done+" / "+p.total;$("statProgress").textContent=p.pct+"%";$("progressBar").style.width=p.pct+"%";setVal("tripName",t.name);setVal("destination",t.destination);setVal("origin",t.origin);setVal("startDate",t.startDate);setVal("dayCount",t.days.length);activeDay=Math.min(activeDay,t.days.length-1);$("dayTabs").innerHTML=t.days.map((d,i)=>'<button class="day-tab '+(i===activeDay?'active':'')+'" data-day="'+i+'">Day '+(i+1)+'</button>').join("");const day=t.days[activeDay];$("dayTitle").textContent="Day "+(activeDay+1);$("dayDate").textContent=formatDate(t.startDate,activeDay);const done=day.stops.filter(s=>s.done).length;$("dayProgress").textContent=done+" / "+day.stops.length+" done";$("stopList").innerHTML=day.stops.length?day.stops.map((s,i)=>renderStop(s,i)).join(""):'<div class="empty"><h2>A day with possibilities.</h2><p>Add the first place, meal or activity to start planning.</p><button class="primary" data-add="destination">＋ Add a stop</button></div>'; }
function renderStop(s,i){
 const loc=s.location||s.name;
 const map="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(loc);
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
function mapDay(){const t=active(),stops=t.days[activeDay].stops.filter(s=>s.location||s.name);if(!stops.length){toast("Add a destination first");return;}const places=stops.map(s=>s.location||s.name),origin= t.origin||places.shift(),destination=places.pop()||origin;let url="https://www.google.com/maps/dir/?api=1&origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&travelmode=driving";if(places.length)url+="&waypoints="+encodeURIComponent(places.join("|"));window.open(url,"_blank","noopener");}
function share(){const t=active();if(!t)return;try{const payload=btoa(unescape(encodeURIComponent(JSON.stringify(t))));const url=location.origin+location.pathname+"#trip="+payload;navigator.clipboard.writeText(url).then(()=>toast("Share link copied")).catch(()=>prompt("Copy this itinerary link",url));}catch{toast("Could not create share link");}}
function exportTrip(){const t=active();const blob=new Blob([JSON.stringify(t,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(t.name||"itinerary").toLowerCase().replace(/[^a-z0-9]+/g,"-")+".json";a.click();URL.revokeObjectURL(a.href);toast("Itinerary exported");}
function addSimple(type){editStop();setVal("stopType",type);if(type==="food")setVal("stopName","Meal / break");else setVal("stopName","New destination");}
const starterSlotNames=new Set(["Breakfast / coffee","Travel to first stop","Main attraction","Hidden gem nearby","Lunch break","Explore at an easy pace","Rest / travel buffer","Offbeat stop","Sunset / scenic stop","Dinner"]);
const replaceableSightseeingSlots=new Set(["Main attraction","Hidden gem nearby","Explore at an easy pace","Offbeat stop","Sunset / scenic stop"]);
function currentTripLabel(t){return (t.name||"Untitled itinerary")+" · "+(t.destination||"no destination set");}
function toMinutes(clock){const parts=String(clock||"09:00").split(":").map(Number);return (parts[0]||0)*60+(parts[1]||0);}
function fromMinutes(value){const n=Math.max(0,value)%1440;return String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");}
function suggestedStartTime(t,dayIndex){const stops=(t.days[dayIndex]&&t.days[dayIndex].stops)||[];const real=stops.filter(s=>!starterSlotNames.has(s.name));if(!real.length)return "09:00";let last=0;real.forEach(s=>{if(/^\\d{2}:\\d{2}$/.test(s.time||""))last=Math.max(last,toMinutes(s.time)+(Number(s.duration)||60));});const suggested=last?last+15:540;return fromMinutes(suggested>1320?540:suggested);}
function populatePickerAreas(){
 const select=$("pickerArea");
 const groups=[...new Set((catalog.places||[]).map(p=>p.group).filter(Boolean))];
 select.innerHTML='<option value="all">All listed destinations</option><option value="Coorg">Coorg · Karnataka only</option><option value="kerala-border">Kerala border escapes only</option>'+groups.map(g=>'<option value="group:'+escapeHtml(g)+'">'+escapeHtml(g)+'</option>').join("");
}
function pickerFilteredPlaces(){
 const q=$("pickerSearch").value.trim().toLowerCase(),area=$("pickerArea").value||"all";
 return (catalog.places||[]).filter(p=>{
  const state=p.state||"Karnataka",group=p.group||"";
  if(area==="Coorg"&&state!=="Karnataka")return false;
  if(area==="kerala-border"&&p.region!=="kerala-border")return false;
  if(area.startsWith("group:")&&group!==area.slice(6))return false;
  return !q||[p.name,p.city,p.group,p.tag,p.overview,p.why,state].join(" ").toLowerCase().includes(q);
 });
}
function updatePickerSelectionUI(){
 $("pickerSelectionCount").textContent=pickedPlaceIds.size+" selected";
 $("addSelectedPlaces").disabled=pickedPlaceIds.size===0;
 $("addSelectedPlaces").textContent=pickedPlaceIds.size?"＋ Add "+pickedPlaceIds.size+" selected place"+(pickedPlaceIds.size===1?"":"s"):"＋ Add selected places";
}
function renderPickerPlaces(){
 const groups={};
 pickerFilteredPlaces().forEach(p=>(groups[p.group||"Other places"]??=[]).push(p));
 const html=Object.keys(groups).sort((a,b)=>a.localeCompare(b)).map(group=>'<section class="picker-area-group"><h3>'+escapeHtml(group)+' <span>'+groups[group].length+'</span></h3>'+groups[group].map(p=>{
  const selected=pickedPlaceIds.has(p.id),state=p.state||"Karnataka",tag=(p.tag||"").toUpperCase(),offbeat=tag.includes("OFFBEAT");
  return '<article class="picker-place '+(selected?'selected':'')+'"><label class="picker-choice-label"><input class="picker-choice" type="checkbox" value="'+escapeHtml(p.id)+'" '+(selected?'checked':'')+'><span class="picker-checkmark" aria-hidden="true"></span></label><div class="picker-place-copy"><div class="picker-place-heading"><b>'+escapeHtml(p.name)+'</b>'+(offbeat?'<span class="place-badge offbeat">OFFBEAT</span>':'')+(p.region==="kerala-border"?'<span class="place-badge border-badge">KERALA</span>':"")+'</div><p>'+escapeHtml(p.city)+', '+escapeHtml(state)+' · '+escapeHtml(p.tag||"Place")+'</p><small>'+escapeHtml(p.overview||"Explore this destination.")+'</small></div><a class="picker-details-link" href="place.html?id='+encodeURIComponent(p.id)+'" target="_blank" rel="noopener">Details ↗</a></article>';
 }).join("")+'</section>').join("");
 $("pickerPlaceList").innerHTML=html||'<div class="picker-no-results"><b>No destinations match your search</b><p>Try a different keyword or choose all areas.</p></div>';
 updatePickerSelectionUI();
}
function openPlacePicker(){
 const t=active();if(!t){toast("Create an itinerary first");return;}
 pickedPlaceIds.clear();pickedPlaceOrder=[];
 $("pickerTripName").textContent="Adding to "+currentTripLabel(t)+". Select the day, search places and check everything you want to include.";
 $("pickerDay").innerHTML=t.days.map((d,i)=>'<option value="'+i+'">Day '+(i+1)+(t.startDate?' · '+escapeHtml(formatDate(t.startDate,i)):"")+'</option>').join("");
 $("pickerDay").value=String(Math.min(activeDay,t.days.length-1));
 $("pickerStartTime").value=suggestedStartTime(t,Number($("pickerDay").value));
 $("pickerDuration").value="60";$("pickerSearch").value="";
 populatePickerAreas();
 const destination=(t.destination||"").toLowerCase();
 $("pickerArea").value=destination.includes("kerala")?"kerala-border":"Coorg";
 renderPickerPlaces();
 $("placePickerDialog").showModal();
}
function addPickedPlaces(){
 const t=active();if(!t){toast("Create an itinerary first");return;}
 const ids=pickedPlaceOrder.filter(id=>pickedPlaceIds.has(id));
 if(!ids.length){toast("Select at least one destination");return;}
 const dayIndex=Math.max(0,Math.min(t.days.length-1,Number($("pickerDay").value)||0));
 const day=t.days[dayIndex];if(!day.stops)day.stops=[];
 const seen=new Set(t.days.flatMap(d=>d.stops||[]).flatMap(s=>[s.placeId?"place:"+s.placeId:"","name:"+String(s.name||"").trim().toLowerCase()]).filter(Boolean));
 const duration=Math.max(15,Math.min(360,Number($("pickerDuration").value)||60));
 const candidates=[];let duplicates=0;
 ids.forEach(id=>{const p=(catalog.places||[]).find(x=>x.id===id);if(!p)return;const nameKey="name:"+String(p.name||"").trim().toLowerCase(),idKey="place:"+p.id;if(seen.has(idKey)||seen.has(nameKey)){duplicates++;return;}seen.add(idKey);seen.add(nameKey);candidates.push(p);});
 if(!candidates.length){toast(duplicates?"Those places are already in this itinerary.":"No destinations were selected.");return;}
 // Replace only untouched generic sightseeing placeholders; preserve meals, buffers and custom stops.
 day.stops=day.stops.filter(s=>!(replaceableSightseeingSlots.has(s.name)&&!s.placeId));
 let clock=toMinutes($("pickerStartTime").value||suggestedStartTime(t,dayIndex)),added=0,tooLate=0;
 candidates.forEach(p=>{
  const tag=(p.tag||"").toLowerCase();
  const type=tag.includes("offbeat")?"offbeat":tag.includes("famous")?"famous":tag.includes("food")?"food":tag.includes("local")?"local":"hidden-gem";
  const crowdText=(p.crowd||"").toLowerCase();
  const crowd=crowdText.includes("quiet")||crowdText.includes("less crowded")?"low":crowdText.includes("popular")||crowdText.includes("crowded")?"high":crowdText.includes("unknown")?"unknown":"medium";
  // Avoid overlapping existing meals, travel buffers or planned stops.
  let guard=0,conflict=true;
  while(conflict&&clock<=1320&&guard<40){
   conflict=false;guard++;
   for(const existing of day.stops){
    if(!/^\\d{2}:\\d{2}$/.test(existing.time||""))continue;
    const existingStart=toMinutes(existing.time),existingEnd=existingStart+(Number(existing.duration)||60);
    if(clock<existingEnd&&clock+duration>existingStart){clock=existingEnd+15;conflict=true;break;}
   }
  }
  if(clock>1320||conflict){tooLate++;return;}
  const state=p.state||"Karnataka";
  const notes=(p.overview||"")+(p.bestTime?"\\nBest time: "+p.bestTime:"");
  const stop={id:uid(),placeId:p.id,name:p.name,location:p.mapQuery||p.name,time:fromMinutes(clock),duration,type,crowd,notes,done:false,order:day.stops.length,placeGroup:p.group||"",placeState:state};
  day.stops.push(stop);added++;clock+=duration+15;
 });
 if(!added){toast(duplicates?"Those places are already in this itinerary.":tooLate?"These places won't fit before 10 PM. Choose an earlier start time or another day.":"No destinations were added.");return;}
 day.stops.sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99"));
 activeDay=dayIndex;
 $("placePickerDialog").close();pickedPlaceIds.clear();pickedPlaceOrder=[];
 save();
 toast("Added "+added+" place"+(added===1?"":"s")+" to Day "+(dayIndex+1)+(duplicates?" · "+duplicates+" duplicate"+(duplicates===1?"":"s")+" skipped":"")+(tooLate?" · "+tooLate+" didn't fit before 10 PM; choose another day for those":""));
}

$("pickPlacesBtn").onclick=openPlacePicker;
$("closePicker").onclick=$("cancelPlacePicker").onclick=()=>$("placePickerDialog").close();
$("pickerSearch").addEventListener("input",renderPickerPlaces);
$("pickerArea").addEventListener("change",renderPickerPlaces);
$("pickerDay").addEventListener("change",()=>{const t=active();if(t)$("pickerStartTime").value=suggestedStartTime(t,Number($("pickerDay").value)||0);});
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