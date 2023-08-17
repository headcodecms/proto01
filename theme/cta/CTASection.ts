import { TextField, buildSection, TextAreaField, LinkField } from '@headcode'
import CTA from './CTA'

export default buildSection({
  name: 'headcodecms/theme-proto:CTASection',
  label: 'CTA Section',
  theme: 'headcodecms.com/theme-proto',
  component: CTA,
  fields: {
    title: {
      label: 'Title',
      type: TextField,
    },
    description: {
      label: 'Description',
      type: TextAreaField,
    },
    link: {
      label: 'CTA Link',
      type: LinkField,
    },
  },
})
