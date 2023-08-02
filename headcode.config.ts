import { buildConfig } from '@headcode'
import { HeroSection } from '@theme'

export default buildConfig({
  version: 'v01',
  // clone: 'v01',
  globals: [
    {
      name: 'global.hero',
      locales: ['de', 'it'],
      sections: HeroSection,
      /* is equivalent to
      sections: [HeroSection],
      limit: 1,
      presets: [HeroSection],
      */
    },
    {
      name: 'pages.about',
      metadata: true,
    },
    {
      name: 'global.herolist',
      sections: [HeroSection, HeroSection],
    },
  ],
  collections: [
    {
      name: 'blog',
      metadata: true,
      locales: ['de'],
      sections: [HeroSection],
      presets: [HeroSection]
    },
  ],
  /* I'm refactoring service architecture in package headcodecms/headcode
  services: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      connectionString: process.env.SUPABASE_CONNECTION_STRING!,
      storage: {
        bucket: 'headcode',
        version: 'v1',
      },
    },
    auth: 'supabase',
    db: 'supabase',
    storage: 'supabase',
  },
  */
})
