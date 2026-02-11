
export type SpiceType = 'Whole' | 'Powdered';

export interface Product {
  id: string;
  name: string;
  type: SpiceType;
  description: string;
  sizes: string[]; 
  image: string;
  category: string;
  isFeatured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  status: 'Draft' | 'Published';
}

export interface Enquiry {
  id: string;
  type: 'B2B' | 'General' | 'Product';
  name: string;
  email: string;
  phone: string;
  message: string;
  productName?: string;
  timestamp: string;
  status: 'New' | 'Read' | 'Contacted';
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
}

export interface PageContent {
  id: string;
  title: string;
  sections: {
    id: string;
    heading: string;
    body: string;
    image?: string;
    visible: boolean;
  }[];
}

export interface CMSState {
  products: Product[];
  blogs: BlogPost[];
  enquiries: Enquiry[];
  siteConfig: SiteConfig;
  pages: PageContent[];
}
