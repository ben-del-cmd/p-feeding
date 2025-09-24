<!-- /p-feeding/i18n.js -->
<script>
window.psI18n=(function(){
  const allowed=['en','es','zh','fr'];
  const norm = l => {
    l=(l||'').toLowerCase().split('-')[0];
    return allowed.includes(l)?l:'en';
  };
  function getLang(){
    const u=new URL(location.href);
    return norm(u.searchParams.get('lang') || localStorage.getItem('ps.lang') || navigator.language || 'en');
  }
  function setLang(lang,{navigate=true}={}){
    lang=norm(lang);
    localStorage.setItem('ps.lang',lang);
    const u=new URL(location.href);
    u.searchParams.set('lang',lang);
    if(navigate) location.href=u.toString();
    return lang;
  }
  function applyToLinks(root=document){
    const lang=getLang();
    root.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(!href || /^(https?:|mailto:|tel:|#)/i.test(href)) return;
      const u=new URL(href, location.href);
      if(u.searchParams.get('lang')!==lang) u.searchParams.set('lang',lang);
      a.href=u.toString();                    // 不手拼 '?'
    });
  }
  function initSelector(){
    const sel=document.getElementById('ps-lang-select');
    if(!sel) return;
    sel.value=getLang();
    sel.addEventListener('change',()=>setLang(sel.value));
  }
  function init(){
    initSelector();
    applyToLinks(document);
    // 动态新增节点也保持 lang
    const mo=new MutationObserver(m=>m.forEach(x=>x.addedNodes.forEach(n=>{
      if(n && n.querySelectorAll) applyToLinks(n);
    })));
    mo.observe(document.body,{childList:true,subtree:true});
  }
  return {getLang,setLang,applyToLinks,init,allowed};
})();
document.addEventListener('DOMContentLoaded',()=>window.psI18n.init());
</script>
