import { TextField, buildSection, ImageField } from '@headcode'
import Logos from './Logos'

export default buildSection({
  name: 'headcodecms/theme-proto:LogosSection',
  label: 'Logos Section',
  theme: 'headcodecms.com/theme-proto',
  component: Logos,
  fields: {
    title: {
      label: 'Title',
      type: TextField,
    },
  },
  blocks: [
    {
      name: 'logo',
      label: 'Logos',
      fields: {
        logo: {
          label: 'Logo',
          type: ImageField,
        },
      },
    },
  ],
})
