const menu=document.querySelector('.menu'), nav=document.querySelector('.nav nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const bar=document.querySelector('.scroll-progress');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max?scrollY/max*100:0)+'%'},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal,.reveal-section').forEach(x=>io.observe(x));
document.querySelector('#form')?.addEventListener('submit',e=>{
 e.preventDefault(); const d=new FormData(e.currentTarget);
 const msg=`Hi Excellent CT Driving School. I would like to make an enquiry.%0A%0AName: ${encodeURIComponent(d.get('name')||'')}%0AMobile: ${encodeURIComponent(d.get('phone')||'')}%0AService: ${encodeURIComponent(d.get('service')||'')}%0APreferred date: ${encodeURIComponent(d.get('date')||'Not specified')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;
 document.querySelector('#status').textContent='Opening WhatsApp...';
 window.open('https://wa.me/27716668493?text='+msg,'_blank','noopener');
});