const menu=document.querySelector('.menu'),nav=document.querySelector('.nav nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const progress=document.querySelector('.progress span');
function progressUpdate(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%'}
addEventListener('scroll',progressUpdate,{passive:true});progressUpdate();

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));

const form=document.querySelector('#bookingForm');
form?.addEventListener('submit',e=>{
 e.preventDefault();
 const d=new FormData(form);
 const text=`Hi Excellent CT Driving School. I would like to make an enquiry.%0A%0AName: ${encodeURIComponent(d.get('name')||'')}%0AMobile: ${encodeURIComponent(d.get('phone')||'')}%0AEmail: ${encodeURIComponent(d.get('email')||'')}%0AService: ${encodeURIComponent(d.get('service')||'')}%0ADate: ${encodeURIComponent(d.get('date')||'Not specified')}%0ATime: ${encodeURIComponent(d.get('time')||'Not specified')}%0AMessage: ${encodeURIComponent(d.get('message')||'')}`;
 document.querySelector('#status').textContent='Opening WhatsApp with your enquiry...';
 window.open('https://wa.me/27716668493?text='+text,'_blank','noopener');
});
