const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
toggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Smooth section reveal as the visitor scrolls.
const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12, rootMargin:'0px 0px -60px 0px'});
revealItems.forEach(el=>observer.observe(el));

// Reading/scroll progress indicator.
const progress=document.querySelector('.scroll-progress span');
const updateProgress=()=>{
  const scrollTop=window.scrollY;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0 ? Math.min(100,scrollTop/max*100) : 0)+'%';
};
window.addEventListener('scroll',updateProgress,{passive:true});
window.addEventListener('resize',updateProgress);
updateProgress();

// Booking form opens a pre-filled WhatsApp enquiry.
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
