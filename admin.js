const OWNER_EMAIL='emim05@gmail.com';
const supa=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_PUBLISHABLE_KEY);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const login=document.getElementById('login-screen'), dash=document.getElementById('dashboard');

async function showOwner(){
  if(login) login.hidden=true;
  if(dash) dash.hidden=false;
  await render();
}
async function guard(){
  const {data}=await supa.auth.getSession();
  const onOwner=/owner\.html$/.test(location.pathname);
  if(onOwner && !data.session){location.replace('admin.html');return false;}
  if(!onOwner && data.session){location.replace('owner.html');return false;}
  return true;
}

document.getElementById('login-form')?.addEventListener('submit',async e=>{
  e.preventDefault();
  const email=document.getElementById('login-email').value.trim().toLowerCase();
  const pass=document.getElementById('login-password').value;
  const err=document.getElementById('login-error'); err.textContent='';
  if(email!==OWNER_EMAIL){err.textContent='Incorrect email or password.';return;}
  const {error}=await supa.auth.signInWithPassword({email,password:pass});
  if(error){err.textContent='Incorrect email or password.';return;}
  location.href='owner.html';
});

document.getElementById('logout')?.addEventListener('click',async()=>{await supa.auth.signOut();location.href='admin.html'});

async function render(){
  const [{data:bookings,error:be},{data:reviews,error:re}]=await Promise.all([
    supa.from('bookings').select('*').order('created_at',{ascending:false}),
    supa.from('reviews').select('*').order('created_at',{ascending:false})
  ]);
  if(be||re){document.getElementById('bookings-list').innerHTML='<div class="empty-state">Could not load online data. Make sure the Supabase tables and policies have been created.</div>';return;}
  document.getElementById('booking-count').textContent=bookings.length;
  document.getElementById('review-count').textContent=reviews.filter(r=>r.approved).length;
  document.getElementById('pending-count').textContent=reviews.filter(r=>!r.approved).length;
  const bl=document.getElementById('bookings-list');
  bl.innerHTML=bookings.length?bookings.map(b=>`<article class="admin-item"><div><strong>${esc(b.name)}</strong><span>${esc(b.interest||'General enquiry')} · ${esc(b.phone)}</span><small>${esc(b.email||'No email')} · ${esc(new Date(b.created_at).toLocaleString('en-ZA'))}</small><p>${esc(b.message||'No message')}</p><select class="booking-status" data-id="${b.id}"><option value="new" ${b.status==='new'?'selected':''}>New</option><option value="contacted" ${b.status==='contacted'?'selected':''}>Contacted</option><option value="confirmed" ${b.status==='confirmed'?'selected':''}>Confirmed</option><option value="completed" ${b.status==='completed'?'selected':''}>Completed</option><option value="cancelled" ${b.status==='cancelled'?'selected':''}>Cancelled</option></select></div><button class="danger-btn delete-booking" data-id="${b.id}">Delete</button></article>`).join(''):'<div class="empty-state">No online bookings have been submitted yet.</div>';
  const rl=document.getElementById('reviews-list');
  rl.innerHTML=reviews.length?reviews.map(r=>`<article class="admin-item"><div><strong>${esc(r.name)} <span class="stars">${'★'.repeat(Number(r.rating)||0)}</span></strong><span>${esc(r.service||'Customer review')}</span><small>${esc(new Date(r.created_at).toLocaleString('en-ZA'))}</small><p>${esc(r.text)}</p></div><div class="item-actions"><button class="small-btn toggle-review" data-id="${r.id}">${r.approved?'Hide':'Approve'}</button><button class="danger-btn delete-review" data-id="${r.id}">Delete</button></div></article>`).join(''):'<div class="empty-state">No reviews have been submitted yet.</div>';
  bl.querySelectorAll('.booking-status').forEach(el=>el.onchange=async()=>{await supa.from('bookings').update({status:el.value}).eq('id',el.dataset.id);});
  bl.querySelectorAll('.delete-booking').forEach(btn=>btn.onclick=async()=>{if(confirm('Delete this booking?')){await supa.from('bookings').delete().eq('id',btn.dataset.id);render()}});
  rl.querySelectorAll('.toggle-review').forEach(btn=>btn.onclick=async()=>{const r=reviews.find(x=>x.id===btn.dataset.id);await supa.from('reviews').update({approved:!r.approved}).eq('id',r.id);render()});
  rl.querySelectorAll('.delete-review').forEach(btn=>btn.onclick=async()=>{if(confirm('Delete this review?')){await supa.from('reviews').delete().eq('id',btn.dataset.id);render()}});
}

document.getElementById('export-bookings')?.addEventListener('click',async()=>{const {data}=await supa.from('bookings').select('*').order('created_at',{ascending:false});const head=['Name','Phone','Email','Interest','Message','Status','Created'];const csv=[head,...(data||[]).map(x=>[x.name,x.phone,x.email,x.interest,x.message,x.status,x.created_at])].map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='excellent-ct-bookings.csv';a.click();});

document.getElementById('site-settings')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('settings-status').textContent='Business settings are currently managed in the website files.'});
document.getElementById('clear-data')?.remove();
(async()=>{if(await guard() && /owner\.html$/.test(location.pathname))showOwner()})();
