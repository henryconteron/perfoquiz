(() => {
  'use strict';
  const {sources,cats,bank,interviews}=window.PERFO_DATA;
  const game=document.getElementById('game');
  const photos={
    bit:{file:'assets/broca.jpg',alt:'Pieza circular de metal vista de cerca, con un borde segmentado y pequeñas incrustaciones.',author:'Rob and Stephanie Levy',license:'CC BY 2.0',licenseUrl:'https://creativecommons.org/licenses/by/2.0/',source:'https://commons.wikimedia.org/wiki/File:Diamond_drill_bit_002.jpg',caption:'Detalle de una broca diamantina. Fotografía de referencia; no corresponde a un equipo identificado de Hubbard.'},
    boxes:{file:'assets/cajas-testigos.jpg',alt:'Cajas de madera con divisiones, cilindros de roca y marcas numéricas.',author:'kallerna',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',source:'https://commons.wikimedia.org/wiki/File:Drill_core_boxes_Onkalo_2.jpg',caption:'Testigos del proyecto Onkalo, Finlandia. Un ejemplo de cajas de muestras; no es un proyecto de Hubbard.'},
    core:{file:'assets/testigo.jpg',alt:'Una muestra oscura, larga y aproximadamente cilíndrica, en una canaleta blanca, con una herramienta a su lado.',author:'Rjhogarth',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',source:'https://commons.wikimedia.org/wiki/File:Drill_core.jpg',caption:'Testigo de carbón fotografiado por Rjhogarth. Referencia de una muestra recuperada; no permite identificar otras rocas por su color.'}
  };
  cats.push('Quiz con fotos');
  sources.photoBit=['Foto y descripción de una broca diamantina',photos.bit.source];
  sources.photoBoxes=['Foto de cajas de testigos de Onkalo',photos.boxes.source];
  sources.photoCore=['Foto de un testigo de carbón',photos.core.source];
  bank.push(
    {id:'v1',cat:5,img:'bit',q:'Mira la fotografía. ¿Qué herramienta muestra?',a:['Una broca diamantina.','Una manguera hidráulica.','Un casco de protección.','Un overshot.'],e:'La foto muestra una broca diamantina. Reconoce su cuerpo circular y el borde de corte; no la confundas con una herramienta de recuperación.',src:'photoBit'},
    {id:'v2',cat:5,img:'boxes',q:'¿Qué material ves organizado en estas cajas?',a:['Testigos o muestras de roca.','Barras nuevas de acero.','Mangueras de combustible.','Cables eléctricos.'],e:'Las divisiones contienen muestras recuperadas por perforación. En esta foto provienen de Onkalo, Finlandia.',src:'photoBoxes'},
    {id:'v3',cat:5,img:'core',q:'¿Cómo se llama este tipo de muestra recuperada de una perforación?',a:['Testigo o core.','Guarda de seguridad.','Válvula hidráulica.','Tubo interior vacío.'],e:'Es un testigo: una muestra recuperada del subsuelo. La descripción de esta fotografía indica que es carbón.',src:'photoCore'},
    {id:'v4',cat:5,img:'bit',q:'Observa la pieza. ¿En qué zona se aprecian las incrustaciones diamantadas de esta broca?',a:['En el borde o corona de corte.','En una manguera conectada.','En el casco del operador.','En una caja de herramientas fuera de la imagen.'],e:'La descripción y el detalle de la foto muestran diamantes en el borde de la broca. No necesitas memorizar su precio ni su modelo.',src:'photoBit'},
    {id:'v5',cat:5,img:'boxes',q:'Las cajas muestran divisiones y marcas numéricas. ¿Qué puedes observar directamente?',a:['Las muestras están distribuidas por filas y acompañadas de marcas.','La profundidad final de toda la perforación está confirmada.','La máquina opera sin riesgos.','Estas cajas pertenecen a Hubbard.'],e:'Describe lo que realmente aparece. La foto no confirma la profundidad total, las condiciones de operación ni una relación con Hubbard.',src:'photoBoxes'},
    {id:'v6',cat:5,img:'core',q:'¿Qué puedes afirmar sobre esta muestra usando solo su aspecto?',a:['Tiene forma aproximadamente cilíndrica; para saber su composición necesito más información.','Es oro puro porque es oscura.','Todas las muestras oscuras tienen la misma composición.','El color demuestra que la perforación fue segura.'],e:'Reconocer la forma de un testigo es distinto de identificar el material. Su composición requiere información adicional y análisis.',src:'own'}
  );
  bank.find(q=>q.id==='p1').img='boxes';
  bank.find(q=>q.id==='p2').img='core';
  const lookup=Object.fromEntries(bank.map(q=>[q.id,q]));
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const createSession=ids=>({deck:ids,orders:ids.map(()=>shuffle([0,1,2,3])),answers:[],index:0,done:false});
  const categoryDeck=c=>bank.filter(q=>c===-1?q.cat<5:q.cat===c).map(q=>q.id);
  const STORAGE_KEY='primer-turno-quiz-v2';
  let state={version:2,mode:'practice',category:0,practice:createSession(categoryDeck(0)),photo:createSession(categoryDeck(5)),exam:null,interview:0,revealed:false,checks:[]};
  let storageWorks=true;
  const validSession=s=>s&&Array.isArray(s.deck)&&s.deck.length>0&&s.deck.length<=bank.length&&new Set(s.deck).size===s.deck.length&&s.deck.every(id=>lookup[id])&&Array.isArray(s.orders)&&s.orders.length===s.deck.length&&s.orders.every(a=>Array.isArray(a)&&a.length===4&&[...a].sort().join(',')==='0,1,2,3')&&Array.isArray(s.answers)&&s.answers.length<=s.deck.length&&s.answers.every(a=>Number.isInteger(a)&&a>=0&&a<4)&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.deck.length&&typeof s.done==='boolean'&&(s.done?s.answers.length===s.deck.length:(s.answers.length===s.index||s.answers.length===s.index+1));
  try{
    const s=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(s?.version===2&&['practice','photo','exam','interview','guide'].includes(s.mode)&&Number.isInteger(s.category)&&s.category>=-1&&s.category<5&&validSession(s.practice)&&validSession(s.photo)&&(s.exam===null||validSession(s.exam))&&Number.isInteger(s.interview)&&s.interview>=0&&s.interview<interviews.length){state={...s,revealed:s.revealed===true,checks:Array.isArray(s.checks)?[...new Set(s.checks.filter(i=>Number.isInteger(i)&&i>=0&&i<4))]:[]};}
  }catch(e){storageWorks=false;}
  const score=s=>s.answers.filter(a=>a===0).length;
  const activeSession=()=>state.mode==='exam'?state.exam:state.mode==='photo'?state.photo:state.practice;
  function persist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(e){storageWorks=false;showStorage();}}
  function showStorage(){document.getElementById('storage-note').textContent=storageWorks?'Tu ronda se guarda en este navegador. Laptop y teléfono tienen avances separados.':'El navegador no permite guardar la ronda. Puedes seguir jugando mientras esta página esté abierta.';}
  function source(q){const s=sources[q.src];return s[1]?`<a href="${s[1]}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a>`:esc(s[0]);}
  function photo(q,reveal=false){
    if(!q.img)return '';
    const p=photos[q.img];
    return `<figure class="photo"><a href="${p.file}" target="_blank" aria-label="Abrir la fotografía completa"><img src="${p.file}" alt="${esc(p.alt)}" width="1200" height="800"></a><figcaption>Foto real · ${esc(p.author)} · <a href="${p.licenseUrl}" target="_blank" rel="noopener noreferrer">${p.license}</a> · <a href="${p.source}" target="_blank" rel="noopener noreferrer">Original y créditos</a></figcaption>${reveal?`<p class="photo-hint">${esc(p.caption)}</p>`:''}</figure>`;
  }
  function feedback(q,a){return `<div class="feedback ${a!==0?'error':''}" role="status"><strong>${a===0?'¡Correcto! +10 puntos':'Una decisión para repasar'}</strong><p>${esc(q.e)}</p>${a!==0?`<p><strong>Respuesta:</strong> ${esc(q.a[0])}</p>`:''}<span class="source">${source(q)}</span></div>`;}
  function questionView(s,isExam){
    const q=lookup[s.deck[s.index]],answered=s.answers.length>s.index;
    const selected=answered?s.answers[s.index]:null;
    const pct=Math.round(s.answers.length/s.deck.length*100);
    return `<div class="quiz-top"><span class="badge ${q.critical?'critical':''}">${esc(cats[q.cat])}${q.critical?' · Riesgo crítico':''}</span><span class="quiz-count">Pregunta ${s.index+1} / ${s.deck.length}</span></div><div class="progress" role="progressbar" aria-label="Preguntas respondidas" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="progress-fill" style="width:${pct}%"></div></div><div class="score-strip"><span>${isExam?'Modo examen · Corrección al terminar':`<strong>${score(s)*10}</strong> puntos · 10 por acierto`}</span><span>${s.answers.length} respondidas${isExam?'':` · ${score(s)} aciertos`}</span></div><h2 id="question" class="question" tabindex="-1">${esc(q.q)}</h2>${photo(q,answered&&!isExam)}<div class="answers" aria-label="Respuestas">${s.orders[s.index].map((a,i)=>{
      let cls='option',tag='';
      if(answered){if(isExam&&a===selected){cls+=' selected';tag='Tu elección';}else if(!isExam&&a===0){cls+=' correct';tag='Respuesta correcta';}else if(!isExam&&a===selected){cls+=' wrong';tag='Tu elección';}}
      return `<button type="button" class="${cls}" data-answer="${a}" ${answered?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span><span class="option-label">${esc(q.a[a])}${tag?`<span class="choice-status">${tag}</span>`:''}</span></button>`;
    }).join('')}</div>${answered&&!isExam?feedback(q,selected):''}${answered?`<div class="actions"><button type="button" class="primary" data-action="next">${s.index===s.deck.length-1?'Ver mi resultado':'Siguiente pregunta'}</button></div>`:''}`;
  }
  function results(s,isExam){
    const correct=score(s),missed=s.deck.filter((id,i)=>s.answers[i]!==0),critical=missed.filter(id=>lookup[id].critical).length;
    return `<div class="eyebrow intro-label">RONDA TERMINADA</div><h2 id="result" tabindex="-1">${isExam?'Tu simulacro':'Tu práctica'}</h2><div class="result-score">${correct}<span> / ${s.deck.length} aciertos</span></div><p class="result-note">${Math.round(correct/s.deck.length*100)} % · ${correct*10} puntos de práctica</p><p>${critical?`${critical} ${critical===1?'situación':'situaciones'} de seguridad crítica para repasar.`:'Sin errores en las situaciones de seguridad crítica de esta ronda.'}</p><table><thead><tr><th>Tema</th><th>Aciertos</th></tr></thead><tbody>${cats.map((cat,c)=>{const indices=s.deck.map((id,i)=>lookup[id].cat===c?i:-1).filter(i=>i>=0);return indices.length?`<tr><td>${esc(cat)}</td><td>${indices.filter(i=>s.answers[i]===0).length} / ${indices.length}</td></tr>`:'';}).join('')}</tbody></table><div class="actions">${missed.length?'<button type="button" class="primary" data-action="mistakes">Practicar mis errores</button>':''}<button type="button" class="secondary" data-action="again">${isExam?'Otro simulacro':'Otra ronda'}</button></div><h3 style="margin-top:30px">Revisa tus respuestas</h3>${s.deck.map((id,i)=>{const q=lookup[id];return `<details><summary><span class="review-status">${s.answers[i]===0?'Correcta':'Repasar'}</span>${esc(q.q)}</summary><div class="review-body">${photo(q,true)}<p class="review-answer">Elegiste: ${esc(q.a[s.answers[i]])}</p>${feedback(q,s.answers[i])}</div></details>`;}).join('')}`;
  }
  function interviewView(){
    const x=interviews[state.interview];
    return `<div class="quiz-top"><span class="badge">Práctica oral</span><span class="quiz-count">Pregunta ${state.interview+1} / ${interviews.length}</span></div><h2 id="question" class="question" tabindex="-1">${esc(x.q)}</h2><p class="intro-copy">Responde en voz alta durante 45–60 segundos. Después compara tu respuesta. No se graba audio.</p>${state.revealed?`<div class="interview-help">${esc(x.hint)}</div><details><summary>Ver un ejemplo para adaptar a mi experiencia</summary><p class="review-body">${esc(x.example)}</p></details><p class="self-count" id="selfscore" role="status">Autoevaluación: ${state.checks.length} de 4 puntos presentes.</p>${x.checks.map((t,i)=>`<label class="check"><input type="checkbox" data-check="${i}" ${state.checks.includes(i)?'checked':''}><span>${esc(t)}</span></label>`).join('')}<p class="small">Esta lista la marcas tú; no es una evaluación automática.</p>`:'<button type="button" class="primary" data-action="reveal">Comparar mi respuesta</button>'}<div class="actions"><button type="button" class="secondary" data-action="interview-prev" ${state.interview===0?'disabled':''}>Anterior</button><button type="button" class="secondary" data-action="interview-next">${state.interview===interviews.length-1?'Volver a la primera':'Otra pregunta'}</button></div>`;
  }
  function guideView(){
    const days=['Seguridad: completa la ronda y explica tres riesgos con tus palabras.','Perforación: reconoce testigo, broca, tubo interior y overshot; juega el quiz con fotos.','Cálculo: responde en papel y revisa unidades, tiempos y porcentajes.','Atención: compara códigos, completa series y sigue secuencias.','Trabajo en equipo: practica pedir aclaraciones y reportar condiciones inseguras.','Entrevista: usa ejemplos reales; dedica 45–60 segundos a cada respuesta.','Simulacro: responde las 20 preguntas y vuelve a practicar los errores.'];
    return `<div class="eyebrow intro-label">PREPARACIÓN DESDE CERO</div><h2>Tu ruta de siete días</h2><p class="intro-copy">25–30 minutos al día. Si te llaman antes, empieza por seguridad y entrevista.</p><ol class="guide-list">${days.map((d,i)=>`<li><strong>Día ${i+1}.</strong> ${esc(d)}</li>`).join('')}</ol><p><a href="guia.html">Leer la guía completa y las posibles pruebas</a></p><details open><summary>Qué está confirmado</summary><p class="review-body">El anuncio compartido acepta postulantes sin experiencia y destaca seguridad, aprendizaje y lógica. No se ha confirmado un examen oficial, la vigencia de la vacante, el sueldo ni los turnos. Los simulacros son ejercicios propios.</p></details><details><summary>Fuentes de estudio</summary><ul class="guide-list">${Object.values(sources).filter(s=>s[1]).map(s=>`<li><a href="${s[1]}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a></li>`).join('')}</ul><p class="small">Las referencias internacionales ayudan a estudiar principios; sigue siempre la inducción, los procedimientos locales y el manual del equipo.</p></details><details><summary>Créditos de las tres fotografías</summary>${Object.values(photos).map(p=>`<div class="credit"><strong>${esc(p.author)}</strong> · <a href="${p.source}" target="_blank" rel="noopener noreferrer">Fuente original</a> · <a href="${p.licenseUrl}" target="_blank" rel="noopener noreferrer">${p.license}</a><p>${esc(p.caption)}</p></div>`).join('')}<p class="small">Se redujo el tamaño y se recomprimieron las imágenes, sin recortar ni alterar su contenido. Las versiones de fotos CC BY-SA mantienen esa licencia. Sus autores no respaldan este juego.</p></details>`;
  }
  function draw(){
    document.querySelectorAll('.mode-nav [data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===state.mode)));
    document.getElementById('topic-list').innerHTML=cats.map((cat,c)=>`<button type="button" class="topic ${((state.mode==='practice'&&state.category===c)||(state.mode==='photo'&&c===5))?'active':''}" data-topic="${c}" aria-pressed="${((state.mode==='practice'&&state.category===c)||(state.mode==='photo'&&c===5))}"><span class="topic-index">${String(c+1).padStart(2,'0')}</span><span>${esc(cat)}</span><span class="topic-count">${bank.filter(q=>q.cat===c).length} retos</span></button>`).join('');
    if(state.mode==='interview')game.innerHTML=interviewView();
    else if(state.mode==='guide')game.innerHTML=guideView();
    else if(state.mode==='exam'&&!state.exam)game.innerHTML='<div class="eyebrow intro-label">SIMULACRO DE PREPARACIÓN</div><h2>Una ronda, todos los temas.</h2><div class="exam-count">20 preguntas</div><p class="intro-copy">7 de seguridad, 4 de perforación, 4 de cálculo, 3 de lógica y 2 de trabajo en equipo. Las respuestas aparecen al terminar. Sin límite de tiempo.</p><p class="small">Las preguntas y el formato son de práctica, no una prueba oficial de Hubbard.</p><button type="button" class="primary" data-action="start-exam">Comenzar simulacro</button>';
    else{const s=activeSession();game.innerHTML=s.done?results(s,state.mode==='exam'):questionView(s,state.mode==='exam');}
    showStorage();
  }
  function examSession(){return createSession(shuffle([7,4,4,3,2].flatMap((n,c)=>shuffle(categoryDeck(c)).slice(0,n))));}
  function focusQuestion(){(document.getElementById('question')||document.getElementById('result'))?.focus({preventScroll:true});}
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||b.disabled)return;
    if(b.dataset.mode){state.mode=b.dataset.mode;draw();persist();return;}
    if(b.dataset.topic!==undefined){const c=Number(b.dataset.topic);if(c===5){state.mode='photo';}else{state.mode='practice';if(state.category!==c){state.category=c;state.practice=createSession(categoryDeck(c));}}draw();persist();game.scrollIntoView({behavior:'auto',block:'start'});return;}
    const session=activeSession();
    if(b.dataset.answer!==undefined){if(!['practice','photo','exam'].includes(state.mode)||!session||session.done||session.answers.length>session.index)return;session.answers.push(Number(b.dataset.answer));draw();persist();return;}
    const action=b.dataset.action;
    if(action==='next'&&session&&session.answers.length===session.index+1){if(session.index===session.deck.length-1)session.done=true;else session.index++;}
    else if(action==='start-exam')state.exam=examSession();
    else if(action==='again'){if(state.mode==='exam')state.exam=examSession();else if(state.mode==='photo')state.photo=createSession(shuffle(categoryDeck(5)));else state.practice=createSession(shuffle(categoryDeck(state.category)));}
    else if(action==='mistakes'&&session){const ids=session.deck.filter((id,i)=>session.answers[i]!==0);if(ids.length){if(state.mode==='photo'){state.photo=createSession(shuffle(ids));}else{state.category=-1;state.practice=createSession(shuffle(ids));state.mode='practice';}}}
    else if(action==='reveal')state.revealed=true;
    else if(action==='interview-prev'||action==='interview-next'){state.interview=action==='interview-prev'?Math.max(0,state.interview-1):(state.interview+1)%interviews.length;state.revealed=false;state.checks=[];}
    else return;
    draw();persist();focusQuestion();
    if(action==='next')game.scrollIntoView({behavior:'auto',block:'start'});
  });
  document.addEventListener('change',event=>{if(event.target.dataset.check!==undefined){const i=Number(event.target.dataset.check);state.checks=event.target.checked?[...new Set([...state.checks,i])]:state.checks.filter(v=>v!==i);persist();document.getElementById('selfscore').textContent=`Autoevaluación: ${state.checks.length} de 4 puntos presentes.`;}});
  draw();
})();
