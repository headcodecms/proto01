import { TextField, buildSection, ImageField, TextAreaField } from '@headcode'
import BlogHero from './BlogHero'

export default buildSection({
  name: 'headcodecms/theme-proto:BlogHeroSection',
  label: 'Blog Hero Section',
  theme: 'headcodecms.com/theme-proto',
  component: BlogHero,
  fields: {
    img: {
      label: 'Blog Hero Image',
      type: ImageField,
    },
    title: {
      label: 'Title',
      type: TextField,
    },
    excerpt: {
      label: 'Excerpt',
      type: TextAreaField,
    },
  },
})
