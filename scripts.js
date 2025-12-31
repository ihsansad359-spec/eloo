const photo = document.getElementById('photo');
const bg = document.getElementById('bg');
const music = document.getElementById('music');
const parallaxItems = document.querySelectorAll('.parallax');

let played = false;
let lastScroll = 0;

/* KLIK FOTO */
photo.addEventListener('click', () => {
  photo.classList.toggle('active');

  if(!played){
    music.volume = 0;
    music.play();
    fadeInMusic();
    played = true;
  }
  spawnFall();
});

/* MUSIK FADE IN */
function fadeInMusic(){
  let v = 0;
  const t = setInterval(()=>{
    if(v < 0.7){ v += 0.05; music.volume = v; }
    else clearInterval(t);
  },200);
}

/* JAWABAN */
function answer(x){
  document.getElementById('answer').innerHTML =
    x === 1 ? "Aku datang tanpa diminta 🤍"
            : "Suaraku sederhana, tapi buat kamu";
}

/* PARALLAX */
window.addEventListener('scroll',()=> lastScroll = window.scrollY);
(function loop(){
  bg.style.transform = `scale(1.25) translateY(${lastScroll*0.15}px)`;
  parallaxItems.forEach((el,i)=>{
    const s = i===0?0.25:0.15;
    el.style.transform = `translateY(${lastScroll*s}px)`;
  });
  requestAnimationFrame(loop);
})();

/* PARTIKEL */
function spawnFall(){
  for(let i=0;i<20;i++){
    const el = document.createElement('div');
    el.className='fall';
    el.textContent = Math.random()>0.5?'💗':'🌸';
    el.style.left = Math.random()*100+'vw';
    el.style.animationDuration = (3+Math.random()*2)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),5000);
  }
}
