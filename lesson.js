// Shared step/quiz engine. Page defines STEPS, PARTS, QUIZ, optional onStep(i)
(function(){
const $=s=>document.querySelector(s);let i=0;const N=STEPS.length+1;
const svg=$('#dia'),prog=$('#prog');
for(let k=0;k<N;k++){const b=document.createElement('i');b.onclick=()=>go(k);prog.appendChild(b)}
document.querySelectorAll('.part').forEach(p=>p.addEventListener('click',e=>{e.stopPropagation();const d=PARTS[p.dataset.p];if(d)$('#info').innerHTML='<b>'+d[0]+'</b> — '+d[1]}));
function go(k){i=Math.max(0,Math.min(N-1,k));[...prog.children].forEach((b,j)=>b.classList.toggle('d',j<=i));
 $('#prev').disabled=i==0;$('#next').textContent=i==N-1?'Restart':(i==N-2?'Take the quiz →':'Next →');
 if(i<STEPS.length){const s=STEPS[i];$('#step').innerHTML='<div class="kicker">Step '+(i+1)+' of '+STEPS.length+'</div><h2>'+s.t+'</h2>'+s.b;
  svg.classList.toggle('dim',!!s.on);document.querySelectorAll('.part').forEach(p=>p.classList.toggle('on',!!s.on&&s.on.includes(p.dataset.p)));
  $('#info').innerHTML='<span class="tip">Tap any part of the diagram to learn what it does.</span>'}
 else{svg.classList.remove('dim');quiz()}
 window.onStep&&onStep(i)}
function quiz(){let sc=0,done=0;const el=$('#step');el.innerHTML='<div class="kicker">Quiz</div><h2>Check yourself</h2><div id="qs"></div><p id="score"></p>';
 QUIZ.forEach(([q,opts,ans,why])=>{const d=document.createElement('div');d.className='q';d.innerHTML='<b>'+q+'</b>';
  opts.forEach((o,j)=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>{if(d.dataset.a)return;d.dataset.a=1;done++;
   b.classList.add(j==ans?'r':'w');d.querySelectorAll('button')[ans].classList.add('r');if(j==ans)sc++;
   d.insertAdjacentHTML('beforeend','<div class="tip">'+why+'</div>');if(done==QUIZ.length)$('#score').innerHTML='<b>Score: '+sc+'/'+QUIZ.length+'</b> '+(sc==QUIZ.length?'🎉 Nailed it.':'Tap Restart to review.')};d.appendChild(b)});
  $('#qs').appendChild(d)})}
$('#prev').onclick=()=>go(i-1);$('#next').onclick=()=>go(i==N-1?0:i+1);
addEventListener('keydown',e=>{if(e.key=='ArrowRight')go(i+1);if(e.key=='ArrowLeft')go(i-1)});go(0);
})();
