(()=>{"use strict";
const KEY="roamplan.theme",root=document.documentElement,button=document.getElementById("themeToggle"),meta=document.querySelector('meta[name="theme-color"]');
function current(){return root.dataset.theme==="dark"?"dark":"light";}
function apply(theme,persist){
 const next=theme==="dark"?"dark":"light";
 root.dataset.theme=next;
 if(document.body)document.body.dataset.theme=next;
 if(button){
  button.textContent=next==="dark"?"☀ Light mode":"☾ Dark mode";
  button.setAttribute("aria-label",next==="dark"?"Switch to light theme":"Switch to dark theme");
  button.setAttribute("aria-pressed",String(next==="dark"));
  button.title=next==="dark"?"Switch to light theme":"Switch to dark theme";
 }
 if(meta)meta.content=next==="dark"?"#101712":"#f4f5ef";
 if(persist){try{localStorage.setItem(KEY,next);}catch(e){}}
}
let initial=root.dataset.theme;
if(initial!=="dark"&&initial!=="light"){try{initial=localStorage.getItem(KEY)==="dark"?"dark":"light";}catch(e){initial="light";}}
apply(initial,false);
if(button)button.addEventListener("click",()=>apply(current()==="dark"?"light":"dark",true));
})();