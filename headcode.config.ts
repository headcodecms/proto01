import { buildConfig } from '@headcode'
import NavigationSection from './theme/navigation/NavigationSection'
import HeroSection from './theme/hero/HeroSection'
import LogosSection from './theme/logos/LogosSection'
import TextBlocksSection from './theme/textblocks/TextBlocksSection'
import CTASection from './theme/cta/CTASection'
import PlansSection from './theme/plans/PlansSection'
import FooterSection from './theme/footer/FooterSection'
import CardsSection from './theme/cards/CardsSection'
import SmallHeroSection from './theme/smallhero/SmallHeroSection'
import BlogHeroSection from './theme/bloghero/BlogHeroSection'
import CopyTextSection from './theme/copytext/CopyTextSection'

export default buildConfig({
  version: 'v01',
  // clone: 'v01',
  globals: [
    {
      name: 'global.navigation',
      sections: NavigationSection,
    },
    {
      name: 'global.footer',
      sections: FooterSection,
    },
    {
      name: 'pages.home',
      metadata: true,
      sections: [
        HeroSection,
        LogosSection,
        TextBlocksSection,
        CTASection,
        PlansSection,
        CardsSection,
      ],
      presets: [
        HeroSection,
        LogosSection,
        TextBlocksSection,
        CTASection,
        PlansSection,
        CardsSection,
      ],
    },
    {
      name: 'pages.about',
      metadata: true,
      sections: [SmallHeroSection, CardsSection],
      presets: [SmallHeroSection, CardsSection],
    },
    {
      name: 'pages.login',
      sections: SmallHeroSection,
    },
    {
      name: 'blog.overview',
      metadata: true,
    },
  ],
  collections: [
    {
      name: 'blog',
      metadata: true,
      sections: [BlogHeroSection, CopyTextSection],
      presets: [BlogHeroSection, CopyTextSection],
    },
  ],
})
