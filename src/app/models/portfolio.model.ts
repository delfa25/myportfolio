export type Lang = 'fr' | 'en';
export type ThemeMode = 'dark' | 'light';
export type ProjectCategory = 'all' | 'web' | 'academic';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface StatCounter {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface SkillItem {
  name: string;
  level?: number; // 0 to 100
  badge?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  skills: SkillItem[];
}

export interface TimelineItem {
  title: string;
  organization: string;
  date: string;
  location?: string;
  description?: string;
  tasks?: string[];
  tags?: string[];
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'academic';
  categoryLabel: string;
  icon: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface MailProvider {
  name: string;
  icon?: string;
  iconFA?: string;
  color: string;
  url: string;
}

export interface PortfolioTranslations {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    education: string;
    portfolio: string;
    contact: string;
    contactMeBtn: string;
  };
  hero: {
    availabilityBadge: string;
    greeting: string;
    firstName: string;
    lastName: string;
    title: string;
    roles: string[];
    description: string;
    contactBtn: string;
    downloadCvBtn: string;
    floatingBadge1: string;
    floatingBadge2: string;
    stats: StatCounter[];
  };
  about: {
    subtitle: string;
    title: string;
    headline: string;
    p1: string;
    p2: string;
    downloadCvBtn: string;
    info: {
      nameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      cityLabel: string;
      cityValue: string;
      linkedinLabel: string;
      degreeLabel: string;
      degreeValue: string;
    };
  };
  skills: {
    subtitle: string;
    title: string;
    description: string;
    filterAll: string;
    categories: SkillCategory[];
  };
  experience: {
    subtitle: string;
    title: string;
    description: string;
    items: TimelineItem[];
  };
  education: {
    subtitle: string;
    title: string;
    description: string;
    items: TimelineItem[];
  };
  portfolio: {
    subtitle: string;
    title: string;
    description: string;
    filters: {
      all: string;
      web: string;
      academic: string;
    };
    viewProject: string;
    liveDemo: string;
    liveSoon: string;
    viewOnGithub: string;
    moreOnGithub: string;
    items: ProjectItem[];
  };
  contact: {
    subtitle: string;
    title: string;
    heading: string;
    description: string;
    labels: {
      email: string;
      phone: string;
      github: string;
      linkedin: string;
      location: string;
      locationValue: string;
    };
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      successMessage: string;
    };
  };
  mailModal: {
    title: string;
    description: string;
    defaultClient: string;
    cancel: string;
    directSubject: string;
    directBody: string;
    fromPrefix: string;
  };
  footer: {
    tagline: string;
    rights: string;
    backToTop: string;
  };
}

