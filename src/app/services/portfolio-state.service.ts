import { Injectable, computed, effect, signal } from '@angular/core';
import {
  Lang,
  MailProvider,
  PortfolioTranslations,
  ThemeMode,
} from '../models/portfolio.model';

const TRANSLATIONS: Record<Lang, PortfolioTranslations> = {
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      experience: 'Expérience',
      education: 'Formation',
      portfolio: 'Projets',
      contact: 'Contact',
      contactMeBtn: 'Me contacter',
    },
    hero: {
      availabilityBadge: 'Disponible pour opportunités & collaborations',
      greeting: 'Bonjour, je suis',
      firstName: 'Mama Fadel',
      lastName: 'DIAWARA',
      title: 'Ingénieur en Informatique & Développeur Full Stack',
      roles: [
        'Développeur Full Stack (Angular, React, Laravel, Django)',
        'Développeur Mobile Cross-Platform (Flutter)',
        'Administrateur Systèmes & Réseaux (Linux, Cisco, Virtualisation)',
        'Diplômé Licence MIAGE — IBAM',
      ],
      description:
        "Titulaire d'une Licence MIAGE à l'IBAM, passionné par le développement web & mobile, la gestion des systèmes informatiques et la résolution de problèmes complexes.",
      contactBtn: 'Me contacter',
      downloadCvBtn: 'Télécharger CV',
      floatingBadge1: 'Full Stack & Mobile',
      floatingBadge2: 'Licence MIAGE • IBAM',
      stats: [
        {
          value: 2,
          suffix: '',
          label: 'Stages en entreprise',
          icon: 'fa-solid fa-briefcase',
        },
        {
          value: 5,
          suffix: '+',
          label: 'Projets réalisés',
          icon: 'fa-solid fa-folder-open',
        },
        {
          value: 6,
          suffix: '',
          label: 'Langages & Frameworks',
          icon: 'fa-solid fa-code',
        },
        {
          value: 4,
          suffix: '',
          label: 'Langues parlées',
          icon: 'fa-solid fa-earth-africa',
        },
      ],
    },
    about: {
      subtitle: 'Qui suis-je ?',
      title: 'À Propos de Moi',
      headline: 'Ingénieur Informatique & Développeur Full Stack',
      p1: "Jeune ingénieur formé à l'Institut Burkinabé des Arts et Métiers (IBAM), titulaire d'une Licence en Méthodes Informatiques Appliquées à la Gestion des Entreprises (MIAGE). Je cherche à renforcer mes compétences en gestion des systèmes informatiques, programmation et analyse de données.",
      p2: "Passionné par la résolution de problèmes complexes à l'aide des technologies, je cherche à mettre mes connaissances en pratique dans un environnement dynamique et innovant.",
      downloadCvBtn: 'Télécharger mon CV',
      info: {
        nameLabel: 'Nom complet',
        emailLabel: 'Email',
        phoneLabel: 'Téléphone',
        cityLabel: 'Localisation',
        cityValue: 'Ouagadougou, Burkina Faso',
        linkedinLabel: 'LinkedIn',
        degreeLabel: 'Diplôme',
        degreeValue: 'Licence MIAGE (IBAM)',
      },
    },
    skills: {
      subtitle: 'Expertise technique & humaine',
      title: 'Mes Compétences',
      description:
        "Un profil polyvalent alliant ingénierie logicielle (Web & Mobile), administration systèmes & réseaux et gestion de projets.",
      filterAll: 'Toutes',
      categories: [
        {
          id: 'web-mobile-langs',
          title: 'Langages & Développement Web / Mobile',
          icon: 'fa-solid fa-laptop-code',
          description: 'Langages de programmation et frameworks modernes pour applications web et mobiles.',
          skills: [
            { name: 'TypeScript / Angular', level: 88 },
            { name: 'JavaScript / React', level: 88 },
            { name: 'PHP / Laravel', level: 85 },
            { name: 'Python / Django', level: 85 },
            { name: 'Dart / Flutter', level: 82 },
            { name: 'Java / Spring Boot', level: 82 },
          ],
        },
        {
          id: 'systems-network',
          title: 'Systèmes & Réseaux',
          icon: 'fa-solid fa-server',
          description: 'Administration système, virtualisation et gestion des infrastructures réseau.',
          skills: [
            { name: 'Linux (Administration)', level: 85 },
            { name: 'Windows', level: 92 },
            { name: 'Administration réseau', level: 84 },
            { name: 'Virtualisation', level: 88 },
          ],
        },
        {
          id: 'db-tools',
          title: 'Bases de Données & Outils',
          icon: 'fa-solid fa-database',
          description: 'Modélisation, gestion de bases de données, versioning et maintenance.',
          skills: [
            { name: 'Gestion de BDD (SQL / NoSQL)', level: 86 },
            { name: 'Git / GitHub', level: 90 },
            { name: 'Maintenance informatique', level: 88 },
          ],
        },
        {
          id: 'soft-skills',
          title: 'Soft Skills & Méthodologie',
          icon: 'fa-solid fa-people-group',
          description: 'Qualités relationnelles et capacité d’évolution en environnement dynamique.',
          skills: [
            { name: "Travail d'équipe", level: 95, badge: 'Point fort' },
            { name: 'Adaptation rapide', level: 95, badge: 'Point fort' },
            { name: 'Apprentissage rapide', level: 94, badge: 'Autonomie' },
            { name: 'Résolution de problèmes', level: 92, badge: 'Analytique' },
          ],
        },
        {
          id: 'spoken-langs',
          title: 'Langues',
          icon: 'fa-solid fa-language',
          description: 'Communication professionnelle et interculturelle.',
          skills: [
            { name: 'Français', level: 96, badge: 'Lu, parlé, écrit (Très bien)' },
            { name: 'Anglais', level: 78, badge: 'Lu, parlé, écrit (Bien)' },
            { name: 'Bambara', level: 82, badge: 'Parlé (Bien)' },
            { name: 'Mooré', level: 55, badge: 'Parlé (Passable)' },
          ],
        },
      ],
    },
    experience: {
      subtitle: 'Parcours en entreprise',
      title: 'Expérience Professionnelle',
      description:
        "Immersion professionnelle en développement logiciel, assurance qualité, déploiement et support client.",
      items: [
        {
          title: 'Stagiaire Développeur',
          organization: 'YOUNG-THINK SARL',
          date: '2026',
          location: 'Ouagadougou, Burkina Faso',
          badge: 'Stage de fin de cycle',
          tasks: [
            "Développement d'une extension d'un logiciel existant de l'entreprise",
            'Participation aux tests fonctionnels et unitaires des logiciels',
            "Participation au déploiement d'une solution auprès des clients",
            "Participation aux différentes activités de l'entreprise",
          ],
          tags: ['Développement Logiciel', 'Tests Unitaires & Fonctionnels', 'Déploiement Client'],
        },
        {
          title: 'Stagiaire Développeur',
          organization: 'YOUNG-THINK SARL',
          date: '2025',
          location: 'Ouagadougou, Burkina Faso',
          badge: 'Stage professionnel',
          tasks: [
            'Participation aux tests fonctionnels et unitaires des logiciels',
            "Contribution aux travaux de développement de solutions en collaboration avec l'équipe projet",
            'Participation aux démonstrations de solutions auprès des clients',
            "Participation aux travaux d'installation et de maintenance auprès des clients",
          ],
          tags: ['Travail en équipe', 'Démonstration Client', 'Installation & Maintenance', 'QA Testing'],
        },
      ],
    },
    education: {
      subtitle: 'Cursus académique',
      title: 'Formation',
      description: "Mon parcours académique et universitaire au Burkina Faso.",
      items: [
        {
          title: 'Licence MIAGE',
          organization: 'Institut Burkinabé des Arts et Métiers (IBAM)',
          date: '2026',
          badge: 'Enseignement Supérieur',
          description:
            "Méthodes Informatiques Appliquées à la Gestion des Entreprises. Modules principaux : gestion de projet, administration réseau et serveur, développement Web & mobile, gestion des BDD, virtualisation, cloud computing, développement personnel et intelligence artificielle.",
          tags: [
            'Gestion de Projet',
            'Web & Mobile',
            'Réseaux & Serveurs',
            'Bases de données',
            'Cloud & Virtualisation',
            'Intelligence Artificielle',
          ],
        },
        {
          title: 'Baccalauréat Série D',
          organization: "Lycée de l'Alliance Chrétienne de Kamboinsin",
          date: '2023',
          badge: 'Secondaire',
          description: 'Diplôme du Baccalauréat Scientifique (Série D) – Burkina Faso.',
          tags: ['Sciences', 'Mathématiques', 'Burkina Faso'],
        },
      ],
    },
    portfolio: {
      subtitle: 'Réalisations concrètes',
      title: 'Mes Projets',
      description:
        'Découvrez une sélection de mes projets de développement web, plateformes académiques et solutions métiers.',
      filters: {
        all: 'Tous les projets',
        web: 'Web & Full Stack',
        academic: 'Solutions Académiques & Métier',
      },
      viewProject: 'Code source',
      liveDemo: 'Voir le visuel',
      liveSoon: 'Visuel bientôt en ligne',
      viewOnGithub: 'Voir sur GitHub',
      moreOnGithub: 'Voir tous mes projets sur GitHub',
      items: [
        {
          id: 'facility-manager',
          title: 'Facility Manager',
          description:
            'Application complète de gestion des installations, équipements et ressources d’entreprise. Projet développé et hébergé sur GitHub.',
          category: 'web',
          categoryLabel: 'Application Web / Gestion',
          icon: 'fa-solid fa-building-shield',
          tags: ['Full Stack', 'Gestion', 'GitHub'],
          githubUrl: 'https://github.com/delfa25/Facility-Manager',
          liveUrl: '',
          featured: true,
        },
        {
          id: 'portfolio-angular',
          title: 'Portfolio Personnel Moderne (Angular)',
          description:
            'Refonte moderne de mon site portfolio avec Angular, architecture réactive basée sur les Signals, thème Sombre/Clair, multilingue FR/EN et animations fluides.',
          category: 'web',
          categoryLabel: 'Web / Frontend',
          icon: 'fa-solid fa-wand-magic-sparkles',
          tags: ['TypeScript / Angular', 'SCSS', 'Responsive'],
          githubUrl: 'https://github.com/delfa25/myportfolio',
          liveUrl: '',
          featured: true,
        },
        {
          id: 'anti-plagiat',
          title: 'Anti-Plagiat',
          description:
            'Système intelligent de détection de plagiat pour les thèmes et mémoires universitaires, avec analyse et comparaison de similarité documentaire.',
          category: 'academic',
          categoryLabel: 'Plateforme Universitaire',
          icon: 'fa-solid fa-file-shield',
          tags: ['Python / Django', 'JavaScript / React', 'Analyse de texte'],
          githubUrl: 'https://github.com/delfa25/anti-plagiat',
          liveUrl: '',
          featured: true,
        },
        {
          id: 'etusortant',
          title: 'EtuSortant',
          description:
            "Application web de gestion et de suivi du parcours académique et de l'insertion professionnelle des étudiants sortants (diplômés / alumni).",
          category: 'academic',
          categoryLabel: 'Suivi Académique & Alumni',
          icon: 'fa-solid fa-user-graduate',
          tags: ['Full Stack', 'Web', 'Base de données'],
          githubUrl: 'https://github.com/delfa25',
          liveUrl: '',
        },
        {
          id: 'projet-reclamation',
          title: 'Projet Réclamations',
          description:
            "Plateforme numérique de soumission, traitement et suivi des réclamations de notes et requêtes académiques pour les étudiants et l'administration (IBAM).",
          category: 'academic',
          categoryLabel: 'Gestion des Réclamations',
          icon: 'fa-solid fa-clipboard-check',
          tags: ['PHP / Laravel', 'JavaScript', 'MySQL'],
          githubUrl: 'https://github.com/delfa25/Projet-Ibam-reclamations',
          liveUrl: '',
        },
      ],
    },
    contact: {
      subtitle: 'Restons en contact',
      title: 'Contactez-Moi',
      heading: 'Parlons de votre prochain projet',
      description:
        "N'hésitez pas à me contacter pour toute opportunité de collaboration, stage, mission freelance ou emploi.",
      labels: {
        email: 'Email',
        phone: 'Téléphone',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        location: 'Localisation',
        locationValue: 'Ouagadougou, Burkina Faso',
      },
      form: {
        nameLabel: 'Nom complet',
        namePlaceholder: 'Votre nom complet',
        emailLabel: 'Adresse Email',
        emailPlaceholder: 'votre@email.com',
        subjectLabel: 'Sujet',
        subjectPlaceholder: 'Sujet de votre message',
        messageLabel: 'Message',
        messagePlaceholder: 'Décrivez votre projet ou votre demande...',
        submitBtn: 'Envoyer le message',
        successMessage: 'Message préparé avec succès !',
      },
    },
    mailModal: {
      title: 'Choisissez votre messagerie',
      description: "Votre message est prêt. Sélectionnez votre service email préféré pour l'envoyer.",
      defaultClient: 'Client email (défaut)',
      cancel: 'Annuler',
      directSubject: 'Contact depuis le portfolio',
      directBody: 'Bonjour Mama Fadel,\n\n',
      fromPrefix: 'De',
    },
    footer: {
      tagline: 'Ingénieur en Informatique (MIAGE) & Développeur Full Stack.',
      rights: 'Tous droits réservés.',
      backToTop: 'Retour en haut',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      portfolio: 'Projects',
      contact: 'Contact',
      contactMeBtn: 'Contact Me',
    },
    hero: {
      availabilityBadge: 'Available for opportunities & collaborations',
      greeting: 'Hello, I am',
      firstName: 'Mama Fadel',
      lastName: 'DIAWARA',
      title: 'Computer Engineer & Full Stack Developer',
      roles: [
        'Full Stack Developer (Angular, React, Laravel, Django)',
        'Cross-Platform Mobile Developer (Flutter)',
        'Systems & Network Administrator (Linux, Cisco, Virtualization)',
        'B.Sc. in MIAGE — IBAM Graduate',
      ],
      description:
        'Holder of a Bachelor’s degree in MIAGE from IBAM, passionate about web & mobile development, IT systems management, and solving complex technological challenges.',
      contactBtn: 'Get in Touch',
      downloadCvBtn: 'Download CV',
      floatingBadge1: 'Full Stack & Mobile',
      floatingBadge2: 'MIAGE Degree • IBAM',
      stats: [
        {
          value: 2,
          suffix: '',
          label: 'Company Internships',
          icon: 'fa-solid fa-briefcase',
        },
        {
          value: 5,
          suffix: '+',
          label: 'Completed Projects',
          icon: 'fa-solid fa-folder-open',
        },
        {
          value: 6,
          suffix: '',
          label: 'Languages & Frameworks',
          icon: 'fa-solid fa-code',
        },
        {
          value: 4,
          suffix: '',
          label: 'Spoken Languages',
          icon: 'fa-solid fa-earth-africa',
        },
      ],
    },
    about: {
      subtitle: 'Who am I?',
      title: 'About Me',
      headline: 'Computer Engineer & Full Stack Developer',
      p1: 'Young engineer trained at the Burkinabé Institute of Arts and Crafts (IBAM), holding a Bachelor’s degree in Computer Methods Applied to Business Management (MIAGE). I continuously strengthen my expertise in IT systems management, software engineering, and data analysis.',
      p2: 'Passionate about solving complex problems through technology, I aim to apply my skills in a dynamic, forward-thinking, and innovative environment.',
      downloadCvBtn: 'Download my CV',
      info: {
        nameLabel: 'Full Name',
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        cityLabel: 'Location',
        cityValue: 'Ouagadougou, Burkina Faso',
        linkedinLabel: 'LinkedIn',
        degreeLabel: 'Degree',
        degreeValue: 'B.Sc. MIAGE (IBAM)',
      },
    },
    skills: {
      subtitle: 'Technical & Interpersonal Skills',
      title: 'My Skills',
      description:
        'A versatile profile combining software engineering (Web & Mobile), systems & network administration, and project management.',
      filterAll: 'All',
      categories: [
        {
          id: 'web-mobile-langs',
          title: 'Languages & Web / Mobile Development',
          icon: 'fa-solid fa-laptop-code',
          description: 'Programming languages paired with modern frameworks for web and cross-platform mobile apps.',
          skills: [
            { name: 'TypeScript / Angular', level: 88 },
            { name: 'JavaScript / React', level: 88 },
            { name: 'PHP / Laravel', level: 85 },
            { name: 'Python / Django', level: 85 },
            { name: 'Dart / Flutter', level: 82 },
            { name: 'Java / Spring Boot', level: 82 },
          ],
        },
        {
          id: 'systems-network',
          title: 'Systems & Networks',
          icon: 'fa-solid fa-server',
          description: 'System administration, virtualization, and network infrastructure management.',
          skills: [
            { name: 'Linux (Administration)', level: 85 },
            { name: 'Windows', level: 92 },
            { name: 'Network Administration', level: 84 },
            { name: 'Virtualization', level: 88 },
          ],
        },
        {
          id: 'db-tools',
          title: 'Databases & Tools',
          icon: 'fa-solid fa-database',
          description: 'Database modeling and management, version control, and IT hardware/software maintenance.',
          skills: [
            { name: 'Database Management (SQL)', level: 86 },
            { name: 'Git / GitHub', level: 90 },
            { name: 'IT Maintenance', level: 88 },
          ],
        },
        {
          id: 'soft-skills',
          title: 'Soft Skills & Methodology',
          icon: 'fa-solid fa-people-group',
          description: 'Collaborative strengths and continuous learning in dynamic environments.',
          skills: [
            { name: 'Teamwork', level: 95, badge: 'Core Strength' },
            { name: 'Fast Adaptability', level: 95, badge: 'Core Strength' },
            { name: 'Fast Learning', level: 94, badge: 'Self-Driven' },
            { name: 'Complex Problem Solving', level: 92, badge: 'Analytical' },
          ],
        },
        {
          id: 'spoken-langs',
          title: 'Languages',
          icon: 'fa-solid fa-language',
          description: 'Professional and cross-cultural communication.',
          skills: [
            { name: 'French', level: 96, badge: 'Read, spoken, written (Fluent)' },
            { name: 'English', level: 78, badge: 'Read, spoken, written (Good)' },
            { name: 'Bambara', level: 82, badge: 'Spoken (Good)' },
            { name: 'Mooré', level: 55, badge: 'Spoken (Conversational)' },
          ],
        },
      ],
    },
    experience: {
      subtitle: 'Professional Journey',
      title: 'Work Experience',
      description:
        'Hands-on industry experience in software development, quality assurance testing, deployment, and client support.',
      items: [
        {
          title: 'Software Developer Intern',
          organization: 'YOUNG-THINK SARL',
          date: '2026',
          location: 'Ouagadougou, Burkina Faso',
          badge: 'Capstone Internship',
          tasks: [
            'Developed a feature extension for an existing enterprise software product',
            'Participated in functional and unit testing across software modules',
            'Assisted in deploying software solutions directly to clients',
            'Contributed actively to daily engineering and company operations',
          ],
          tags: ['Software Development', 'Unit & Functional Testing', 'Client Deployment'],
        },
        {
          title: 'Software Developer Intern',
          organization: 'YOUNG-THINK SARL',
          date: '2025',
          location: 'Ouagadougou, Burkina Faso',
          badge: 'Summer Internship',
          tasks: [
            'Conducted functional and unit testing of enterprise software applications',
            'Collaborated with the project team on developing software solutions',
            'Participated in live product demonstrations for clients',
            'Performed on-site software installation and IT maintenance for clients',
          ],
          tags: ['Team Collaboration', 'Client Demos', 'Installation & Maintenance', 'QA Testing'],
        },
      ],
    },
    education: {
      subtitle: 'Academic Background',
      title: 'Education',
      description: 'My university and secondary academic credentials in Burkina Faso.',
      items: [
        {
          title: "Bachelor's Degree in MIAGE",
          organization: 'Institut Burkinabé des Arts et Métiers (IBAM)',
          date: '2026',
          badge: 'Higher Education',
          description:
            'Computer Methods Applied to Business Management (MIAGE). Core modules: project management, network and server administration, Web & mobile development, database management, virtualization, cloud computing, personal development, and artificial intelligence.',
          tags: [
            'Project Management',
            'Web & Mobile',
            'Networks & Servers',
            'Databases',
            'Cloud & Virtualization',
            'Artificial Intelligence',
          ],
        },
        {
          title: 'Scientific Baccalaureate (Series D)',
          organization: "Lycée de l'Alliance Chrétienne de Kamboinsin",
          date: '2023',
          badge: 'High School',
          description: 'High School Diploma in Natural Sciences & Mathematics (Series D) – Burkina Faso.',
          tags: ['Sciences', 'Mathematics', 'Burkina Faso'],
        },
      ],
    },
    portfolio: {
      subtitle: 'Featured Work',
      title: 'My Projects',
      description:
        'Explore a selection of my projects spanning web applications, academic platforms, and enterprise management solutions.',
      filters: {
        all: 'All Projects',
        web: 'Web & Full Stack',
        academic: 'Academic & Enterprise Solutions',
      },
      viewProject: 'Source Code',
      liveDemo: 'Live Preview',
      liveSoon: 'Live preview coming soon',
      viewOnGithub: 'View on GitHub',
      moreOnGithub: 'See all my projects on GitHub',
      items: [
        {
          id: 'facility-manager',
          title: 'Facility Manager',
          description:
            'Comprehensive application for managing enterprise facilities, equipment, and organizational resources. Hosted on GitHub.',
          category: 'web',
          categoryLabel: 'Web App / Management',
          icon: 'fa-solid fa-building-shield',
          tags: ['Full Stack', 'Resource Management', 'GitHub'],
          githubUrl: 'https://github.com/delfa25/Facility-Manager',
          liveUrl: '',
          featured: true,
        },
        {
          id: 'portfolio-angular',
          title: 'Modern Personal Portfolio (Angular)',
          description:
            'Complete modern redesign of my personal portfolio built with Angular, reactive Signals state, Dark/Light theme switcher, FR/EN internationalization, and smooth scroll animations.',
          category: 'web',
          categoryLabel: 'Web / Frontend',
          icon: 'fa-solid fa-wand-magic-sparkles',
          tags: ['TypeScript / Angular', 'SCSS', 'Responsive'],
          githubUrl: 'https://github.com/delfa25/myportfolio',
          liveUrl: '',
          featured: true,
        },
        {
          id: 'anti-plagiat',
          title: 'Anti-Plagiat',
          description:
            'Intelligent plagiarism detection platform for university theses and dissertations, featuring document similarity analysis.',
          category: 'academic',
          categoryLabel: 'Academic Platform',
          icon: 'fa-solid fa-file-shield',
          tags: ['Python / Django', 'JavaScript / React', 'Text Analysis'],
          githubUrl: 'https://github.com/delfa25/anti-plagiat',
          liveUrl: '',
          featured: true,
        },
        {
          id: 'etusortant',
          title: 'EtuSortant',
          description:
            'Web application for managing and tracking graduating students, alumni profiles, and professional career placement.',
          category: 'academic',
          categoryLabel: 'Alumni & Graduate Tracking',
          icon: 'fa-solid fa-user-graduate',
          tags: ['Full Stack', 'Web', 'Database'],
          githubUrl: 'https://github.com/delfa25',
          liveUrl: '',
        },
        {
          id: 'projet-reclamation',
          title: 'Projet Réclamations',
          description:
            'Digital platform for submitting, processing, and tracking academic grade appeals and student claims at IBAM.',
          category: 'academic',
          categoryLabel: 'Claims Management',
          icon: 'fa-solid fa-clipboard-check',
          tags: ['PHP / Laravel', 'JavaScript', 'MySQL'],
          githubUrl: 'https://github.com/delfa25/Projet-Ibam-reclamations',
          liveUrl: '',
        },
      ],
    },
    contact: {
      subtitle: "Let's Connect",
      title: 'Contact Me',
      heading: "Let's talk about your project",
      description:
        'Feel free to reach out for any collaboration opportunity, internship, freelance project, or full-time role.',
      labels: {
        email: 'Email',
        phone: 'Phone',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        location: 'Location',
        locationValue: 'Ouagadougou, Burkina Faso',
      },
      form: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email Address',
        emailPlaceholder: 'your@email.com',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Subject of your message',
        messageLabel: 'Message',
        messagePlaceholder: 'Tell me about your project or inquiry...',
        submitBtn: 'Send Message',
        successMessage: 'Message prepared successfully!',
      },
    },
    mailModal: {
      title: 'Choose your email provider',
      description: 'Your message is ready. Select your preferred email client to send it.',
      defaultClient: 'Default Email App',
      cancel: 'Cancel',
      directSubject: 'Contact from Portfolio',
      directBody: 'Hello Mama Fadel,\n\n',
      fromPrefix: 'From',
    },
    footer: {
      tagline: 'Computer Engineer (MIAGE) & Full Stack Developer.',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class PortfolioStateService {
  readonly emailAddress = 'mamadiawara1962@gmail.com';
  readonly phoneRaw = '+22674322126';
  readonly phoneDisplay = '(+226) 74 32 21 26';
  readonly githubUrl = 'https://github.com/delfa25';
  readonly linkedinUrl = 'https://www.linkedin.com/in/mama-fadel-diawara-856ab0328';
  readonly cvUrl = 'CV MAMA FADEL DIAWARA.pdf';
  readonly profileImg = 'images/myimg.jpeg';

  readonly lang = signal<Lang>(this.getInitialLang());
  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly activeSection = signal<string>('home');

  readonly mailModal = signal<{
    isOpen: boolean;
    to: string;
    subject: string;
    body: string;
  }>({
    isOpen: false,
    to: this.emailAddress,
    subject: '',
    body: '',
  });

  readonly formSubmittedSuccess = signal<boolean>(false);

  readonly t = computed<PortfolioTranslations>(() => TRANSLATIONS[this.lang()]);

  readonly mailProviders = computed<MailProvider[]>(() => {
    const state = this.mailModal();
    const enc = encodeURIComponent;
    const to = state.to;
    const subject = state.subject;
    const body = state.body;
    const defaultLabel = this.t().mailModal.defaultClient;

    return [
      {
        name: 'Gmail',
        icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
        color: '#EA4335',
        url: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(to)}&su=${enc(subject)}&body=${enc(body)}`,
      },
      {
        name: 'Outlook / Hotmail',
        icon: 'https://res.cdn.office.net/assets/mail/pwa/v1/pngs/favicon_large_1x.png',
        color: '#0078D4',
        url: `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
      },
      {
        name: 'Yahoo Mail',
        icon: 'https://s.yimg.com/rz/l/yahoo_en-US_f_p_142x37_2x.png',
        color: '#6001D2',
        url: `https://compose.mail.yahoo.com/?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
      },
      {
        name: 'Proton Mail',
        icon: 'https://proton.me/favicons/favicon-32x32.png',
        color: '#6D4AFF',
        url: `https://mail.proton.me/u/0/inbox#compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
      },
      {
        name: 'Zoho Mail',
        icon: 'https://www.zohowebstatic.com/sites/zweb/images/favicon.ico',
        color: '#E42527',
        url: `https://mail.zoho.com/zm/#compose?to=${enc(to)}&subject=${enc(subject)}&body=${enc(body)}`,
      },
      {
        name: defaultLabel,
        iconFA: 'fa-solid fa-desktop',
        color: '#8b5cf6',
        url: `mailto:${to}?subject=${enc(subject)}&body=${enc(body)}`,
      },
    ];
  });

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', currentTheme);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mfd_theme', currentTheme);
      }
    });

    effect(() => {
      const currentLang = this.lang();
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', currentLang);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mfd_lang', currentLang);
      }
    });
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  toggleLang(): void {
    this.lang.update((current) => (current === 'fr' ? 'en' : 'fr'));
  }

  openDirectMailModal(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const modalText = this.t().mailModal;
    this.openMailModal(modalText.directSubject, modalText.directBody);
  }

  openMailModal(subject: string, body: string): void {
    this.mailModal.set({
      isOpen: true,
      to: this.emailAddress,
      subject,
      body,
    });
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeMailModal(): void {
    this.mailModal.update((s) => ({ ...s, isOpen: false }));
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  triggerConfirmation(): void {
    this.formSubmittedSuccess.set(true);
    setTimeout(() => {
      this.formSubmittedSuccess.set(false);
    }, 3500);
  }

  private getInitialTheme(): ThemeMode {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mfd_theme') as ThemeMode | null;
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    }
    return 'dark';
  }

  private getInitialLang(): Lang {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mfd_lang') as Lang | null;
      if (saved === 'fr' || saved === 'en') {
        return saved;
      }
    }
    return 'fr';
  }
}

