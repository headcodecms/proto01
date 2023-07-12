import { buildConfig } from '@headcode'
import { HeroSection } from '@theme'

export default buildConfig({
  version: 'v01',
  // clone: 'v01',
  services: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      connectionString: process.env.SUPABASE_CONNECTION_STRING!,
      rowLevelSecurity: true,
      revalidate: 0,
      storage: {
        bucket: 'headcode',
        version: 'v1',
      },
    },
  },
  globals: [
    {
      name: 'global.hero',
      locales: ['de', 'it'],
      sections: HeroSection,
      /* is equivalent to
      sections: [HeroSection],
      presets: [HeroSection],
      limit: 1,
      renderer: DefaultRenderer,
      */
    },
    {
      name: 'pages.about',
      metadata: true,
    },
    {
      name: 'global.herolist',
      sections: [HeroSection],
      presets: [HeroSection, HeroSection],
      renderer: 'CustomRenderer',
    },
  ],
  collections: [
    {
      name: 'blog',
      metadata: true,
      locales: ['de'],
      /*
      sections: [HeroSection, TextImageSection],
      presets: [TextImageSection, HeroSection],
      */
    },
  ],
})
