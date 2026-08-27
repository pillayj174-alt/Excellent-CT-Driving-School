const header=document.getElementById('site-header');const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('main-nav');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('enquiry-form')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const message=`Hi Excellent CT Driving School.\n\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')||'Not provided'}\nInterested in: ${f.get('interest')}\nMessage: ${f.get('message')||'No additional message.'}`;window.open(`https://wa.me/27716668493?text=${encodeURIComponent(message)}`,'_blank')});

// Local booking/review system for GitHub Pages testing.
const ECT_KEYS={bookings:'ect_bookings',reviews:'ect_reviews'};
const ectRead=k=>{try{return JSON.parse(localStorage.getItem(k))||[]}catch{return[]}};
const ectWrite=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const enquiry=document.getElementById('enquiry-form');
enquiry?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const item={name:f.get('name'),phone:f.get('phone'),email:f.get('email'),interest:f.get('interest'),message:f.get('message'),createdAt:new Date().toLocaleString('en-ZA')};const rows=ectRead(ECT_KEYS.bookings);rows.push(item);ectWrite(ECT_KEYS.bookings,rows);const message=`Hi Excellent CT Driving School.\n\nName: ${item.name}\nPhone: ${item.phone}\nEmail: ${item.email||'Not provided'}\nInterested in: ${item.interest}\nMessage: ${item.message||'No additional message.'}`;window.open(`https://wa.me/27716668493?text=${encodeURIComponent(message)}`,'_blank');e.currentTarget.reset()});
const reviewForm=document.getElementById('review-form');
function renderPublicReviews(){const box=document.getElementById('public-reviews');if(!box)return;const rows=ectRead(ECT_KEYS.reviews).filter(r=>r.approved);box.innerHTML=rows.length?rows.slice(-6).reverse().map(r=>`<article class="public-review reveal show"><div class="stars">${'★'.repeat(Number(r.rating)||0)}</div><p>“${String(r.text).replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))}”</p><strong>${String(r.name).replace(/[&<>]/g,'')}</strong><small>Verified customer review</small></article>`).join(''):'<div class="review-empty">Customer reviews will appear here after approval.</div>'}
reviewForm?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const rows=ectRead(ECT_KEYS.reviews);rows.push({name:f.get('name'),rating:f.get('rating'),text:f.get('text'),service:'Customer review',approved:false,createdAt:new Date().toLocaleString('en-ZA')});ectWrite(ECT_KEYS.reviews,rows);e.currentTarget.reset();alert('Thank you. Your review has been submitted for approval.');renderPublicReviews()});
renderPublicReviews();
