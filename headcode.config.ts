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
      renderer: 'CustomRenderer',
    },
  ],
  collections: [
    {
      name: 'blog',
      metadata: true,
      locales: ['de'],
      sections: [HeroSection],
    },
  ],
})
