import type { MetaData } from '~/types';

export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
  googleSiteVerificationId?: string;
}

export interface MetaDataConfig extends Omit<MetaData, 'title'> {
  title?: {
    default: string;
    template: string;
  };
}

export interface I18NConfig {
  language: string;
  textDirection: string;
  dateFormatter?: Intl.DateTimeFormat;
}

export interface AppBlogConfig {
  isEnabled: boolean;
  postsPerPage: number;
  isRelatedPostsEnabled: boolean;
  relatedPostsCount: number;
  post: {
    isEnabled: boolean;
    permalink: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  list: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  category: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
  tag: {
    isEnabled: boolean;
    pathname: string;
    robots: {
      index: boolean;
      follow: boolean;
    };
  };
}

export interface AnalyticsConfig {
  vendors: {
    googleAnalytics: {
      id?: string | null;
      partytown?: boolean;
    };
  };
}

export interface UIConfig {
  theme: string;
}

export const SITE: SiteConfig = {
  name: 'Human Ink',
  site: 'https://lukaszrej.github.io/',
  base: '/written',
  trailingSlash: false,
  googleSiteVerificationId: 'orcPxI47GSa-cRvY11tUe6iGg2IO_RPvnA1q95iEM3M',
};

export const METADATA: MetaDataConfig = {
  title: {
    default: 'Human Ink',
    template: '%s — Human Ink',
  },
  description:
    '🚀 Blog o rozwoju osobistym, sukcesie i motywacji. Inspirujące artykuły, praktyczne porady i historie sukcesu, które pomogą Ci osiągnąć swoje cele.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: 'Human Ink',
    images: [
      {
        url: '~/assets/images/hero-image.png',
        width: 1200,
        height: 628,
      },
    ],
    type: 'website',
  },
};

export const I18N: I18NConfig = {
  language: 'en',
  textDirection: 'ltr',
};

export const APP_BLOG: AppBlogConfig = {
  isEnabled: true,
  postsPerPage: 6,
  isRelatedPostsEnabled: true,
  relatedPostsCount: 4,
  post: {
    isEnabled: true,
    permalink: '/%slug%',
    robots: {
      index: true,
      follow: true,
    },
  },
  list: {
    isEnabled: true,
    pathname: 'blog',
    robots: {
      index: true,
      follow: true,
    },
  },
  category: {
    isEnabled: true,
    pathname: 'category',
    robots: {
      index: true,
      follow: true,
    },
  },
  tag: {
    isEnabled: true,
    pathname: 'tag',
    robots: {
      index: false,
      follow: true,
    },
  },
};

export const UI: UIConfig = {
  theme: 'system',
};

export const ANALYTICS: AnalyticsConfig = {
  vendors: {
    googleAnalytics: {
      id: null,
      partytown: true,
    },
  },
};
