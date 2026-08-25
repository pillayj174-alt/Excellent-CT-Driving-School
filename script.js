const header=document.getElementById('site-header');const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('main-nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('enquiry-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const message=`Hi Excellent CT Driving School.\n\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')||'Not provided'}\nInterested in: ${f.get('interest')}\nMessage: ${f.get('message')||'No additional message.'}`;window.open(`https://wa.me/27716668493?text=${encodeURIComponent(message)}`,'_blank')});
