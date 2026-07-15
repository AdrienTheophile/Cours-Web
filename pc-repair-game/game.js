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
    // =======================================
    // ===== FACILE (1) =====
    // =======================================
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
    {
        comp:'hdd', difficulty:1,
        symptoms:[
            "Mon PC démarre mais Windows ne se lance pas ! L'écran affiche juste « Reboot and Select proper Boot device ».",
            "Quand j'allume mon PC, il me dit « No bootable device ». J'ai rien touché pourtant !"
        ],
        diag:{
            visual:"Le PC s'allume normalement. Toutes les LED sont vertes. Rien de visible qui cloche.",
            sound:"On n'entend aucun bruit de disque dur. Normalement il devrait tourner.",
            temperature:"Températures CPU et GPU normales.",
            multimeter:"Alimentation OK. Le câble SATA d'alimentation fournit du courant.",
            bios:"Le BIOS ne détecte AUCUN périphérique de stockage. Le disque dur est invisible."
        }
    },
    {
        comp:'cable', difficulty:1,
        symptoms:[
            "Mon clavier et ma souris ne marchent plus ! Ils étaient branchés en USB et d'un coup, plus rien.",
            "J'ai plein de périphériques USB qui ne fonctionnent plus. Ni la webcam, ni la clé USB, ni le casque."
        ],
        diag:{
            visual:"Les ports USB à l'arrière semblent OK mais le câble interne USB de la carte mère est débranché.",
            sound:"Pas de son anormal. Le PC fonctionne normalement par ailleurs.",
            temperature:"Toutes les températures sont dans les normes.",
            multimeter:"Alimentation OK. Le connecteur USB interne ne reçoit pas de signal.",
            bios:"Le BIOS détecte les ports arrière mais pas les ports façade. Câble USB interne déconnecté."
        }
    },
    {
        comp:'fan', difficulty:1,
        symptoms:[
            "Mon PC fait un bruit de tondeuse ! C'est super fort et ça vibre beaucoup. Je n'ose plus l'allumer.",
            "Depuis quelques jours mon PC fait un bruit horrible, comme un roulement cassé. Ça grince fort."
        ],
        diag:{
            visual:"Le ventilateur CPU vibre beaucoup. Un des roulements semble mort, l'axe bouge.",
            sound:"🔊 Bruit de roulement métallique très fort. Ça grince et ça vibre énormément.",
            temperature:"🌡️ CPU à 78°C, un peu élevé. Le ventilateur tourne mais mal.",
            multimeter:"Alimentation OK. Tensions normales.",
            bios:"Le BIOS affiche : « CPU Fan Speed: Irregular ». Vitesse de rotation instable."
        }
    },
    {
        comp:'thermal', difficulty:1,
        symptoms:[
            "Mon PC rame quand je regarde des vidéos YouTube. Avant ça marchait bien mais maintenant c'est lent.",
            "Mon ordinateur est devenu super lent pour tout. Même ouvrir un dossier prend du temps."
        ],
        diag:{
            visual:"Le ventilateur tourne normalement. Pas de poussière visible. Le PC a 3 ans, jamais entretenu.",
            sound:"Le ventilateur CPU tourne à fond en permanence, même sans rien faire.",
            temperature:"🌡️ CPU à 85°C au repos ! La pâte thermique doit être sèche.",
            multimeter:"Alimentation OK. Tout est bien alimenté.",
            bios:"Le BIOS affiche : « CPU Temperature Warning: 85°C ». Surchauffe même sans charge."
        }
    },
    {
        comp:'psu', difficulty:1,
        symptoms:[
            "Mon PC ne démarre plus. Hier il marchait, ce matin j'appuie sur le bouton et rien du tout. Zéro.",
            "Mon ordinateur est resté débranché pendant l'orage et maintenant il refuse de s'allumer."
        ],
        diag:{
            visual:"Aucune LED dans le boîtier. Le ventilateur de l'alimentation ne tourne pas du tout.",
            sound:"Aucun bruit. Silence complet quand on appuie sur le bouton.",
            temperature:"Impossible de lire, la machine ne démarre pas.",
            multimeter:"⚠️ L'alimentation ne fournit aucune tension. 0V sur tous les rails. PSU morte.",
            bios:"Impossible d'accéder au BIOS, la machine ne s'allume pas."
        }
    },
    {
        comp:'nic', difficulty:1,
        symptoms:[
            "Internet ne marche plus sur mon PC fixe. Mon téléphone capte le WiFi mais pas l'ordinateur.",
            "Ma connexion internet ne fonctionne plus. Le câble Ethernet est branché mais Windows dit « Câble réseau débranché »."
        ],
        diag:{
            visual:"Pas de lumière verte sur le port Ethernet. La LED est éteinte.",
            sound:"Aucun bruit suspect.",
            temperature:"Tout est normal côté températures.",
            multimeter:"Alimentation OK. Le port réseau ne reçoit aucun signal.",
            bios:"Le BIOS liste « Network Controller: Not Found ». La carte réseau a disparu."
        }
    },

    // =======================================
    // ===== MOYEN (2) =====
    // =======================================
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
    {
        comp:'ram', difficulty:2,
        symptoms:[
            "Mon PC plante avec un écran bleu « MEMORY_MANAGEMENT » toutes les heures environ.",
            "Windows crash régulièrement avec des erreurs mémoire. Ça arrive surtout quand j'ouvre beaucoup d'onglets."
        ],
        diag:{
            visual:"Pas de dommage visible. Les barrettes de RAM sont bien enfoncées dans les slots.",
            sound:"Aucun bruit anormal. Les ventilateurs tournent normalement.",
            temperature:"Températures normales partout. Pas de surchauffe.",
            multimeter:"Alimentation OK. Tensions stables sur tous les rails.",
            bios:"Le test mémoire du BIOS échoue sur le slot B1. « Memory Error in DIMM_B1 »."
        }
    },
    {
        comp:'cable', difficulty:2,
        symptoms:[
            "Mon PC s'allume mais le disque dur n'est plus détecté. Pourtant il marchait hier.",
            "Windows se lance mais ne voit plus mon deuxième disque dur avec toutes mes photos dessus."
        ],
        diag:{
            visual:"Le disque dur est bien présent physiquement. Le câble SATA semble un peu desserré.",
            sound:"On n'entend pas le disque tourner, pourtant l'alimentation est branchée.",
            temperature:"Toutes les températures sont normales.",
            multimeter:"Le câble d'alimentation SATA du disque dur ne fournit pas de courant. Connecteur abîmé.",
            bios:"Le BIOS détecte le port SATA mais pas de disque connecté dessus."
        }
    },
    {
        comp:'mobo', difficulty:2,
        symptoms:[
            "Mes ports USB à l'arrière ne marchent plus. Certains fonctionnent, d'autres sont complètement morts.",
            "Mon clavier marche sur un port USB mais pas sur les autres. Et ma souris ne marche nulle part."
        ],
        diag:{
            visual:"En regardant de près la carte mère, on voit un petit composant brûlé près des ports USB arrière.",
            sound:"Pas de bruit anormal. Le PC tourne normalement.",
            temperature:"Températures normales. Le PC fonctionne bien à part les ports USB.",
            multimeter:"Alimentation OK. Mais certains ports USB arrière ne fournissent pas les 5V attendus.",
            bios:"Le BIOS indique que le contrôleur USB 3.0 intégré n'est pas détecté. Problème carte mère."
        }
    },
    {
        comp:'psu', difficulty:2,
        symptoms:[
            "Mon PC s'allume puis s'éteint au bout de 30 secondes. Ensuite il se rallume tout seul, puis s'éteint encore.",
            "Mon ordinateur fait un cycle allumage/extinction sans fin. Il n'arrive jamais à démarrer complètement."
        ],
        diag:{
            visual:"Les LED s'allument brièvement puis s'éteignent. Le cycle recommence toutes les 30 secondes.",
            sound:"Les ventilateurs démarrent puis s'arrêtent. Pas de bip BIOS.",
            temperature:"Pas le temps de mesurer, le PC se coupe trop vite.",
            multimeter:"⚠️ L'alimentation fournit du courant mais la tension 12V oscille entre 10V et 13V. Instable.",
            bios:"Le BIOS n'a pas le temps de se lancer, le PC se coupe avant."
        }
    },
    {
        comp:'fan', difficulty:2,
        symptoms:[
            "Mon PC tourne mais il est devenu incroyablement bruyant. On dirait un avion qui décolle.",
            "Les ventilateurs de mon PC sont à fond en permanence. Même quand je ne fais rien, c'est du 100%."
        ],
        diag:{
            visual:"Le ventilateur CPU a des pales cassées. Il tourne de travers et vibre.",
            sound:"🔊 Bruit très fort, vibrations. Le ventilateur semble déséquilibré.",
            temperature:"🌡️ CPU à 82°C. Le ventilateur défaillant n'arrive plus à refroidir correctement.",
            multimeter:"Alimentation OK. Le connecteur du ventilateur fournit bien du courant.",
            bios:"Le BIOS affiche « CPU Fan Speed: Low RPM Warning ». Vitesse anormalement basse."
        }
    },
    {
        comp:'gpu', difficulty:2,
        symptoms:[
            "Mon écran scintille de manière aléatoire. Parfois il devient tout noir une seconde puis revient.",
            "L'image clignote et parfois l'écran devient tout noir pendant 2-3 secondes avant de revenir."
        ],
        diag:{
            visual:"Le câble vidéo est bien branché. Mais la carte graphique semble légèrement sortie de son slot PCIe.",
            sound:"Aucun bruit suspect.",
            temperature:"🌡️ GPU à 85°C, un peu élevé pour du bureau.",
            multimeter:"Alimentation OK. Le connecteur PCIe 6+2 pin fournit bien le courant.",
            bios:"Le BIOS détecte la carte graphique de manière intermittente. Connexion instable."
        }
    },
    {
        comp:'hdd', difficulty:2,
        symptoms:[
            "Mon PC fait un bruit de « clic-clic » bizarre et les fichiers mettent une éternité à s'ouvrir.",
            "Certains de mes fichiers sont corrompus. Des photos ne s'ouvrent plus et des documents sont illisibles."
        ],
        diag:{
            visual:"Le disque dur est en place. Rien de visuellement anormal.",
            sound:"🔊 Cliquetis rythmiques du disque dur. Bruit de tête de lecture qui galère.",
            temperature:"Le disque dur est à 52°C, un peu chaud pour un HDD.",
            multimeter:"Alimentation OK. Le câble SATA est bien connecté.",
            bios:"Le BIOS détecte le disque. Erreurs SMART : « Current Pending Sector Count: CRITICAL »."
        }
    },
    {
        comp:'thermal', difficulty:2,
        symptoms:[
            "Mon PC lag dans les jeux alors qu'avant ça marchait bien. La carte graphique est pourtant bonne.",
            "Les performances de mon PC ont chuté. Les FPS dans les jeux ont été divisés par 3."
        ],
        diag:{
            visual:"Pas de poussière visible. Le ventilateur tourne. Le PC a 2 ans.",
            sound:"Les ventilateurs tournent à fond dès qu'on lance un jeu.",
            temperature:"🌡️ CPU à 95°C en jeu ! Throttling thermique activé → le CPU bride ses performances.",
            multimeter:"Alimentation OK. Pas de problème électrique.",
            bios:"Le BIOS affiche « CPU Temperature: 90°C ». La pâte thermique semble avoir séché."
        }
    },
    {
        comp:'nic', difficulty:2,
        symptoms:[
            "Mon internet coupe toutes les 5 minutes ! La connexion se perd puis revient. C'est insupportable.",
            "Ma connexion réseau est super instable. Ça marche 2 minutes puis ça se déconnecte."
        ],
        diag:{
            visual:"Le câble Ethernet est bien branché. La LED du port clignote de manière erratique.",
            sound:"Aucun bruit anormal.",
            temperature:"Températures normales.",
            multimeter:"Alimentation OK. La tension sur le port Ethernet est instable.",
            bios:"Le BIOS détecte la carte réseau mais elle se déconnecte/reconnecte en boucle dans les logs."
        }
    },

    // =======================================
    // ===== DIFFICILE (3) =====
    // =======================================
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
    {
        comp:'cpu', difficulty:3,
        symptoms:[
            "Mon PC calcule super lentement. Les rendus 3D qui prenaient 10 minutes prennent maintenant 1 heure !",
            "Les performances de mon PC se sont effondrées. Tout est lent, les benchmarks sont catastrophiques."
        ],
        diag:{
            visual:"Tout semble normal visuellement. Pas de composant endommagé visible.",
            sound:"Le ventilateur tourne à fond même pour des tâches simples.",
            temperature:"🌡️ CPU à 65°C au repos, monte à 100°C dès qu'on fait quoi que ce soit.",
            multimeter:"Alimentation OK. Tensions parfaitement stables.",
            bios:"Le BIOS indique le CPU à une fréquence de 800MHz au lieu de 3.6GHz. Le CPU est en mode dégradé, erreurs internes détectées."
        }
    },
    {
        comp:'mobo', difficulty:3,
        symptoms:[
            "Mon PC n'affiche rien mais émet 5 bips longs au démarrage. Ça ne l'a jamais fait avant.",
            "Quand j'allume le PC, j'entends une série de bips longs et rien ne s'affiche. Les ventilateurs tournent."
        ],
        diag:{
            visual:"LED orange fixe sur la carte mère. Le voyant CPU_LED est allumé en rouge.",
            sound:"🔊 5 bips longs au démarrage. Code erreur = erreur processeur sur la carte mère.",
            temperature:"Le PC ne démarre pas assez pour mesurer.",
            multimeter:"Alimentation OK. Le socket CPU reçoit bien du courant. Le VRM chauffe anormalement.",
            bios:"Le POST échoue dès l'initialisation. Le code debug de la carte mère affiche « 00 » (erreur carte mère)."
        }
    },
    {
        comp:'gpu', difficulty:3,
        symptoms:[
            "Mon PC fonctionne bien pour le bureau mais dès que je lance un jeu 3D, l'écran devient tout vert et le PC plante.",
            "Les jeux font apparaître des textures manquantes, des triangles roses/verts, puis freeze total."
        ],
        diag:{
            visual:"Pas de problème visible au repos. Les artefacts n'apparaissent qu'en charge graphique.",
            sound:"Les ventilateurs GPU montent très haut, puis le PC freeze.",
            temperature:"🌡️ GPU à 55°C au repos (OK), mais bondit à 105°C en jeu ! Le refroidissement du GPU est défaillant.",
            multimeter:"Alimentation OK. Le rail 12V est stable même en charge.",
            bios:"Le BIOS fonctionne normalement. En revanche le driver GPU crash avec « TDR Failure » sous Windows."
        }
    },
    {
        comp:'ram', difficulty:3,
        symptoms:[
            "Mes applications se ferment toutes seules sans message d'erreur. Chrome, Word, tout crash de manière aléatoire.",
            "Mon PC a des comportements bizarres. Des programmes crashent, des fichiers se corrompent, c'est le chaos."
        ],
        diag:{
            visual:"Tout est visuellement en ordre. Aucun composant endommagé visible.",
            sound:"Aucun bruit suspect. Le PC est silencieux.",
            temperature:"Températures parfaitement normales. Pas de surchauffe.",
            multimeter:"Alimentation stable. Rien d'anormal côté électrique.",
            bios:"Le test mémoire avancé du BIOS révèle des erreurs multiples sur les bits 12-15. « Possible DIMM failure on Channel A »."
        }
    },
    {
        comp:'psu', difficulty:3,
        symptoms:[
            "Mon PC fait des petits « tic-tic » dans le boîtier et parfois l'écran clignote. C'est aléatoire.",
            "Mon PC a des micro-freezes de quelques millisecondes. L'image saccade et parfois le son grésille."
        ],
        diag:{
            visual:"Rien de visible au premier abord. Les composants semblent en bon état.",
            sound:"🔊 De petits claquements secs, irréguliers, venant du bas du boîtier (zone alimentation).",
            temperature:"Températures normales partout. Pas de problème thermique.",
            multimeter:"⚠️ Le rail 5V fluctue entre 4.6V et 5.3V. Le rail 3.3V oscille aussi. Alimentation instable !",
            bios:"Le BIOS fonctionne mais les logs système montrent de multiples « Power Supply Voltage Unstable »."
        }
    },
    {
        comp:'cable', difficulty:3,
        symptoms:[
            "Mon PC a un comportement vraiment étrange : il démarre, mais parfois pas de son, parfois pas de vidéo, parfois les deux.",
            "Les symptômes changent à chaque redémarrage ! Parfois écran noir, parfois son coupé, parfois tout marche."
        ],
        diag:{
            visual:"En regardant attentivement, le câble d'alimentation principal 24-pin est légèrement desserré sur la carte mère.",
            sound:"Les sons sont incohérents : parfois un bip, parfois rien, parfois le son Windows.",
            temperature:"Quand le PC arrive à démarrer, les températures sont normales.",
            multimeter:"⚠️ Tensions correctes à la source, mais intermittentes au connecteur 24-pin. Contact instable.",
            bios:"Le BIOS se charge parfois mais affiche des erreurs différentes à chaque boot."
        }
    },
    {
        comp:'hdd', difficulty:3,
        symptoms:[
            "Mon PC freeze complètement pendant 30 secondes, puis reprend. Ça arrive 5-6 fois par jour.",
            "Windows se bloque totalement de manière aléatoire. La souris ne bouge plus, puis d'un coup ça repart."
        ],
        diag:{
            visual:"Pas de dommage visible. Le SSD/HDD est bien branché.",
            sound:"Pendant les freezes, on entend des clics rapides du disque dur, comme s'il cherchait quelque chose.",
            temperature:"Le disque dur est à 48°C, dans les normes.",
            multimeter:"Alimentation OK. Le câble SATA est bien connecté.",
            bios:"Le BIOS détecte le disque mais avec des erreurs SMART critiques : « Uncorrectable Sector Count: 847 ». Disque en fin de vie."
        }
    },
    {
        comp:'fan', difficulty:3,
        symptoms:[
            "Mon PC s'éteint uniquement pendant les jeux vidéo, après environ 20 minutes de jeu. Pas d'écran bleu.",
            "Quand je joue ou que je fais du montage vidéo, le PC finit toujours par se couper brutalement."
        ],
        diag:{
            visual:"Le ventilateur CPU tourne mais lentement. Les pales sont propres mais le moteur semble faible.",
            sound:"Le ventilateur fait un bruit faible, pas assez puissant pour le refroidissement en charge.",
            temperature:"🌡️ CPU à 55°C au repos (OK) mais monte à 100°C en jeu → protection thermique → arrêt.",
            multimeter:"Alimentation OK. Le connecteur ventilateur fournit bien du courant.",
            bios:"Le BIOS affiche « CPU Fan Speed: 600 RPM ». Normal = 1500-2000 RPM. Le ventilateur tourne trop lentement."
        }
    },
    {
        comp:'cpu', difficulty:3,
        symptoms:[
            "Mon PC démarre mais Windows crash immédiatement avec un écran bleu « KERNEL_DATA_INPAGE_ERROR ». Même en mode sans échec.",
            "Impossible de garder le PC allumé plus de 2 minutes. Écran bleu systématique, peu importe ce que je fais."
        ],
        diag:{
            visual:"Pas de dommage visible. La carte mère et le CPU semblent en bon état.",
            sound:"Un bip normal au démarrage, puis le PC tourne quelques minutes avant le crash.",
            temperature:"CPU à 70°C, légèrement élevé mais pas critique.",
            multimeter:"Alimentation OK. Tensions parfaitement stables.",
            bios:"Le BIOS signale « CPU Microcode Update Failed » et « Internal Parity Error ». Le processeur a des défauts internes."
        }
    },
    {
        comp:'mobo', difficulty:3,
        symptoms:[
            "Mon PC ne reconnaît plus qu'un seul slot RAM sur 4. J'ai testé avec d'autres barrettes, même résultat.",
            "J'ai acheté de la RAM neuve mais mon PC ne la détecte pas dans 3 slots sur 4."
        ],
        diag:{
            visual:"En inspectant les slots RAM, 3 d'entre eux semblent avoir des pins tordus ou noircis.",
            sound:"Le PC émet un bip normal et démarre correctement avec 1 seule barrette.",
            temperature:"Températures normales.",
            multimeter:"Alimentation OK. Les 3 slots défaillants ne reçoivent pas la tension 1.2V correcte.",
            bios:"Le BIOS ne détecte de la RAM que dans le slot A1. Les slots A2, B1, B2 sont marqués « Empty ». Problème carte mère."
        }
    },
    {
        comp:'nic', difficulty:3,
        symptoms:[
            "Ma vitesse internet est tombée à 10 Mbps alors que j'ai la fibre. Sur d'autres appareils ça marche bien.",
            "Mon débit internet est devenu minable. Les téléchargements sont ultra lents et le ping est horrible."
        ],
        diag:{
            visual:"Le câble Ethernet est bien branché. La LED du port réseau est orange au lieu de verte.",
            sound:"Aucun bruit suspect.",
            temperature:"Températures normales partout.",
            multimeter:"Alimentation OK. Le port réseau est alimenté mais la négociation de vitesse échoue.",
            bios:"Le BIOS affiche « Network Controller: 10 Mbps » au lieu de « 1000 Mbps ». La carte réseau est dégradée, elle ne négocie plus en Gigabit."
        }
    },
    {
        comp:'thermal', difficulty:3,
        symptoms:[
            "Mon PC a des performances qui changent tout le temps. Parfois rapide, parfois ultra lent, sans raison.",
            "Les performances de mon ordinateur font du yo-yo. Un coup c'est fluide, un coup ça rame à mort."
        ],
        diag:{
            visual:"Pas de poussière. Ventilateur OK. Le PC a 4 ans, la pâte thermique n'a jamais été changée.",
            sound:"Le ventilateur accélère et ralentit en boucle, comme s'il hésitait.",
            temperature:"🌡️ CPU oscille entre 50°C et 98°C de manière cyclique. La pâte thermique ne fait plus de contact uniforme.",
            multimeter:"Alimentation OK. Pas de problème électrique.",
            bios:"Le BIOS montre le CPU qui alterne entre sa fréquence max et 800MHz (throttling). Températures instables."
        }
    },
    {
        comp:'cable', difficulty:3,
        symptoms:[
            "Mon PC s'allume mais l'écran reste noir. J'ai changé l'écran, changé la carte graphique, rien ne marche !",
            "Écran noir au démarrage. J'ai tout testé : autre écran, autre GPU, mais rien. Le PC tourne pourtant."
        ],
        diag:{
            visual:"Le PC démarre, LED vertes. En regardant très attentivement, le câble d'alimentation 8-pin du CPU est mal enfoncé.",
            sound:"Les ventilateurs tournent mais pas de bip BIOS. Le signal vidéo ne part jamais.",
            temperature:"Le CPU reste froid, comme s'il ne travaillait pas.",
            multimeter:"⚠️ Le connecteur EPS 8-pin du CPU ne fournit que 2V au lieu de 12V. Mauvais contact.",
            bios:"Le BIOS ne démarre pas. Sans alimentation CPU correcte, la carte mère refuse le POST."
        }
    },
    {
        comp:'psu', difficulty:3,
        symptoms:[
            "Mon PC sent une odeur de brûlé ! Je l'ai éteint tout de suite. Maintenant j'ai peur de le rallumer.",
            "Une odeur de plastique brûlé sort de mon PC. Il marchait encore mais j'ai préféré le débrancher."
        ],
        diag:{
            visual:"⚠️ Traces de brûlure visibles sur le boîtier de l'alimentation. Un composant a cramé à l'intérieur.",
            sound:"Si on essaie de l'allumer : un grésillement inquiétant vient de l'alimentation.",
            temperature:"L'alimentation est chaude au toucher, bien plus que la normale.",
            multimeter:"⚠️ Le rail 12V sort à 14V ! Surtension dangereuse. L'alimentation est défectueuse et pourrait endommager les autres composants.",
            bios:"NE PAS ALLUMER ! L'alimentation défectueuse pourrait endommager la carte mère et le CPU."
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
