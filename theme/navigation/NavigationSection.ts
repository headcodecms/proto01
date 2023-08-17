import { ImageField, LinkField, buildSection } from '@headcode'
import Navigation from './Navigation'

export default buildSection({
  name: 'headcodecms/theme-proto:NavigationSection',
  label: 'Navigation Section',
  theme: 'headcodecms.com/theme-proto',
  component: Navigation,
  fields: {
    logo: {
      label: 'Logo',
      type: ImageField,
    },
    cta: {
      label: 'Call to action',
      type: LinkField,
    },
  },
  blocks: [
    {
      name: 'link',
      label: 'Navigation link',
      fields: {
        link: {
          label: 'Navigation link',
          type: LinkField,
        },
      },
    },
  ],
})
