import {
  TextField,
  buildSection,
  TextAreaField,
  LinkField,
  ImageField,
} from '@headcode'
import Cards from './Cards'

export default buildSection({
  name: 'headcodecms/theme-proto:CardsSection',
  label: 'Cards Section',
  theme: 'headcodecms.com/theme-proto',
  component: Cards,
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
  blocks: [
    {
      name: 'card',
      label: 'Card',
      fields: {
        img: {
          label: 'Cover image',
          type: ImageField,
        },
        title: {
          label: 'Title',
          type: TextField,
        },
        description: {
          label: 'Description',
          type: TextAreaField,
        },
        link: {
          label: 'Link',
          type: LinkField,
        },
      },
    },
  ],
})
