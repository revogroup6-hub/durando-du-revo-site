(function(){
	const $ = (s, c=document)=>c.querySelector(s); const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

	function onReady(){ document.body.classList.add('page-ready'); }
	document.addEventListener('DOMContentLoaded', onReady);

	// Smooth anchors
	document.addEventListener('click', (e)=>{
		const a = e.target.closest('a[href^="#"]');
		if (!a) return;
		const id = a.getAttribute('href');
		if (id.length > 1 && $(id)) { e.preventDefault(); $(id).scrollIntoView({ behavior: 'smooth' }); }
	});

	// Parallax layers
	function initParallax(){ const layers = $$('.parallax-layer'); if(!layers.length) return; const onScroll=()=>{ const y = window.scrollY||0; layers.forEach((el,i)=>{ const speed=(i+1)*0.04; el.style.transform=`translate3d(0, ${y*speed}px, 0)`; }); }; onScroll(); window.addEventListener('scroll', onScroll, {passive:true}); }

	// Reveal on scroll
	function initReveal(){ const items=$$('.reveal'); if(!('IntersectionObserver' in window)){ items.forEach(el=>el.classList.add('in-view')); return; } const io=new IntersectionObserver(entries=>{ entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); } }); }, {threshold:.15, rootMargin:'0px 0px -5% 0px'}); items.forEach(el=>io.observe(el)); }

	// Tilt 3D
	function initTilt(){ const cards=$$('.card-3d'); cards.forEach(card=>{ const inner=$('.inner',card); if(!inner) return; let rect; function up(){ rect=card.getBoundingClientRect(); } up(); window.addEventListener('resize', up); card.addEventListener('mousemove', e=>{ const x=e.clientX-rect.left, y=e.clientY-rect.top; const rx=((y/rect.height)-.5)*-10, ry=((x/rect.width)-.5)*10; inner.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`; }); card.addEventListener('mouseleave', ()=>{ inner.style.transform='rotateX(0) rotateY(0) translateZ(0)'; }); }); }

	// Quiz
	function initQuiz(){ const quiz=$('.quiz'); if(!quiz) return; const bar=$('.progress .bar',quiz); const options=$$('.option',quiz); const btn=$('#orientation-cta'); const result=$('.result',quiz); let selected=null; options.forEach(opt=>{ opt.addEventListener('click', ()=>{ options.forEach(o=>o.classList.remove('selected')); opt.classList.add('selected'); selected=opt.getAttribute('data-value'); if(bar) bar.style.width='60%'; if(btn){ btn.disabled=false; btn.style.opacity='1'; } }); }); if(btn) btn.addEventListener('click', ()=>{ if(!selected) return; if(bar) bar.style.width='100%'; if(result){ result.innerHTML= selected==='networking'? '<p>👤 Direction section "Du"</p>' : '<p>🚀 Direction section "Rev\'O"</p>'; result.classList.add('show'); } setTimeout(()=>{ window.location.href= selected==='networking'? 'du/' : 'revo/'; }, 650); }); }

	// Blog utilities: TOC + read time + share
	function initBlog(){ const body=$('.article-body'); if(!body) return; // Estimate reading time
		const text=body.innerText||''; const words=text.trim().split(/\s+/).filter(Boolean).length; const minutes=Math.max(1, Math.round(words/200)); const rt=$('[data-reading-time]'); if(rt) rt.textContent=`${minutes} min`; // Build TOC
		const toc=$('.toc ul'); if(toc){ toc.innerHTML=''; const headers=$$('h2, h3', body); headers.forEach((h,i)=>{ if(!h.id) h.id='sec-'+(i+1); const li=document.createElement('li'); const a=document.createElement('a'); a.href='#'+h.id; a.textContent=h.textContent.replace(/^\s*\d+\.?\s*/,''); li.appendChild(a); toc.appendChild(li); }); }
		// Social share
		$$('.btn-share').forEach(btn=>{ btn.addEventListener('click', (e)=>{ e.preventDefault(); const t=document.title; const u=location.href; const type=btn.getAttribute('data-type'); let url=''; if(type==='x'){ url=`https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`; } if(type==='li'){ url=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`; } if(type==='fb'){ url=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`; } if(url) window.open(url, '_blank', 'noopener,width=600,height=540'); }); }); }

	document.addEventListener('DOMContentLoaded', function(){ initParallax(); initReveal(); initTilt(); initQuiz(); initBlog(); });
})();
