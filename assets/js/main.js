const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const form=document.querySelector('#bookingForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(form);
  const name=data.get('name')||'';
  const phone=data.get('phone')||'';
  const email=data.get('email')||'';
  const service=data.get('service')||'General Enquiry';
  const date=data.get('date')||'Not specified';
  const time=data.get('time')||'Not specified';
  const message=data.get('message')||'No additional message';
  const text=`Hi Excellent CT Driving School. I would like to make an enquiry.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AService: ${encodeURIComponent(service)}%0APreferred date: ${encodeURIComponent(date)}%0APreferred time: ${encodeURIComponent(time)}%0AMessage: ${encodeURIComponent(message)}`;
  const status=document.querySelector('#formStatus');
  status.textContent='Your enquiry is ready. Opening WhatsApp so you can send it directly to Excellent CT Driving School...';
  window.open(`https://wa.me/27716668493?text=${text}`,'_blank','noopener');
});

// Premium scroll-flow animation + page progress
const progress=document.querySelector(".scroll-progress");const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -60px 0px"});document.querySelectorAll(".reveal,.stagger").forEach(e=>observer.observe(e));function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+"%"}addEventListener("scroll",updateProgress,{passive:true});updateProgress();
