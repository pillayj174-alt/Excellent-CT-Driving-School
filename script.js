const ECT = { bookings: 'bookings', reviews: 'reviews' };
const supa = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
const esc = s => String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

async function renderPublicReviews(){
  const box=document.getElementById('public-reviews'); if(!box)return;
  const {data,error}=await supa.from(ECT.reviews).select('name,rating,text,created_at').eq('approved',true).order('created_at',{ascending:false}).limit(6);
  if(error){box.innerHTML='<div class="review-empty">Reviews are temporarily unavailable.</div>';return;}
  box.innerHTML=data?.length?data.map(r=>`<article class="public-review reveal show"><div class="stars">${'★'.repeat(Number(r.rating)||0)}</div><p>“${esc(r.text)}”</p><strong>${esc(r.name)}</strong><small>Verified customer review</small></article>`).join(''):'<div class="review-empty">Customer reviews will appear here after approval.</div>';
}

const reviewForm=document.getElementById('review-form');
reviewForm?.addEventListener('submit',async e=>{
  e.preventDefault(); const f=new FormData(e.currentTarget);
  const {error}=await supa.from(ECT.reviews).insert({name:f.get('name'),rating:Number(f.get('rating')),text:f.get('text'),service:'Customer review',approved:false});
  if(error){alert('We could not submit your review right now. Please try again.');return;}
  e.currentTarget.reset(); alert('Thank you. Your review has been submitted for owner approval.');
});

const enquiry=document.getElementById('enquiry-form');
enquiry?.addEventListener('submit',async e=>{
  e.preventDefault(); const f=new FormData(e.currentTarget);
  const item={name:f.get('name'),phone:f.get('phone'),email:f.get('email')||null,interest:f.get('interest'),message:f.get('message')||null};
  const {error}=await supa.from(ECT.bookings).insert(item);
  if(error){alert('We could not save your online booking. Please try again or contact us on WhatsApp.');return;}
  const message=`Hi Excellent CT Driving School.\n\nName: ${item.name}\nPhone: ${item.phone}\nEmail: ${item.email||'Not provided'}\nInterested in: ${item.interest}\nMessage: ${item.message||'No additional message.'}`;
  window.open(`https://wa.me/27716668493?text=${encodeURIComponent(message)}`,'_blank');
  e.currentTarget.reset();
});
renderPublicReviews();
