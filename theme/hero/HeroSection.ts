import {
  ImageField,
  RichTextField,
  buildSection,
  TextField,
  CheckboxField,
  SelectField,
  TextAreaField,
  LinkField,
} from '@headcode'
import Hero from './Hero'

export default buildSection({
  name: 'headcodecms/theme-proto:HeroSection',
  // name: 'github/repo:Name'
  // name: 'acme-agency.com:Name'
  // name: 'john@gmail.com:Name'
  // name: '@twittername:Name'
  label: 'Hero Section',
  theme: 'headcodecms.com/theme-proto',
  // theme: defaults to custom
  component: Hero,
  fields: {
    title: {
      label: 'Title',
      type: TextField,
    },
    subtitle: {
      label: 'Subtitle',
      type: TextAreaField,
    },
    cta: {
      label: 'Call to action',
      type: LinkField,
    },
    more: {
      label: 'More link',
      type: LinkField,
    },
  },
})
