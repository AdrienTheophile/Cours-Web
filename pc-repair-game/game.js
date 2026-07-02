// ============================================================
//  PC REPAIR SHOP — Visual Edition — Game Engine
// ============================================================

const CONFIG = {
    startBudget: 500,
    totalClients: 10,
    repairPay: 80,
    firstTryPts: 100,
    secondTryPts: 50,
    wrongPts: -20,
    diffMult: { 1: 1, 2: 1.5, 3: 2 }
};

const COMPONENTS = [
    { id:'psu',     name:'Alimentation (PSU)',    price:65,  icon:'⚡', desc:'Fournit l\'énergie à tous les composants' },
    { id:'ram',     name:'Barrette RAM',          price:45,  icon:'🔲', desc:'Mémoire vive ultra-rapide' },
    { id:'hdd',     name:'Disque Dur / SSD',      price:55,  icon:'💾', desc:'Stockage permanent des données' },
    { id:'gpu',     name:'Carte Graphique (GPU)',  price:220, icon:'🖥️', desc:'Gère l\'affichage et les jeux' },
    { id:'cpu',     name:'Processeur (CPU)',       price:260, icon:'🧠', desc:'Le cerveau de l\'ordinateur' },
    { id:'mobo',    name:'Carte Mère',            price:160, icon:'📟', desc:'Relie tous les composants' },
    { id:'fan',     name:'Ventilateur',            price:20,  icon:'🌀', desc:'Refroidit le processeur' },
    { id:'nic',     name:'Carte Réseau',           price:30,  icon:'📡', desc:'Connexion internet' },
    { id:'thermal', name:'Pâte Thermique',         price:8,   icon:'🧴', desc:'Transfert thermique CPU' },
    { id:'cable',   name:'Câbles / Connectique',   price:12,  icon:'🔌', desc:'Connectique vidéo et données' },
];

const FAULTS = [
    // ===== FACILE (1) =====
    {
        comp:'psu', difficulty:1,
        symptoms:[
            "Mon PC ne s'allume plus du tout ! Quand j'appuie sur le bouton, rien ne se passe. Pas de lumière, pas de bruit, rien.",
            "J'ai branché mon ordinateur ce matin et impossible de le démarrer. C'est comme s'il était mort.",
            "Mon PC a fait un « clac » bizarre hier soir et depuis, il ne veut plus s'allumer."
        ],
        diag:{
            visual:"Aucune LED ne s'allume à l'intérieur du boîtier. Le ventilateur de l'alimentation est complètement immobile.",
            sound:"Silence total. Aucun son ne provient de la machine.",
            temperature:"Impossible de mesurer, le PC ne démarre pas du tout.",
            multimeter:"⚠️ Tension de 0V en sortie de l'alimentation. Le bloc ne fournit aucun courant !",
            bios:"Impossible d'accéder au BIOS. L'écran reste éteint."
        }
    },
    {
        comp:'cable', difficulty:1,
        symptoms:[
            "Mon écran affiche « Pas de signal » alors que mon PC a l'air de tourner. Les ventilateurs marchent et tout.",
            "Depuis que j'ai déplacé mon bureau, l'écran ne détecte plus rien. Le PC semble allumé pourtant."
        ],
        diag:{
            visual:"Le PC s'allume normalement, LED vertes. Mais le câble vidéo semble mal branché à l'arrière.",
            sound:"Le PC émet un bip court au démarrage (normal). Les ventilateurs tournent.",
            temperature:"Températures normales. Le système fonctionne en interne.",
            multimeter:"Alimentation OK. Tensions correctes sur tous les rails.",
            bios:"L'écran affiche « No Signal ». Impossible de voir quoi que ce soit."
        }
    },
    {
        comp:'fan', difficulty:1,
        symptoms:[
            "Mon PC s'éteint tout seul au bout de 10-15 minutes ! Et quand je le rallume, ça recommence.",
            "Mon ordinateur chauffe énormément et finit par se couper. En plus, il fait un bruit bizarre."
        ],
        diag:{
            visual:"Le ventilateur du processeur tourne par à-coups. Il semble bloqué par un amas de poussière.",
            sound:"🔊 Bruit de grattement/cliquetis du ventilateur CPU. Il tourne de façon irrégulière.",
            temperature:"🌡️ CRITIQUE : CPU à 95°C ! Monte très vite après le démarrage.",
            multimeter:"Alimentation OK. Tensions normales sur tous les connecteurs.",
            bios:"Le BIOS affiche : « CPU Fan Speed Error! CPU temperature too high! »"
        }
    },
    {
        comp:'nic', difficulty:1,
        symptoms:[
            "Mon PC marche bien sauf que je n'ai plus du tout internet ! Le WiFi ne détecte rien et le câble ethernet non plus.",
            "Impossible de me connecter à internet. Windows dit qu'aucun adaptateur réseau n'est détecté."
        ],
        diag:{
            visual:"Le PC fonctionne normalement. Pas de LED d'activité sur le port Ethernet.",
            sound:"Aucun son anormal. Le PC est silencieux.",
            temperature:"Toutes les températures sont normales.",
            multimeter:"Alimentation OK. Pas de problème électrique.",
            bios:"Le BIOS ne liste aucun contrôleur réseau. La carte réseau n'est pas détectée !"
        }
    },

    // ===== MOYEN (2) =====
    {
        comp:'ram', difficulty:2,
        symptoms:[
            "Mon PC fait des bips au démarrage et l'écran reste noir. Il bipe 3 fois, puis s'arrête, puis ça recommence.",
            "Depuis ce matin, des bips répétitifs quand je l'allume et rien ne s'affiche."
        ],
        diag:{
            visual:"Les LED s'allument. Une LED rouge est allumée près des slots de RAM sur la carte mère.",
            sound:"🔊 3 bips courts en boucle. Code d'erreur BIOS = problème mémoire.",
            temperature:"Le PC ne reste pas assez longtemps allumé pour mesurer.",
            multimeter:"Alimentation OK. Tension 3.3V correcte sur les slots RAM.",
            bios:"Le POST échoue à l'étape mémoire. Erreur détectée."
        }
    },
    {
        comp:'hdd', difficulty:2,
        symptoms:[
            "Mon PC met 10 minutes à démarrer ! Et une fois lancé, tout est ultra lent.",
            "Mon PC rame terriblement. Chaque programme met des plombes et j'entends des cliquetis bizarres."
        ],
        diag:{
            visual:"Le PC démarre, tous les composants semblent en place. Rien d'anormal visible.",
            sound:"🔊 Des cliquetis réguliers proviennent du disque dur. Pas normal.",
            temperature:"Températures normales pour CPU (45°C) et GPU (40°C).",
            multimeter:"Alimentation OK. Tensions dans les normes.",
            bios:"Le BIOS détecte le disque mais lentement. Erreurs SMART : « Reallocated Sector Count: WARNING »."
        }
    },
    {
        comp:'gpu', difficulty:2,
        symptoms:[
            "Mon écran affiche des trucs bizarres ! Lignes de couleurs, carrés qui clignotent. L'image est cassée.",
            "Quand je lance un jeu, l'écran se remplit d'artefacts colorés et le PC plante."
        ],
        diag:{
            visual:"Artefacts graphiques (lignes, pixels parasites) visibles même sur le bureau Windows.",
            sound:"Les ventilateurs de la carte graphique tournent très vite, presque à fond.",
            temperature:"🌡️ GPU à 92°C au repos ! Anormalement élevé.",
            multimeter:"Alimentation OK. Le connecteur PCIe de la carte graphique est bien branché.",
            bios:"Le BIOS s'affiche correctement. Le problème apparaît au chargement de Windows."
        }
    },
    {
        comp:'thermal', difficulty:2,
        symptoms:[
            "Mon PC est super bruyant et rame quand je fais quelque chose d'un peu lourd. Il chauffe beaucoup.",
            "Mon PC surchauffe constamment. Les jeux qui marchaient font maintenant tout laguer."
        ],
        diag:{
            visual:"Le ventilateur CPU tourne normalement. Pas de poussière excessive visible.",
            sound:"Le ventilateur CPU tourne à vitesse maximale en permanence. Très bruyant.",
            temperature:"🌡️ CPU à 88°C au repos ! 100°C en charge. Throttling thermique activé.",
            multimeter:"Alimentation OK. Tout correctement alimenté.",
            bios:"Le BIOS indique : « CPU Temperature Warning ». Température critique même à faible charge."
        }
    },
    {
        comp:'hdd', difficulty:2,
        symptoms:[
            "Mon PC affiche « Système d'exploitation introuvable » au démarrage. Hier il marchait !",
            "Écran noir : « No bootable device found ». Impossible de démarrer Windows."
        ],
        diag:{
            visual:"Le PC s'allume, LED vertes. Tout semble normal visuellement.",
            sound:"🔊 Le disque dur ne fait AUCUN bruit. Normalement on devrait entendre un ronronnement.",
            temperature:"CPU et GPU normaux. Le système ne boot pas pour mesurer le reste.",
            multimeter:"Alimentation OK. Le câble SATA est branché mais le disque ne vibre pas.",
            bios:"Le BIOS ne détecte AUCUN disque dur/SSD. L'emplacement stockage est vide."
        }
    },
    {
        comp:'gpu', difficulty:2,
        symptoms:[
            "Écran complètement noir au démarrage, mais j'entends le son de Windows. Bizarre non ?",
            "Le PC s'allume, ventilateurs OK, son Windows audible, mais rien à l'écran. Noir total."
        ],
        diag:{
            visual:"Le PC tourne, LED allumées. MAIS les ventilateurs de la carte graphique ne tournent PAS.",
            sound:"Son de démarrage Windows audible. Le PC fonctionne, juste pas d'affichage.",
            temperature:"CPU normal (48°C). Impossible de mesurer le GPU sans affichage.",
            multimeter:"Alimentation OK. Le connecteur 6-pin du GPU reçoit bien du courant.",
            bios:"En branchant l'écran sur la carte mère, le BIOS s'affiche. Le GPU n'est pas détecté en PCIe."
        }
    },

    // ===== DIFFICILE (3) =====
    {
        comp:'mobo', difficulty:3,
        symptoms:[
            "Mon PC redémarre en boucle ! Il commence à démarrer, puis se coupe et recommence. Cycle sans fin.",
            "Mon ordinateur n'arrête pas de rebooter. Il arrive presque au logo Windows et paf, ça repart."
        ],
        diag:{
            visual:"LED de la carte mère clignotent de manière erratique. Un condensateur semble gonflé près du socket CPU.",
            sound:"Le PC émet un bip, commence à démarrer, puis se coupe. Cycle toutes les 10 secondes.",
            temperature:"Impossible de mesurer, le système redémarre avant d'avoir le temps.",
            multimeter:"L'alimentation fournit les bonnes tensions. Le problème n'est pas côté PSU.",
            bios:"Le BIOS se lance parfois à moitié mais plante avant de pouvoir naviguer."
        }
    },
    {
        comp:'cpu', difficulty:3,
        symptoms:[
            "Windows plante direct avec un écran bleu. Même la réinstallation plante pendant l'installation !",
            "Écrans bleus constants : WHEA_UNCORRECTABLE_ERROR, MACHINE_CHECK_EXCEPTION... C'est la folie."
        ],
        diag:{
            visual:"Visuellement, tout semble normal. Pas de dommage visible, rien de mal branché.",
            sound:"Un bip court au démarrage (normal), le PC tourne sans bruit suspect avant de planter.",
            temperature:"CPU monte à 75°C sans charge, élevé mais pas critique.",
            multimeter:"Alimentation OK. Tensions stables.",
            bios:"Le BIOS signale des « Machine Check Errors ». Le CPU échoue à certains tests intégrés."
        }
    },
    {
        comp:'ram', difficulty:3,
        symptoms:[
            "Mon PC freeze de façon aléatoire. Parfois 5 minutes, parfois 2 heures. Et parfois un écran bleu.",
            "Le PC se fige sans prévenir. Souris bloquée, tout gelé. Redémarrage forcé obligatoire."
        ],
        diag:{
            visual:"Rien d'anormal visible. Tous les composants sont correctement installés.",
            sound:"Aucun bruit suspect. Ventilateurs normaux et silencieux.",
            temperature:"Températures normales : CPU 45°C, GPU 40°C. Pas de surchauffe.",
            multimeter:"Alimentation stable. Pas de fluctuation.",
            bios:"Test mémoire intégré : erreurs intermittentes sur le canal A. « Memory error detected »."
        }
    },
    {
        comp:'psu', difficulty:3,
        symptoms:[
            "Le PC s'éteint brutalement quand je lance un jeu ou un logiciel gourmand. Le reste du temps ça va.",
            "Dès que je fais un truc qui demande de la puissance, le PC se coupe d'un coup. Pas d'écran bleu."
        ],
        diag:{
            visual:"Le PC redémarre normalement après. Pas de dommage visible.",
            sound:"Juste avant la coupure, un léger « clic » venant de l'alimentation.",
            temperature:"CPU et GPU dans les normes avant la coupure (65°C et 70°C).",
            multimeter:"⚠️ Micro-coupures sur le rail 12V sous charge. La tension chute sous 11V.",
            bios:"L'alimentation est 300W mais la config nécessite au moins 450W sous charge."
        }
    },
    {
        comp:'mobo', difficulty:3,
        symptoms:[
            "Le PC s'allume 2 secondes puis s'éteint. Les ventilateurs tournent brièvement et tout se coupe.",
            "Quand je démarre, tout s'allume une fraction de seconde puis s'éteint immédiatement."
        ],
        diag:{
            visual:"Pendant le bref allumage, certaines LED de la carte mère restent orange/rouge au lieu de vert.",
            sound:"Bref ronronnement des ventilateurs (1-2 sec), puis silence. Pas de bip du BIOS.",
            temperature:"Impossible de mesurer, le PC ne reste pas allumé assez longtemps.",
            multimeter:"L'alimentation testée seule fournit les bonnes tensions. Le problème n'est pas le PSU.",
            bios:"Le PC se coupe avant même que l'écran ne s'allume."
        }
    },
];

const NAMES = [
    "Lucas M.","Emma B.","Hugo D.","Chloé R.","Léo P.","Manon V.","Nathan L.","Jade T.",
    "Thomas G.","Louise C.","Enzo F.","Léa S.","Mathis H.","Camille A.","Raphaël N.","Sarah K.",
    "Jules D.","Zoé M.","Adam B.","Lina R.","Louis P.","Alice F.","Ethan C.","Inès V.",
    "Noah T.","Mila G.","Gabin L.","Lola H.","Arthur S.","Clara D."
];
const AVATARS = ['👦','👧','👨','👩','🧑','👴','👵','🧔','👱‍♀️','👱','👩‍🦰','👨‍🦱'];

// === STATE ===
let S = {};

// === DOM CACHE ===
let D = {};

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    cacheDOM();
    bindEvents();
});

function cacheDOM() {
    D.scrMenu   = document.getElementById('screen-menu');
    D.scrGame   = document.getElementById('screen-game');
    D.scrGO     = document.getElementById('screen-gameover');
    D.vBudget   = document.getElementById('v-budget');
    D.vScore    = document.getElementById('v-score');
    D.vClients  = document.getElementById('v-clients');
    D.vRep      = document.getElementById('v-rep');
    D.clAvatar  = document.getElementById('cl-avatar');
    D.clName    = document.getElementById('cl-name');
    D.clBadge   = document.getElementById('cl-badge');
    D.clSymptom = document.getElementById('cl-symptom');
    D.wrongPills= document.getElementById('wrong-pills');
    D.toolGrid  = document.getElementById('tool-grid');
    D.diagResult= document.getElementById('diag-result');
    D.diagText  = document.getElementById('diag-text');
    D.selBar    = document.getElementById('selection-bar');
    D.selName   = document.getElementById('sel-name');
    D.selPrice  = document.getElementById('sel-price');
    D.selDesc   = document.getElementById('sel-desc');
    D.btnRepair = document.getElementById('btn-repair');
    D.resultOv  = document.getElementById('result-overlay');
    D.histList  = document.getElementById('hist-list');
    D.modalManual = document.getElementById('modal-manual');
    D.modalRules  = document.getElementById('modal-rules');
    D.goStats   = document.getElementById('go-stats');
    D.confetti  = document.getElementById('confetti-box');
}

function bindEvents() {
    document.getElementById('btn-start').addEventListener('click', startGame);
    document.getElementById('btn-manual').addEventListener('click', () => showModal('manual'));
    document.getElementById('btn-manual2').addEventListener('click', () => showModal('manual'));
    document.getElementById('btn-rules').addEventListener('click', () => showModal('rules'));
    document.getElementById('x-manual').addEventListener('click', () => hideModal('manual'));
    document.getElementById('x-rules').addEventListener('click', () => hideModal('rules'));
    D.modalManual.addEventListener('click', e => { if(e.target===D.modalManual) hideModal('manual'); });
    D.modalRules.addEventListener('click', e => { if(e.target===D.modalRules) hideModal('rules'); });

    // Diagnostic tools
    D.toolGrid.addEventListener('click', e => {
        const btn = e.target.closest('.tool-btn');
        if(btn && !btn.classList.contains('used')) {
            runDiag(btn.dataset.tool);
            btn.classList.add('used');
        }
    });

    // PC components click
    document.querySelectorAll('.pc-comp').forEach(el => {
        el.addEventListener('click', () => selectComp(el.dataset.id));
    });

    // Confirm repair
    D.btnRepair.addEventListener('click', doRepair);

    // Game over
    document.getElementById('btn-again').addEventListener('click', startGame);
    document.getElementById('btn-home').addEventListener('click', () => showScreen('menu'));

    // Escape key
    document.addEventListener('keydown', e => {
        if(e.key==='Escape') { hideModal('manual'); hideModal('rules'); }
    });
}

// === NAVIGATION ===
function showScreen(id) {
    [D.scrMenu, D.scrGame, D.scrGO].forEach(s => s.classList.remove('active'));
    document.getElementById('screen-'+id).classList.add('active');
}
function showModal(n) { document.getElementById('modal-'+n).classList.remove('hidden'); }
function hideModal(n) { document.getElementById('modal-'+n).classList.add('hidden'); }

// === START ===
function startGame() {
    S = {
        budget: CONFIG.startBudget,
        score: 0,
        rep: 5,
        client: 0,
        total: CONFIG.totalClients,
        fault: null,
        selected: null,
        attempts: 0,
        wrong: [],
        diagUsed: [],
        history: [],
        usedFaults: [],
        over: false
    };
    showScreen('game');
    updateHUD();
    D.histList.innerHTML = '<p style="color:var(--text3);font-size:.75rem;font-style:italic;">Aucune réparation encore.</p>';
    nextClient();
}

// === NEXT CLIENT ===
function nextClient() {
    hideResult();
    S.client++;
    S.attempts = 0;
    S.wrong = [];
    S.diagUsed = [];
    S.selected = null;

    if(S.client > S.total || S.budget <= 0) { endGame(); return; }

    S.fault = makeFault();
    updateHUD();
    updateClient();
    resetDiag();
    clearSelect();
    clearHighlights();
    D.wrongPills.innerHTML = '';
}

// === GENERATE FAULT ===
function makeFault() {
    const prog = S.client / S.total;
    let diff;
    if(prog <= 0.3) diff = 1;
    else if(prog <= 0.7) diff = Math.random()<.6 ? 2 : 1;
    else diff = Math.random()<.5 ? 3 : 2;

    let pool = FAULTS.map((f,i)=>({...f,_i:i})).filter(f=>f.difficulty===diff && !S.usedFaults.includes(f._i));
    if(!pool.length) pool = FAULTS.map((f,i)=>({...f,_i:i})).filter(f=>!S.usedFaults.includes(f._i));
    if(!pool.length) { S.usedFaults=[]; pool = FAULTS.map((f,i)=>({...f,_i:i})); }

    const pick = pool[Math.floor(Math.random()*pool.length)];
    S.usedFaults.push(pick._i);

    return {
        name: NAMES[Math.floor(Math.random()*NAMES.length)],
        avatar: AVATARS[Math.floor(Math.random()*AVATARS.length)],
        symptom: pick.symptoms[Math.floor(Math.random()*pick.symptoms.length)],
        comp: pick.comp,
        diag: pick.diag,
        difficulty: pick.difficulty
    };
}

// === UI UPDATES ===
function updateHUD() {
    D.vBudget.textContent = S.budget+'€';
    D.vScore.textContent = S.score;
    D.vClients.textContent = S.client+'/'+S.total;
    D.vRep.textContent = '★'.repeat(Math.max(0,Math.round(S.rep)))+'☆'.repeat(Math.max(0,5-Math.round(S.rep)));
    D.vBudget.classList.toggle('danger', S.budget < 100);
}

function updateClient() {
    const f = S.fault;
    D.clAvatar.textContent = f.avatar;
    D.clName.textContent = f.name;

    const b = D.clBadge;
    b.className = 'badge';
    if(f.difficulty===1) { b.classList.add('badge-easy'); b.textContent='⚡ FACILE'; }
    else if(f.difficulty===2) { b.classList.add('badge-med'); b.textContent='⚙️ MOYEN'; }
    else { b.classList.add('badge-hard'); b.textContent='🔥 DIFFICILE'; }

    typeText(f.symptom);
}

function typeText(text) {
    D.clSymptom.innerHTML = '<span style="color:var(--cyan)">...</span>';
    setTimeout(() => {
        D.clSymptom.textContent = '';
        let i=0;
        const speed = Math.min(18, 2000/text.length);
        (function tick(){
            if(i<text.length) { D.clSymptom.textContent += text[i++]; setTimeout(tick, speed); }
        })();
    }, 400);
}

// === DIAGNOSTICS ===
function runDiag(tool) {
    if(!S.fault) return;
    const txt = S.fault.diag[tool];
    if(!txt) return;
    S.diagUsed.push(tool);
    D.diagResult.classList.remove('hidden');
    D.diagText.textContent = txt;
    D.diagResult.style.animation='none';
    D.diagResult.offsetHeight;
    D.diagResult.style.animation='slideUp .3s ease';
}

function resetDiag() {
    D.toolGrid.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('used'));
    D.diagResult.classList.add('hidden');
    D.diagText.textContent = '';
}

// === COMPONENT SELECTION (click on PC) ===
function selectComp(id) {
    if(S.wrong.includes(id)) return;
    S.selected = id;

    // Highlight in PC
    clearHighlights();
    const el = document.querySelector(`.pc-comp[data-id="${id}"]`);
    if(el) el.classList.add('selected');

    // Show selection bar
    const c = COMPONENTS.find(x=>x.id===id);
    D.selName.textContent = c.icon+' '+c.name;
    D.selPrice.textContent = 'Coût : '+c.price+'€';
    D.selDesc.textContent = c.desc;
    D.selBar.classList.remove('hidden');
    D.selBar.style.animation='none';
    D.selBar.offsetHeight;
    D.selBar.style.animation='slideUp .3s ease';
}

function clearSelect() {
    S.selected = null;
    D.selBar.classList.add('hidden');
}

function clearHighlights() {
    document.querySelectorAll('.pc-comp').forEach(el => {
        el.classList.remove('selected','wrong','correct','disabled');
    });
}

// === REPAIR ===
function doRepair() {
    if(!S.selected || !S.fault) return;

    const selId = S.selected;
    const correctId = S.fault.comp;
    const comp = COMPONENTS.find(c=>c.id===selId);

    S.budget -= comp.price;
    S.attempts++;

    if(selId === correctId) {
        repairOK(comp);
    } else {
        repairFail(comp, correctId);
    }
    updateHUD();
}

function repairOK(comp) {
    const f = S.fault;
    const mult = CONFIG.diffMult[f.difficulty];
    let pts;
    if(S.attempts===1) pts = Math.round(CONFIG.firstTryPts*mult);
    else if(S.attempts===2) pts = Math.round(CONFIG.secondTryPts*mult);
    else pts = Math.round(20*mult);

    const pay = Math.round(CONFIG.repairPay*mult);
    S.budget += pay;
    S.score += pts;

    clearHighlights();
    const el = document.querySelector(`.pc-comp[data-id="${comp.id}"]`);
    if(el) el.classList.add('correct');
    sparks();

    addHistory(true, f.name, comp, S.attempts, pts, pay);

    showResult({
        ok:true,
        title: S.attempts===1 ? '🎉 PARFAIT !' : '✅ RÉPARÉ !',
        msg: S.attempts===1
            ? `Bravo ! Du premier coup ! C'était bien ${comp.icon} ${comp.name}.`
            : `Le PC est réparé ! C'était ${comp.icon} ${comp.name}. ${S.attempts} essai(s).`,
        stats:[
            {label:'Points', val:'+'+pts, ok:true},
            {label:'Argent', val:'+'+pay+'€', ok:true},
            {label:'Essais', val:S.attempts},
        ],
        btn: S.client>=S.total ? '📊 RÉSULTATS' : '👤 CLIENT SUIVANT',
        next: ()=>nextClient()
    });
}

function repairFail(comp, correctId) {
    const f = S.fault;
    S.score = Math.max(0, S.score+CONFIG.wrongPts);
    if(S.rep>1) S.rep -= 0.5;
    S.wrong.push(comp.id);

    clearHighlights();
    const el = document.querySelector(`.pc-comp[data-id="${comp.id}"]`);
    if(el) { el.classList.add('wrong'); }

    // Budget check
    if(S.budget <= 0) {
        const cc = COMPONENTS.find(c=>c.id===correctId);
        addHistory(false, f.name, comp, S.attempts, CONFIG.wrongPts, -comp.price);
        showResult({
            ok:false,
            title:'💸 FAILLITE !',
            msg:`Budget épuisé ! La vraie panne était : ${cc.icon} ${cc.name}.`,
            stats:[{label:'Budget',val:S.budget+'€',ok:false}],
            btn:'📊 RÉSULTATS',
            next:()=>endGame()
        });
        return;
    }

    showResult({
        ok:false,
        title:'❌ MAUVAIS COMPOSANT',
        msg:`${comp.icon} ${comp.name} n'était pas la cause ! Le PC ne marche toujours pas. -${comp.price}€ et ${Math.abs(CONFIG.wrongPts)} pts perdus.`,
        stats:[
            {label:'Perdu',val:'-'+comp.price+'€',ok:false},
            {label:'Points',val:CONFIG.wrongPts,ok:false},
            {label:'Budget',val:S.budget+'€'},
        ],
        btn:'🔧 RÉESSAYER',
        next:()=>{
            hideResult();
            clearSelect();
            updateWrongPills();
            // Disable wrong components visually
            S.wrong.forEach(wid => {
                const we = document.querySelector(`.pc-comp[data-id="${wid}"]`);
                if(we) we.classList.add('disabled');
            });
        }
    });
}

function updateWrongPills() {
    D.wrongPills.innerHTML = '';
    S.wrong.forEach(wid => {
        const c = COMPONENTS.find(x=>x.id===wid);
        if(c) {
            const sp = document.createElement('span');
            sp.className='wrong-pill';
            sp.textContent='❌ '+c.icon+' '+c.name;
            D.wrongPills.appendChild(sp);
        }
    });
}

// === RESULT OVERLAY ===
function showResult({ok,title,msg,stats,btn,next}) {
    D.resultOv.classList.remove('hidden');
    D.resultOv.innerHTML = `
        <div class="result-card">
            <div class="result-icon">${ok?'🎉':'😓'}</div>
            <h2 class="result-title ${ok?'ok':'ko'}">${title}</h2>
            <p class="result-msg">${msg}</p>
            <div class="result-stats">
                ${stats.map(s=>`<div class="r-stat">
                    <div class="r-label">${s.label}</div>
                    <div class="r-val ${s.ok===true?'plus':s.ok===false?'minus':''}">${s.val}</div>
                </div>`).join('')}
            </div>
            <button class="btn ${ok?'btn-go':'btn-warn'}" id="btn-next">${btn}</button>
        </div>`;
    document.getElementById('btn-next').addEventListener('click', next);
}

function hideResult() {
    D.resultOv.classList.add('hidden');
    D.resultOv.innerHTML = '';
}

// === HISTORY ===
function addHistory(ok, name, comp, attempts, pts, money) {
    S.history.push({ok,name,comp,attempts,pts,money});
    renderHistory();
}

function renderHistory() {
    D.histList.innerHTML = '';
    S.history.forEach(h => {
        const d = document.createElement('div');
        d.className='hist-entry';
        d.innerHTML=`<span>${h.ok?'✅':'❌'}</span><span>${h.name} → ${h.comp.icon} ${h.comp.name}</span>
            <span class="hist-pts" style="color:${h.ok?'var(--green)':'var(--red)'}">${h.pts>0?'+':''}${h.pts}</span>`;
        D.histList.appendChild(d);
    });
}

// === GAME OVER ===
function endGame() {
    S.over=true; hideResult();

    const wins = S.history.filter(h=>h.ok).length;
    const first = S.history.filter(h=>h.ok&&h.attempts===1).length;
    const played = Math.min(S.client, S.total);
    const acc = played>0 ? Math.round(first/played*100) : 0;

    const rank = getRank(S.score);
    document.getElementById('r-emoji').textContent = rank.e;
    document.getElementById('r-name').textContent = rank.t;
    document.getElementById('r-desc').textContent = rank.d;
    document.getElementById('go-title').textContent = S.budget<=0 ? '💸 FAILLITE !' : '🏁 FIN DE JOURNÉE';
    document.getElementById('go-sub').textContent = S.budget<=0
        ? 'Votre atelier a fait faillite... Réessayez !'
        : 'Voici le bilan de votre journée !';

    D.goStats.innerHTML = `
        <div class="go-stat"><div class="gs-icon">⭐</div><div class="gs-label">Score</div><div class="gs-val">${S.score}</div></div>
        <div class="go-stat"><div class="gs-icon">💰</div><div class="gs-label">Budget</div><div class="gs-val" style="color:${S.budget>0?'var(--green)':'var(--red)'}">${S.budget}€</div></div>
        <div class="go-stat"><div class="gs-icon">🔧</div><div class="gs-label">PC réparés</div><div class="gs-val">${wins}/${played}</div></div>
        <div class="go-stat"><div class="gs-icon">🎯</div><div class="gs-label">Précision 1er coup</div><div class="gs-val">${acc}%</div></div>`;

    showScreen('gameover');
    if(S.score>=500) confetti();
}

function getRank(s) {
    if(s>=1000) return {e:'🏆',t:'MAÎTRE TECHNICIEN',d:'Légende de la réparation PC !'};
    if(s>=800)  return {e:'🛠️',t:'EXPERT',d:'Les pannes n\'ont aucun secret pour vous !'};
    if(s>=500)  return {e:'⚙️',t:'TECHNICIEN CONFIRMÉ',d:'Solide ! Bon diagnostic.'};
    if(s>=200)  return {e:'🔧',t:'TECHNICIEN JUNIOR',d:'Bon début, continuez !'};
    return {e:'🔰',t:'STAGIAIRE',d:'Tout le monde commence quelque part !'};
}

// === EFFECTS ===
function sparks() {
    const pc = document.getElementById('pc-case');
    for(let i=0;i<15;i++){
        const s = document.createElement('div');
        s.style.cssText=`position:absolute;width:5px;height:5px;border-radius:50%;z-index:20;pointer-events:none;
            left:50%;top:50%;background:${i%2?'#22c55e':'#f59e0b'};`;
        const a = (Math.PI*2*i)/15, dist=40+Math.random()*60;
        s.style.setProperty('--tx',Math.cos(a)*dist+'px');
        s.style.setProperty('--ty',Math.sin(a)*dist+'px');
        s.style.animation=`sparkFly ${.3+Math.random()*.4}s ease-out forwards`;
        pc.appendChild(s);
        setTimeout(()=>s.remove(),1000);
    }
}

// sparkFly keyframes injected if not in CSS
if(!document.querySelector('#spark-style')) {
    const st=document.createElement('style'); st.id='spark-style';
    st.textContent=`@keyframes sparkFly{0%{opacity:1;transform:translate(0,0) scale(1)}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0)}}`;
    document.head.appendChild(st);
}

function confetti() {
    const box = D.confetti;
    const colors=['#22c55e','#06b6d4','#f59e0b','#a855f7','#ec4899','#ef4444'];
    for(let i=0;i<60;i++){
        setTimeout(()=>{
            const c=document.createElement('div');
            c.className='confetti-p';
            c.style.left=Math.random()*100+'%';
            c.style.background=colors[Math.floor(Math.random()*colors.length)];
            c.style.width=(6+Math.random()*8)+'px';
            c.style.height=(6+Math.random()*8)+'px';
            c.style.borderRadius=Math.random()>.5?'50%':'2px';
            c.style.animationDuration=(2+Math.random()*3)+'s';
            box.appendChild(c);
            setTimeout(()=>c.remove(),5000);
        },i*50);
    }
}
