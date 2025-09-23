/* assets/js/events.js — Plausible wrapper + keep ?lang on internal links */
(function(){
  function curLang(){
    try{ var u=new URL(location.href); return u.searchParams.get('lang') || localStorage.getItem('lang') || 'en'; }
    catch(e){ return 'en'; }
  }

  // public wrapper
  window.ps = window.ps || {};
  ps.events = {
    page: function(name, props){
      if (typeof plausible === 'function') {
        plausible('pageview', { props: Object.assign({ page_name: name, lang: curLang() }, props||{}) });
      }
    },
    event: function(name, props){
      if (typeof plausible === 'function') {
        plausible(name, { props: Object.assign({ lang: curLang() }, props||{}) });
      }
    }
  };

  // preserve ?lang across internal links
  document.addEventListener('DOMContentLoaded', function(){
    var lang = curLang();
    document.querySelectorAll('a[href^="/"],a[href^="./"],a[href^="../"],a[href^="index"],a[href^="feeding"],a[href^="cards"],a[href^="feedback"]').forEach(function(a){
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || /^https?:\/\//i.test(href)) return;
      var url = new URL(href, location.href);
      var sp = url.searchParams;
      if (!sp.get('lang')) sp.set('lang', lang);
      url.search = sp.toString();
      a.setAttribute('href', url.pathname + (url.search ? '?' + url.search : '') + url.hash);
    });
  });
})();
