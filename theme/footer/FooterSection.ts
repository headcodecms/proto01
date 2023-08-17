import { buildSection, LinkField, ImageField } from '@headcode'
import Footer from './Footer'

export default buildSection({
  name: 'headcodecms/theme-proto:FooterSection',
  label: 'Footer Section',
  theme: 'headcodecms.com/theme-proto',
  component: Footer,
  fields: {
    logo: {
      label: 'Logo',
      type: ImageField,
    },
  },
  blocks: [
    {
      name: 'link',
      label: 'Navigation link',
      fields: {
        link: {
          label: 'Link',
          type: LinkField,
        },
      },
    },
  ],
})
