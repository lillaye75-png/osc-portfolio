export interface Project {
  slug: string;
  title: string;
  category: "residential" | "commercial" | "institutional";
  location: string;
  year: number;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  details: {
    surface: string;
    duration: string;
    budget: string;
  };
  gallery: string[];
}

export interface Service {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  process: { step: string; description: string }[];
  deliverables: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export const projects: Project[] = [
  {
    slug: "villa-haut-standing-dakar",
    title: "Villa Haut Standing",
    category: "residential",
    location: "Dakar, Sénégal",
    year: 2024,
    image: "/projects/villa-haut-standing.jpg",
    description:
      "Construction d'une villa de luxe de 350 m² avec piscine à débordement et jardin paysager dans le quartier résidentiel de Mermoz.",
    challenge:
      "Le terrain présentait une pente naturelle importante et un sol sablonneux nécessitant des fondations profondes. Le client exigeait une livraison en 10 mois tout en maintenant des finitions de très haute qualité.",
    solution:
      "Nous avons conçu des fondations sur pieux pour stabiliser la structure sur le sol sablonneux. Le dénivelé a été intégré dans l'architecture pour créer des espaces en demi-niveaux, ajoutant du caractère à la villa. Un planning serré avec 3 équipes en rotation a permis de respecter les délais.",
    results: [
      "Livraison en 9 mois et demi, dans le budget",
      "Finitions haut de gamme avec marbres italiens et boiseries",
      "Piscine à débordement avec système de chauffage solaire",
      "Certification BBC (Bâtiment Basse Consommation)",
    ],
    details: {
      surface: "350 m²",
      duration: "9.5 mois",
      budget: "180 000 000 FCFA",
    },
    gallery: [
      "/projects/villa-1.jpg",
      "/projects/villa-2.jpg",
      "/projects/villa-3.jpg",
      "/projects/villa-4.jpg",
    ],
  },
  {
    slug: "immeuble-commercial-mermoz",
    title: "Immeuble Commercial Mermoz",
    category: "commercial",
    location: "Mermoz, Dakar",
    year: 2023,
    image: "/projects/immeuble-commercial.jpg",
    description:
      "Immeuble de bureaux de 4 étages avec rez-de-chaussée commercial, conçu pour optimiser l'espace tout en offrant une façade moderne et fonctionnelle.",
    challenge:
      "La parcelle était étroite (8m de large) avec des servitudes de passage. Le projet devait intégrer 4 niveaux de parkings et respecter les normes ERP strictes.",
    solution:
      "Une structure en béton armé avec des porte-à-faux a permis de maximiser la surface utile. Les parkings ont été intégrés en sous-sol et rez-de-chaussée. Un ascenseur panoramique a été ajouté pour valoriser la circulation verticale.",
    results: [
      "1 200 m² de surface utile répartis sur 4 étages",
      "Façade en verre et aluminium pour une esthétique moderne",
      "Certification NF ERP pour l'accueil du public",
      "Taux d'occupation de 95% dès le premier trimestre",
    ],
    details: {
      surface: "1 200 m²",
      duration: "14 mois",
      budget: "350 000 000 FCFA",
    },
    gallery: [
      "/projects/immeuble-1.jpg",
      "/projects/immeuble-2.jpg",
      "/projects/immeuble-3.jpg",
    ],
  },
  {
    slug: "centre-de-sante-thies",
    title: "Centre de Santé, Thiès",
    category: "institutional",
    location: "Thiès, Sénégal",
    year: 2024,
    image: "/projects/centre-sante.jpg",
    description:
      "Centre de santé primaire de 800 m² comprenant des consultations, une pharmacie, une maternité et un laboratoire d'analyses médicales.",
    challenge:
      "Le projet devait respecter les normes sanitaires strictes du ministère de la Santé, avec des délais de financement contraignants liés à un bailleur international.",
    solution:
      "Nous avons travaillé en étroite collaboration avec le bureau d'études techniques pour concevoir des circuits hygieniques conformes (zone propre/zone sale). Les matériaux ont été choisis pour leur facilité d'entretien et leur résistance. Le chantier a été livré en deux phases pour permettre une ouverture partielle rapide.",
    results: [
      "800 m² de surface construite entièrement fonctionnelle",
      "Capacité d'accueil de 150 patients par jour",
      "Ouverture de la phase 1 en 8 mois",
      "Budget respecté à 98% malgré les contraintes",
    ],
    details: {
      surface: "800 m²",
      duration: "14 mois",
      budget: "250 000 000 FCFA",
    },
    gallery: [
      "/projects/centre-1.jpg",
      "/projects/centre-2.jpg",
      "/projects/centre-3.jpg",
    ],
  },
];

export const services: Service[] = [
  {
    slug: "conception-architecturale-2d",
    icon: "PencilRuler",
    title: "Conception Architecturale 2D",
    shortDescription:
      "Plans architecturaux détaillés — façades, coupes, élévations — conformes aux normes sénégalaises.",
    description:
      "Nous réalisons des plans architecturaux complets pour vos projets résidentiels, commerciaux et institutionnels. Chaque plan est conçu avec une précision millimétrique, en respectant les normes de construction sénégalaises et les contraintes urbanistiques locales. Notre expertise garantit des dossiers complets pour l'obtention des permis de construire.",
    benefits: [
      "Plans conformes aux normes locales et internationales",
      "Dossiers complets pour permis de construire",
      "Optimisation des espaces et de la circulation",
      "Respect des contraintes urbanistiques",
      "Modifications rapides et itérations illimitées",
    ],
    process: [
      {
        step: "Relevé des contraintes",
        description: "Analyse du terrain, des règles d'urbanisme et du cahier des charges",
      },
      {
        step: "Esquisse",
        description: "Croquis préliminaires et validation des partis architecturaux",
      },
      {
        step: "Plans détaillés",
        description: "Production des plans d'exécution (façades, coupes, élévations)",
      },
      {
        step: "Dossier PC",
        description: "Assemblage du dossier complet pour le permis de construire",
      },
    ],
    deliverables: [
      "Plan de situation et de masse",
      "Plans de tous les niveaux",
      "Façades et coupes longitudinales/transversales",
      "Dossier de permis de construire complet",
    ],
  },
  {
    slug: "visualisation-architecturale-3d",
    icon: "Box",
    title: "Visualisation Architecturale 3D",
    shortDescription:
      "Rendus 3D photoréalistes et visites virtuelles pour visualiser votre projet avant sa construction.",
    description:
      "Donnez vie à vos projets avec nos visualisations 3D haute définition. Que ce soit pour des présentations clients, des demandes de financement ou des appels d'offres, nos rendus photoréalistes capturent chaque détail de votre projet. Nous proposons également des visites virtuelles interactives pour une immersion totale.",
    benefits: [
      "Rendus photoréalistes haute définition",
      "Visites virtuelles 360° interactives",
      "Idéal pour présentations clients et investisseurs",
      "Détection des erreurs de conception avant le chantier",
      "Modifications faciles en phase de conception",
    ],
    process: [
      {
        step: "Modélisation 3D",
        description: "Création du modèle numérique à partir des plans 2D",
      },
      {
        step: "Texturing & Éclairage",
        description: "Application des matériaux et mise en place de l'éclairage naturel/artificiel",
      },
      {
        step: "Rendu final",
        description: "Production des images haute résolution et des animations",
      },
      {
        step: "Révisions",
        description: "Ajustements selon vos retours jusqu'à validation finale",
      },
    ],
    deliverables: [
      "10 rendus haute définition (4000x3000 px)",
      "Visite virtuelle 360° interactive",
      "Animation vidéo de présentation (30s)",
      "Fichier source modifiable",
    ],
  },
  {
    slug: "plans-beton-arme",
    icon: "Hammer",
    title: "Plans Béton Armé",
    shortDescription:
      "Plans de coffrage et de ferraillage conformes aux normes BAEL/EC2 pour une structure solide et durable.",
    description:
      "Nos ingénieurs béton conçoivent des plans de structures complètes : fondations, poteaux, poutres, dalles et voiles. Chaque plan est calculé selon les normes BAEL (françaises) et Eurocode 2, adaptées au contexte sénégalais. Nous garantissons des structures optimales alliant sécurité et économie de matériaux.",
    benefits: [
      "Calculs structurels précis et justifiés",
      "Conformité aux normes BAEL et Eurocode 2",
      "Optimisation des sections d'acier pour réduire les coûts",
      "Plans clairs et exploitables par les équipes terrain",
      "Nomenclature complète des aciers",
    ],
    process: [
      {
        step: "Prédimensionnement",
        description: "Calcul préliminaire des sections et descentes de charges",
      },
      {
        step: "Modélisation",
        description: "Analyse structurelle assistée par ordinateur",
      },
      {
        step: "Plans d'exécution",
        description: "Production des plans de coffrage et de ferraillage",
      },
      {
        step: "Nomenclature",
        description: "Établissement de la liste complète des aciers et fournitures",
      },
    ],
    deliverables: [
      "Notes de calcul justificatives",
      "Plans de coffrage de tous les niveaux",
      "Plans de ferraillage détaillés",
      "Nomenclature des aciers par élément",
    ],
  },
  {
    slug: "devis-estimation-couts",
    icon: "Calculator",
    title: "Devis & Estimation des Coûts",
    shortDescription:
      "Devis détaillés et estimations budgétaires pour maîtriser vos coûts de construction.",
    description:
      "Obtenez une vision claire et précise du budget de votre projet. Nous établissons des devis quantitatifs détaillés (DQE) qui listent chaque poste de dépense : gros œuvre, second œuvre, finitions, VRD. Nos estimations incluent les prix actualisés des matériaux et de la main-d'œuvre au Sénégal.",
    benefits: [
      "Budget fiable dès la phase de conception",
      "Détail complet des quantités et des prix unitaires",
      "Actualisation selon le marché sénégalais",
      "Comparaison de variantes pour optimiser les coûts",
      "Aide à la négociation avec les entrepreneurs",
    ],
    process: [
      {
        step: "Analyse des plans",
        description: "Étude des plans et métré des quantités",
      },
      {
        step: "Recherche des prix",
        description: "Collecte des prix unitaires actualisés (matériaux, main-d'œuvre)",
      },
      {
        step: "Rédaction du DQE",
        description: "Établissement du devis quantitatif et estimatif détaillé",
      },
      {
        step: "Synthèse",
        description: "Présentation du budget global avec analyse des postes critiques",
      },
    ],
    deliverables: [
      "Devis quantitatif et estimatif (DQE) complet",
      "Budget détaillé par corps d'état",
      "Planning financier prévisionnel",
      "Analyse des risques budgétaires",
    ],
  },
  {
    slug: "supervision-de-chantier",
    icon: "HardHat",
    title: "Supervision de Chantier",
    shortDescription:
      "Suivi technique et coordination de chantier pour garantir qualité, délais et budget.",
    description:
      "Notre service de supervision de chantier assure que votre projet est réalisé conformément aux plans, dans les délais et le budget impartis. Nous coordonnons les corps de métier, contrôlons la qualité des matériaux et des travaux, et vous tenons informé à chaque étape avec des rapports détaillés.",
    benefits: [
      "Contrôle qualité rigoureux à chaque phase",
      "Respect des délais et du budget",
      "Coordination de tous les corps de métier",
      "Rapports d'avancement hebdomadaires",
      "Interface unique entre vous et les entrepreneurs",
    ],
    process: [
      {
        step: "Planification",
        description: "Établissement du planning général et des jalons clés",
      },
      {
        step: "Lancement",
        description: "Réunion de démarrage et installation de chantier",
      },
      {
        step: "Suivi régulier",
        description: "Visites de chantier hebdomadaires et rapports d'avancement",
      },
      {
        step: "Réception",
        description: "Contrôle final, levée des réserves et livraison",
      },
    ],
    deliverables: [
      "Planning général de chantier",
      "Rapports d'avancement hebdomadaires",
      "Registre de suivi des travaux",
      "Procès-verbal de réception",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mamadou Diallo",
    role: "Propriétaire",
    company: "Villa Haut Standing, Dakar",
    quote:
      "Oscar Sénégal Construction a transformé notre terrain en une villa exceptionnelle. Leur équipe a su comprendre notre vision et la concrétiser avec un professionnalisme remarquable. La qualité des finitions dépasse nos attentes.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aïssatou Sow",
    role: "Directrice Générale",
    company: "Groupe Sow Invest",
    quote:
      "Nous avons confié à OSC la supervision de notre immeuble commercial de 4 étages. Le projet a été livré dans les délais et le budget, avec une qualité de finition irréprochable. Je recommande vivement leurs services.",
    rating: 5,
  },
];

export const stats = [
  { value: "150+", label: "Projets réalisés" },
  { value: "12+", label: "Années d'expérience" },
  { value: "50+", label: "Clients satisfaits" },
  { value: "98%", label: "Projets livrés dans les délais" },
];

export const processSteps = [
  {
    number: 1,
    title: "Consultation",
    description:
      "Nous vous rencontrons pour comprendre vos besoins, votre vision et votre budget. Cette première étape nous permet de cerner précisément vos attentes et de vous conseiller sur les meilleures solutions pour votre projet.",
  },
  {
    number: 2,
    title: "Analyse du Site",
    description:
      "Nous effectuons une étude approfondie du terrain : relevé topographique, analyse du sol, orientation solaire, accès et contraintes urbanistiques. Ces données sont essentielles pour concevoir un projet adapté à son environnement.",
  },
  {
    number: 3,
    title: "Conception",
    description:
      "Nos architectes élaborent les plans architecturaux complets, des esquisses préliminaires aux plans d'exécution détaillés. Nous vous présentons des rendus 2D et 3D pour valider chaque aspect du design.",
  },
  {
    number: 4,
    title: "Structure Béton Armé",
    description:
      "Nos ingénieurs conçoivent la structure porteuse de votre bâtiment : fondations, poteaux, poutres et dalles. Chaque élément est calculé selon les normes en vigueur pour garantir sécurité et durabilité.",
  },
  {
    number: 5,
    title: "Budget & Devis",
    description:
      "Nous établissons un devis quantitatif et estimatif détaillé, listant chaque poste de dépense avec les prix actualisés du marché sénégalais. Vous disposez ainsi d'une vision claire et transparente du budget total.",
  },
  {
    number: 6,
    title: "Supervision des Travaux",
    description:
      "Nous assurons le suivi technique du chantier : coordination des corps de métier, contrôle qualité des matériaux et des travaux, respect des délais et du budget. Vous recevez des rapports d'avancement réguliers.",
  },
  {
    number: 7,
    title: "Livraison du Projet",
    description:
      "Nous procédons à la réception complète du projet avec vous, levons les éventuelles réserves et vous remettons tous les documents nécessaires (plans de récolement, garanties, manuels d'entretien). Votre projet est prêt à vivre.",
  },
];
