import {
  TextField,
  buildSection,
  TextAreaField,
  LinkField,
  CheckboxField,
} from '@headcode'
import Plans from './Plans'

export default buildSection({
  name: 'headcodecms/theme-proto:PlansSection',
  label: 'Plans Section',
  theme: 'headcodecms.com/theme-proto',
  component: Plans,
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
      name: 'plan',
      label: 'Plan',
      fields: {
        name: {
          label: 'Title',
          type: TextField,
        },
        price: {
          label: 'Price',
          type: TextField,
        },
        action: {
          label: 'Action',
          type: LinkField,
        },
        description: {
          label: 'Description',
          type: TextAreaField,
        },
        popular: {
          label: 'Most popular',
          type: CheckboxField,
        },
      },
      blocks: [
        {
          name: 'feature',
          label: 'Feature',
          fields: {
            feature: {
              label: 'Feature',
              type: TextField,
            },
          },
        },
      ],
    },
  ],
})
