import { TextField, buildSection, TextAreaField } from '@headcode'
import SmallHero from './SmallHero'

export default buildSection({
  name: 'headcodecms/theme-proto:SmallHeroSection',
  label: 'Small Hero Section',
  theme: 'headcodecms.com/theme-proto',
  component: SmallHero,
  fields: {
    title: {
      label: 'Title',
      type: TextField,
    },
    description: {
      label: 'Description',
      type: TextAreaField,
    },
  },
})
