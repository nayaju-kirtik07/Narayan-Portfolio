export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  videoUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Reel {
  id: string;
  image: string;
  videoUrl: string;
  likes: string;
  views: string;
}

export interface SiteData {
  hero: {
    title: string;
    subtitle: string[];
    available: string;
  };
  about: {
    image: string;
    yearsCraft: number;
    description: string;
    stats: { label: string; value: string }[];
    resumeUrl: string;
  };
  showreel: {
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
  };
  instagram: {
    username: string;
    reels: Reel[];
  };
  bts: {
    images: string[];
  };
  contact: {
    email: string;
    whatsapp: string;
    location: string;
    instagram: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}
