import { buildSection, RichTextField } from '@headcode'
import CopyText from './CopyText'

export default buildSection({
  name: 'headcodecms/theme-proto:CopyTextSection',
  label: 'Copy Text Section',
  theme: 'headcodecms.com/theme-proto',
  component: CopyText,
  fields: {
    text: {
      label: 'Copy text',
      type: RichTextField,
    },
  },
})
