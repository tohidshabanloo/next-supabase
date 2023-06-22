const siteMetadata = {
  title: { en: "Backpacker", fa: "کوله پشتی" },
  author: { en: "Tohid Shabanloo", fa: "توحید شعبانلو" },
  headerTitle: { en: "Backpacker", fa: "کوله پشتی" },
  // description: 'A blog created with Next.js and Tailwind.css',
  description: { en: "Traveling", fa: "سفر" },
  metadescription: {
    en: "We write travel experiences and getting to know different people, introducing ways that help you to have a cheaper and more useful trip, as well as travel guides to different countries.",
    fa: "تجربيات سفر و آشنايي با افراد مختلف، معرفی راه هايي که به شما کمک ميکند تا سفر کم هزينه تر و مفیدتری داشته باشيد، همینطور راهنماي سفر به کشور هاي مختلف را مي نويسیم.",
  },
  language: "fa-IR",
  siteUrl: "https://backpacker-supabase.vercel.app/",
  sitemapUrl: {
    en: "https://backpacker-supabase.vercel.app/",
    fa: "https://backpacker-supabase.vercel.app/",
  },
  siteRepo: "https://github.com/",
  siteLogo: "/static/images/logo.png",
  image: "/static/images/avatar.png",
  socialBanner: "/static/images/twitter-card.png",
  email: "contact at tohidsh.com",
  github: "https://github.com/tohidshabanloo/",
  twitter: "https://twitter.com/tohidshabanloo/",
  facebook: "https://facebook.com/tohidshabanloo/",
  youtube: "https://youtube.com/tohidshabanloo/",
  linkedin: "https://www.linkedin.com/tohidshabanloo/",
  instagram: "https://www.instagram.com/tohidshabanloo/",
  locale: "en-US",
  analytics: {
    // supports plausible, simpleAnalytics or googleAnalytics
    plausibleDataDomain: "", // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    googleAnalyticsId: "UA-1", // e.g. UA-000000-2 or G-XXXXXXX
  },
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: "giscus", // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: "pathname", // supported options: pathname, url, title
      reactions: "1", // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: "0",
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: "light",
      // theme when dark mode
      darkTheme: "transparent_dark",
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: "",
    },
    utterancesConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://utteranc.es/
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: "pathname", // supported options: pathname, url, title
      label: "Backpacker Comments", // label (optional): Comment 💬
      // theme example: github-light, github-dark, preferred-color-scheme
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: "github-light",
      // theme when dark mode
      darkTheme: "github-dark",
    },
    disqus: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
    },
  },
};

module.exports = siteMetadata;
